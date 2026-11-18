extends Node
## AudioManager (autoload). Administrador central de audio de Guardianes de la Patagonia.
## Buses: Master, Music, Nature, Gameplay, UI  (ver audio_bus_layout.tres)
## Capas por nivel: 1) música principal  2) naturaleza (cama + acentos aleatorios)  3) variaciones dinámicas por etapa.
## Todas las rutas viven en data/audio_catalog.json: reemplazar un archivo no requiere tocar código.
##
## Requiere el autoload LevelClock (level_clock.gd).

signal level_audio_started(level_id: String)
signal level_audio_stopped()

const CATALOG_PATH := "res://data/audio_catalog.json"
const SETTINGS_PATH := "user://audio_settings.cfg"
const BUSES := ["Master", "Music", "Nature", "Gameplay", "UI"]
const XFADE := 2.0               # segundos de crossfade
const SFX_VOICES := 8            # voces simultáneas máximas
const DUCK_DB := -9.0            # cuánto baja Naturaleza durante diálogos / preguntas

var catalog: Dictionary = {}
var level_id: String = ""
var level_seconds_default: float = 240.0

var _music: Array[AudioStreamPlayer] = []     # A/B para crossfade de la música principal
var _music_front := 0
var _bed: AudioStreamPlayer                   # cama ambiental en loop
var _variation: Array[AudioStreamPlayer] = [] # A/B para variaciones por etapa
var _var_front := 0
var _accent_timer: Timer
var _accent_player: AudioStreamPlayer
var _sfx_pool: Array[AudioStreamPlayer] = []
var _sfx_meta: Dictionary = {}                # player -> {priority, id}
var _last_sfx_ms: Dictionary = {}
var _warned: Dictionary = {}
var _duck_count := 0
var _paused_by_game := false
var _rng := RandomNumberGenerator.new()

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS     # sigue activo con el árbol en pausa (para pausar streams con control)
	_rng.randomize()
	_load_catalog()
	_build_players()
	load_settings()
	LevelClock.stage_changed.connect(_on_stage_changed)

# ---------------------------------------------------------------- API de nivel
## Inicia el audio de un nivel. restore_stage >= 0 salta directo a esa etapa (sin fundido) al recuperar una partida.
func play_level(id: String, restore_stage: int = -1) -> void:
	if not catalog.get("levels", {}).has(id):
		push_warning("AudioManager: nivel desconocido '%s'" % id)
		return
	stop_level(0.4)
	level_id = id
	var cfg: Dictionary = catalog["levels"][id]
	var instant := restore_stage >= 0
	_crossfade_to(_music, "_music_front", cfg.get("music", ""), true, instant)
	_start_bed(cfg.get("nature_bed", ""), instant)
	_schedule_accent()
	if instant:
		_apply_variation(restore_stage, true)
	_paused_by_game = false
	level_audio_started.emit(id)

## Abandono de nivel / salida: fundido y detención completa.
func stop_level(fade: float = 1.0) -> void:
	if level_id == "":
		return
	_accent_timer.stop()
	for p in _music + _variation + [_bed, _accent_player]:
		_fade_out_and_stop(p, fade)
	level_id = ""
	level_audio_stopped.emit()

# ---------------------------------------------------------------- pausa / reanudación
## Pausa de partida: congela streams en su posición (stream_paused) y deja el cronómetro quieto.
func pause_game() -> void:
	if _paused_by_game:
		return
	_paused_by_game = true
	LevelClock.pause()
	_accent_timer.paused = true
	for p in _all_level_players():
		p.stream_paused = true

func resume_game() -> void:
	if not _paused_by_game:
		return
	_paused_by_game = false
	for p in _all_level_players():
		p.stream_paused = false
	_accent_timer.paused = false
	LevelClock.resume()

# ---------------------------------------------------------------- guardado / restauración
func get_state() -> Dictionary:
	return {"level_id": level_id, "elapsed": LevelClock.elapsed, "stage": LevelClock.stage()}

func restore_state(state: Dictionary) -> void:
	if not state.has("level_id"):
		return
	LevelClock.restore(float(state.get("elapsed", 0.0)), level_seconds_default)
	play_level(String(state["level_id"]), LevelClock.stage())

# ---------------------------------------------------------------- prioridad de diálogos
## Llamar al abrir/cerrar diálogos, preguntas o minijuegos. Baja la Naturaleza sin cortarla.
func duck_nature(on: bool) -> void:
	_duck_count = maxi(0, _duck_count + (1 if on else -1))
	var target := DUCK_DB if _duck_count > 0 else 0.0
	_tween_bus_offset("Nature", target, 0.35)

# ---------------------------------------------------------------- efectos de sonido
## Reproduce un efecto del catálogo. Evita saturación: cooldown por id y máximo de voces con prioridad.
func play_sfx(id: String) -> void:
	var def: Dictionary = catalog.get("sfx", {}).get(id, {})
	if def.is_empty():
		return
	var now := Time.get_ticks_msec()
	if now - int(_last_sfx_ms.get(id, -100000)) < int(def.get("cooldown_ms", 0)):
		return
	var stream := _load_stream(String(def.get("path", "")))
	if stream == null:
		return
	var prio := int(def.get("priority", 1))
	var voice := _free_voice(prio)
	if voice == null:
		return
	_last_sfx_ms[id] = now
	voice.bus = String(def.get("bus", "Gameplay"))
	voice.stream = stream
	voice.pitch_scale = _rng.randf_range(0.97, 1.03)
	_sfx_meta[voice] = {"priority": prio, "id": id}
	voice.play()

# ---------------------------------------------------------------- volúmenes y ajustes
func set_bus_volume(bus_name: String, linear: float) -> void:
	var idx := AudioServer.get_bus_index(bus_name)
	if idx >= 0:
		AudioServer.set_bus_volume_db(idx, linear_to_db(clampf(linear, 0.0, 1.0)))
		AudioServer.set_bus_mute(idx, linear <= 0.001)

func get_bus_volume(bus_name: String) -> float:
	var idx := AudioServer.get_bus_index(bus_name)
	return db_to_linear(AudioServer.get_bus_volume_db(idx)) if idx >= 0 else 1.0

func save_settings() -> void:
	var cf := ConfigFile.new()
	for b in BUSES:
		cf.set_value("volumes", b, get_bus_volume(b))
	cf.save(SETTINGS_PATH)

func load_settings() -> void:
	var cf := ConfigFile.new()
	if cf.load(SETTINGS_PATH) != OK:
		return
	for b in BUSES:
		set_bus_volume(b, float(cf.get_value("volumes", b, 1.0)))

# ================================================================ internos
func _load_catalog() -> void:
	var f := FileAccess.open(CATALOG_PATH, FileAccess.READ)
	if f == null:
		push_error("AudioManager: no se pudo abrir %s" % CATALOG_PATH)
		return
	var data = JSON.parse_string(f.get_as_text())
	if typeof(data) == TYPE_DICTIONARY:
		catalog = data
		level_seconds_default = float(catalog.get("level_seconds", 240.0))

func _build_players() -> void:
	for i in 2:
		_music.append(_make_player("Music"))
		_variation.append(_make_player("Music"))
	_bed = _make_player("Nature")
	_accent_player = _make_player("Nature")
	for i in SFX_VOICES:
		_sfx_pool.append(_make_player("Gameplay"))
	_accent_timer = Timer.new()
	_accent_timer.one_shot = true
	_accent_timer.process_mode = Node.PROCESS_MODE_PAUSABLE
	_accent_timer.timeout.connect(_play_accent)
	add_child(_accent_timer)

func _make_player(bus_name: String) -> AudioStreamPlayer:
	var p := AudioStreamPlayer.new()
	p.bus = bus_name
	p.volume_db = -80.0
	add_child(p)
	return p

func _all_level_players() -> Array:
	return _music + _variation + [_bed, _accent_player]

func _load_stream(path: String) -> AudioStream:
	if path == "":
		return null
	if not ResourceLoader.exists(path):
		if not _warned.has(path):
			_warned[path] = true
			push_warning("AudioManager: falta el archivo %s (placeholder pendiente)" % path)
		return null
	return load(path) as AudioStream

func _set_loop(stream: AudioStream, loop: bool) -> void:
	if stream is AudioStreamOggVorbis:
		(stream as AudioStreamOggVorbis).loop = loop
	elif stream is AudioStreamWAV:
		(stream as AudioStreamWAV).loop_mode = AudioStreamWAV.LOOP_FORWARD if loop else AudioStreamWAV.LOOP_DISABLED

func _crossfade_to(group: Array[AudioStreamPlayer], front_var: String, path: String, loop: bool, instant: bool) -> void:
	var stream := _load_stream(path)
	var old: AudioStreamPlayer = group[get(front_var)]
	var next_idx := 1 - int(get(front_var))
	var nxt: AudioStreamPlayer = group[next_idx]
	set(front_var, next_idx)
	_fade_out_and_stop(old, 0.0 if instant else XFADE)
	if stream == null:
		return
	_set_loop(stream, loop)
	nxt.stream = stream
	nxt.volume_db = 0.0 if instant else -80.0
	nxt.stream_paused = _paused_by_game
	nxt.play()
	if not instant:
		create_tween().tween_property(nxt, "volume_db", 0.0, XFADE)

func _start_bed(path: String, instant: bool) -> void:
	var stream := _load_stream(path)
	if stream == null:
		return
	_set_loop(stream, true)
	_bed.stream = stream
	_bed.volume_db = 0.0 if instant else -80.0
	_bed.play()
	if not instant:
		create_tween().tween_property(_bed, "volume_db", -3.0, XFADE)
	else:
		_bed.volume_db = -3.0

## Acentos naturales (pájaros, hielo, olas...) a intervalos y tono/volumen variables: sin repetición mecánica.
func _schedule_accent() -> void:
	_accent_timer.start(_rng.randf_range(6.0, 16.0))

func _play_accent() -> void:
	if level_id == "":
		return
	var list: Array = catalog["levels"][level_id].get("nature_accents", [])
	if not list.is_empty():
		var s := _load_stream(String(list[_rng.randi() % list.size()]))
		if s != null:
			_accent_player.stream = s
			_accent_player.pitch_scale = _rng.randf_range(0.94, 1.06)
			_accent_player.volume_db = _rng.randf_range(-9.0, -3.0)
			_accent_player.play()
	_schedule_accent()

## Capa 3: variación por etapa (cada 20 % del progreso). Solo cambia cuando LevelClock avanza (no en pausa).
func _on_stage_changed(stage: int, _progress: float) -> void:
	if level_id == "":
		return
	_apply_variation(stage, false)

func _apply_variation(stage: int, instant: bool) -> void:
	var list: Array = catalog["levels"][level_id].get("variations", [])
	var path := String(list[stage]) if stage < list.size() else ""
	_crossfade_to(_variation, "_var_front", path, true, instant)

func _free_voice(prio: int) -> AudioStreamPlayer:
	for p in _sfx_pool:
		if not p.playing:
			return p
	# sin voces libres: reemplaza la de menor prioridad solo si la nueva es mayor
	var worst: AudioStreamPlayer = null
	var worst_prio := 999
	for p in _sfx_pool:
		var pr := int(_sfx_meta.get(p, {}).get("priority", 0))
		if pr < worst_prio:
			worst_prio = pr
			worst = p
	return worst if prio > worst_prio else null

func _fade_out_and_stop(p: AudioStreamPlayer, fade: float) -> void:
	if p == null or not p.playing:
		return
	if fade <= 0.0:
		p.stop()
		p.volume_db = -80.0
		return
	var tw := create_tween()
	tw.tween_property(p, "volume_db", -80.0, fade)
	tw.tween_callback(p.stop)

var _bus_offset_tweens: Dictionary = {}
var _bus_base_db: Dictionary = {}
func _tween_bus_offset(bus_name: String, offset_db: float, time: float) -> void:
	var idx := AudioServer.get_bus_index(bus_name)
	if idx < 0:
		return
	if not _bus_base_db.has(bus_name):
		_bus_base_db[bus_name] = AudioServer.get_bus_volume_db(idx)
	var target: float = _bus_base_db[bus_name] + offset_db
	if _bus_offset_tweens.has(bus_name):
		(_bus_offset_tweens[bus_name] as Tween).kill()
	var tw := create_tween()
	_bus_offset_tweens[bus_name] = tw
	tw.tween_method(func(v): AudioServer.set_bus_volume_db(idx, v), AudioServer.get_bus_volume_db(idx), target, time)

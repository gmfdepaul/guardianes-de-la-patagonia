extends Node
## LevelClock (autoload). Reloj de TIEMPO ACTIVO del nivel.
## - No usa el reloj real del dispositivo: solo suma delta mientras la partida corre.
## - Se detiene solo cuando el juego está en pausa (get_tree().paused) o cuando se llama pause().
## - Sirve para: cronómetro (progresivo o regresivo), iluminación y música dinámica.

signal tick(progress: float, elapsed: float)
signal stage_changed(stage: int, progress: float)   # stage 0..4 (cada 20 %)
signal level_finished()

const STAGES := 5

var duration: float = 240.0        # se carga desde audio_catalog.json (level_seconds)
var elapsed: float = 0.0
var running: bool = false
var _stage: int = -1

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_PAUSABLE   # el árbol en pausa => no corre

func start(level_duration: float = -1.0) -> void:
	if level_duration > 0.0:
		duration = level_duration
	elapsed = 0.0
	_stage = -1
	running = true
	_emit_stage(true)

func pause() -> void:   running = false
func resume() -> void:  running = true
func stop() -> void:    running = false

## Restaura una partida guardada: continúa desde el tiempo activo previo.
func restore(saved_elapsed: float, level_duration: float = -1.0) -> void:
	if level_duration > 0.0:
		duration = level_duration
	elapsed = clampf(saved_elapsed, 0.0, duration)
	_stage = -1
	_emit_stage(true)

func progress() -> float:
	return clampf(elapsed / duration, 0.0, 1.0)

func remaining() -> float:   # para un cronómetro regresivo
	return maxf(0.0, duration - elapsed)

func stage() -> int:
	return mini(int(progress() * STAGES), STAGES - 1)

func _process(delta: float) -> void:
	if not running:
		return
	elapsed = minf(elapsed + delta, duration)
	tick.emit(progress(), elapsed)
	_emit_stage(false)
	if elapsed >= duration:
		running = false
		level_finished.emit()

func _emit_stage(force: bool) -> void:
	var s := stage()
	if force or s != _stage:
		_stage = s
		stage_changed.emit(s, progress())

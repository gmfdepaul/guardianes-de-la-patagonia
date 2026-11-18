extends CanvasModulate
## LightingController. Ajusta el color de iluminación según el progreso del nivel (LevelClock).
## Etapas: 0-20 % natural clara · 20-40 % más cálida · 40-60 % tarde · 60-80 % dorada de atardecer · 80-100 % cálida ambiental.
## Depende del tiempo activo (LevelClock), así que se detiene con la pausa y se restaura con la partida guardada.

var _gradient := Gradient.new()
var _tween: Tween

func _ready() -> void:
	# Centros de cada etapa de 20 %: 10, 30, 50, 70 y 90 %
	_gradient.offsets = PackedFloat32Array([0.1, 0.3, 0.5, 0.7, 0.9])
	_gradient.colors = PackedColorArray([
		Color(1.00, 1.00, 1.00),   # natural clara
		Color(1.00, 0.95, 0.86),   # más cálida
		Color(1.00, 0.88, 0.72),   # tarde
		Color(1.00, 0.76, 0.52),   # dorada de atardecer
		Color(1.00, 0.82, 0.66)    # cálida ambiental
	])
	LevelClock.tick.connect(_on_tick)
	color = _gradient.sample(LevelClock.progress())

func _on_tick(progress: float, _elapsed: float) -> void:
	color = _gradient.sample(progress)   # el progreso ya es continuo: no necesita tween

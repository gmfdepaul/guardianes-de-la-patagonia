# Sistema de audio — Guardianes de la Patagonia (arquitectura Godot 4)

Estado: **solo arquitectura y lógica**. No incluye música definitiva. Los scripts GDScript fueron escritos pero **no se ejecutaron** (no hay Godot en este entorno): hay que probarlos en el editor.

## Cómo instalarlo
1. Copiá `scripts/`, `data/`, `audio/` y `audio_bus_layout.tres` a la raíz del proyecto Godot (`res://`).
2. Project Settings → Audio → Buses → Default Bus Layout = `res://audio_bus_layout.tres`.
3. Project Settings → Autoload (en este orden): `LevelClock` = `res://scripts/audio/level_clock.gd`, luego `AudioManager` = `res://scripts/audio/audio_manager.gd`.
4. En la escena de cada nivel, agregá un nodo `CanvasModulate` con `lighting_controller.gd`.
5. Al empezar un nivel: `LevelClock.start(); AudioManager.play_level("level_01")`.

## Componentes
- **Buses:** Master, Music, Nature, Gameplay, UI (`audio_bus_layout.tres`).
- **LevelClock:** reloj de *tiempo activo* (no usa el reloj del dispositivo). Se detiene con la pausa. Entrega progreso 0–1, etapa (cada 20 %), tiempo restante (para cronómetro regresivo) y restauración desde guardado.
- **AudioManager:** música con loop y crossfade A/B, cama ambiental + acentos naturales aleatorios (tono y volumen variables), variaciones dinámicas por etapa, pausa/reanudación (`pause_game()` / `resume_game()`), abandono (`stop_level()`), guardado/restauración (`get_state()` / `restore_state()`), prioridad de diálogos (`duck_nature(true/false)`), efectos con cooldown y prioridad de voces, volúmenes por bus guardados en `user://audio_settings.cfg`.
- **LightingController:** color de iluminación por progreso (natural → cálida → tarde → dorada → cálida ambiental).
- **data/audio_catalog.json:** todas las rutas de audio. Reemplazar un archivo = cambiar la ruta o pisar el archivo; no se toca código.

## Archivos
- Creados: todo lo de esta carpeta.
- Placeholders: 5 archivos `audio/music/level_0X_*.ogg` de 30 s en silencio (44,1 kHz, estéreo). El resto de las rutas del catálogo apunta a archivos que aún no existen: el manager avisa una vez con `push_warning` y sigue sin error.
- Modificados en el preview HTML: iluminación por tiempo activo (`LEVEL_SECONDS`), botón Donar.

## Pendiente
- Composiciones originales (WAV maestro en `audio_masters/` + OGG) y sonidos de naturaleza, variaciones, gameplay, UI y recompensas.
- Opciones de audio del usuario (música / efectos / silenciar) en pantallas de inicio y pausa, conectadas a `set_bus_volume`.
- Conectar `pause_game`/`resume_game`, `duck_nature` y `stop_level` a los menús reales de Godot (todavía no existen).
- Probar en iPhone/Android (el audio web exige un primer toque del usuario).

## Contradicciones a resolver antes de cerrar el diseño
1. **Duración del nivel:** esta actualización dice 5 minutos (cronómetro regresivo); el pedido anterior dijo "menos de 4 minutos". Está parametrizado (`level_seconds` en el catálogo; `LEVEL_SECONDS` en el preview), hoy en 240 s.
2. **Buses:** el documento maestro original definía Master/Music/Ambient/SFX/Dialogue; esta actualización define Master/Music/Nature/Gameplay/UI. Se implementó la nueva. Los diálogos quedan en UI.

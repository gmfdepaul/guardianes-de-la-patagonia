# Guía para llevar el juego a Godot 4

El repositorio ya contiene un proyecto Godot (`project.godot`, versión 4.7, renderer GL Compatibility, 1280×720, stretch `canvas_items`). Esta guía propone cómo mapear el prototipo HTML.

## Qué se puede reutilizar tal cual
- **Diseño y contenido:** textos de diálogos, preguntas por modo, nombres, precios, puntajes: están en `js/game.js` (`W1_NPCS`…`W5_NPCS`, `EASYQ`, `HARDQ`, `EXTRAQ`, `GATE_ITEMS`, `ECON`, `MODES`, `CATALOG`, `SUBINFO`). Conviene exportarlos a **JSON/Resources** (`data/*.json`) y cargarlos desde GDScript.
- **Imágenes:** usar `assets-fuente-png/` (PNG transparente). Los fondos A/B/C/G se importan como capas `ParallaxBackground`/`Parallax2D` con la escala de movimiento indicada en `ASSETS.md`.
- **Audio:** la arquitectura de `godot-audio-base/` (AudioManager, LevelClock, catálogo JSON, buses).

## Qué hay que rehacer
- **Animación de personajes:** producir spritesheets por animación (Idle, React, Talk, Challenge, Reward, Return to Idle; y para Pascacio: idle, caminar, correr, agacharse, saltar, caer, hablar, celebrar, descubrir). Hoy se simulan por código.
- **Peligros y obstáculos:** reimplementar como escenas (`Area2D` + `AnimatedSprite2D`) con las máquinas de estado de `fox`, `bird` (carancho/skúa) y `piche`; parámetros de modo (`spd`, `tel`, `hs`, `inv`) como propiedades.
- **Minijuegos, subniveles y mapa:** el mapa SVG pasa a ser una escena con `Polygon2D`/`TextureRect` y pines (`TextureButton`); los minijuegos, a escenas `Control`.
- **Audio:** reemplazar el sintetizador por archivos (música por mundo, ambientes, efectos) respetando `data/audio_catalog.json`.
- **Guardado:** `localStorage` → `user://savegame.cfg` o JSON (y luego Supabase).

## Orden sugerido
1. Escena del primer mundo con cámara, parallax, Pascacio (idle/correr/saltar) y controles táctiles (`TouchScreenButton`).
2. NPC con diálogo y preguntas desde JSON.
3. Fotografía (5 por mundo), recolección y vidas.
4. Resto de mundos reutilizando la misma escena base.
5. Exportación Web (Godot 4 → HTML5, requiere cabeceras para multihilo o exportar sin hilos) y prueba en iPhone/Android.

## Riesgo a considerar
La exportación Web de Godot pesa varios MB más que este prototipo (~2 MB) y en iPhone puede ser más lenta. Antes de migrar, definir si Godot aporta algo que el prototipo HTML no pueda dar (animación más rica, herramientas de nivel, exportación a tiendas).

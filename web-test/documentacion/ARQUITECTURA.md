# Arquitectura del prototipo HTML

## Archivos
- `index.html`: contiene el DOM de todas las pantallas y modales (título, mapa, modos, pausa, resultados, tienda, final, audio, etc.) y carga `css/style.css` y `js/game.js`.
- `css/style.css`: estilos de HUD, controles táctiles, modales, mapa y pantallas. Variables CSS en `:root`.
- `js/game.js` (~2.900 líneas, un solo script clásico, sin módulos ni dependencias). Secciones (buscar por los comentarios `/* ---------- … ---------- */`):
  imágenes → HUD → **AUDIO (`AM`)** → estado → nivel → iluminación → peligros y basura → niveles (`LEVELS`, `W1_NPCS`…`W5_NPCS`, `GATE_ITEMS`, `ECON`) → cóndor/guardaparque/subniveles → arte de subniveles → escena de misión → ajustes → recompensas/tienda (`CATALOG`) → entrada teclado/táctil → foto e interacción → **modos** (`MODES`) y preguntas (`EASYQ`, `HARDQ`, `EXTRAQ`) → mapa de mundos → minijuegos (`MG`) → fin de nivel/final → vidas → física → dibujo → bucle → retrato del HUD.
- `assets/img/*.webp`: imágenes cargadas por el objeto `IMG` al inicio (`window.__ready` se activa cuando todas están listas).

## Conceptos clave
- **Canvas 2D** de resolución lógica fija (alto 720, suelo en y=655), escalado a la pantalla. Cámara horizontal que sigue a Pascacio.
- **Parallax:** cada mundo tiene capas A (cielo/fondo), B (medio), C1/C2 (cercano) y G (suelo) con velocidades distintas.
- **Niveles:** objeto en `LEVELS[i]` con `solids`, `ledges`, `coins`, `trash`, `hzBase`/`hzExtra` (peligros base y extra), `cps` (checkpoints), `npcs`, `gate` (obstáculo de misión), `gaps`/`rafts` (cruces), `bg` (capas). `loadLevel(i)` lo instancia.
- **Dificultad:** `MODES[modo]` define preguntas, puntos, invulnerabilidad, velocidad/telegrafía/hitbox de peligros; `applyMode` filtra `HZ_BASE` con `keep(i,h)`.
- **Peligros:** `hazards[]` con máquinas de estados (`fox`: patrol/alert/dash, `bird`: hover/mark/dive/rise, `piche`: walk/curl/roll); `hrect(h)` devuelve la caja de daño.
- **Audio `AM`:** Web Audio. Buses Master/Music/Nature/Gameplay/UI, música generativa por mundo (escalas y raíz por `C`), ambiente con ruido filtrado + acentos aleatorios, efectos con prioridad/cooldown. Persistencia en `gp_audio`.
- **Persistencia:** `localStorage` (`gp_save`: progreso, mejores puntajes por mundo y `ver`; `gp_cfg`; `gp_audio`). Todo con `try/catch`.
- **Mapa de mundos:** SVG generado por código (`#mapSvg`, recuadro `#mapInset`), con polígonos simplificados de Argentina, Tierra del Fuego, Chile y Malvinas (`ARG`, `TDF`, `MAL_E`, `MAL_W`), y tarjetas/pines HTML posicionados con `WCARDS`/`WPINS`.
- **Depuración:** `window.__gp`, hash `#dev`.

## Generar el HTML único
`python3 tools/build_standalone.py` embebe CSS, JS e imágenes en `dist/Guardianes_standalone_v<VERSION>.html`.

## Origen
La carpeta `tools/origen-conversacion/` conserva la plantilla original de un solo archivo (`template_v1.18.html`, con marcadores `__IMG_*__`) y los scripts con los que se generaba durante el desarrollo. Son solo para trazabilidad: **la fuente de verdad ahora es `index.html` + `css/` + `js/` + `assets/`.** (`build_original.py` depende de rutas de la sesión original y de Pillow; no hace falta para trabajar.)

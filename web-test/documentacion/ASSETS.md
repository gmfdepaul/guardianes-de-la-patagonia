# Inventario de assets del prototipo

Todas las imágenes del juego están en `prototipo-html/assets/img/` (WebP, calidad 88–90). Los **PNG originales** (con transparencia, sin recomprimir) están en `prototipo-html/assets-fuente-png/` y son el punto de partida recomendado para Godot.

Importante:
- Los personajes son **una sola pose** cada uno (más Pascacio en reposo y corriendo). Las animaciones (idle, reacción, hablar, desafío, recompensa, caminar, saltar, etc.) se generan por código con deformaciones de la imagen (balanceo, escala, rotación). **No existen spritesheets de animación terminados.** Para Godot hay que producirlos (ver `MIGRACION_GODOT.md`).
- Elementos dibujados por código (sin archivo de imagen): cóndor Künu, guardaparque Ramiro, zorros, aves (carancho/skúa), piche, arbustos, malezas, estrellas, basura, brújula, íconos de la tienda, arte de los subniveles y el mapa de la Patagonia (SVG generado).
- La zorrita compañera y el diseño mejorado de Künu siguen pendientes de ilustración aprobada.
- Las ilustraciones de referencia aprobadas (láminas, roster, storyboards) están en `referencias-arte/` y **no son spritesheets técnicos**.

| Archivo | Tamaño | Modo | Peso | Uso |
|---|---|---|---|---|
| `aman.webp` | 303×357 | RGBA | 29 KB | Sprite · Amán (M5, personaje de la costa) |
| `arrayanin.webp` | 282×363 | RGBA | 29 KB | Sprite · Arrayanín (M2, flora) |
| `ballenita.webp` | 342×342 | RGBA | 30 KB | Sprite · Ballenita (M5, fauna) |
| `bg1A.webp` | 1202×330 | RGB | 96 KB | Fondo mundo 1 · fondo lejano (cielo/montañas) |
| `bg1B.webp` | 550×415 | RGBA | 70 KB | Fondo mundo 1 · capa media (alpha) |
| `bg1C.webp` | 380×120 | RGBA | 25 KB | Fondo mundo 1 · capa cercana (alpha) |
| `bg1G.webp` | 600×141 | RGB | 37 KB | Fondo mundo 1 · suelo/camino |
| `bg2A.webp` | 450×300 | RGB | 29 KB | Fondo mundo 2 · fondo lejano (cielo/montañas) |
| `bg2B.webp` | 690×107 | RGBA | 31 KB | Fondo mundo 2 · capa media (alpha) |
| `bg2C1.webp` | 900×200 | RGBA | 16 KB | Fondo mundo 2 · capa cercana 1 (alpha) |
| `bg2C2.webp` | 900×330 | RGBA | 17 KB | Fondo mundo 2 · capa cercana 2 (alpha) |
| `bg2G.webp` | 445×100 | RGB | 15 KB | Fondo mundo 2 · suelo/camino |
| `bg3A.webp` | 820×330 | RGB | 63 KB | Fondo mundo 3 · fondo lejano (cielo/montañas) |
| `bg3B.webp` | 500×160 | RGBA | 35 KB | Fondo mundo 3 · capa media (alpha) |
| `bg3C1.webp` | 900×200 | RGBA | 16 KB | Fondo mundo 3 · capa cercana 1 (alpha) |
| `bg3C2.webp` | 900×330 | RGBA | 23 KB | Fondo mundo 3 · capa cercana 2 (alpha) |
| `bg4A.webp` | 522×360 | RGB | 37 KB | Fondo mundo 4 · fondo lejano (cielo/montañas) |
| `bg4B.webp` | 410×105 | RGBA | 18 KB | Fondo mundo 4 · capa media (alpha) |
| `bg4C1.webp` | 900×200 | RGBA | 16 KB | Fondo mundo 4 · capa cercana 1 (alpha) |
| `bg4C2.webp` | 900×330 | RGBA | 23 KB | Fondo mundo 4 · capa cercana 2 (alpha) |
| `bg5A.webp` | 1192×290 | RGB | 57 KB | Fondo mundo 5 · fondo lejano (cielo/montañas) |
| `bg5B.webp` | 680×215 | RGBA | 49 KB | Fondo mundo 5 · capa media (alpha) |
| `bg5C1.webp` | 900×200 | RGBA | 16 KB | Fondo mundo 5 · capa cercana 1 (alpha) |
| `bg5C2.webp` | 900×330 | RGBA | 22 KB | Fondo mundo 5 · capa cercana 2 (alpha) |
| `boyita.webp` | 249×339 | RGBA | 19 KB | Sprite · Boyita (M5, objeto) |
| `calafatin.webp` | 252×351 | RGBA | 28 KB | Sprite · Calafatín (M3, flora) |
| `chocolatin.webp` | 294×345 | RGBA | 28 KB | Sprite · Chocolatín (M2, objeto) |
| `don_poncho.webp` | 289×411 | RGBA | 31 KB | Sprite · Don Poncho (M1, memoria) |
| `farolito.webp` | 249×357 | RGBA | 19 KB | Sprite · Farolito (M4, objeto marítimo) |
| `fitz.webp` | 297×345 | RGBA | 20 KB | Sprite · Fitz (M3, montaña) |
| `glaciarito.webp` | 258×345 | RGBA | 21 KB | Sprite · Glaciarito (M1, elemento mágico) |
| `huemul.webp` | 306×363 | RGBA | 32 KB | Sprite · Huemul (M3, fauna) |
| `jarillita.webp` | 288×348 | RGBA | 33 KB | Sprite · Jarillita (M5, flora) |
| `kallfu.webp` | 270×375 | RGBA | 30 KB | Sprite · Kallfü (M1, memoria tehuelche) |
| `kallfun.webp` | 249×354 | RGBA | 24 KB | Sprite · Kallfün (M3, memoria aonikenk) |
| `lafken.webp` | 270×372 | RGBA | 30 KB | Sprite · Lafken (M2, memoria mapuche) |
| `lenguita.webp` | 312×345 | RGBA | 30 KB | Sprite · Lenguita (M4, flora) |
| `notrito.webp` | 264×354 | RGBA | 29 KB | Sprite · Notrito (M1, flora) |
| `pascacio_idle.webp` | 207×404 | RGBA | 25 KB | Sprite · Pascacio (protagonista) en reposo |
| `pascacio_run.webp` | 273×404 | RGBA | 26 KB | Sprite · Pascacio corriendo |
| `pinguino.webp` | 315×333 | RGBA | 25 KB | Sprite · Pingüino (M4, fauna) |
| `pudu.webp` | 282×354 | RGBA | 27 KB | Sprite · Pudú (M2, fauna) |
| `yagan.webp` | 294×354 | RGBA | 28 KB | Sprite · Yagán (M4, memoria yagán) |

## Capas de parallax (por mundo)
Velocidad relativa al avance de la cámara: **A** 0,015 (fondo lejano) · **B** 0,12 · **C** 0,45 (cercano; en mundos 2–5 hay dos capas C1/C2) · **G** 1,0 (suelo y camino). Las imágenes se repiten en mosaico horizontal.

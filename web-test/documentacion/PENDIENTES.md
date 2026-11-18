# Pendientes, riesgos y decisiones abiertas (al 18/11/2026)

## Decisiones de diseño abiertas
- **Motor definitivo:** seguir en HTML5 o migrar a Godot 4 (ver `MIGRACION_GODOT.md`). Recomendación actual: cerrar diseño y balance en HTML y migrar después.
- **Nombre de la zorrita compañera:** «Ayén» fue sugerido, **no confirmado**.
- **Künu (cóndor):** hoy se dibuja por código; falta el diseño ilustrado mejorado aprobado.
- **Duración del nivel:** hay un criterio de «menos de 4 minutos» y otro de 5 minutos; en el prototipo está parametrizada (`LEVEL_SECONDS`, hoy 240 s).
- **Buses de audio:** el GDD define Master/Music/Ambient/SFX/Dialogue; el prototipo y `godot-audio-base/` usan Master/Music/Nature/Gameplay/UI. Hay que unificar.
- **Nombre del protagonista:** el confirmado es **Pascacio**; revisar que ninguna lámina o documento antiguo conserve otro nombre.

## Contenido cultural (prioridad alta antes de publicar)
- Los diálogos de Kallfü (tehuelche), Lafken (mapuche), Kallfün (aonikenk), Yagán y Amán son breves y evitan leyendas o palabras inventadas, pero **no fueron revisados con referentes de las comunidades**. Nombres de personajes y datos deben verificarse.
- El personaje cultural del mundo 5 (costa patagónica) tiene identidad pendiente de investigación.
- Preguntas del nivel «Explorador» (`HARDQ`) con datos **sin verificar contra fuentes**; revisar antes de publicar.

## Arte
- Los personajes son una sola pose; no hay spritesheets de animación terminados. Pascacio tiene solo reposo y carrera.
- Varios elementos son procedurales (cóndor, guardaparque, zorro, aves, piche, arbustos, subniveles) y provisionales frente al estilo ilustrado de los personajes.
- Mapa de mundos: formas geográficas simplificadas y estilizadas.

## Balance y pruebas
- La dificultad (Turista 4–5 años / Viajero / Explorador) **no fue probada con niños ni en dispositivos reales**. Hacer pruebas en iPhone y Android y ajustar `MODES`, `ECON` y precios de puertas.
- Revisar rendimiento en teléfonos de gama baja (canvas 2D + audio generativo).

## Técnico
- **Audio provisorio** (sintetizado). Faltan composiciones originales, efectos y ambientes definitivos.
- **Ranking:** solo local por dispositivo. Pendiente Supabase (login por email, progreso en la nube y ranking global).
- **Pantalla completa en iPhone:** Safari no la permite desde la página; hay que instalarlo en la pantalla de inicio.
- **Fuente tipográfica:** Lilita One se carga desde Google Fonts; para uso sin conexión, descargarla y alojarla en `assets/fonts/`.
- Enlace de donación en `DONATE_URL` (`js/game.js`) apunta a PayPal; confirmar que sea el definitivo.
- `game.js` es un archivo único de ~2.900 líneas: conviene dividirlo en módulos (audio, niveles, UI, minijuegos) cuando se siga desarrollando.
- Si el repositorio pasa a ser público, el código y los assets quedarán visibles; definir licencia.

## Pendientes originales del plan (GDD)
Auditoría integral, plan de publicación, backend/usuarios, ranking online, composición musical, animaciones finales por spritesheet, misiones y minijuegos adicionales, idiomas y voces.

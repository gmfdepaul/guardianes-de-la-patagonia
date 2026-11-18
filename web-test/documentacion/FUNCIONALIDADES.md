# Funcionalidades implementadas — Prototipo v1.18

Todo lo listado fue verificado en el prototipo público y en esta copia exportada (pruebas automáticas de flujo de los 5 mundos, desbloqueo, final, preguntas, modos y pérdida de vidas). **No se probó todavía con jugadores reales ni en un iPhone/Android físico**: el balance de dificultad es provisorio.

## Mundos (5, jugables)
| # | Mundo | Parque / lugar | Personajes (orden de aparición) | Obstáculo de misión |
|---|---|---|---|---|
| 1 | El Calafate | P. N. Los Glaciares | Don Poncho (memoria), Notrito (riego), Glaciarito (timing), Kallfü (Sí/No, memoria tehuelche) | Campo de hielo → botas con grampones |
| 2 | Bariloche | P. N. Nahuel Huapi | Pudú, Arrayanín, Chocolatín, Lafken (mapuche) | Barranco → boleto de aerosilla |
| 3 | El Chaltén | P. N. Los Glaciares (norte) | Huemul, Calafatín, Fitz, Kallfün (aonikenk) | Río → bastones de trekking |
| 4 | Ushuaia | P. N. Tierra del Fuego | Pingüino, Lenguita, Farolito, Yagán | Canal Beagle → barco |
| 5 | Puerto Madryn | Península Valdés | Ballenita, Jarillita, Boyita, Amán | Costa de Valdés → binoculares |

Cada mundo: recorrido lateral con scroll, 3 puntos de control, cartel de madera con advertencia, monedas/estrellas, 6 piezas de basura, plataformas y rocas, parallax en capas (cielo, fondo, medio, cercano, suelo), iluminación que cambia con el tiempo activo de juego y música/ambiente propios.

## Personajes y diálogos
- Pascacio (protagonista), con sprites de reposo y carrera; cada NPC permanece en su lugar, te reconoce, conversa con globo de texto y propone una pregunta (3 por personaje) y un minijuego.
- Minijuegos: **memoria** (huellas), **riego** (gotas, sin tocar basura), **timing** (frenar la barra en la zona azul), **Sí/No** (¿lo hace un Guardián?) y **rompecabezas** del Guardián (cierre de mundo).
- Los personajes culturales (Kallfü, Lafken, Kallfün, Yagán, Amán) tienen contenido breve y sin leyendas ni palabras inventadas. **Falta revisión con referentes de las comunidades** (ver PENDIENTES).

## Mecánicas
- Movimiento: caminar, correr, saltar, agacharse; salto con control variable; caída y aterrizaje.
- **Fotografía:** 5 por mundo, contador 0/5, botón a la derecha, guardado en el bolso, puntos por foto; **cóndor (Künu)** pasa volando y fotografiarlo da foto destacada (+200).
- **Guardaparque Ramiro** y **subniveles** (uno por mundo, se ofrecen tras fotografiar al cóndor): Grietas del glaciar (+300), Slalom entre árboles (+400), Cruce de piedra en piedra (+500), Canal Beagle en la niebla (+600) y Entre ballenas y lobos marinos (+700).
- **Obstáculos que dañan:** arbustos con espinas y malezas; zorro (patrulla/alerta/embestida), carancho/skúa (picada con marcador rojo), piche (se enrolla y rueda). La basura **nunca** quita vidas (se recoge con la brújula).
- **Vidas:** 3 corazones por partida; pantalla «sin vidas» con tres opciones. Puntos de control por mundo.
- **Obstáculo de misión (puerta):** se necesita el objeto del mundo; se compra con estrellas en 🎁 Recompensas o se obtiene jugando el subnivel/cóndor.
- **Tienda/Recompensas:** botas ligeras, bastón de trekking, pluma de Künu (planeo), imán de estrellas y corazón extra; valores ajustables en Configuración.
- **Interludios** entre mundos (memoria, ordenar, verdadero/falso) con contenido educativo y ambiental.
- **Puntuación:** estrellas por monedas, basura, fotos, respuestas, minijuegos y bono de velocidad. Resultados por mundo y acumulados. **Tabla de posiciones local** (del dispositivo); el ranking online está pendiente.

## Dificultad (modos)
| Modo | Edad sugerida | Preguntas | Obstáculos |
|---|---|---|---|
| Turista | 4 años | 2 opciones con emojis, simples | Solo 5 arbustos quietos, hitbox reducida, 3,2 s de invulnerabilidad; errar no quita vidas |
| Viajero | 10 años | Medias | Arbustos, malezas, zorros y la mitad de aves/piches; más lentos y con aviso más largo; 2,6 s de invulnerabilidad |
| Explorador | 15 años | Difíciles | Todos los obstáculos; errar una pregunta cuesta un corazón; 2,2 s de invulnerabilidad |

## Progresión y pantallas
- Pantalla de giro (aviso en vertical: «Girá tu dispositivo…»), título con Pascacio, información, tutorial, modos, **mapa de la Patagonia** con los 5 mundos (con Chile, Islas Malvinas y recuadro de Argentina), desbloqueo secuencial 1→5, resultados, **pantalla final «Guardián de la Patagonia»** al completar el mundo 5, menú del jugador (foto de perfil), pausa, donación (enlace configurable en `DONATE_URL`).
- Guardado local: progreso en `localStorage` (`gp_save`), ajustes (`gp_cfg`) y audio (`gp_audio`).

## Controles
| Acción | Táctil (horizontal) | Computadora |
|---|---|---|
| Mover | Joystick flotante a la izquierda | ← → / A D (Shift: correr) |
| Agacharse | Joystick hacia abajo | ↓ / S |
| Saltar | Botón a la derecha | Espacio / ↑ / W |
| Fotografiar | Botón 📷 a la derecha | F |
| Hablar / recoger basura (brújula) | Botón de brújula | E |
| Pausa | Foto de perfil | Esc / P |
| Responder preguntas | Tocar la opción | 1 / 2 / 3 |

Soporta multitoque (Pointer Events). Pantalla completa automática al girar el celular donde el navegador lo permite, y botón ⛶.

## Audio (provisorio)
Todo sintetizado con Web Audio, sin archivos: música propia por mundo (más grave), ambiente por capas con variaciones, efectos de acciones/fotos/diálogos/respuestas, identidad sonora de personajes. Buses: Master, Música, Naturaleza (ambiente, 20 % por defecto), Juego, Interfaz. Opciones: música/ambiente, efectos, volumen general, volumen de música, volumen de ambiente, silenciar todo; se guardan. El juego es totalmente funcional sin sonido y todo aviso importante también es visual.

## Atajos de desarrollo
- Agregar `#dev` a la URL desbloquea todos los mundos.
- `window.__gp` expone el estado interno (niveles, hazards, `loadLevel`, `startGame`, etc.) para pruebas automáticas.

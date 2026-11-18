# GUARDIANES DE LA PATAGONIA
## Documento maestro de concepto y planificación — versión de trabajo 0.3

**Estado:** proyecto creativo en etapa de concepto y prototipo.  
**Protagonista confirmado:** Pascacio.  
**Formato:** videojuego 2D de plataformas y exploración, con estética ilustrada/cartoon de inspiración retro (años 2000), colores vivos y paisajes patagónicos con predominio visual.

## 1. Visión del juego

Pascacio recorre cinco escenarios inspirados en destinos y áreas naturales de la Patagonia argentina. Explora, salta obstáculos, observa flora y fauna, conversa con personajes locales, responde preguntas, completa desafíos ambientales y culturales, toma fotografías y reúne recompensas.

El objetivo es aprender sobre la naturaleza, la geografía, la biodiversidad y las culturas de la Patagonia mientras se avanza por una aventura de plataformas.

No es un juego promocional de una agencia. Es un proyecto personal con posibilidad de publicación futura.

## 2. Plataformas y presentación

- Objetivo: navegador web y celulares Android/iPhone.
- Diseño de juego horizontal, preferentemente 16:9.
- Al inicio, si el dispositivo está vertical, mostrar un aviso para girarlo.
- Los controles táctiles flotan sobre el escenario.
- El juego debe adaptarse a distintas dimensiones de pantalla.
- Registro de usuario por email previsto para una versión online posterior.
- El prototipo puede funcionar localmente sin backend.

## 3. Protagonista y compañeros recurrentes

### Pascacio
Nombre confirmado. Explorador humano, curioso y aventurero. Referencia visual trabajada: gorra, campera naranja, mochila azul, pantalón beige y botas marrones. Debe conservar el mismo diseño y proporciones en todos los mundos.

### Künu
Cóndor recurrente, guía y mentor. Su imagen debe mejorarse y mantener anatomía reconocible, alas amplias y personalidad sabia. Aparece en distintos mundos, orienta y ofrece pistas.

### Zorrita recurrente
Compañera recurrente de Pascacio. El nombre sigue pendiente de confirmación. “Ayén” apareció como propuesta, pero no está confirmado. Su función es descubrir secretos, dar pistas y aportar humor.

## 4. Los cinco mundos

### Mundo 1 — El Calafate: Reino de los Glaciares
Área de referencia: Parque Nacional Los Glaciares, entorno de El Calafate y glaciar Perito Moreno. Dificultad inicial/fácil.
- Fauna: Guanaco.
- Flora: Notrito (personaje inspirado en el notro).
- Elemento/objeto fantástico: Glaciarito, fragmento de hielo que cobra vida.
- Cultura: personaje vinculado a la memoria histórica Tehuelche de la región.
- Paisaje: glaciar, lago turquesa, montañas, bosque andino y estepa.

### Mundo 2 — Bariloche: Bosque Encantado
Área de referencia: Parque Nacional Nahuel Huapi. Dificultad fácil-media.
- Fauna: Pudú.
- Flora: Arrayanín, personaje inspirado en el arrayán.
- Objeto típico: Chocolatín, personaje de chocolate; reemplaza a Refugio.
- Cultura: personaje vinculado a comunidades Mapuche de la región.
- Paisaje: bosque andino, lago, montañas, arrayanes y elementos de la cultura chocolatera local.

### Mundo 3 — El Chaltén: Montañas del Viento
Área de referencia: Parque Nacional Los Glaciares, sector norte. Dificultad media-alta.
- Fauna: Huemul (cambio solicitado: huemul en Chaltén).
- Flora: Calafatín, arbusto de calafate personificado.
- Elemento natural: Fitz, pequeña roca/personaje inspirado en la geología y las montañas.
- Cultura: personaje vinculado a la memoria Aonikenk de la región.
- Paisaje: Fitz Roy, montañas, senderos, bosque bajo, estepa y viento.

### Mundo 4 — Ushuaia: Fin del Mundo
Área de referencia: Parque Nacional Tierra del Fuego. Dificultad difícil.
- Fauna: Pingüino (personaje del mundo fueguino; revisar ubicación ecológica exacta según escena).
- Flora: Lenguita, personaje inspirado en la lenga.
- Objeto típico: Farolito, faro/personaje inspirado en la tradición marítima fueguina; no debe presentarse como ubicado dentro del parque si la escena no lo justifica.
- Cultura: personaje vinculado al pueblo Yagán.
- Paisaje: bosque subantártico, turberas, costa, lluvia, barro y Canal Beagle.

### Mundo 5 — Puerto Madryn: Océano Salvaje
Área de referencia: Península Valdés y costa patagónica. Dificultad experto/final.
- Fauna: Ballenita, ballena franca austral personificada.
- Flora: Jarillita, arbusto de jarilla personificado.
- Objeto típico: Boyita, boya flotante personificada.
- Cultura: personaje vinculado a pueblos originarios de la costa patagónica; identidad específica y contenidos pendientes de investigación/validación.
- Paisaje: océano, acantilados, playas, mareas y estepa costera.

## 5. Estructura común de los mundos

Cada mundo debe tener:
1. Introducción y presentación del lugar.
2. Recorrido de plataformas y exploración.
3. Personajes secundarios con conversaciones y desafíos.
4. Objetos coleccionables y fotografías.
5. Un desafío principal ambiental/educativo.
6. Cierre del mundo, puntuación, insignia y desbloqueo del siguiente.

La progresión propuesta es lineal: el primer mundo es más sencillo y el quinto el más difícil.

## 6. Personajes secundarios: catálogo inicial

Cada mundo tiene cuatro arquetipos: fauna, flora, objeto/elemento y cultura. Nombres de fantasía/editables:
- El Calafate: Guanaco, Notrito, Glaciarito, personaje cultural Tehuelche.
- Bariloche: Pudú, Arrayanín, Chocolatín, personaje cultural Mapuche.
- El Chaltén: Huemul, Calafatín, Fitz, personaje cultural Aonikenk.
- Ushuaia: Pingüino, Lenguita, Farolito, personaje cultural Yagán.
- Puerto Madryn: Ballenita, Jarillita, Boyita, personaje cultural costero pendiente de definir.

Los nombres y textos de cada personaje deben ser editables desde datos/configuración, sin modificar la lógica de programación.

## 7. Comportamiento de los personajes secundarios

Los NPC permanecen en puntos definidos del escenario. No siguen al protagonista. Pueden tener desplazamientos muy breves dentro de un área delimitada, pero no acompañan a Pascacio.

Estados comunes:
- IDLE: movimiento ambiental o característico en el lugar.
- DETECT/REACT: reconoce a Pascacio, lo mira o hace un gesto.
- INTERACT/TALK: conversación, pregunta o desafío.
- CHALLENGE: presenta minijuego o prueba.
- REWARD: gesto de celebración y entrega de recompensa.
- RETURN_TO_IDLE: vuelve a su movimiento ambiental.

Al entrar en rango aparece “B · CONVERSAR” o un indicador equivalente. Al interactuar, Pascacio se detiene, se orienta hacia el personaje y se pausa el control de movimiento. Al finalizar, se reactivan los controles.

Cada personaje debe tener un movimiento característico breve y coherente con su especie/objeto: guanaco mueve orejas y cuello; pudú olfatea y salta; pingüino se balancea; ballena sube y baja; plantas se mecen; objetos tienen movimientos propios.

## 8. Animaciones requeridas

### Pascacio
- Idle (espera/respiración).
- Walk forward / backward.
- Run.
- Crouch.
- Jump forward / backward.
- Fall / Land.
- Interact.
- Talk.
- Celebrate.
- Reacción/descubrimiento.

### Personajes secundarios
Paquete base por NPC:
- Idle en el lugar.
- React al detectar a Pascacio.
- Talk/Interact.
- Challenge.
- Reward.
- Return to idle.

Las animaciones deben respetar anatomía y movimiento característico. Para voladores, nadadores, plantas y objetos, adaptar las acciones; no forzar caminatas humanas.

**Importante:** las imágenes incluidas en este paquete son conceptos, hojas de personaje y storyboards visuales. No todas son spritesheets técnicos listos para importar a Godot. Se requiere redibujar/limpiar, separar fotogramas, generar PNG transparentes, pivotes y metadatos antes de producción.

## 9. Interfaz y controles

- Joystick/cruceta virtual flotante a la izquierda.
- Botón de salto a la derecha.
- Botón de cámara/fotografía a la derecha.
- Interfaz discreta para priorizar el paisaje.
- Tipografía de diálogo grande y legible, globo con nombre del personaje y texto.
- Diálogos separados de los sprites para facilitar cambios de idioma y tamaño.
- Orientación horizontal obligatoria/recomendada con pantalla inicial que pida girar el celular.

## 10. Fotografía y bolso

- Máximo cinco fotos por escenario.
- El botón de cámara está del lado derecho.
- Cada foto válida consume una de las cinco oportunidades del mundo.
- Fotos guardadas en el bolso de Pascacio.
- Se pueden fotografiar paisajes, fauna, flora y elementos especiales.
- Las fotos otorgan puntos, insignias o fichas educativas.
- Algunos NPC pueden dar pistas sobre lugares o sujetos fotografiables.
- Mostrar contador 0/5 a 5/5.

## 11. Puntuación, vidas y progreso

Concepto inicial:
- Tres vidas por partida.
- Acciones positivas, respuestas y desafíos dan puntos.
- Errores/obstáculos pueden quitar vidas.
- Al perder las tres vidas, reiniciar el nivel o aplicar el sistema de checkpoints que se defina.
- Los mundos se desbloquean progresivamente.
- Ranking general entre usuarios previsto para la versión online.
- Bolso/cuaderno reúne fotos, fichas educativas, insignias y objetos.

Los valores exactos de puntos, penalizaciones y dificultad están pendientes de balance.

## 12. Cámara, escala y composición

- Predominio visual del paisaje.
- Pascacio y NPC alrededor del 15% de la altura visible como objetivo de composición; el usuario posteriormente pidió probar una escala aproximadamente 50% mayor respecto del primer preview, por lo que el tamaño final debe validarse en juego.
- Pascacio centrado aproximadamente al 40% del ancho desde el margen izquierdo.
- NPC colocado en el camino, aproximadamente al 70% del ancho (30% hacia la izquierda desde el margen derecho).
- Cámara lateral de plataformas.
- Parallax con múltiples capas: montañas lejanas, montañas intermedias, bosque/vegetación, agua y primer plano/camino.
- El escenario no debe ser una imagen única estática: capas independientes con velocidades distintas.

## 13. Tecnología y publicación

Propuesta tecnológica de trabajo:
- Godot 4, GDScript, juego 2D.
- Exportación web para navegador y pruebas en Android/iPhone; validar rendimiento y limitaciones de exportación web en móviles.
- Supabase para autenticación por email, progreso y ranking online en etapa posterior.
- GitHub para control de versiones.
- VS Code como editor complementario.

No se ha cerrado aún el backend ni el proceso de publicación en tiendas. El primer objetivo es un prototipo jugable local.

## 14. Principios culturales y ambientales

Los personajes de pueblos originarios deben ser respetuosos y no estereotipados. Las denominaciones Tehuelche y Aonikenk tienen relaciones históricas y no deben tratarse como categorías necesariamente separadas sin contexto. Los nombres de fantasía no deben presentarse como nombres tradicionales ni traducciones verificadas.

Antes de publicar contenido cultural, investigar y, si es posible, consultar a referentes/comunidades. No inventar relatos o conocimientos tradicionales y presentarlos como hechos.

Las misiones ambientales deben enseñar sin promover interacción dañina con fauna o flora: observar a distancia, no alimentar animales, no salir de senderos, no recolectar plantas ni dejar residuos.

## 15. Pendientes y decisiones abiertas

- Confirmar nombre definitivo de la zorrita (Ayén fue sugerido, no aprobado).
- Definir nombres propios de los personajes culturales, con investigación/consulta.
- Definir el cuarto personaje cultural de Puerto Madryn con precisión histórica.
- Revisar la pertinencia geográfica/ecológica de cada fauna en el área concreta del escenario.
- Diseñar y validar la versión final de Künu (cóndor).
- Definir tipografía, paleta final y guía de estilo.
- Crear spritesheets técnicos individuales con fondo transparente y animaciones.
- Diseñar diálogos, preguntas y minijuegos de cada personaje.
- Definir sistema exacto de puntos, vidas, checkpoints y desbloqueos.
- Validar tamaño de personajes y composición en dispositivos reales.
- Implementar controles multitáctiles y bloqueo/aviso de orientación según soporte del navegador.

## 16. Nota sobre el material incluido

Este paquete consolida las ideas y referencias visuales disponibles en la sesión. Los archivos gráficos son material conceptual de desarrollo, no assets finales certificados. Los dos archivos de test HTML solicitados expresamente quedan excluidos de este paquete.

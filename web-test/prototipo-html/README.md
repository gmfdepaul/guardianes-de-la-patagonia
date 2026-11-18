# Prototipo HTML5 — Guardianes de la Patagonia v1.18

Juego sin dependencias: `index.html` + `css/style.css` + `js/game.js` + `assets/img/*.webp`.

## Ejecutar
```bash
python3 -m http.server 8000   # desde esta carpeta
# abrir http://localhost:8000
```
Para jugar en el celular, abrí `http://IP-DE-TU-PC:8000` desde el mismo Wi-Fi, en **horizontal**. Agregar `#dev` a la URL desbloquea todos los mundos.

`index.html` también abre con doble clic en Chrome, pero otros navegadores pueden bloquear recursos locales: usá el servidor, o `dist/Guardianes_standalone_v1.18.html`, que lleva todo embebido.

## Generar el archivo único
```bash
python3 tools/build_standalone.py   # crea dist/Guardianes_standalone_v<VERSION>.html
```

## Publicar en GitHub Pages
Copiá `dist/Guardianes_standalone_v1.18.html` como `docs/index.html` del repositorio (conservando `docs/manifest.webmanifest`, `docs/icon-*.png`, `docs/icon.svg` y `docs/.nojekyll`). O publicá directamente esta carpeta completa.

## Documentación
Ver `../documentacion/` (funcionalidades, arquitectura, assets, pendientes, migración a Godot).

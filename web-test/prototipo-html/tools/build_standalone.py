#!/usr/bin/env python3
"""Genera un único archivo HTML autocontenido (CSS, JS e imágenes embebidos).

Uso (desde la carpeta prototipo-html):   python3 tools/build_standalone.py
Resultado:                               dist/Guardianes_standalone_v<VERSION>.html

Solo usa la biblioteca estándar de Python. El archivo resultante se puede abrir con doble clic
o subir tal cual a GitHub Pages (copiándolo como index.html).
"""
import base64, pathlib, re, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
version = (ROOT.parent / "VERSION").read_text(encoding="utf-8").strip()
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "css" / "style.css").read_text(encoding="utf-8")
js = (ROOT / "js" / "game.js").read_text(encoding="utf-8")

def data_uri(rel):
    mime = {"webp": "image/webp", "png": "image/png", "svg": "image/svg+xml"}[rel.rsplit(".", 1)[1]]
    return "data:%s;base64,%s" % (mime, base64.b64encode((ROOT / rel).read_bytes()).decode())

n = 0
def sub(m):
    global n; n += 1
    return data_uri(m.group(0))
js = re.sub(r"assets/img/[A-Za-z0-9_]+\.webp", sub, js)
html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + css + "\n</style>")
html = html.replace('<script src="js/game.js"></script>', "<script>\n" + js + "\n</script>")
# en el archivo único no hay manifiesto ni íconos externos
html = re.sub(r'<link rel="manifest"[^>]*>|<link rel="icon"[^>]*>|<link rel="apple-touch-icon"[^>]*>', "", html)
out = ROOT / "dist" / ("Guardianes_standalone_v%s.html" % version)
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print("imágenes embebidas:", n, "->", out, "(%d KB)" % (out.stat().st_size // 1024))

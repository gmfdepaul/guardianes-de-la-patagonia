import sys, base64, io, re
from PIL import Image
SP=sys.argv[1]; B=SP+'/build/'
def uri(name, kind):
    im=Image.open(B+name)
    buf=io.BytesIO()
    if kind=='webp_a': im.convert('RGBA').save(buf,'WEBP',quality=90,method=6)
    else: im.convert('RGB').save(buf,'WEBP',quality=88,method=6)
    return 'data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode()
rep={'__IMG_HUEMUL__':uri('huemul.png','webp_a'),'__IMG_CALAFATIN__':uri('calafatin.png','webp_a'),'__IMG_FITZ__':uri('fitz.png','webp_a'),'__IMG_KALLFUN__':uri('kallfun.png','webp_a'),'__IMG_A3__':uri('bg3A.png','webp'),'__IMG_B3__':uri('bg3B.png','webp_a'),'__IMG_C31__':uri('bg3C1.png','webp_a'),'__IMG_C32__':uri('bg3C2.png','webp_a'),'__IMG_PUDU__':uri('pudu.png','webp_a'),'__IMG_ARRAYANIN__':uri('arrayanin.png','webp_a'),'__IMG_CHOCOLATIN__':uri('chocolatin.png','webp_a'),'__IMG_LAFKEN__':uri('lafken.png','webp_a'),'__IMG_A2__':uri('bg2A.png','webp'),'__IMG_B2__':uri('bg2B.png','webp_a'),'__IMG_C21__':uri('bg2C1.png','webp_a'),'__IMG_C22__':uri('bg2C2.png','webp_a'),'__IMG_G2__':uri('bg2G.png','webp'),'__IMG_IDLE__':uri('pascacio_idle.png','webp_a'),'__IMG_RUN__':uri('pascacio_run.png','webp_a'),'__IMG_PONCHO__':uri('don_poncho.png','webp_a'),'__IMG_NOTRITO__':uri('notrito.png','webp_a'),'__IMG_GLACIARITO__':uri('glaciarito.png','webp_a'),'__IMG_KALLFU__':uri('kallfu.png','webp_a'),
     '__IMG_A__':uri('bgA.png','webp'),'__IMG_B__':uri('bgB.png','webp_a'),'__IMG_C__':uri('bgC.png','webp_a'),'__IMG_G__':uri('bgG.png','webp')}

for _k,_f,_t in [("PINGUINO","pinguino.png","webp_a"),("LENGUITA","lenguita.png","webp_a"),("FAROLITO","farolito.png","webp_a"),("YAGAN","yagan.png","webp_a"),("BALLENITA","ballenita.png","webp_a"),("JARILLITA","jarillita.png","webp_a"),("BOYITA","boyita.png","webp_a"),("AMAN","aman.png","webp_a"),
  ("A4","bg4A.png","webp"),("B4","bg4B.png","webp_a"),("C41","bg4C1.png","webp_a"),("C42","bg4C2.png","webp_a"),("A5","bg5A.png","webp"),("B5","bg5B.png","webp_a"),("C51","bg5C1.png","webp_a"),("C52","bg5C2.png","webp_a")]:
    rep["__IMG_"+_k+"__"]=uri(_f,_t)
h=open(SP+'/tools/template.html',encoding='utf-8').read()
# limpiar un bloque sobrante en drawNPC
h=h.replace("""  ctx.save(); ctx.translate(x,GROUND); ctx.scale(-NPC.face* -1*1,1);
  // el arte original mira a la derecha; NPC.face=-1 significa "mira a la izquierda"
  ctx.restore();
""","  // el arte original mira a la derecha; NPC.face=-1 significa \"mira a la izquierda\"\n")
for k,v in rep.items(): h=h.replace(k,v)
out=SP+'/build/Guardianes_Preview_Movimiento.html'
open(out,'w',encoding='utf-8').write(h)
import os; print(out, round(os.path.getsize(out)/1024),'KB')

s=open("build/Guardianes_Preview_Movimiento.html",encoding="utf-8").read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a,s.count(a)); s=s.replace(a,b)
rep("let CONDOR_PREVIEW=false","let CONDOR_PREVIEW=true")
rep("window.__gp={",'''setTimeout(()=>{ try{ startGame("viajero"); toast("PREVIEW: en 6 segundos pasa el cóndor. Tocá 📷 mientras vuela"); }catch(e){console.error(e);} },400);
window.__gp={''')
open("build/Preview_Condor.html","w",encoding="utf-8").write(s)

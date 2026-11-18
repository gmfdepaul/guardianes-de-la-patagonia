"use strict";
const IMG = {
  idle:"assets/img/pascacio_idle.webp", run:"assets/img/pascacio_run.webp", poncho:"assets/img/don_poncho.webp", pudu:"assets/img/pudu.webp", huemul:"assets/img/huemul.webp", calafatin:"assets/img/calafatin.webp", fitz:"assets/img/fitz.webp", kallfun:"assets/img/kallfun.webp", A3:"assets/img/bg3A.webp", B3:"assets/img/bg3B.webp", C31:"assets/img/bg3C1.webp", C32:"assets/img/bg3C2.webp", arrayanin:"assets/img/arrayanin.webp", chocolatin:"assets/img/chocolatin.webp", lafken:"assets/img/lafken.webp", A2:"assets/img/bg2A.webp", B2:"assets/img/bg2B.webp", C21:"assets/img/bg2C1.webp", C22:"assets/img/bg2C2.webp", G2:"assets/img/bg2G.webp", notrito:"assets/img/notrito.webp", glaciarito:"assets/img/glaciarito.webp", kallfu:"assets/img/kallfu.webp",
  pinguino:"assets/img/pinguino.webp", lenguita:"assets/img/lenguita.webp", farolito:"assets/img/farolito.webp", yagan:"assets/img/yagan.webp", ballenita:"assets/img/ballenita.webp", jarillita:"assets/img/jarillita.webp", boyita:"assets/img/boyita.webp", aman:"assets/img/aman.webp", A4:"assets/img/bg4A.webp", B4:"assets/img/bg4B.webp", C41:"assets/img/bg4C1.webp", C42:"assets/img/bg4C2.webp", A5:"assets/img/bg5A.webp", B5:"assets/img/bg5B.webp", C51:"assets/img/bg5C1.webp", C52:"assets/img/bg5C2.webp",
  A:"assets/img/bg1A.webp", B:"assets/img/bg1B.webp", C:"assets/img/bg1C.webp", G:"assets/img/bg1G.webp"
};
const LAYER_SCALE = 720/941;           // las capas se recortaron del escenario aprobado (941 px de alto)
const VH = 720;                        // alto lógico del juego
let WORLD = 7200; const GROUND = 655;      // largo del recorrido y línea de suelo (y de los pies)
const DEFAULTS = {walk:230, run:430, jump:200, gravity:2600, size:24, screenPos:40, cam:8};
let cfg = Object.assign({}, DEFAULTS);
try{ const s=JSON.parse(localStorage.getItem("gp_cfg")||"null"); if(s) Object.assign(cfg,s);}catch(e){}

const $ = id => document.getElementById(id);
if(location.hash!=="#dev") document.body.classList.add("nodev");
const cv = $("c"), ctx = cv.getContext("2d");
let VW = 1280, scaleCv = 1, dpr = 1;
function resize(){
  dpr = Math.min(window.devicePixelRatio||1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  VW = Math.max(900, Math.min(1800, VH*w/h));
  cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr);
  scaleCv = cv.height / VH;
}
window.addEventListener("resize", resize); resize();
$("rotPas").src=IMG.idle;
(function(){
  const col=$("rcol"); ["A","A2","A3","A4","A5"].forEach(k=>{ const d=document.createElement("div"); d.style.backgroundImage="url("+IMG[k]+")"; col.appendChild(d); });
  const box=$("rchars"); [["poncho",3,26,15],["huemul",20,42,14],["pudu",66,30,13],["kallfun",82,44,16],["calafatin",40,36,12],["fitz",52,48,11],["pinguino",8,53,12],["ballenita",70,56,11],["farolito",88,24,16],["lenguita",30,24,13],["yagan",58,22,13],["jarillita",14,34,12],["boyita",76,38,12],["arrayanin",46,24,14]].forEach(([k,l,b,h],n)=>{
    if(!IMG[k]) return; const im=document.createElement("img"); im.src=IMG[k]; im.style.cssText="left:"+l+"%;bottom:"+b+"%;height:"+h+"vh;animation-delay:-"+(n*0.37)+"s"; box.appendChild(im); });
  const R=$("rotate"), pas=$("rotPas"), tx=$("rTxt"), msgs=["¡Hola! Soy Pascacio.","¡Girá tu dispositivo para comenzar la aventura!"]; let mi=0,ci=0,hold=0,fr=0,last="";
  setInterval(()=>{ if(getComputedStyle(R).display==="none") return; fr++; const talking=ci<msgs[mi].length;
    if(talking){ ci++; tx.textContent=msgs[mi].slice(0,ci); } else { hold++; if(hold>24){ hold=0; ci=0; mi=(mi+1)%msgs.length; } }
    const want=talking?((fr%6<3)?IMG.idle:IMG.run):IMG.idle; if(want!==last){ pas.src=want; last=want; }
    pas.className=talking?"talk":"idl"; },75);
})();

/* ---------- imágenes ---------- */
const RANGER_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="200" height="320" viewBox="0 0 200 320"><g stroke="#2a1d14" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"><path d="M56 292h40v18H48z" fill="#6b4220"/><path d="M104 292h40l8 18h-48z" fill="#6b4220"/><rect x="62" y="206" width="32" height="90" rx="8" fill="#4d6b2f"/><rect x="106" y="206" width="32" height="90" rx="8" fill="#4d6b2f"/><path d="M52 114q-6 50-2 98h100q4-48-2-98q-48-18-96 0z" fill="#6f9a3f"/><rect x="50" y="196" width="100" height="16" rx="4" fill="#5a3a1a"/><rect x="92" y="196" width="16" height="16" fill="#e8c14a"/><path d="M54 120q-26 38-16 84l22-4q-4-32 6-62z" fill="#6f9a3f"/><path d="M146 120q26 38 16 84l-22-4q4-32-6-62z" fill="#6f9a3f"/><circle cx="46" cy="210" r="12" fill="#f0b48a"/><circle cx="154" cy="210" r="12" fill="#f0b48a"/><path d="M116 136h24v22q-12 10-24 0z" fill="#e8c14a"/><path d="M60 118q40 24 80 0" fill="none" stroke="#3b5a22"/><circle cx="100" cy="80" r="40" fill="#f0b48a"/><ellipse cx="100" cy="54" rx="68" ry="14" fill="#8a7a3a"/><path d="M60 54q4-46 40-46q36 0 40 46z" fill="#9a8a42"/><rect x="61" y="40" width="78" height="10" fill="#4d6b2f" stroke-width="3"/><path d="M100 18l4 8h9l-7 5 3 9-9-5-9 5 3-9-7-5h9z" fill="#e8c14a" stroke-width="2"/><circle cx="84" cy="82" r="6" fill="#2a1d14" stroke="none"/><circle cx="116" cy="82" r="6" fill="#2a1d14" stroke="none"/><path d="M80 98q20-10 40 0" fill="none" stroke="#5a3a1a" stroke-width="7"/><path d="M86 108q14 10 28 0" fill="none"/></g></svg>';
IMG.ranger="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(RANGER_SVG);
const img = {};
function loadAll(){
  return Promise.all(Object.entries(IMG).map(([k,src])=>new Promise((res,rej)=>{
    const i = new Image(); i.onload=()=>{img[k]=i;res()}; i.onerror=()=>rej(new Error("No cargó "+k)); i.src=src;
  })));
}

/* ---------- HUD ---------- */
const heartSVG='<svg viewBox="0 0 24 24"><path fill="#e53935" stroke="#7a0d0d" stroke-width="1.6" stroke-linejoin="round" d="M12 21s-8.5-5.3-8.5-11.2A4.8 4.8 0 0 1 12 7.2a4.8 4.8 0 0 1 8.5 2.6C20.5 15.7 12 21 12 21z"/><path fill="#ff8a80" d="M7 8.6a2.4 2.4 0 0 1 2.6-1" opacity=".0"/></svg>';


/* ---------- AUDIO ----------
   Equivalente web del AudioManager de Godot. Los sonidos son PLACEHOLDERS sintetizados (no es música definitiva).
   Buses: Master, Music, Nature, Gameplay, UI. Capas: música, naturaleza y variaciones por etapa del progreso. */
const AM=(()=>{
  let ac=null, master, comp, analyser, noiseBuf=null; const B={};
  const S={music:true,sfx:true,mute:false,vol:0.8,musVol:0.8,natVol:0.2,nv:2};
  try{ Object.assign(S,JSON.parse(localStorage.getItem("gp_audio")||"{}")); }catch(e){} if(S.nv!==2){ S.nv=2; S.natVol=0.2; }
  let duck=false, pz=false, music=null, nature=null, curId="", want="", stageNow=0, lastSfx={}, voices=0;
  const save=()=>{ try{localStorage.setItem("gp_audio",JSON.stringify(S));}catch(e){} };
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  function init(){
    if(ac) return true;
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return false;
    ac=new AC(); master=ac.createGain(); comp=ac.createDynamicsCompressor(); comp.threshold.value=-16; comp.ratio.value=4;
    analyser=ac.createAnalyser(); analyser.fftSize=1024; master.connect(comp); comp.connect(analyser); analyser.connect(ac.destination);
    for(const k of ["music","nature","gameplay","ui"]){ B[k]=ac.createGain(); B[k].connect(master); }
    const len=ac.sampleRate*3, buf=ac.createBuffer(1,len,ac.sampleRate), d=buf.getChannelData(0); let b0=0,b1=0,b2=0;
    for(let i=0;i<len;i++){ const w=Math.random()*2-1; b0=0.99*b0+w*0.05; b1=0.96*b1+w*0.3; b2=0.57*b2+w*1.05; d[i]=(b0+b1+b2+w*0.18)*0.2; }
    const f=2400; for(let i=0;i<f;i++){ const k=i/f; d[i]*=k; d[len-1-i]*=k; }
    noiseBuf=buf; apply(); return true;
  }
  function apply(){
    if(!ac) return; const t=ac.currentTime;
    master.gain.setTargetAtTime(S.mute?0:S.vol,t,0.05);
    const dm=(duck?0.6:1)*(pz?0.4:1), dn=(duck?0.35:1)*(pz?0.3:1);
    B.music.gain.setTargetAtTime((S.music?1:0)*S.musVol*dm*0.9,t,0.15);
    B.nature.gain.setTargetAtTime((S.music?1:0)*S.natVol*dn*0.9,t,0.2);
    B.gameplay.gain.setTargetAtTime(S.sfx?1:0,t,0.05); B.ui.gain.setTargetAtTime(S.sfx?1:0,t,0.05);
  }
  function tone(dest,type,freq,t0,dur,vol,o){
    o=o||{}; const osc=ac.createOscillator(), g=ac.createGain(); osc.type=type; osc.frequency.setValueAtTime(freq,t0);
    if(o.slide) osc.frequency.exponentialRampToValueAtTime(o.slide,t0+dur);
    if(o.vib){ const l=ac.createOscillator(), lg=ac.createGain(); l.frequency.value=o.vib; lg.gain.value=freq*0.012; l.connect(lg); lg.connect(osc.frequency); l.start(t0); l.stop(t0+dur+(o.tail||0)+0.1); }
    const a=Math.min(o.a!=null?o.a:0.01,dur), end=t0+dur+(o.tail||0);
    g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(vol,t0+a); g.gain.exponentialRampToValueAtTime(0.0001,end);
    osc.connect(g); g.connect(dest); osc.start(t0); osc.stop(end+0.05);
  }
  function noise(dest,t0,dur,vol,type,freq,q){
    const s=ac.createBufferSource(); s.buffer=noiseBuf; s.loop=true; const f=ac.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q||0.8;
    const g=ac.createGain(); g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(vol,t0+Math.min(0.01,dur/3)); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(f); f.connect(g); g.connect(dest); s.start(t0,Math.random()*2); s.stop(t0+dur+0.05);
  }
  /* ---- Capa 1: música principal (placeholder generativo por mundo) + Capa 3: variaciones por etapa ---- */
  const WORLDS={
    menu:    {root:60,scale:[0,2,4,7,9],bpm:82,prog:[[0,4],[9,3],[5,4],[7,4]],motif:[0,-1,2,-1,4,-1,3,2,1,-1,2,-1,0,-1,-1,-1],lead:"triangle",cut:[3800,3800,3800,3800,3800]},
    level_01:{root:62,scale:[0,2,4,6,7,9,11],bpm:78,prog:[[0,4],[2,4],[9,3],[5,4]],motif:[0,-1,2,4,-1,5,4,-1,2,-1,1,2,-1,0,-1,-1],lead:"sine",bell:true,cut:[4200,3800,3200,2700,2400]},
    level_03:{root:57,scale:[0,3,5,7,10],bpm:96,prog:[[0,3],[8,4],[3,4],[10,4]],motif:[0,-1,2,3,-1,2,0,-1,3,-1,4,3,-1,2,-1,-1],lead:"triangle",pluck:true,whistle:true,cut:[3600,3400,3000,2600,2300]},
    level_04:{root:52,scale:[0,2,3,5,7,10],bpm:84,prog:[[0,4],[5,4],[8,3],[7,4]],motif:[0,-1,2,-1,3,2,-1,0,-1,2,3,-1,4,-1,2,-1],lead:"sine",bell:true,cut:[3400,3200,2800,2400,2100]},
    level_05:{root:60,scale:[0,2,4,7,9],bpm:104,prog:[[0,4],[7,4],[9,3],[5,4]],motif:[0,2,-1,4,-1,3,2,-1,0,-1,4,3,-1,2,0,-1],lead:"triangle",pluck:true,shaker:true,cut:[3600,3400,3200,2800,2400]},
    level_02:{root:55,scale:[0,2,4,7,9],bpm:100,prog:[[0,4],[9,3],[5,4],[7,4]],motif:[2,-1,3,4,-1,3,2,-1,0,2,-1,3,2,-1,0,-1],lead:"triangle",pluck:true,whistle:true,shaker:true,cut:[3600,3400,3000,2600,2200]}
    ,
    /* Subniveles: más ritmo y energía, siempre instrumental, suave y apto para chicos */
    sub_level_01:{sub:true,root:62,scale:[0,2,4,6,7,9,11],bpm:132,prog:[[0,4],[2,4],[9,3],[7,4]],motif:[0,2,4,2,5,4,2,-1,0,2,4,5,7,5,4,2],lead:"triangle",pluck:true,bell:true,bass:true,kick:true,hat:true,cut:[4600,4400,4200,4000,3800]},
    sub_level_02:{sub:true,root:55,scale:[0,2,4,7,9],bpm:142,prog:[[0,4],[9,3],[5,4],[7,4]],motif:[2,3,4,3,2,-1,0,2,3,4,6,4,3,2,0,-1],lead:"triangle",pluck:true,whistle:true,shaker:true,bass:true,wood:true,cut:[4200,4000,3800,3600,3400]},
    sub_level_03:{sub:true,root:57,scale:[0,3,5,7,10],bpm:146,prog:[[0,3],[8,4],[3,4],[10,4]],motif:[0,2,3,2,4,3,2,0,-1,2,3,4,5,4,3,2],lead:"triangle",pluck:true,whistle:true,pad:true,bass:true,kick:true,cut:[4000,3800,3600,3400,3200]},
    sub_level_04:{sub:true,root:52,scale:[0,2,3,5,7,10],bpm:126,prog:[[0,4],[5,4],[8,3],[7,4]],motif:[0,-1,2,3,5,3,2,-1,0,2,3,-1,5,4,3,2],lead:"sine",bell:true,pad:true,bass:true,toms:true,cut:[3400,3300,3200,3000,2800]},
    sub_level_05:{sub:true,root:60,scale:[0,2,4,7,9],bpm:138,prog:[[0,4],[7,4],[9,3],[5,4]],motif:[0,2,4,2,3,4,2,0,-1,2,4,5,4,3,2,-1],lead:"triangle",pluck:true,shaker:true,bass:true,toms:true,wave:true,cut:[4200,4000,3800,3600,3400]}
  };
  function musicSession(id){
    const C=WORLDS[id]||WORLDS.menu, out=ac.createGain(); out.gain.value=0.0001; out.connect(B.music);
    const lp=ac.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=C.cut[0]; lp.connect(out);
    let step=0, next=ac.currentTime+0.15, stage=0, loop=0;
    const sd=()=>60/C.bpm/2*[1,1,0.97,0.94,1.06][stage];
    const degF=(d,o)=>{ const n=C.scale.length, oc=Math.floor(d/n), ix=((d%n)+n)%n; return mtof(C.root+12*(oc+(o||0))+C.scale[ix]); };
    function play(s,t){
      const ch=C.prog[(s>>3)&3];
      if(s%8===0){ const base=C.root-12+ch[0]; for(const off of [0,7,12+ch[1]]) tone(lp,"sine",mtof(base+off),t,sd()*8,0.05,{a:0.6,tail:1.2});
        tone(lp,"triangle",mtof(base),t,sd()*1.8,0.09,{a:0.02}); tone(lp,"triangle",mtof(base+7),t+sd()*4,sd()*1.5,0.06,{a:0.02}); }
      let d=C.motif[s%16];
      if(d>=0){
        if(loop%2===1 && s%16>=12 && Math.random()<0.5) d+=(Math.random()<0.5?-1:1);
        const f=degF(d,0);
        if(C.pluck){ tone(lp,"triangle",f,t,0.5,0.22,{a:0.005}); tone(lp,"sine",f*2,t,0.2,0.06,{a:0.005}); } else tone(lp,C.lead,f,t,0.75,0.19,{a:0.01});
        if(C.bell){ tone(lp,"sine",f*2,t+0.02,1.4,0.04,{a:0.003}); tone(lp,"sine",f*5.04,t+0.02,0.6,0.012,{a:0.003}); }
      }
      if(C.whistle && (stage>=1||C.sub) && s%16===6) tone(lp,"sine",degF(4,1),t,1.1,0.06,{a:0.12,vib:5.5});
      if(C.shaker && (stage>=1||C.sub) && s%2===1) noise(lp,t,0.07,0.035,"highpass",6000,0.5);
      if(!C.shaker && stage>=2 && s%4===2) noise(lp,t,0.1,0.02,"bandpass",3000,1.2);
      if(C.bass&&s%2===0){ const bb=C.root-24+ch[0]; tone(lp,"triangle",mtof(bb+(s%8===6?7:0)+(((s>>1)%4)===3?12:0)),t,sd()*1.7,0.1,{a:0.01}); }
      if(C.kick&&s%4===0) tone(lp,"sine",120,t,0.16,0.14,{slide:55,a:0.003});
      if(C.kick&&s%8===4) noise(lp,t,0.07,0.04,"bandpass",1800,1.2);
      if(C.hat&&s%2===1) noise(lp,t,0.04,0.028,"highpass",7000,0.5);
      if(C.toms&&(s%8===3||s%8===7||s%16===10)) tone(lp,"sine",s%8===3?170:130,t,0.14,0.11,{slide:90,a:0.003});
      if(C.wood&&(s%4===1||s%8===6)){ tone(lp,"sine",s%8===6?900:760,t,0.06,0.09,{a:0.002}); noise(lp,t,0.03,0.04,"bandpass",2200,2); }
      if(C.pad&&s%8===0){ for(const off of [0,7,12+ch[1]]) tone(lp,"sawtooth",mtof(C.root-12+ch[0]+off),t,sd()*8,0.018,{a:0.9,tail:1}); }
      if(C.wave&&s%32===0) noise(lp,t,2.2,0.05,"lowpass",800,0.5);
    }
    const timer=setInterval(()=>{ while(next<ac.currentTime+0.35){ play(step,next); next+=sd(); step++; if(step%16===0) loop++; } },90);
    out.gain.setTargetAtTime(1,ac.currentTime,0.8);
    return {setStage(n){ stage=n; lp.frequency.setTargetAtTime(C.cut[n]||3600,ac.currentTime,3); },
            stop(fade){ clearInterval(timer); out.gain.setTargetAtTime(0.0001,ac.currentTime,fade/3); setTimeout(()=>{ try{out.disconnect();lp.disconnect();}catch(e){} },fade*1000+1500); }};
  }
  /* ---- Capa 2: sonidos de naturaleza (cama + acentos aleatorios, sin repetición mecánica) ---- */
  const NAT={menu:{wind:0.5,birds:true},level_01:{wind:1,water:1,ice:true,birds:true},level_02:{wind:0.5,water:0.7,leaves:true,birds:true},level_03:{wind:1.2,water:0.6,stone:true,birds:true},level_04:{wind:1.1,water:1,rain:1,birds:true},level_05:{wind:0.9,water:1.4,birds:true}};
  function natureSession(id){
    const C=NAT[id]||NAT[String(id).replace('sub_','')]||NAT.menu, out=ac.createGain(); out.gain.value=0.0001; out.connect(B.nature); const timers=[], srcs=[];
    function bed(type,freq,q,vol,lfoHz,depth){ const s=ac.createBufferSource(); s.buffer=noiseBuf; s.loop=true; const f=ac.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q;
      const g=ac.createGain(); g.gain.value=vol; const l=ac.createOscillator(), lg=ac.createGain(); l.frequency.value=lfoHz; lg.gain.value=vol*depth; l.connect(lg); lg.connect(g.gain);
      s.connect(f); f.connect(g); g.connect(out); s.start(0,Math.random()*2); l.start(); srcs.push(s,l); }
    if(C.wind){ bed("lowpass",520,0.7,0.5*C.wind,0.08,0.6); bed("bandpass",900,0.5,0.18*C.wind,0.13,0.9); }
    if(C.water) bed("lowpass",1100,0.4,0.16*C.water,0.35,0.5);
    if(C.rain) bed("highpass",3200,0.5,0.07*C.rain,0.2,0.4);
    const sched=(fn,min,max)=>{ const go=()=>{ if(!pz) fn(); timers.push(setTimeout(go,(min+Math.random()*(max-min))*1000)); }; timers.push(setTimeout(go,(min*0.4+Math.random()*min*0.6)*1000)); };
    if(C.birds) sched(()=>{ const t=ac.currentTime+0.05, f0=2600+Math.random()*1800, n=2+((Math.random()*3)|0), v=0.025+Math.random()*0.03; for(let i=0;i<n;i++) tone(out,"sine",f0,t+i*0.13,0.09,v,{slide:f0*(1.2+Math.random()*0.3),a:0.005}); },6,15);
    if(C.ice) sched(()=>{ const t=ac.currentTime+0.05; noise(out,t,0.35,0.06,"lowpass",300,0.7); noise(out,t+0.05,0.08,0.03,"highpass",4000,1); },14,28);
    if(C.stone) sched(()=>{ const t=ac.currentTime+0.05; noise(out,t,0.05,0.05,"bandpass",1500,2); noise(out,t+0.09,0.05,0.04,"bandpass",1100,2); },12,26);
    if(C.leaves) sched(()=>{ noise(out,ac.currentTime+0.05,1.6,0.07,"bandpass",2800,0.6); },9,20);
    out.gain.setTargetAtTime(1,ac.currentTime,1.2);
    return {stop(fade){ timers.forEach(clearTimeout); out.gain.setTargetAtTime(0.0001,ac.currentTime,fade/3); setTimeout(()=>{ srcs.forEach(x=>{try{x.stop();}catch(e){}}); try{out.disconnect();}catch(e){} },fade*1000+1500); }};
  }
  /* ---- Efectos (bus Gameplay / UI) con cooldown y límite de voces ---- */
  const SFX={
    jump:(t,d)=>tone(d,"sine",300,t,0.12,0.18,{slide:620}),
    land:(t,d)=>noise(d,t,0.12,0.18,"lowpass",420,0.6),
    collect:(t,d)=>{tone(d,"sine",988,t,0.12,0.16);tone(d,"sine",1319,t+0.07,0.2,0.16);},
    photo:(t,d)=>{noise(d,t,0.05,0.3,"bandpass",2500,1.5);noise(d,t+0.07,0.06,0.25,"bandpass",1800,1.5);tone(d,"sine",1568,t+0.18,0.18,0.1);},
    nophoto:(t,d)=>tone(d,"triangle",180,t,0.2,0.2,{slide:130}),
    hurt:(t,d)=>tone(d,"triangle",330,t,0.3,0.25,{slide:120}),
    trash:(t,d)=>{noise(d,t,0.12,0.22,"bandpass",2400,1.2);tone(d,"sine",523,t+0.1,0.14,0.14);tone(d,"sine",784,t+0.18,0.2,0.14);},
    open:(t,d)=>{tone(d,"sine",523,t,0.14,0.14);tone(d,"sine",659,t+0.09,0.18,0.14);},
    talk:(t,d,o)=>{ const p=o.p||250; tone(d,"square",p,t,0.05,0.04,{slide:p*(0.9+Math.random()*0.25)}); },
    ok:(t,d)=>[523,659,784,1047].forEach((f,i)=>tone(d,"triangle",f,t+i*0.08,0.25,0.15)),
    bad:(t,d)=>{tone(d,"triangle",330,t,0.2,0.16);tone(d,"triangle",262,t+0.16,0.3,0.16);},
    reward:(t,d)=>[523,659,784,1047,1319].forEach((f,i)=>tone(d,"sine",f,t+i*0.09,0.4,0.15)),
    splash:(t,d)=>{noise(d,t,0.4,0.25,"lowpass",900,0.6);tone(d,"sine",420,t,0.22,0.1,{slide:150});},
    condor:(t,d)=>{tone(d,"sawtooth",900,t,0.5,0.08,{slide:420,a:0.05});tone(d,"sawtooth",1100,t+0.35,0.4,0.06,{slide:500,a:0.05});},
    click:(t,d)=>tone(d,"sine",700,t,0.05,0.1),
    buy:(t,d)=>{tone(d,"sine",880,t,0.1,0.15);tone(d,"sine",1175,t+0.08,0.18,0.15);},
    miniStart:(t,d)=>[392,523,659].forEach((f,i)=>tone(d,"triangle",f,t+i*0.07,0.16,0.14))
  };
  const META={jump:[2,80,"gameplay"],land:[1,120,"gameplay"],collect:[3,50,"gameplay"],photo:[4,200,"gameplay"],nophoto:[3,200,"gameplay"],hurt:[5,300,"gameplay"],trash:[4,150,"gameplay"],open:[4,200,"ui"],talk:[1,40,"ui"],ok:[5,200,"ui"],bad:[5,200,"ui"],reward:[6,300,"gameplay"],click:[1,40,"ui"],condor:[3,2000,"gameplay"],splash:[4,300,"gameplay"],buy:[4,150,"ui"],miniStart:[4,300,"ui"]};
  return {
    S,
    unlock(){ if(!init()) return; if(ac.state==="suspended") ac.resume(); if(want&&!curId) AM.play(want); },
    play(id){ want=id; if(!ac||id===curId) return; curId=id; if(music) music.stop(1.6); if(nature) nature.stop(1.6); music=musicSession(id); nature=natureSession(id); music.setStage(stageNow); },
    stop(fade){ want=""; curId=""; if(music) music.stop(fade||1.2); if(nature) nature.stop(fade||1.2); music=nature=null; },
    sfx(id,o){ if(!ac||!S.sfx||S.mute) return; const m=META[id]; if(!m) return; const now=performance.now(); if(now-(lastSfx[id]||0)<m[1]) return; if(voices>=8&&m[0]<4) return; lastSfx[id]=now; voices++; setTimeout(()=>voices--,500); SFX[id](ac.currentTime+0.01,B[m[2]],o||{}); },
    setDuck(v){ if(v!==duck){ duck=v; apply(); } },
    setPaused(v){ if(v!==pz){ pz=v; apply(); } },
    setStage(n){ if(n!==stageNow){ stageNow=n; if(music) music.setStage(n); } },
    set(k,v){ S[k]=v; save(); apply(); },
    suspend(){ if(ac&&ac.state==="running") ac.suspend(); }, resume(){ if(ac&&ac.state==="suspended") ac.resume(); },
    level(){ if(!analyser) return {rms:0,peak:0}; const a=new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(a); let sq=0,pk=0; for(const v of a){ sq+=v*v; pk=Math.max(pk,Math.abs(v)); } return {rms:Math.sqrt(sq/a.length),peak:pk}; },
    get ready(){ return !!ac; }, get state(){ return ac?ac.state:"none"; }, get cur(){ return curId; }
  };
})();
["pointerdown","keydown","touchstart"].forEach(ev=>window.addEventListener(ev,()=>AM.unlock(),{passive:true}));
document.addEventListener("visibilitychange",()=>{ if(document.hidden) AM.suspend(); else AM.resume(); });
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("button"); if(b&&!b.closest("#miniA")&&!b.closest("#dOpts")) AM.sfx("click"); },true);

/* ---------- estado ---------- */
const P = {x:300,y:GROUND,vx:0,vy:0,face:1,ground:true,coyote:0,jumpBuf:0,land:0,phase:0,crouch:false,wasRun:false,state:"idle",jumpHeld:false,jumpCut:false,inv:0,glide:false,tgt:null,tgtNear:false};
let cam = 0, t = 0, score = 0, photos = 0, paused = false, talking = false, dlgIndex = 0;
const keys = {};
const input = {stickX:0, stickY:0, stickOn:false, jump:false, photo:false};

/* ---------- nivel ---------- */
const solids=[], ledges=[], coins=[], NPCS=[], HZ_BASE=[], HZ_EXTRA=[], trash=[], gaps=[], rafts=[], gates=[];
let cine=null, gateCur=null, sub=null, ranger=null; const condor={spawned:false,active:false,t:0,shot:false}; const CONDOR_WAIT=6, CONDOR_DUR=14; let CONDOR_PREVIEW=false, CONDOR_T=120;
const W1_NPCS = [
  {id:"poncho",name:"Don Poncho",x:750,img:"poncho",hs:1.02,mini:"memory",near:false,face:-1,done:false,
   lines:["¡Eh, viajero! Soy Don Poncho. Bienvenido al Parque Nacional Los Glaciares.","Mirá el glaciar de lejos y nunca alimentes a los animales. ¡Probemos tu memoria!"],
   qs:[{q:"¿Se puede alimentar a los animales silvestres?",o:["No, nunca","Sí, con pan","Sí, con frutas"],c:0,e:"Alimentarlos los daña y les quita el miedo a las personas."},
       {q:"El guanaco es pariente salvaje de la...",o:["Llama","Vaca","Oveja"],c:0,e:"El guanaco es un camélido sudamericano, igual que la llama."},
       {q:"¿Qué hace un guanaco al detectar un peligro?",o:["Emite un relincho de alarma y huye","Se queda quieto","Se acerca a mirar"],c:0,e:"Los guanacos avisan con un relincho y escapan corriendo."}]},
  {id:"notrito",name:"Notrito",x:2650,img:"notrito",hs:0.92,mini:"drops",near:false,face:-1,done:false,noflip:true,
   lines:["¡Hola! Soy Notrito, el notro florido. Mis flores rojas resisten el frío del sur.","¡Ayudame a regar! Tocá las gotas, pero ojo con la basura."],
   qs:[{q:"¿De qué color son las flores del notro?",o:["Rojas","Azules","Verdes"],c:0,e:"El notro tiene flores rojas muy llamativas."},
       {q:"¿Está bien arrancar flores y ramas en un parque nacional?",o:["No, hay que dejarlas en su lugar","Sí, una sola","Sí, si nadie mira"],c:0,e:"Las plantas nativas se cuidan: se miran y se fotografían."},
       {q:"¿Qué animal visita las flores rojas del notro para alimentarse?",o:["El picaflor","El cóndor","El guanaco"],c:0,e:"Los picaflores se alimentan del néctar del notro."}]},
  {id:"glaciarito",name:"Glaciarito",x:3500,img:"glaciarito",hs:0.9,mini:"timing",near:false,face:-1,done:false,noflip:true,
   lines:["Soy Glaciarito, un pedacito de glaciar. Me formé con nieve apretada durante muchísimos años.","Congelemos el tiempo: frená la barra justo en la zona azul."],
   qs:[{q:"Un glaciar está formado por...",o:["Hielo","Arena","Roca"],c:0,e:"Es una enorme masa de hielo formada durante muchísimos años."},
       {q:"¿Qué pasa con los glaciares cuando el planeta se calienta?",o:["Se derriten más rápido","Crecen más","No cambian"],c:0,e:"Con más calor, el hielo se derrite más rápido."},
       {q:"El agua de los lagos glaciares es turquesa porque tiene...",o:["Partículas finísimas de roca","Pintura natural","Algas azules"],c:0,e:"El glaciar muele la roca hasta hacerla polvo finísimo: eso da el color."}]},
  {id:"kallfu",name:"Kallfü",x:5650,img:"kallfu",hs:1.0,mini:"yesno",near:false,face:-1,done:false,noflip:true,bust:true,
   lines:["Hola, soy Kallfü. Me gusta compartir cómo cuidar el territorio.","Decime: ¿esto lo hace un Guardián? Respondé Sí o No."],
   qs:[{q:"Los tehuelches son un pueblo originario de...",o:["La Patagonia","La Mesopotamia","Cuyo"],c:0,e:"Los tehuelches (aonikenk) habitan la Patagonia desde hace mucho tiempo."},
       {q:"Los pueblos originarios conocen estas tierras desde hace...",o:["Miles de años","Unos pocos años","Cincuenta años"],c:0,e:"Su relación con el territorio tiene miles de años de historia."},
       {q:"Tradicionalmente, ¿de qué animal aprovechaban el cuero para abrigarse?",o:["El guanaco","El pingüino","La ballena"],c:0,e:"Con el cuero de guanaco se hacían abrigos y toldos."}]}
];
let NPC=null, pendingHurt=false, miniKey=null;
const lvl={time:0,fin:false,q:0,mg:0};
let GOAL_X=7020;
const SPEED_MAX=600, SPEED_ZERO=420;
function speedBonus(t){ return Math.round(Math.max(0,Math.min(1,(SPEED_ZERO-t)/SPEED_ZERO))*SPEED_MAX/10)*10; }
const DONATE_URL="https://www.paypal.me/gmfdepaul";   // ← pegá acá el enlace de donación (Mercado Pago, Cafecito, PayPal, etc.)
/* Iluminación por progreso: depende del tiempo ACTIVO de la partida (lvl.time), no del reloj del dispositivo.
   LEVEL_SECONDS está por confirmar (4 o 5 minutos). 5 etapas de 20% con interpolación suave. */
const LEVEL_SECONDS=240;
const LIGHT_KEYS=[[0.1,[255,255,255,0]],[0.3,[255,236,200,.06]],[0.5,[255,212,150,.12]],[0.7,[255,178,90,.22]],[0.9,[255,170,120,.16]]];
function lightProgress(){ return Math.max(0,Math.min(1,lvl.time/LEVEL_SECONDS)); }
function lightColor(p){
  const K=LIGHT_KEYS; if(p<=K[0][0]) return K[0][1]; if(p>=K[K.length-1][0]) return K[K.length-1][1];
  for(let i=0;i<K.length-1;i++){ const a=K[i],b=K[i+1]; if(p<=b[0]){ const f=(p-a[0])/(b[0]-a[0]); return a[1].map((v,j)=>v+(b[1][j]-v)*f); } }
}
function drawLight(){ const c=lightColor(lightProgress()); if(c[3]<=0.001) return; ctx.fillStyle="rgba("+(c[0]|0)+","+(c[1]|0)+","+(c[2]|0)+","+c[3].toFixed(3)+")"; ctx.fillRect(0,0,VW,VH); }

/* ---------- peligros y basura ---------- */
const W1_HZ_BASE = [
  {k:"bush",x:1100,w:70,h:48},{k:"bush",x:3150,w:70,h:48},{k:"bush",x:4150,w:70,h:48},{k:"bush",x:5050,w:70,h:48},{k:"bush",x:6500,w:70,h:48},
  {k:"weed",x:1950,a:1750,b:2180,dir:1,v:95,rot:0,w:56,h:58},
  {k:"weed",x:6120,a:5900,b:6380,dir:-1,v:110,rot:0,w:56,h:58}
];
const hazards = [];
const W1_HZ_EXTRA = [
  {k:"bush",x:3000,w:70,h:48},{k:"bush",x:3850,w:70,h:48},{k:"bush",x:5800,w:70,h:48},
  {k:"weed",x:3900,a:3760,b:4060,dir:1,v:100,rot:0,w:56,h:58}
];
const W1_TRASH = [
  {k:"bottle",name:"una botella",x:1300,got:false},{k:"can",name:"una lata",x:2790,got:false},{k:"bag",name:"una bolsa",x:3900,got:false},
  {k:"can",name:"una lata",x:4900,got:false},{k:"bottle",name:"una botella",x:5450,got:false},{k:"bag",name:"una bolsa",x:6650,got:false}
];
const CPS=[]; let cp=300, trashCount=0;
const TRASH_R=110;
function hrect(h){ const hs=h.hs||1; if(h.k==="bird"){ return (h.st==="dive"&&h.y>GROUND-150)?{x0:h.x-22*hs,x1:h.x+22*hs,y0:h.y-20*hs,y1:h.y+20*hs}:{x0:1e9,x1:1e9,y0:1e9,y1:1e9}; } if(hs<1) return {x0:h.x-h.w/2*hs+6,x1:h.x+h.w/2*hs-6,y0:GROUND-h.h*hs+8,y1:GROUND+10}; return {x0:h.x-h.w/2+6,x1:h.x+h.w/2-6,y0:GROUND-h.h+8,y1:GROUND+10}; }
function trect(tr){ return {x0:tr.x-16,x1:tr.x+16,y0:GROUND-36,y1:GROUND+10}; }
function drawHazard(h){
  const x=h.x-cam; if(x<-100||x>VW+100) return;
  ctx.save(); ctx.lineJoin="round"; ctx.strokeStyle="#1d2c0e"; ctx.lineWidth=3.5;
  if(h.k==="bush"){
    const w=h.w, hh=h.h; ctx.translate(x,GROUND+8);
    ctx.fillStyle="#3b6a1c"; ctx.beginPath(); ctx.moveTo(-w/2,0); ctx.quadraticCurveTo(-w/2-10,-hh*0.9,-w*0.15,-hh*0.95); ctx.quadraticCurveTo(0,-hh*1.15,w*0.18,-hh*0.95); ctx.quadraticCurveTo(w/2+10,-hh*0.9,w/2,0); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#f3ecc8"; ctx.strokeStyle="#5a4a1a"; ctx.lineWidth=2;
    [[-30,-22,-40,-32],[-18,-40,-24,-54],[0,-44,0,-60],[18,-40,26,-54],[30,-22,42,-32],[-6,-18,-12,-8],[14,-20,22,-12]].forEach(([bx,by,tx,ty])=>{ ctx.beginPath(); ctx.moveTo(bx-4,by); ctx.lineTo(tx,ty); ctx.lineTo(bx+4,by+2); ctx.closePath(); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle="#3a3f9c"; ctx.strokeStyle="#12163f"; ctx.lineWidth=2;
    [[-14,-20],[4,-28],[16,-16],[-4,-8]].forEach(([bx,by])=>{ ctx.beginPath(); ctx.arc(bx,by,5.5,0,6.3); ctx.fill(); ctx.stroke(); });
  } else if(h.k==="bird"){
    const sk=h.sp==="skua", dv=h.st==="dive", mk=h.st==="mark";
    if(mk||dv){ const mx=h.tx-cam, pul=0.55+0.35*Math.sin(t*16); ctx.save(); ctx.fillStyle="rgba(224,56,58,"+pul*0.55+")"; ctx.strokeStyle="rgba(255,255,255,.9)"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(mx,GROUND+9,40,8,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e0383a"; ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.font="900 30px sans-serif"; ctx.textAlign="center"; ctx.strokeText("!",mx,GROUND-14); ctx.fillText("!",mx,GROUND-14); ctx.restore(); }
    ctx.translate(x,h.y); ctx.scale((h.face||1)*1.15,1.15); ctx.lineWidth=2.6; ctx.strokeStyle="#2a1c10";
    const fl=dv?0.15:Math.sin(t*(mk?20:11)+h.x*0.03)*0.75, body=sk?"#6b5440":"#4b3626", chest=sk?"#8a7258":"#eadfc4", head=sk?"#5a4533":"#1c1612", wingC=sk?"#7a6148":"#54402c";
    ctx.fillStyle="rgba(0,0,0,.18)"; ctx.beginPath(); ctx.ellipse(0,GROUND+8-h.y,26,5,0,0,6.3); ctx.fill();
    // ala trasera
    ctx.save(); ctx.translate(-4,-6); ctx.rotate(-0.4-fl); ctx.fillStyle=wingC; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-18,-30,-52,-34); ctx.quadraticCurveTo(-38,-14,-30,2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    // cola
    ctx.fillStyle=body; ctx.beginPath(); ctx.moveTo(-18,2); ctx.lineTo(-44,-4); ctx.lineTo(-42,10); ctx.lineTo(-18,10); ctx.closePath(); ctx.fill(); ctx.stroke();
    if(!sk){ ctx.fillStyle="#f3ecd8"; ctx.fillRect(-44,2,5,4); }
    // patas
    ctx.strokeStyle="#c88a2c"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-4,14); ctx.lineTo(-6,dv?30:24); ctx.moveTo(6,14); ctx.lineTo(8,dv?30:24); ctx.stroke(); ctx.strokeStyle="#2a1c10"; ctx.lineWidth=2.6;
    // cuerpo
    ctx.fillStyle=body; ctx.beginPath(); ctx.ellipse(0,4,24,15,0.1,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle=chest; ctx.beginPath(); ctx.ellipse(6,9,15,8,0.1,0,6.3); ctx.fill();
    if(!sk){ ctx.strokeStyle="#9c8a66"; ctx.lineWidth=1.6; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-2+i*7,6); ctx.lineTo(2+i*7,12); ctx.stroke(); } ctx.strokeStyle="#2a1c10"; ctx.lineWidth=2.6; }
    // cabeza
    ctx.fillStyle=head; ctx.beginPath(); ctx.ellipse(24,-6,12,11,0,0,6.3); ctx.fill(); ctx.stroke();
    if(!sk){ ctx.fillStyle="#f2a23a"; ctx.beginPath(); ctx.ellipse(30,-3,7,6,0,0,6.3); ctx.fill(); ctx.lineWidth=1.8; ctx.stroke(); }
    ctx.fillStyle=sk?"#2f2a26":"#c9b98a"; ctx.beginPath(); ctx.moveTo(33,-6); ctx.quadraticCurveTo(46,-6,45,3); ctx.quadraticCurveTo(40,0,33,2); ctx.closePath(); ctx.fill(); ctx.lineWidth=2.2; ctx.stroke();
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(27,-9,3.8,0,6.3); ctx.fill(); ctx.lineWidth=1.8; ctx.stroke(); ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(28,-9,1.9,0,6.3); ctx.fill();
    ctx.strokeStyle="#111"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(22,-14); ctx.lineTo(31,-11); ctx.stroke();
    // ala delantera
    ctx.save(); ctx.translate(2,-4); ctx.rotate(-0.15-fl*1.1); ctx.fillStyle=wingC; ctx.strokeStyle="#2a1c10"; ctx.lineWidth=2.6; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-8,-38,-48,-46); ctx.quadraticCurveTo(-32,-18,-24,4); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle=sk?"#f1ece0":"#3a2a1e"; ctx.beginPath(); ctx.moveTo(-26,-24); ctx.lineTo(-44,-42); ctx.lineTo(-40,-26); ctx.closePath(); ctx.fill(); ctx.restore();
  } else if(h.k==="piche"){
    const cu=h.st==="curl", ro=h.st==="roll", ph=Math.sin(t*10+h.x*0.04);
    ctx.translate(x,GROUND+8); ctx.scale((h.face||1)*1.2,1.2); ctx.lineWidth=2.6; ctx.strokeStyle="#2a1c10";
    ctx.fillStyle="rgba(0,0,0,.2)"; ctx.beginPath(); ctx.ellipse(0,2,26,4.5,0,0,6.3); ctx.fill();
    const shell="#a98a62", band="#7d6342", pale="#e3cfa6";
    if(cu){ ctx.save(); ctx.fillStyle="#e0383a"; ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.font="900 30px sans-serif"; ctx.textAlign="center"; ctx.strokeText("!",4,-52+Math.sin(t*20)*2); ctx.fillText("!",4,-52+Math.sin(t*20)*2); ctx.restore(); ctx.lineWidth=2.6; }
    if(ro||cu){
      ctx.translate(0,-19+(cu?Math.sin(t*40)*1.2:0)); ctx.rotate(ro?h.rot:0);
      ctx.fillStyle=shell; ctx.beginPath(); ctx.arc(0,0,20,0,6.3); ctx.fill(); ctx.stroke();
      ctx.strokeStyle=band; ctx.lineWidth=3; for(const r of [6,12,17]){ ctx.beginPath(); ctx.arc(0,0,r,-1.1,1.1); ctx.stroke(); } ctx.strokeStyle="#2a1c10";
      ctx.fillStyle=pale; ctx.beginPath(); ctx.arc(-7,-9,5,0,6.3); ctx.fill();
      ctx.fillStyle="#6c533a"; ctx.beginPath(); ctx.moveTo(14,-6); ctx.lineTo(24,-2); ctx.lineTo(15,6); ctx.closePath(); ctx.fill(); ctx.stroke();
    } else {
      // cola y patas
      ctx.fillStyle="#8c7352"; ctx.beginPath(); ctx.moveTo(-24,-12); ctx.quadraticCurveTo(-40,-8,-38,-1); ctx.lineTo(-22,-6); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle="#6c533a"; for(const [lx,sw] of [[-14,1],[-4,-1],[10,-1],[18,1]]){ const lf=Math.max(0,ph*sw)*3; ctx.beginPath(); ctx.ellipse(lx,-4-lf,5,5,0,0,6.3); ctx.fill(); ctx.stroke(); }
      // caparazón
      ctx.fillStyle=shell; ctx.beginPath(); ctx.moveTo(-26,-8); ctx.quadraticCurveTo(-24,-34,2,-34); ctx.quadraticCurveTo(24,-32,24,-10); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle=band; ctx.lineWidth=3; for(const bx of [-14,-6,2,10,17]){ ctx.beginPath(); ctx.moveTo(bx,-10); ctx.quadraticCurveTo(bx-1,-22,bx+1,-32); ctx.stroke(); } ctx.strokeStyle="#2a1c10"; ctx.lineWidth=2.6;
      ctx.fillStyle="#ffffff40"; ctx.beginPath(); ctx.ellipse(-4,-28,12,3.5,-0.1,0,6.3); ctx.fill();
      // cabeza
      ctx.fillStyle=pale; ctx.beginPath(); ctx.ellipse(28,-14,10,8,0.1,0,6.3); ctx.fill(); ctx.stroke();
      ctx.fillStyle="#8c7352"; ctx.beginPath(); ctx.moveTo(22,-20); ctx.lineTo(24,-30); ctx.lineTo(30,-21); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(30,-16,3.4,0,6.3); ctx.fill(); ctx.lineWidth=1.8; ctx.stroke(); ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(31,-16,1.7,0,6.3); ctx.fill();
      ctx.fillStyle="#2a1c10"; ctx.beginPath(); ctx.arc(37,-12,2,0,6.3); ctx.fill();
    }
  } else if(h.k==="fox"){
    const al=h.st==="alert", ds=h.st==="dash", ph=Math.sin(t*(ds?26:12)+h.x*0.05);
    ctx.translate(x,GROUND+8); ctx.scale((h.face||1)*1.25,1.25); ctx.lineWidth=2.6; ctx.strokeStyle="#2a2018";
    const body="#8e8c96", rufous="#c47a3c", belly="#ece5d3", dark="#3a3440";
    const lowY=al?5:0, stretch=ds?1.14:1;
    ctx.fillStyle="rgba(0,0,0,.2)"; ctx.beginPath(); ctx.ellipse(0,2,34,5,0,0,6.3); ctx.fill();
    ctx.save(); ctx.translate(0,lowY); ctx.scale(stretch,al?0.9:1);
    // cola
    ctx.save(); ctx.translate(-24,-20); ctx.rotate(ds?0.15:(al?-0.2:-0.65+ph*0.12)); ctx.fillStyle=body; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-30,-14,-44,-6); ctx.quadraticCurveTo(-36,10,0,8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#f4f0e6"; ctx.beginPath(); ctx.moveTo(-26,-9); ctx.quadraticCurveTo(-34,-4,-27,6); ctx.lineTo(-18,5); ctx.quadraticCurveTo(-24,-2,-18,-10); ctx.closePath(); ctx.fill(); ctx.fillStyle=dark; ctx.beginPath(); ctx.moveTo(-34,-10); ctx.quadraticCurveTo(-46,-6,-42,-3); ctx.quadraticCurveTo(-38,6,-30,6); ctx.quadraticCurveTo(-36,-2,-34,-10); ctx.fill(); ctx.restore();
    // patas traseras y delanteras
    ctx.fillStyle=dark; for(const [lx,sw] of [[-14,1],[-6,-1],[14,-1],[22,1]]){ const lift=ds?0:Math.max(0,ph*sw)*4; ctx.beginPath(); ctx.moveTo(lx-4,-12); ctx.lineTo(lx+4,-12); ctx.lineTo(lx+3+(ds?sw*6:0),-lift); ctx.lineTo(lx-4+(ds?sw*6:0),-lift); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    // cuerpo
    ctx.fillStyle=body; ctx.beginPath(); ctx.ellipse(0,-22,28,13,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle=belly; ctx.beginPath(); ctx.ellipse(4,-15,19,6,0,0,3.14); ctx.fill(); ctx.fillStyle="#ffffff30"; ctx.beginPath(); ctx.ellipse(-6,-29,14,4,0,0,6.3); ctx.fill();
    // cuello rojizo y cabeza
    ctx.fillStyle=rufous; ctx.beginPath(); ctx.ellipse(20,-27,10,9,0.4,0,6.3); ctx.fill(); ctx.stroke();
    const hy=al?-26:-32; ctx.fillStyle=body; ctx.beginPath(); ctx.ellipse(31,hy,13,11,0,0,6.3); ctx.fill(); ctx.stroke();
    ctx.fillStyle=rufous; ctx.beginPath(); ctx.moveTo(40,hy+2); ctx.quadraticCurveTo(52,hy+3,57,hy+8); ctx.quadraticCurveTo(48,hy+12,38,hy+10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle=belly; ctx.beginPath(); ctx.ellipse(40,hy+9,8,3.5,0,0,6.3); ctx.fill();
    ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(57,hy+8,3.2,0,6.3); ctx.fill();
    for(const [ex,ey,tilt] of [[24,hy-9,al?-0.7:-0.15],[33,hy-11,al?-0.5:0.12]]){ ctx.save(); ctx.translate(ex,ey); ctx.rotate(tilt); ctx.fillStyle=dark; ctx.beginPath(); ctx.moveTo(-5,2); ctx.lineTo(0,-14); ctx.lineTo(6,2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle=rufous; ctx.beginPath(); ctx.moveTo(-2,1); ctx.lineTo(0,-8); ctx.lineTo(3,1); ctx.closePath(); ctx.fill(); ctx.restore(); }
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.ellipse(36,hy+1,4.2,4.6,0,0,6.3); ctx.fill(); ctx.lineWidth=2; ctx.stroke(); ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(37.5,hy+1.5,2.2,0,6.3); ctx.fill();
    ctx.strokeStyle=dark; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(30,hy-5); ctx.lineTo(41,hy-(al||ds?1:3)); ctx.stroke();
    if(al||ds){ ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(46,hy+11); ctx.lineTo(48,hy+15); ctx.lineTo(51,hy+11); ctx.stroke(); }
    ctx.restore();
    if(al){ ctx.scale(h.face||1,1); ctx.fillStyle="#e0383a"; ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.font="900 34px sans-serif"; ctx.textAlign="center"; ctx.strokeText("!",28,-66+Math.sin(t*20)*2); ctx.fillText("!",28,-66+Math.sin(t*20)*2); }
  } else {
    const r=29; ctx.translate(x,GROUND-r+8);
    ctx.save(); ctx.rotate(h.rot);
    ctx.fillStyle="#9a7a3a"; ctx.strokeStyle="#3a2a0c"; ctx.lineWidth=2.5;
    for(let i=0;i<(h.skin==="log"||h.skin==="rock"?0:12);i++){ const a=i*Math.PI/6; ctx.beginPath(); ctx.moveTo(Math.cos(a-0.16)*r*0.85,Math.sin(a-0.16)*r*0.85); ctx.lineTo(Math.cos(a)*(r+10),Math.sin(a)*(r+10)); ctx.lineTo(Math.cos(a+0.16)*r*0.85,Math.sin(a+0.16)*r*0.85); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle=h.skin==="log"?"#b9794a":h.skin==="rock"?"#9aa3ad":"#d2ad62"; ctx.beginPath(); ctx.arc(0,0,r,0,6.3); ctx.fill(); ctx.lineWidth=3.5; ctx.stroke();
    ctx.strokeStyle=h.skin==="log"?"#6a3f1c":h.skin==="rock"?"#5c646c":"#8a6a2c"; ctx.lineWidth=2; for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(0,0,6+i*6,i,i+3.6); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle="#fff"; ctx.strokeStyle="#3a2a0c"; ctx.lineWidth=2; for(const ex of [-9,9]){ ctx.beginPath(); ctx.ellipse(ex,-4,6,7.5,0,0,6.3); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle="#2a1d14"; for(const ex of [-9,9]){ ctx.beginPath(); ctx.arc(ex+h.dir*2,-3,3,0,6.3); ctx.fill(); }
    ctx.strokeStyle="#3a2a0c"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-14,-14); ctx.lineTo(-4,-10); ctx.moveTo(14,-14); ctx.lineTo(4,-10); ctx.stroke();
  }
  ctx.restore();
}
function drawTrash(tr){
  if(tr.got) return; const x=tr.x-cam; if(x<-60||x>VW+60) return;
  const isT=P.tgt&&P.tgt.o===tr&&P.tgtNear;
  ctx.save(); ctx.translate(x,GROUND+6); ctx.lineJoin="round"; ctx.lineWidth=3; ctx.strokeStyle="#1b2a2a";
  if(isT){ ctx.strokeStyle="#ffd45a"; ctx.lineWidth=4; ctx.globalAlpha=.6+Math.sin(t*6)*.3; ctx.beginPath(); ctx.arc(0,-22,34+Math.sin(t*6)*3,0,6.3); ctx.stroke(); ctx.globalAlpha=1; ctx.strokeStyle="#1b2a2a"; ctx.lineWidth=3; }
  if(tr.k==="bottle"){ ctx.rotate(-0.25); ctx.fillStyle="#8fe0cf"; rr(-8,-38,16,38,6); ctx.fill(); ctx.stroke(); ctx.fillStyle="#8fe0cf"; rr(-4,-52,8,16,3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e5483a"; rr(-5,-57,10,7,2); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.globalAlpha=.7; ctx.fillRect(-5,-30,3,18); ctx.globalAlpha=1; }
  else if(tr.k==="can"){ ctx.rotate(0.18); ctx.fillStyle="#cfd3da"; rr(-12,-34,24,34,5); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e5483a"; ctx.fillRect(-11,-24,22,10); ctx.strokeRect(-11,-24,22,10); ctx.fillStyle="#9aa0aa"; ctx.beginPath(); ctx.ellipse(0,-34,12,4,0,0,6.3); ctx.fill(); ctx.stroke(); }
  else { ctx.fillStyle="#f4f1e8"; ctx.beginPath(); ctx.moveTo(-18,0); ctx.quadraticCurveTo(-24,-26,-8,-34); ctx.lineTo(-6,-44); ctx.lineTo(0,-38); ctx.lineTo(6,-44); ctx.lineTo(8,-34); ctx.quadraticCurveTo(24,-26,18,0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle="#9aa0aa"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-8,-22); ctx.quadraticCurveTo(0,-14,10,-24); ctx.stroke(); }
  ctx.restore();
}

/* ---------- niveles ---------- */
const PITCH={poncho:150,notrito:330,glaciarito:440,kallfu:260,pudu:360,arrayanin:130,chocolatin:300,lafken:240};
const W2_NPCS=[
  {id:"pudu",name:"Pudú",x:700,img:"pudu",hs:0.95,mini:"memory",bust:true,
   lines:["¡Shhh! Soy Pudú, el ciervo más pequeño del mundo. Vivo en los bosques andinos.","Soy tímido y veloz. ¡Probemos tu memoria con mis huellas!"],
   qs:[{q:"El pudú es el ciervo más...",o:["Pequeño del mundo","Grande del mundo","Lento del mundo"],c:0,e:"Es el ciervo más pequeño del mundo."},
       {q:"¿Dónde vive el pudú?",o:["En los bosques andinos","En el mar","En el desierto"],c:0,e:"Vive en los bosques húmedos de los Andes."},
       {q:"¿De qué se alimenta el pudú?",o:["Brotes, hojas y frutos","Peces","Carne de otros animales"],c:0,e:"Es herbívoro: come brotes, hojas y frutos del bosque."}]},
  {id:"arrayanin",name:"Arrayanín",x:2650,img:"arrayanin",hs:1.05,mini:"drops",noflip:true,
   info:["Riego del arrayán","Tocá las gotas para regar al arrayán. ¡No toques la basura!"],
   lines:["Soy Arrayanín, el abuelo del bosque. Mi tronco color canela es suave y fresco.","Ayudame a regar mis raíces: tocá las gotas y esquivá la basura."],
   qs:[{q:"El tronco del arrayán es de color...",o:["Canela","Azul","Negro"],c:0,e:"Su tronco tiene un característico color canela."},
       {q:"El Bosque de Arrayanes está en la península...",o:["Quetrihué","Valdés","Mitre"],c:0,e:"El Bosque de Arrayanes está en la península Quetrihué."},
       {q:"¿Por qué no hay que tocar ni marcar los troncos de los arrayanes?",o:["Su corteza delicada se daña fácil","Porque queman","Porque son de plástico"],c:0,e:"Su corteza es delicada: se mira, pero no se toca."}]},
  {id:"chocolatin",name:"Chocolatín",x:3900,img:"chocolatin",hs:0.95,mini:"timing",noflip:true,
   info:["Templá el chocolate","Frená la barra en la zona azul para templar el chocolate. Acertá 2 de 3."],
   lines:["¡Hola! Soy Chocolatín, el maestro del cacao. En Bariloche el chocolate es una tradición.","Para un buen chocolate hay que templarlo en su punto justo. ¡Ayudame!"],
   qs:[{q:"El chocolate se hace con granos de...",o:["Cacao","Café","Maní"],c:0,e:"El chocolate se hace con granos de cacao."},
       {q:"Bariloche es muy famosa por su...",o:["Chocolate","Sal","Petróleo"],c:0,e:"Bariloche es conocida en todo el país por su chocolate."},
       {q:"¿El cacao crece en los bosques de Bariloche?",o:["No, es una planta tropical","Sí, bajo la nieve","Sí, dentro del lago"],c:0,e:"El cacao es tropical: viene de lugares cálidos y húmedos."}]},
  {id:"lafken",name:"Lafken",x:5650,img:"lafken",hs:1.0,mini:"yesno",noflip:true,bust:true,
   lines:["Hola, soy Lafken. Me gusta compartir el respeto por los lagos y las montañas.","Decime: ¿esto lo hace un Guardián? Respondé Sí o No."],
   qs:[{q:"Los mapuches son un pueblo originario que vive en la Patagonia y también en...",o:["Chile","Japón","Egipto"],c:0,e:"El pueblo mapuche vive en Argentina y en Chile."},
       {q:"¿Cómo se llama el idioma mapuche?",o:["Mapudungun","Guaraní","Quechua"],c:0,e:"El idioma mapuche se llama mapudungun."},
       {q:"Mapuche significa «gente de la...»",o:["Tierra","Montaña","Nube"],c:0,e:"Mapu es «tierra» y che es «gente»: gente de la tierra."}]}
];
const GATE_ITEMS={
 level_01:{howto:"Este campo de hielo está lleno de grietas y resbala. Para cruzarlo necesitás unas botas de trekking con grampones: se clavan en el hielo y evitan los resbalones.",name:"Botas de trekking para hielo",short:"Botas con grampones",price:150,icon:"boots",art:"ice",title:"¡Campo de hielo!",
   say:"Uy… el hielo está resbaladizo y lleno de grietas. Necesito botas de trekking con grampones para cruzar.",desc:"Los grampones agarran el hielo y evitan resbalones.",toast:"Con las botas de trekking cruzás el hielo"},
 level_02:{howto:"El camino se corta en un barranco muy hondo. Para cruzarlo hay que subir a la aerosilla, y sin boleto no te dejan subir.",name:"Boleto de aerosilla",short:"Boleto de aerosilla",price:250,icon:"ticket",art:"chair",title:"¡Barranco del cerro!",
   say:"El camino se corta en un barranco muy hondo. Hay que cruzar en aerosilla… ¡y para subir se necesita boleto!",desc:"Un boleto para subir a la aerosilla y cruzar el barranco.",toast:"Subís a la aerosilla con tu boleto"},
 level_03:{howto:"El río viene ancho y con fuerza. Para cruzarlo de piedra en piedra necesitás bastones de trekking: te dan apoyo y equilibrio.",name:"Bastones de trekking",short:"Bastones de trekking",price:350,icon:"poles",art:"river",title:"¡Río correntoso!",
   say:"El río es ancho y viene con fuerza. Con bastones de trekking puedo apoyarme y cruzar de piedra en piedra.",desc:"Dan equilibrio y apoyo para cruzar ríos y senderos.",toast:"Cruzás el río apoyándote en los bastones"},
 level_04:{howto:"El Canal Beagle es demasiado ancho para cruzarlo a nado. Para pasar al otro lado necesitás un barco.",name:"Barco",short:"Barco",price:500,icon:"boat",art:"sea",title:"¡Canal Beagle!",say:"El canal es muy ancho para cruzarlo a nado. ¡Necesito un barco!",desc:"Para navegar el canal.",toast:"Navegás el canal en barco"},
 level_05:{howto:"La fauna de la costa se mira de lejos para no molestarla. Para seguir necesitás unos binoculares y observar ballenas y aves sin acercarte.",name:"Binoculares",short:"Binoculares",price:650,icon:"binoc",art:"coast",title:"¡Costa de Valdés!",say:"Hay que observar la fauna desde lejos para no molestarla. ¡Necesito binoculares!",desc:"Para observar ballenas y aves sin molestarlas.",toast:"Mirás con los binoculares"}
};
/* economía: estrellas alcanzables ANTES del obstáculo = monedas*20 + basura*50 + personajes*(pts+mini) + 5 fotos*100.
   El precio es un % de ese total: hay que juntar casi todo. El cóndor (+200) y el subnivel son la ayuda para quien falle. */
const ECON={level_01:{c:30,t:5,n:2},level_02:{c:38,t:7,n:3},level_03:{c:18,t:3,n:1},level_04:{c:30,t:5,n:2},level_05:{c:23,t:3,n:1}};
const GFAC={turista:.85,viajero:.92,explorador:.95};
function gateReach(id,key){ const e=ECON[id], m=MODES[key||mode||"viajero"]; return e.c*20+e.t*50+e.n*(m.pts+m.mpts)+500; }
function gatePrice(id){ const k=mode||"viajero"; return Math.round(gateReach(id,k)*GFAC[k]/10)*10; }
Object.keys(GATE_ITEMS).forEach(k=>Object.defineProperty(GATE_ITEMS[k],"price",{get(){return gatePrice(k);},configurable:true}));
Object.assign(PITCH,{huemul:200,calafatin:340,fitz:120,kallfun:250});
const W3_NPCS=[
  {id:"huemul",name:"Huemul",x:700,img:"huemul",hs:0.95,mini:"memory",bust:true,
   info:["Huellas del huemul","Mirá en qué orden se iluminan las huellas y repetilo."],
   lines:["Soy Huemul, guardián de la montaña. Soy símbolo de la Patagonia, pero quedamos muy pocos.","¿Me ayudás a recordar mis huellas por el sendero?"],
   qs:[{q:"El huemul es un ciervo que está…",o:["En peligro de extinción","En todos lados","Siempre en la playa"],c:0,e:"Es un ciervo autóctono muy amenazado: quedan pocos ejemplares."},
       {q:"¿Dónde vive el huemul?",o:["En montañas y bosques andinos australes","En la selva misionera","En el desierto de arena"],c:0,e:"Vive en zonas de montaña y bosques del sur de los Andes."},
       {q:"¿Qué amenaza al huemul?",o:["Perros sueltos y la pérdida de su hábitat","Que haga mucho frío","Que llueva poco"],c:0,e:"Los perros sueltos y la pérdida de su hábitat lo ponen en riesgo."}]},
  {id:"calafatin",name:"Calafatín",x:2450,img:"calafatin",hs:1.0,mini:"drops",noflip:true,
   info:["Riego del calafate","Tocá las gotas para regar al calafate. ¡No toques la basura!"],
   lines:["¡Hola! Soy Calafatín. Mis bayas azules alimentan a muchas aves y animales.","Ayudame a regarme: tocá las gotas y esquivá la basura."],
   qs:[{q:"Los frutos maduros del calafate son de color…",o:["Azul oscuro","Rojo fuego","Blanco"],c:0,e:"Sus frutos maduros son azul oscuro, casi violetas."},
       {q:"Según un dicho popular, quien come calafate…",o:["Vuelve a la Patagonia","Se vuelve invisible","Nunca más tiene hambre"],c:0,e:"El dicho popular dice que quien come calafate siempre vuelve."},
       {q:"¿Por qué no hay que arrancar plantas en un parque nacional?",o:["Son hábitat y alimento de la fauna","Porque pinchan","Porque no tienen nombre"],c:0,e:"Las plantas son hogar y comida de muchos animales."}]},
  {id:"fitz",name:"Fitz",x:3700,img:"fitz",hs:0.95,mini:"timing",noflip:true,
   info:["Equilibrio de la piedra","Frená la barra en la zona azul para equilibrar la roca. Acertá 2 de 3."],
   lines:["Soy Fitz, la piedra viajera. Estas montañas tardaron muchísimo tiempo en formarse.","Para andar en la montaña hace falta equilibrio. ¡Probemos!"],
   qs:[{q:"El cerro Fitz Roy también se conoce como cerro…",o:["Chaltén","Tronador","Catedral"],c:0,e:"El Fitz Roy también se llama cerro Chaltén."},
       {q:"Chaltén es una palabra tehuelche que significa…",o:["Montaña que humea","Agua dulce","Viento fuerte"],c:0,e:"Significa «montaña que humea», por las nubes que rodean su cumbre."},
       {q:"¿Por qué parece que la cumbre «humea»?",o:["Por las nubes que se enganchan en ella","Es un volcán activo","Por los fogones de los turistas"],c:0,e:"Las nubes se enganchan en la cumbre y parece humo."}]},
  {id:"kallfun",name:"Kallfün",x:5650,img:"kallfun",hs:1.0,mini:"yesno",noflip:true,bust:true,
   lines:["Soy Kallfün. Te cuento algo de la memoria aonikenk, el pueblo tehuelche del sur.","Decime: ¿esto lo hace un Guardián? Respondé Sí o No."],
   qs:[{q:"¿Qué animal fue muy importante para los pueblos tehuelches?",o:["El guanaco","El pingüino rey","El elefante"],c:0,e:"Del guanaco aprovechaban el alimento y el cuero."},
       {q:"Aonikenk es una palabra tehuelche que significa…",o:["Gente del sur","Hielo azul","Cerro alto"],c:0,e:"Aonikenk se suele traducir como «gente del sur»."},
       {q:"Para cuidar la Patagonia, en el sendero hay que…",o:["Caminar por los senderos marcados","Cortar camino por la vegetación","Dejar la basura bajo una piedra"],c:0,e:"Quedarse en el sendero protege el ambiente."}]}
];
W1_NPCS.find(n=>n.id==="notrito").lines.push("Psst… cuando un cóndor cruce el cielo, mirá hacia arriba y guardá el recuerdo. Quizás alguien especial aparezca.");
W2_NPCS.find(n=>n.id==="arrayanin").lines.push("Los viejos del bosque decimos que, cuando un cóndor sobrevuela, conviene tener la cámara lista. Aparece alguien para quien sabe mirar.");
W3_NPCS.find(n=>n.id==="fitz").lines.push("Desde mi piedra veo el cielo: a veces pasa un cóndor. Si lo capturás con tu cámara, la montaña te regala un desafío.");

Object.assign(PITCH,{pinguino:380,lenguita:300,farolito:230,yagan:250,ballenita:150,jarillita:340,boyita:260,aman:240});
const W4_NPCS=[
  {id:"pinguino",name:"Pingüino",x:700,img:"pinguino",hs:0.95,mini:"memory",bust:true,
   info:["Huellas del pingüino","Mirá en qué orden se iluminan las huellas y repetilo."],
   lines:["¡Hola, soy el Pingüino! Los de mi especie hacemos nuestros nidos en cuevas cavadas en la tierra.","¿Me ayudás a recordar el camino que hago hasta el mar?"],
   qs:[{q:"Los pingüinos de Magallanes anidan en…",o:["Cuevas en la tierra","Las copas de los árboles","Los glaciares"],c:0,e:"Cavan cuevas poco profundas donde ponen sus huevos."},
       {q:"¿De qué se alimentan los pingüinos?",o:["Peces pequeños, calamares y krill","Hojas de lenga","Chocolate"],c:0,e:"Cazan peces pequeños, calamares y crustáceos en el mar."},
       {q:"Si ves pingüinos en la costa, ¿qué hacés?",o:["Los miro desde lejos sin molestarlos","Los persigo para una foto","Les doy de comer"],c:0,e:"Hay que mantener la distancia y no alimentar a la fauna."}]},
  {id:"lenguita",name:"Lenguita",x:2300,img:"lenguita",hs:1.0,mini:"drops",noflip:true,
   info:["Riego de la lenga","Tocá las gotas para regar a la lenga. ¡No toques la basura!"],
   lines:["¡Hola! Soy Lenguita, una lenga. Formo los bosques del extremo sur.","En otoño mis hojas cambian de color. Ayudame a regarme: tocá las gotas y esquivá la basura."],
   qs:[{q:"La lenga es un árbol típico de…",o:["Los bosques del sur de la Patagonia","El desierto","La selva misionera"],c:0,e:"Es uno de los árboles característicos de los bosques andino-patagónicos y fueguinos."},
       {q:"En otoño, las hojas de la lenga se ponen…",o:["Rojas y anaranjadas","Azules","Siempre verdes"],c:0,e:"Sus hojas cambian a rojos y naranjas antes de caer."},
       {q:"¿Por qué no hay que arrancar ramas ni hojas?",o:["Porque el bosque es hogar de la fauna","Porque pinchan","Porque no tienen nombre"],c:0,e:"Las plantas dan refugio y alimento a muchos animales."}]},
  {id:"farolito",name:"Farolito",x:3700,img:"farolito",hs:0.95,mini:"timing",noflip:true,
   info:["Luz del faro","Frená la barra en la zona azul para enfocar la luz. Acertá 2 de 3."],
   lines:["¡Bienvenido! Soy Farolito, un faro del Canal Beagle. Mi luz guía a los barcos de noche.","Para que mi luz llegue lejos hay que enfocarla bien. ¡Probemos!"],
   qs:[{q:"¿Para qué sirve un faro?",o:["Para guiar a los barcos con su luz","Para hacer sombra","Para pescar"],c:0,e:"Los faros avisan dónde hay costa o peligros y ayudan a navegar."},
       {q:"Ushuaia es conocida como la ciudad…",o:["Del fin del mundo","Del desierto","De las cataratas"],c:0,e:"Por su ubicación en el extremo sur, se la llama «fin del mundo»."},
       {q:"¿Qué hay que hacer con la basura cuando navegás?",o:["Llevarla de vuelta y no tirarla al agua","Tirarla al canal","Dejarla en una isla"],c:0,e:"Los residuos dañan a las aves y a los animales marinos."}]},
  {id:"yagan",name:"Yagán",x:5650,img:"yagan",hs:1.0,mini:"yesno",noflip:true,bust:true,
   lines:["Hola, soy Yagán. Te cuento algo sobre el pueblo yagán, que navegó estos canales durante mucho tiempo.","Decime: ¿esto lo hace un Guardián? Respondé Sí o No."],
   qs:[{q:"El pueblo yagán fue un pueblo…",o:["Canoero, que navegaba los canales","De montaña, sin contacto con el mar","Del desierto"],c:0,e:"Los yaganes recorrían los canales australes en canoas."},
       {q:"¿Dónde vivió el pueblo yagán?",o:["En los canales del extremo sur","En la Puna","En la selva"],c:0,e:"Habitaron los canales del sur de Tierra del Fuego y del extremo sur de Chile."},
       {q:"Para moverse entre las islas usaban…",o:["Canoas","Aviones","Trenes"],c:0,e:"Las canoas eran su medio de transporte entre los canales."}]}
];
const W5_NPCS=[
  {id:"ballenita",name:"Ballenita",x:700,img:"ballenita",hs:0.95,mini:"memory",bust:true,
   info:["Canto de la ballena","Mirá en qué orden suenan las burbujas y repetilo."],
   lines:["¡Hola, soy Ballenita, una ballena franca austral! Cada año vengo a estas aguas.","¿Me ayudás a recordar el recorrido de mis burbujas?"],
   qs:[{q:"Las ballenas francas visitan Península Valdés para…",o:["Reproducirse y criar a sus ballenatos","Tomar sol en la playa","Cazar pingüinos"],c:0,e:"Llegan a las aguas protegidas del golfo para tener y cuidar a sus crías."},
       {q:"¿Cómo se reconoce a una ballena franca?",o:["Por las callosidades blancas en la cabeza","Por sus alas","Por su pelaje"],c:0,e:"Cada ballena tiene un patrón propio de callosidades."},
       {q:"Si ves una ballena, lo correcto es…",o:["Observarla desde lejos o con operadores autorizados","Nadar hasta tocarla","Acercarme con una lancha propia"],c:0,e:"Hay que respetar la distancia y seguir las normas de avistaje."}]},
  {id:"jarillita",name:"Jarillita",x:2200,img:"jarillita",hs:1.0,mini:"drops",noflip:true,
   info:["Riego de la jarilla","Tocá las gotas para regar a la jarilla. ¡No toques la basura!"],
   lines:["¡Hola! Soy Jarillita. Vivo en la estepa, donde sopla viento y llueve poco.","Ayudame a regarme: tocá las gotas y esquivá la basura."],
   qs:[{q:"La jarilla crece en…",o:["La estepa, con viento y poca agua","Un glaciar","Una selva húmeda"],c:0,e:"Es un arbusto adaptado a la sequedad y al viento."},
       {q:"Las flores de la jarilla son…",o:["Amarillas","Azules","Rojas"],c:0,e:"Sus flores amarillas alegran la estepa."},
       {q:"¿Por qué no hay que pisar las plantas de la estepa?",o:["Crecen muy despacio y dan refugio","Porque hacen ruido","Porque son de plástico"],c:0,e:"En climas duros las plantas tardan mucho en recuperarse."}]},
  {id:"boyita",name:"Boyita",x:3700,img:"boyita",hs:0.95,mini:"timing",noflip:true,
   info:["Equilibrio de la boya","Frená la barra en la zona azul para estabilizar la boya. Acertá 2 de 3."],
   lines:["¡Ahoy! Soy Boyita. Floto en el mar y marco por dónde se puede navegar.","Con las olas hay que mantener el equilibrio. ¡Probemos!"],
   qs:[{q:"Una boya sirve para…",o:["Marcar zonas navegables o peligros","Dar sombra","Pescar ballenas"],c:0,e:"Las boyas señalan canales, zonas seguras o peligros para los barcos."},
       {q:"Las mareas son…",o:["La subida y bajada del nivel del mar","Un tipo de pez","Un viento fuerte"],c:0,e:"El nivel del mar sube y baja varias veces por día en la costa."},
       {q:"El plástico que llega al mar…",o:["Daña a la fauna marina","Alimenta a las ballenas","Es bueno para los corales"],c:0,e:"Los animales pueden enredarse o comerlo sin querer."}]},
  {id:"aman",name:"Amán",x:5650,img:"aman",hs:1.0,mini:"yesno",noflip:true,bust:true,
   lines:["Hola, soy Amán. Te cuento algo de la costa patagónica y de quienes la habitaron.","Decime: ¿esto lo hace un Guardián? Respondé Sí o No."],
   qs:[{q:"En la costa patagónica hay personas viviendo desde hace…",o:["Miles de años","Unos pocos años","Cien años"],c:0,e:"Las investigaciones arqueológicas muestran una presencia de miles de años."},
       {q:"Del mar y la costa se aprovechaban…",o:["Mariscos y peces","Cohetes","Bananas"],c:0,e:"Los mariscos y los peces fueron parte de la alimentación costera."},
       {q:"Para cuidar la costa hay que…",o:["No dejar residuos y respetar a la fauna","Dejar basura bajo una piedra","Perseguir a los lobos marinos"],c:0,e:"Cuidar el mar es cuidar a todos los que viven de él."}]}
];
W4_NPCS.find(n=>n.id==="farolito").lines.push("Desde mi torre veo el cielo: si un cóndor cruza y le sacás una foto, aparece alguien con un desafío extra.");
W5_NPCS.find(n=>n.id==="jarillita").lines.push("El viento me cuenta secretos: cuando pase un cóndor, tené lista la cámara. Un guardaparque te lo agradecerá.");
const LEVELS=[
 {id:"level_01",name:"El Calafate",open:true,sign:["Parque Nacional","Los Glaciares"],
  solids:[[1500,170,70],[2300,220,130],[4300,150,60],[4450,150,120],[4600,190,170]],
  ledges:[[2820,300,160],[5250,260,150],[5560,260,270]],
  coins:[[1585,150],[2410,210],[2970,240],[3030,240],[4690,250],[5380,230],[5690,350],[6100,120],[6200,120],[6300,120]],
  hzBase:W1_HZ_BASE.filter(h=>h.x!==5050), hzExtra:W1_HZ_EXTRA, trash:W1_TRASH.map(t=>[t.k,t.name,t.x===4900?4830:t.x]), cps:[300,3300,5200], npcs:W1_NPCS, gate:{x0:4950,x1:5230,type:"ice",sign:"Botas con grampones"},
  bg(){
    tileLayer(img.A,0.015,285*LAYER_SCALE-285*LAYER_SCALE*1.1+0,img.A.naturalHeight*LAYER_SCALE*1.1,img.A.naturalWidth*LAYER_SCALE*1.45);
    tileLayer(img.B,0.12,285*LAYER_SCALE);
    tileLayer(img.C,0.45,690*LAYER_SCALE);
    tileLayer(img.G,1.0,800*LAYER_SCALE,VH-800*LAYER_SCALE);
  }},
 {id:"level_02",name:"Bariloche",open:true,sign:["Parque Nacional","Nahuel Huapi"],
  solids:[[1450,180,80],[3000,200,120],[4350,150,60],[4500,150,130]],
  ledges:[[2000,280,150],[5300,300,160],[5650,240,280]],
  coins:[[1540,170],[2080,210],[2140,210],[3100,200],[3500,120],[4570,190],[5420,220],[5760,340],[6050,120],[6150,120],[6250,120]],
  hzBase:[{k:"bush",x:1050,w:70,h:48},{k:"bush",x:2400,w:70,h:48},{k:"bush",x:3600,w:70,h:48},{k:"bush",x:4250,w:70,h:48},{k:"bush",x:6400,w:70,h:48},
          {k:"weed",skin:"log",x:1900,a:1700,b:2150,dir:1,v:95,rot:0,w:56,h:58},{k:"weed",skin:"log",x:6120,a:5950,b:6300,dir:-1,v:105,rot:0,w:56,h:58}],
  hzExtra:[{k:"bush",x:1350,w:70,h:48},{k:"bush",x:3300,w:70,h:48},{k:"bush",x:5500,w:70,h:48},{k:"weed",skin:"log",x:3500,a:3350,b:3750,dir:1,v:100,rot:0,w:56,h:58}],
  trash:[["bottle","una botella",1200],["can","una lata",2250],["bag","una bolsa",3450],["can","una lata",4200],["bottle","una botella",4850],["bag","una bolsa",6600]],
  cps:[300,3300,5350], npcs:W2_NPCS, gate:{x0:5000,x1:5300,type:"chair",sign:"Boleto de aerosilla"},
  bg(){
    const lk=ctx.createLinearGradient(0,330,0,480); lk.addColorStop(0,"#3a86dc"); lk.addColorStop(1,"#1d5db0"); ctx.fillStyle=lk; ctx.fillRect(0,330,VW,150);
    tileLayer(img.A2,0.02,-30,350,540);
    tileLayer(img.B2,0.08,236,134,690);
    tileLayer(img.C21,0.22,285,200,900);
    const fg=ctx.createLinearGradient(0,470,0,720); fg.addColorStop(0,"#3e8a34"); fg.addColorStop(1,"#245a22"); ctx.fillStyle=fg; ctx.fillRect(0,470,VW,250);
    tileLayer(img.C22,0.5,280,330,900);
    tileLayer(img.G2,1.0,600,120);
  }},
 {id:"level_03",name:"El Chaltén",open:true,sign:["Sendero Fitz Roy","El Chaltén"],
  solids:[[1950,100,40],[3800,150,60],[3930,150,120]],
  ledges:[[3950,260,170],[6000,260,160]],
  coins:[[900,120],[1325,170],[1975,190],[2075,190],[2620,120],[2720,120],[3990,200],[4090,200],[4580,260],[4700,260],[6070,230],[6160,230],[6300,120],[6400,120]],
  gaps:[[1250,1400],[1800,2150],[4400,4950]],
  rafts:[[4410,4780,170,110]],
  hzBase:[{k:"bush",x:1000,w:70,h:48},{k:"bush",x:2700,w:70,h:48},{k:"bush",x:3590,w:70,h:48},{k:"bush",x:4150,w:70,h:48},{k:"bush",x:5800,w:70,h:48},{k:"bush",x:6700,w:70,h:48},
          {k:"weed",skin:"rock",x:5200,a:5050,b:5450,dir:1,v:100,rot:0,w:56,h:58},{k:"weed",skin:"rock",x:6200,a:6100,b:6500,dir:-1,v:110,rot:0,w:56,h:58}],
  hzExtra:[{k:"bush",x:1600,w:70,h:48},{k:"bush",x:3800,w:70,h:48},{k:"bush",x:6850,w:70,h:48},{k:"weed",skin:"rock",x:2650,a:2560,b:2820,dir:1,v:100,rot:0,w:56,h:58}],
  trash:[["bottle","una botella",1100],["can","una lata",2250],["bag","una bolsa",3500],["can","una lata",4050],["bottle","una botella",5250],["bag","una bolsa",6600]],
  cps:[300,3550,5100], npcs:W3_NPCS, gate:{x0:2900,x1:3400,type:"river",stones:[0.14,0.38,0.62,0.86],sign:"Bastones de trekking"},
  bg(){
    tileLayer(img.A3,0.02,-34,450,1118);
    tileLayer(img.B3,0.08,258,150,480);
    tileLayer(img.C31,0.22,285,200,900);
    const fg=ctx.createLinearGradient(0,470,0,720); fg.addColorStop(0,"#86a043"); fg.addColorStop(1,"#4a6a26"); ctx.fillStyle=fg; ctx.fillRect(0,470,VW,250);
    tileLayer(img.C32,0.5,285,330,900);
    tileLayer(img.G,1.0,800*LAYER_SCALE,VH-800*LAYER_SCALE);
  }}
];
let LV=LEVELS[0], levelIdx=0, pickLevel=0;
/* espacios que se insertan en zonas libres para alargar cada mundo sin romper estructuras */
const INS={
 level_01:[[1000,700],[2220,600],[3260,700],[4250,500],[5450,400],[6440,500]],
 level_02:[[950,600],[2330,500],[3250,500],[4150,600],[4800,600],[5900,500],[6350,400]],
 level_03:[[1100,600],[2250,500],[4260,500],[5010,600],[5520,500],[6560,600]]
};

LEVELS.push(
 {id:"level_04",name:"Ushuaia",open:true,sign:["Parque Nacional","Tierra del Fuego"],
  solids:[[1250,150,60],[2850,100,40],[3900,160,70],[6500,150,60],[6650,150,120]],
  ledges:[[1950,260,160],[3300,280,170],[6100,260,190]],
  coins:[[1260,120],[1980,230],[2090,230],[2880,120],[3350,260],[3440,260],[3930,150],[5800,150],[6150,250],[6250,250],[6540,150],[6700,240],[6800,120]],
  gaps:[[1450,1600],[2700,3050],[5000,5500]], rafts:[[5010,5330,170,110]],
  hzBase:[{k:"bush",x:1000,w:70,h:48},{k:"bush",x:2200,w:70,h:48},{k:"bush",x:3200,w:70,h:48},{k:"bush",x:4050,w:70,h:48},{k:"bush",x:6000,w:70,h:48},{k:"bush",x:6850,w:70,h:48},
          {k:"weed",skin:"log",x:1800,a:1650,b:2050,dir:1,v:100,rot:0,w:56,h:58},{k:"weed",skin:"log",x:6300,a:6150,b:6450,dir:-1,v:110,rot:0,w:56,h:58}],
  hzExtra:[{k:"bush",x:1700,w:70,h:48},{k:"bush",x:3450,w:70,h:48},{k:"bush",x:6350,w:70,h:48},{k:"weed",skin:"log",x:3450,a:3350,b:3650,dir:1,v:105,rot:0,w:56,h:58}],
  trash:[["bottle","una botella",1100],["can","una lata",2150],["bag","una bolsa",3150],["can","una lata",3980],["bottle","una botella",5750],["bag","una bolsa",6900]],
  cps:[300,3300,5600], npcs:W4_NPCS, gate:{x0:4300,x1:4800,type:"boat",sign:"Barco para el canal"},
  bg(){
    skyG(360,"#6d7f94","#b6c3cf");
    repObj(560,0.015,(x,k)=>cloudBlob(x,42+hsh(k)*50,1.5+hsh(k+3)*0.8,"rgba(96,108,124,.75)"));
    ridge(0.03,352,70,160,"#8aa2bd",1.3,105); ridge(0.06,366,40,84,"#5f8196",4.1,0);
    const oc=ctx.createLinearGradient(0,352,0,500); oc.addColorStop(0,"#4a86ad"); oc.addColorStop(1,"#2a5f86"); ctx.fillStyle=oc; ctx.fillRect(0,352,VW,150);
    ctx.strokeStyle="rgba(255,255,255,.45)"; ctx.lineWidth=2.5; ctx.lineCap="round"; repObj(70,0.15,(x,k)=>{ const y=372+hsh(k)*110, w=18+hsh(k+1)*16; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+w/2,y-4+Math.sin(t*2+k)*2,x+w,y); ctx.stroke(); });
    repObj(1100,0.1,(x,k)=>{ const w=170+hsh(k)*110, y=372; ctx.fillStyle="#3f6a46"; ctx.beginPath(); ctx.ellipse(x+w/2,y,w/2,18+hsh(k+2)*8,0,Math.PI,0); ctx.fill(); ctx.fillStyle="#2d4f35"; for(let q=0;q<5;q++){ const px=x+w*(0.15+q*0.17), h=24+hsh(k*7+q)*18; ctx.beginPath(); ctx.moveTo(px-8,y); ctx.lineTo(px,y-h); ctx.lineTo(px+8,y); ctx.closePath(); ctx.fill(); }
      if(k%2===0) drawLighthouse(x+w+120,y+4,1.25); });
    const fg=ctx.createLinearGradient(0,470,0,720); fg.addColorStop(0,"#566240"); fg.addColorStop(1,"#323d2a"); ctx.fillStyle=fg; ctx.fillRect(0,470,VW,250);
    tileLayer(img.C42,0.5,440,190,518);
    tileLayer(img.G,1.0,800*LAYER_SCALE,VH-800*LAYER_SCALE);
    ctx.save(); ctx.strokeStyle="rgba(215,230,255,.5)"; ctx.lineWidth=2; ctx.beginPath(); for(let i=0;i<90;i++){ const x=((i*97+t*140)%(VW+60))-30, y=((i*53+t*720)%(VH+40))-20; ctx.moveTo(x,y); ctx.lineTo(x-9,y+24); } ctx.stroke(); ctx.restore();
  }},
 {id:"level_05",name:"Puerto Madryn",open:true,sign:["Península Valdés","Puerto Madryn"],
  solids:[[1000,150,60],[2600,170,90],[5100,150,60],[5250,150,120]],
  ledges:[[1750,260,160],[4000,260,170],[6000,300,200]],
  coins:[[1010,120],[1790,230],[1900,230],[2650,150],[4050,240],[4150,240],[5130,130],[5300,200],[6050,260],[6200,260],[6350,120],[6500,120]],
  gaps:[[1400,1550],[4300,4850]], rafts:[[4310,4680,170,110]],
  hzBase:[{k:"bush",x:900,w:70,h:48},{k:"bush",x:2000,w:70,h:48},{k:"bush",x:2450,w:70,h:48},{k:"bush",x:3900,w:70,h:48},{k:"bush",x:5000,w:70,h:48},{k:"bush",x:5950,w:70,h:48},{k:"bush",x:6600,w:70,h:48},
          {k:"weed",skin:"rock",x:2450,a:2330,b:2570,dir:1,v:115,rot:0,w:56,h:58},{k:"weed",skin:"rock",x:5900,a:5750,b:5990,dir:-1,v:115,rot:0,w:56,h:58}],
  hzExtra:[{k:"bush",x:1250,w:70,h:48},{k:"bush",x:4200,w:70,h:48},{k:"bush",x:6450,w:70,h:48},{k:"weed",skin:"rock",x:1900,a:1800,b:2000,dir:1,v:110,rot:0,w:56,h:58}],
  trash:[["bottle","una botella",1250],["can","una lata",2350],["bag","una bolsa",3850],["can","una lata",4000],["bottle","una botella",5450],["bag","una bolsa",6700]],
  cps:[300,2900,5000], npcs:W5_NPCS, gate:{x0:3000,x1:3500,type:"binoc",sign:"Binoculares"},
  bg(){
    skyG(260,"#2d8ae6","#bfe6fb");
    const sg=ctx.createRadialGradient(VW*0.8,90,0,VW*0.8,90,90); sg.addColorStop(0,"#fffbe0"); sg.addColorStop(0.4,"#fff3b0"); sg.addColorStop(1,"rgba(255,243,176,0)"); ctx.fillStyle=sg; ctx.fillRect(VW*0.8-100,0,200,200);
    repObj(640,0.015,(x,k)=>cloudBlob(x,50+hsh(k)*70,1.3+hsh(k+2)*0.7,"rgba(255,255,255,.92)"));
    for(let i=0;i<3;i++) drawGull(((i*420+t*55)%(VW+200))-100,60+i*38+Math.sin(t*1.3+i)*8,1.3-i*0.15,t*7+i*2);
    const oc=ctx.createLinearGradient(0,255,0,520); oc.addColorStop(0,"#79cdf0"); oc.addColorStop(0.25,"#2a9ae0"); oc.addColorStop(1,"#0f5ba8"); ctx.fillStyle=oc; ctx.fillRect(0,255,VW,265);
    ctx.fillStyle="rgba(255,255,255,.55)"; for(let q=0;q<46;q++){ const x=((q*97+t*(8+q%5))%(VW+40))-20, y=262+((q*53)%230); ctx.fillRect(x,y,4+q%3*3,2); }
    repObj(1300,0.05,(x,k)=>drawShip(x+(k%3)*140,282+(k%2)*8,0.5+0.1*(k%2),k%2));
    repObj(1500,0.08,(x,k)=>drawShip(x+300,318+(k%2)*10,0.8,(k+1)%2));
    repObj(1700,0.12,(x,k)=>{ const v=Math.max(0,Math.sin(t*0.8+k*2.3)); if(v>0.05) drawWhaleTail(x+500,352,v); });
    const sa=ctx.createLinearGradient(0,470,0,720); sa.addColorStop(0,"#efdca4"); sa.addColorStop(1,"#c9a868"); ctx.fillStyle=sa; ctx.fillRect(0,470,VW,250);
    ctx.fillStyle="rgba(255,255,255,.55)"; repObj(210,0.3,(x,k)=>{ ctx.beginPath(); ctx.ellipse(x,476+hsh(k)*10,60,5,0,0,6.3); ctx.fill(); });
    repObj(980,0.45,(x,k)=>{ if(k%2===0){ drawSeaLion(x,540,1.1); drawSeaLion(x+70,552,0.8); } else { drawPeng(x,548,1.0); drawPeng(x+40,554,0.8); drawPeng(x+78,546,0.9); } });
    tileLayer(img.C52,0.55,520,110,300);
    tileLayer(img.G,1.0,800*LAYER_SCALE,VH-800*LAYER_SCALE);
  }}
);
{ const H={level_01:"Che, caminante: si ves pasar un cóndor por el cielo, sacale una foto con el botón 📷. ¡Algo especial va a pasar!",
  level_02:"Los del bosque contamos que, si pasa un cóndor y le sacás una foto con 📷, aparece alguien con una sorpresa.",
  level_03:"Mirá siempre al cielo: cuando cruce un cóndor, tomale una foto con 📷. La montaña te va a regalar algo.",
  level_04:"Dicen que, si un cóndor pasa por el canal y le tomás una foto con 📷, llega un guardaparque con un desafío.",
  level_05:"Si ves un cóndor sobre la costa, ¡fotografialo con 📷! Algo especial va a suceder."};
  for(const L of LEVELS){ const f=L.npcs[0]; if(f&&!f.lines.includes(H[L.id])) f.lines.push(H[L.id]); } }
INS.level_04=[[1150,600],[2450,500],[3620,500],[4100,500],[4850,400],[5550,400],[6460,400]];
INS.level_05=[[1220,600],[2080,500],[2790,500],[3550,500],[4280,500],[4900,500],[5520,400],[6330,400]];
function loadLevel(i){
  levelIdx=i; LV=LEVELS[i];
  const L=INS[LV.id]||[], W=x=>{ let a=0; for(const q of L) if(x>=q[0]) a+=q[1]; return x+a; };
  WORLD=W(7200); GOAL_X=WORLD-180;
  solids.length=0; LV.solids.forEach(([x,w,h])=>solids.push({x:W(x),w,h}));
  ledges.length=0; LV.ledges.forEach(([x,w,up])=>ledges.push({x:W(x),w,top:GROUND-up}));
  coins.length=0; LV.coins.forEach(([x,o])=>coins.push({x:W(x),y:GROUND-o,ox:W(x),oy:GROUND-o,got:false}));
  HZ_BASE.length=0; LV.hzBase.forEach(h=>{ const c=Object.assign({},h); c.x=W(c.x); if(c.a!=null){ c.a=W(c.a); c.b=W(c.b); } HZ_BASE.push(c); });
  HZ_EXTRA.length=0; LV.hzExtra.forEach(h=>{ const c=Object.assign({},h); c.x=W(c.x); if(c.a!=null){ c.a=W(c.a); c.b=W(c.b); } HZ_EXTRA.push(c); });
  trash.length=0; LV.trash.forEach(([k,name,x])=>trash.push({k,name,x:W(x),got:false}));
  CPS.length=0; LV.cps.forEach(c=>CPS.push(W(c))); cp=CPS[0];
  NPCS.length=0; LV.npcs.forEach(n=>NPCS.push(Object.assign({near:false,face:-1,done:false,pitch:PITCH[n.id]||250},n,{x:W(n.x)}))); NPC=NPCS[0];
  gaps.length=0; (LV.gaps||[]).forEach(([a,b])=>gaps.push({x0:W(a),x1:W(b)}));
  rafts.length=0; (LV.rafts||[]).forEach(([a,b,w,v])=>rafts.push({a:W(a),b:W(b),w,v,x:W(a),dir:1,top:GROUND+2}));
  gates.length=0; if(LV.gate) gates.push(Object.assign({cool:0},LV.gate,{x0:W(LV.gate.x0),x1:W(LV.gate.x1)})); cine=null; gateCur=null;
  // rellenos en los tramos nuevos: estrellas, plataformas, obstáculos y basura
  let prev=0; const skin=LV.id==="level_02"?"log":LV.id==="level_03"?"rock":null;
  L.forEach(([px,d],j)=>{ const s0=px+prev, mid=s0+d/2; prev+=d;
    for(let x=s0+90;x<s0+d-60;x+=110) coins.push({x,y:GROUND-45,ox:x,oy:GROUND-45,got:false});
    if(j%2===0){ HZ_BASE.push({k:"bush",x:s0+d*0.3,w:70,h:48}); ledges.push({x:s0+d*0.55,w:170,top:GROUND-210}); for(const dx of [20,85,150]) coins.push({x:s0+d*0.55+dx,y:GROUND-275,ox:s0+d*0.55+dx,oy:GROUND-275,got:false}); }
    else if(skin){ HZ_BASE.push({k:"weed",skin,x:mid,a:s0+70,b:s0+d-70,dir:1,v:100,rot:0,w:56,h:58}); }
    else { HZ_BASE.push({k:"weed",x:mid,a:s0+70,b:s0+d-70,dir:1,v:95,rot:0,w:56,h:58}); }
    if(j===1||j===4) trash.push({k:j===1?"can":"bottle",name:j===1?"una lata":"una botella",x:s0+d*0.82,got:false});
  });
  // ubicación de los personajes: repartidos a lo largo del mundo, el primero recién tras recorrer un buen tramo
  const FR=[0.2,0.4,0.62,0.8], hard=x=>gaps.some(g=>x>g.x0-130&&x<g.x1+130)||gates.some(g=>x>g.x0-230&&x<g.x1+230)||solids.some(q=>x>q.x-120&&x<q.x+q.w+120),
    soft=x=>ledges.some(l=>x>l.x-40&&x<l.x+l.w+40)||HZ_BASE.concat(HZ_EXTRA).some(h=>Math.abs(h.x-x)<150||(h.a!=null&&x>h.a-130&&x<h.b+130))||trash.some(r=>Math.abs(r.x-x)<90);
  { const la=NPCS[NPCS.length-1]; if(la){ la.mini="puzzle"; la.info=["Rompecabezas del Guardián","Tocá dos piezas para intercambiarlas y armá la imagen. Mirá el modelo de la izquierda."]; la.lines=la.lines.map(l=>l.includes("Respondé Sí o No")?"Para cerrar este mundo, armá mi rompecabezas: tocá dos piezas para intercambiarlas.":l); } }
  let prevX=0; NPCS.forEach((n,i)=>{ const x0=Math.max(prevX+1600,WORLD*FR[i]), lim=WORLD-650; let x=x0; while((hard(x)||soft(x))&&x<lim) x+=40; if(hard(x)||soft(x)){ x=x0; while(hard(x)&&x<lim) x+=40; } if(hard(x)){ x=x0; while(hard(x)&&x>prevX+800) x-=40; } n.x=x; prevX=x; });
  { const gt=gates[0], all=()=>HZ_BASE.concat(HZ_EXTRA);
    const okF=x=>{ const r=okF0(x); return r; }, okF0=x=>x>1000&&x<WORLD-600&&!inGap(x-110)&&!inGap(x)&&!inGap(x+110)&&!all().some(h=>Math.abs(h.x-x)<115||(h.a!=null&&x>h.a-90&&x<h.b+90))&&!trash.some(r=>Math.abs(r.x-x)<80)&&!NPCS.some(n=>Math.abs(n.x-x)<200)&&!solids.some(q=>x>q.x-150&&x<q.x+q.w+150)&&!(gt&&x>gt.x0-330&&x<gt.x1+330);
    const put=[]; for(const f of [0.2,0.47,0.76]){ let found=null; for(let d=0;d<=1800&&found===null;d+=40) for(const sg of [1,-1]){ const x=Math.round(WORLD*f+sg*d); if(okF(x)&&put.every(q=>Math.abs(q-x)>900)){ found=x; break; } } if(found!==null){ put.push(found); HZ_BASE.push({k:"fox",x:found,a:found-80,b:found+80,dir:-1,v:70,w:70,h:46,st:"patrol",t:0,cd:0,face:-1}); } }
    const PLAN={level_01:[["bird","carancho",.33],["piche",0,.60]],level_02:[["bird","carancho",.35],["bird","carancho",.88]],level_03:[["piche",0,.33],["bird","carancho",.63],["piche",0,.9]],level_04:[["bird","skua",.33],["bird","skua",.63]],level_05:[["piche",0,.33],["bird","skua",.58],["piche",0,.88]]};
    const okP=x=>okF0(x)&&[-260,-130,130,260].every(o=>!inGap(x+o))&&!solids.some(q=>x>q.x-260&&x<q.x+q.w+260);
    for(const [kk,sp,f] of (PLAN[LV.id]||[])){ let found=null; const ok=kk==="piche"?okP:okF0;
      for(let d=0;d<=WORLD*0.7&&found===null;d+=40) for(const sg of [1,-1]){ const x=Math.round(WORLD*f+sg*d); if(ok(x)&&put.every(q=>Math.abs(q-x)>(kk==="piche"?380:380))){ found=x; break; } }
      if(found!==null){ put.push(found); HZ_BASE.push(kk==="bird"?{k:"bird",sp,x:found,a:found-150,b:found+150,y:GROUND-290,w:48,h:40,st:"hover",t:Math.random()*6,tm:0,tx:found,cd:1.5,ph:f*9,face:1}:{k:"piche",x:found,a:found-90,b:found+90,dir:-1,v:48,w:56,h:34,st:"walk",t:0,cd:0,face:-1,rot:0}); } }
  }
  $("trashCt").textContent="0/"+trash.length;
}
loadLevel(0);

/* ---------- cóndor, guardaparque y subniveles ---------- */
const SUBINFO={
 level_01:{key:"ice",title:"Grietas del glaciar",art:"ice",bonus:300,tw:300,len:6500,
   say:"¡Excelente foto, Guardián! Soy Ramiro, guardaparque. Pocos ven al cóndor, así que te muestro un desafío extra.",
   desc:"Líneas de grietas cortan el glaciar y el hielo se rompe a tus espaldas. Buscá el puente de nieve (la abertura) y pasá moviéndote ← →."},
 level_02:{key:"forest",title:"Cruce de fauna",art:"river",bonus:400,tw:260,len:6500,
   say:"¡Gran foto, Guardián! Soy Ramiro, guardaparque. El cóndor trae suerte: te invito a un desafío extra.",
   desc:"Pudúes, huemules y guanacos cruzan el sendero. Pasá por detrás sin asustarlos y juntá la basura del camino con ← →."},
 level_03:{key:"climb",title:"Ascenso con viento",art:"river",bonus:500,tw:260,len:6500,
   say:"¡Qué foto, Guardián! Soy Ramiro, guardaparque. La montaña te regala un desafío extra.",
   desc:"El viento te empuja de costado y caen piedras. Compensá con ← → y esquivá los avisos rojos."}
};
function drawCondor(){
  if(!condor.active) return; const c=condor, x=VW+120-(VW+240)*(c.t/CONDOR_DUR), y=210+Math.sin(c.t*1.4)*34, fl=Math.sin(c.t*4.2), sc=1.1;
  ctx.save(); ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; rr(x-92,y+58,184,32,12); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.font="800 16px sans-serif"; ctx.textAlign="center"; ctx.fillText("¡Sacale una foto! 📷",x,y+80); ctx.restore();
  ctx.save(); ctx.translate(x,y); ctx.scale(sc,sc); ctx.lineJoin="round"; ctx.strokeStyle="#0c0c10"; ctx.lineWidth=3.5;
  for(const sd of [-1,1]){
    ctx.fillStyle="#1d1d24"; ctx.beginPath(); ctx.moveTo(sd*8,-4);
    ctx.quadraticCurveTo(sd*70,-40-fl*34,sd*150,-14+fl*52); ctx.lineTo(sd*134,-2+fl*50); ctx.lineTo(sd*140,12+fl*44); ctx.lineTo(sd*112,10+fl*34); ctx.lineTo(sd*112,24+fl*26); ctx.lineTo(sd*80,14+fl*16); ctx.lineTo(sd*60,26+fl*8); ctx.quadraticCurveTo(sd*30,24,sd*8,14); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#f4f4f4"; ctx.beginPath(); ctx.moveTo(sd*40,-6-fl*10); ctx.quadraticCurveTo(sd*80,-22-fl*20,sd*104,-4+fl*20); ctx.lineTo(sd*84,6+fl*14); ctx.lineTo(sd*50,6); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle="#1d1d24"; ctx.beginPath(); ctx.ellipse(0,6,14,24,0,0,6.3); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#fff"; ctx.beginPath(); ctx.ellipse(0,-12,13,6,0,0,6.3); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#c9857a"; ctx.beginPath(); ctx.arc(-3,-26,9,0,6.3); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#e8c14a"; ctx.beginPath(); ctx.moveTo(-10,-27); ctx.lineTo(-20,-22); ctx.lineTo(-10,-21); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function condorUpdate(dt){
  const c=condor;
  if(!c.spawned && !lvl.fin){ const ready=CONDOR_PREVIEW?lvl.time>=6:(NPCS[0]&&NPCS[0].done&&((c.wait=(c.wait||0)+dt)>=CONDOR_WAIT));
    if(ready){ c.spawned=true; c.active=true; c.t=0; c.n=1; toast("¡Un cóndor sobrevuela el cielo! Tocá 📷 para sacarle una foto"); AM.sfx("condor"); } }
  if(c.active){ c.t+=dt; if(c.t>=CONDOR_DUR){ c.active=false; c.gone=0; } }
  else if(c.spawned&&!c.shot&&!ranger&&(c.n||1)<3&&!lvl.fin){ c.gone=(c.gone||0)+dt; if(c.gone>=25){ c.active=true; c.t=0; c.n=(c.n||1)+1; c.gone=0; toast("¡El cóndor vuelve a pasar! Tocá 📷"); AM.sfx("condor"); } }
  $("bPhoto").classList.toggle("alert",c.active);
  if(ranger){ ranger.t+=dt; if(ranger.intro && ranger.t>=1.6 && !talking){ ranger.intro=false; openRanger(); } }
}
function condorShot(){
  condor.active=false; condor.shot=true; addScore(200); AM.sfx("reward"); toast("¡Foto destacada: el cóndor! +200");
  if(!ranger){ let x=P.x+170; if(inGap(x)||inGap(x+60)||x>WORLD-200) x=P.x-170; ranger={x,t:0,intro:true,done:false}; }
}
function drawRanger(){
  if(!ranger||!img.ranger) return; const im=img.ranger, H=sizeH()*1.12, k=H/im.naturalHeight, slide=(1-smooth(Math.min(1,ranger.t/1.3)))*460, x=ranger.x-cam+slide;
  if(x<-200||x>VW+500) return; drawShadow(x,GROUND,H*0.3,.35);
  ctx.save(); ctx.translate(x,GROUND); ctx.scale(1,1+Math.sin(t*2.2)*0.012); ctx.drawImage(im,-im.naturalWidth*k/2,-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); ctx.restore();
  if(ranger.done){ ctx.fillStyle="#4fa81e"; ctx.strokeStyle="#173f12"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,GROUND-H-14,13,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.font="900 16px sans-serif"; ctx.textAlign="center"; ctx.fillText("✓",x,GROUND-H-8); }
}
function openRanger(){
  const inf=SUBINFO[LV.id]; if(!inf) return; talking=true; for(const k in keys) keys[k]=false; releaseJump(); P.vx=0; AM.sfx("open");
  $("rArt").innerHTML=GART[inf.art]||""; $("rPas").src=IMG.ranger; $("rTitle").textContent="Desafío extra: "+inf.title;
  $("rSay").textContent=ranger&&ranger.done?"¡Ya completaste mi desafío, Guardián! Podés repetirlo, pero el bonus se entrega una sola vez.":inf.say;
  $("rDesc").textContent=inf.desc; $("rBonus").textContent="Bonus: ★ "+inf.bonus+" al llegar a la meta"; $("rangerScene").classList.add("on");
}
function closeRanger(){ $("rangerScene").classList.remove("on"); talking=false; }
$("rLater").addEventListener("click",closeRanger);
$("rEnter").addEventListener("click",()=>{ $("rangerScene").classList.remove("on"); showTuto(); });
const TUTO={
 ice:["Cada línea de grietas oscuras tiene UNA abertura: el puente de nieve. ¡Pasá por ahí!","El hielo se rompe detrás tuyo: no te frenes ni te quedes en los costados."],
 forest:["Los animales cruzan el sendero: calculá y pasá por detrás de ellos. ¡Asustarlos te cuesta un corazón!","Juntá latas, botellas y bolsas: cada pieza suma ★ y deja el bosque limpio."],
 climb:["Cuando aparece una flecha de viento, te empuja de costado: empujá en sentido contrario con ← →.","Una flecha roja arriba avisa que cae una piedra: ¡esquivala!"]
};
SUBINFO.level_04={key:"train",title:"Tren del Fin del Mundo",art:"sea",bonus:600,tw:300,len:7000,
   say:"¡Qué foto, Guardián! Soy Ramiro, guardaparque. Si sabés seguir las vías, te subo al Tren del Fin del Mundo.",
   desc:"Seguí la vía del tren con ← →. En las bifurcaciones, elegí el desvío con luz verde: el de luz roja termina cortado."};
SUBINFO.level_05={key:"sail",title:"Entre ballenas y lobos marinos",art:"coast",bonus:700,tw:330,len:7000,
   say:"¡Gran foto, Guardián! Soy Ramiro, guardaparque. Te invito a navegar el golfo sin molestar a nadie.",
   desc:"Navegá con ← →. Las ballenas suben a respirar (aparece un círculo oscuro en el agua) y los lobos marinos descansan en las rocas: rodealos."};
TUTO.train=["Seguí la vía con ← →: si te salís demasiado, ¡el tren descarrila!","En las bifurcaciones andá por el desvío con luz verde: el de luz roja termina cortado."];
TUTO.sail=["Cuando veas un círculo oscuro en el agua, una ballena va a subir a respirar: ¡alejate!","Los lobos marinos descansan en rocas: rodealas sin acercarte."];
SUBINFO.level_02={key:"trees",title:"Slalom entre árboles",art:"river",bonus:400,tw:260,len:6500,
   say:"¡Gran foto, Guardián! Soy Ramiro, guardaparque. El cóndor trae suerte: te invito a correr por el bosque andino.",
   desc:"Corré por el bosque y esquivá los árboles buscando el hueco por donde pasar con ← →. Las estrellas marcan el camino libre."};
SUBINFO.level_03={key:"stones",title:"Cruce de piedra en piedra",art:"river",bonus:500,tw:260,len:6000,
   say:"¡Qué foto, Guardián! Soy Ramiro, guardaparque. Para llegar a la otra orilla hay que cruzar el río saltando de piedra en piedra.",
   desc:"Apuntá con ← → y tocá SALTAR para pasar a la siguiente fila de piedras. Algunas se deslizan. ¡Si caés al agua perdés un corazón!"};
SUBINFO.level_04={key:"fog",title:"Canal Beagle en la niebla",art:"sea",bonus:600,tw:300,len:7000,
   say:"¡Excelente foto, Guardián! Soy Ramiro, guardaparque. En el Canal Beagle la niebla es espesa: vas a navegar guiándote por los faros.",
   desc:"Navegá con ← →. La niebla esconde rocas, boyas, hielo flotante y islotes con faro; cada tanto un faro destella y ves todo el canal por un instante."};
TUTO.trees=["Buscá el hueco entre los árboles y pasá por ahí moviéndote ← →.","Chocar con un tronco te cuesta un corazón. Las estrellas marcan el camino libre."];
TUTO.stones=["Apuntá con ← → y tocá el botón ⬆ SALTAR: Pascacio salta a la siguiente fila de piedras.","Algunas piedras se deslizan: calculá dónde van a estar. ¡Si caés al agua perdés un corazón!"];
TUTO.fog=["La niebla esconde rocas, boyas, hielo flotante y los islotes con faro: solo ves lo cercano.","Cuando un faro avisa y destella, ves todo el canal por un segundo: memorizá el hueco y pasá."];
function showTuto(){
  const inf=SUBINFO[LV.id], tp=TUTO[inf.key]; $("tTitle").textContent="Cómo se juega: "+inf.title; $("tDemo").className="tdemo "+inf.key; $("tPas").src=IMG.idle;
  $("tSteps").innerHTML=(inf.key==="stones"?"<li><b>Pascacio espera sobre una piedra.</b> Nada se mueve hasta que vos saltes.</li><li><b>Deslizá ← → en el joystick</b> para apuntar y tocá <b>⬆ SALTAR</b> (barra espaciadora en compu).</li>":"<li><b>Pascacio avanza solo.</b> No hace falta apretar nada para avanzar.</li><li><b>Deslizá el dedo ← → en el joystick de abajo</b> para moverte de costado.</li>")+"<li>"+tp[0]+"</li><li>"+tp[1]+" Si perdés los corazones, volvés al último punto.</li><li>Sin tiempo: jugá tranquilo. Podés salir con «Volver al nivel».</li>";
  $("subTuto").classList.add("on");
}
$("tGo").addEventListener("click",()=>{ $("subTuto").classList.remove("on"); talking=false; enterSub(); });
$("tBack").addEventListener("click",()=>{ $("subTuto").classList.remove("on"); talking=false; });
$("subExit").addEventListener("click",()=>exitSub(false));
$("sdOk").addEventListener("click",()=>{ $("subDone").classList.remove("on"); exitSub(true); });

/* ---- motor vertical ---- */
const hh=k=>{ const x=Math.sin(k*127.1+311.7)*43758.5453; return x-Math.floor(x); };
function trkX(S,y){ const pr=Math.min(1,y/S.LEN), A=Math.min(S.TW-110,95+95*pr); return A*Math.sin(y/430+S.ph); }
function trkBranch(S,f,y){ const u=Math.max(0,Math.min(1,(y-f.y0)/190)); return trkX(S,y)+f.dir*250*(u*u*(3-2*u)); }
function enterSub(){
  const inf=SUBINFO[LV.id], seed=levelIdx*97+13, TW=inf.tw, LEN=inf.len;
  sub={inf,key:inf.key,TW,LEN,y:0,x:0,face:1,air:0,inv:0,t:0,got:0,done:false,cp:0,ev:[],evT:1.6,breakY:-380,stars:[],cre:[],ice:[],an:[],lit:[],litGot:0,wind:{dir:1,state:"idle",t:2.2},seed,moving:false,cd:3.2};
  if(inf.key==="ice"){ for(let y=900,i=0;y<LEN-600;y+=500,i++){ const w=Math.max(120,190-i*6), ox=(hh(seed+i)-.5)*2*(TW-w/2-34);
      sub.cre.push({y0:y,y1:y+56,x0:-TW,x1:ox-w/2},{y0:y,y1:y+56,x0:ox+w/2,x1:TW}); } }
  if(inf.key==="forest"){ const kinds=["pudu","huemul","poncho"];
    for(let y=820,i=0;y<LEN-500;y+=430,i++){ const dir=hh(seed+i+9)<.5?-1:1; sub.an.push({y,x:-dir*(TW+90),vx:dir*(115+hh(seed+i+3)*85),kind:kinds[i%3],on:false});
      if(i%4===3) sub.an.push({y:y+70,x:dir*(TW+90),vx:-dir*(105+hh(seed+i+5)*60),kind:kinds[(i+1)%3],on:false}); }
    for(let y=640,i=0;y<LEN-300;y+=370,i++) sub.lit.push({x:(hh(seed+i+400)-.5)*2*(TW-60),y,k:["can","bottle","bag"][i%3],got:false}); }
  if(inf.key==="train"){ sub.ph=hh(seed)*6; sub.forks=[]; for(let y=1300,i=0;y<LEN-900;y+=1350,i++) sub.forks.push({y0:y,y1:y+520,dir:hh(seed+i+7)<.5?-1:1}); }
  if(inf.key==="sail"){ for(let y=760,i=0;y<LEN-420;y+=330,i++){ const gx=(hh(seed+i+21)-.5)*2*(TW-130), side=hh(seed+i+5)<.5?-1:1, r=hh(seed+i+15);
      const ob=(x,kind)=>{ x=Math.max(-TW+60,Math.min(TW-60,x)); if(kind==="whale") sub.an.push({kind,x,y,off:hh(seed+i+3)*5,t:0}); else sub.an.push({kind,x,y:y+(hh(seed+i)-.5)*60}); };
      if(r<.4) ob(gx+side*190,"whale"); else if(r<.7) ob(gx+side*160,"seal"); else { ob(gx+190,"whale"); ob(gx-170,"seal"); } } }
  if(inf.key==="trees"){ sub.trees=[]; let gx=0; for(let y=720,i=0;y<LEN-420;y+=190,i++){ gx=Math.max(-TW+120,Math.min(TW-120,gx+(hh(seed+i*3)-.5)*2*170)); const gw=Math.max(92,118-i*0.8);
      for(let x=-TW-20;x<=TW+20;x+=64){ if(Math.abs(x-gx)<gw) continue; sub.trees.push({x:x+(hh(seed+i*7+x)-.5)*16,y:y+(hh(seed+i+x*0.3)-.5)*60,r:24+hh(seed+x+i)*8,k:hh(seed+i*5+x)<.3?1:0}); }
      sub.stars.push({x:gx,y,got:false}); }
    sub.trees.sort((a,b)=>b.y-a.y); }
  if(inf.key==="stones"){ const RS=200, N=Math.round(LEN/RS); sub.rows=[]; for(let i=0;i<=N;i++){ const row={y:i*RS,st:[]};
      if(i===0||i===N) row.st.push({bx:0,amp:0,sp:0,ph:0,r:84,star:false});
      else { const n=i<8?3:2, used=[]; let tries=0; while(row.st.length<n&&tries<60){ tries++; const bx=(hh(seed+i*11+tries)-.5)*2*(TW-70); if(used.some(u=>Math.abs(u-bx)<130)) continue; used.push(bx);
          const mv=i>6&&hh(seed+i*13+tries)<Math.min(.55,i/50); row.st.push({bx,amp:mv?55+hh(seed+i)*45:0,sp:mv?0.9+hh(seed+i*2)*0.7:0,ph:hh(seed+i*5+tries)*6.3,r:40+hh(seed+i*3+tries)*10,star:hh(seed+i*17+tries)<.5}); } }
      sub.rows.push(row); }
    sub.row=0; sub.on=sub.rows[0].st[0]; sub.hop=null; sub.px=null; document.body.classList.add("stones"); }
  if(inf.key==="fog"){ sub.ob=[]; let gx=0; for(let y=760,i=0;y<LEN-480;y+=270,i++){ gx=Math.max(-TW+140,Math.min(TW-140,gx+(hh(seed+i*3)-.5)*2*190)); const gw=108, side=hh(seed+i+4), kinds=["rock","faro","buoy","ice"];
      const mk=(x,kind)=>{ const r=kind==="buoy"?26:kind==="faro"?58:kind==="ice"?44:56; x=Math.max(-TW+r*0.4,Math.min(TW-r*0.4,x)); sub.ob.push({kind,x,ox:x,amp:kind==="ice"?40:0,ph:hh(seed+i*2+x)*6.3,y:y+(hh(seed+i*9+x)-.5)*50,r}); };
      if(side<.7) mk(gx-gw-60,kinds[Math.floor(hh(seed+i*5)*4)]); if(side>.3) mk(gx+gw+60,kinds[Math.floor(hh(seed+i*6)*4)]);
      sub.stars.push({x:gx,y,got:false}); }
    sub.fl={t:3.2,st:"idle"}; }
  if(!["trees","stones","fog"].includes(inf.key)) for(let y=420,i=0;y<LEN-300;y+=230,i++){ let x=(hh(seed+i+200)-.5)*2*(TW-70); if(inf.key==="train") x=trkX(sub,y); const bad=sub.cre.some(c=>y>c.y0-30&&y<c.y1+30&&x>c.x0-30&&x<c.x1+30); if(!bad) sub.stars.push({x,y,got:false}); }
  document.body.classList.add("sub"); restBase(); toast("Subnivel: "+inf.title); AM.play("sub_"+LV.id);
}
function exitSub(done){
  if(sub&&ranger&&done) ranger.done=true; sub=null; document.body.classList.remove("sub","stones"); restBase(); P.vx=0; AM.play(LV.id); toast(done?"Volvés al nivel principal":"Volvés al nivel principal");
}
function subHurt(newY,msg){
  if(sub.inv>0) return; AM.sfx("hurt"); lives--; renderHearts(); sub.inv=1.5;
  if(lives<=0){ gameOver(); }
  else { if(newY!=null) sub.y=Math.max(0,newY); toast(msg||"¡Cuidado!"); }
}
function finishSub(){
  sub.done=true; const first=!(ranger&&ranger.done), b=first?sub.inf.bonus:0; if(b) addScore(b); AM.sfx("reward");
  $("sdB").textContent=(first?"Bonus +"+b+" ★":"Repetiste el desafío")+" · Estrellas recogidas: "+sub.got+(sub.key==="forest"?" · Basura: "+sub.litGot+"/"+sub.lit.length:""); $("subDone").classList.add("on");
}
function stX(S,s){ return Math.max(-S.TW+30,Math.min(S.TW-30,s.bx+s.amp*Math.sin(S.t*s.sp+s.ph))); }
function fogA(S,y){ const dy=y-S.y, F=S.fl; if(F&&F.st==="flash"&&dy<950&&dy>-200) return 1; if(dy<-120) return 0; return Math.max(0,Math.min(1,(330-dy)/150)); }
function subStep(dt){
  const S=sub; if(S.done) return; S.t+=dt; S.inv=Math.max(0,S.inv-dt); S.air=Math.max(0,S.air-dt);
  let ax=0;
  if(input.stickOn) ax=Math.abs(input.stickX)<0.1?0:input.stickX; else ax=(keys["arrowright"]||keys["d"]?1:0)-(keys["arrowleft"]||keys["a"]?1:0);
  const jp=P.jumpBuf>0; P.jumpBuf=0;
  if(S.cd>0){ S.cd-=dt; S.moving=false; S.t-=dt; if(ax) S.face=ax>0?1:-1; return; }
  let v=(S.key==="climb"?190:S.key==="forest"?215:215)*(1+0.18*S.y/S.LEN), slow=1;
  if(S.key==="stones") v=0; if(v>0) v*=slow; S.y=Math.max(0,Math.min(S.LEN,S.y+v*dt)); S.x=Math.max(-S.TW+30,Math.min(S.TW-30,S.x+ax*300*dt));
  S.moving=true; if(ax) S.face=ax>0?1:-1; P.phase+=dt*8;
  S.cp=Math.max(S.cp,Math.floor(S.y/2000)*2000);
  for(const st of S.stars){ if(!st.got&&Math.abs(st.y-S.y)<40&&Math.abs(st.x-S.x)<42){ st.got=true; S.got++; addScore(25); AM.sfx("collect"); } }
  const prog=S.y/S.LEN;
  if(S.key==="ice"){
    for(const c of S.cre) if(S.inv<=0&&S.y+10>c.y0&&S.y-8<c.y1&&S.x+16>c.x0&&S.x-16<c.x1){ subHurt(c.y0-150,"¡Chocaste con la grieta! Buscá el puente de nieve"); break; }
    S.breakY+=(52+38*prog)*dt; if(S.y<S.breakY+30 && S.inv<=0) { subHurt(S.breakY+300,"¡El hielo se rompe detrás tuyo! Avanzá"); }
  } else if(S.key==="forest"){
    for(const a of S.an){ if(!a.on&&a.y-S.y<540) a.on=true; if(a.on) a.x+=a.vx*dt;
      if(S.inv<=0&&Math.abs(a.y-S.y)<30&&Math.abs(a.x-S.x)<46){ subHurt(a.y-170,"¡Asustaste a la fauna! Esperá a que crucen"); } }
    for(const l of S.lit){ if(!l.got&&Math.abs(l.y-S.y)<34&&Math.abs(l.x-S.x)<40){ l.got=true; S.litGot++; addScore(40); AM.sfx("trash"); } }
  } else if(S.key==="train"){
    let d=Math.abs(S.x-trkX(S,S.y));
    for(const f of S.forks){ if(S.y>=f.y0&&S.y<=f.y1){ const bx=trkBranch(S,f,S.y); d=Math.min(d,Math.abs(S.x-bx));
        if(S.y>f.y1-26&&Math.abs(S.x-bx)<44&&S.inv<=0){ subHurt(f.y0-120,"¡Vía cortada! Elegí el desvío con luz verde"); S.x=trkX(S,Math.max(0,f.y0-120)); } } }
    if(d>56){ S.off=(S.off||0)+dt; S.y=Math.max(0,S.y-v*dt*0.4); if(S.off>1.3){ S.off=0; subHurt(S.y-260,"¡El tren descarriló! Seguí la vía"); S.x=trkX(S,S.y); } } else S.off=Math.max(0,(S.off||0)-dt*2);
  } else if(S.key==="sail"){
    for(const a of S.an){ if(a.kind==="whale"){ a.t+=dt; a.ph=(a.t+a.off)%5; a.up=a.ph>2.0&&a.ph<3.9; if(a.up&&S.inv<=0&&Math.abs(a.y-S.y)<62&&Math.abs(a.x-S.x)<112) subHurt(a.y-230,"¡Cuidado con la ballena! Alejate cuando suba"); }
      else if(S.inv<=0&&Math.abs(a.y-S.y)<42&&Math.abs(a.x-S.x)<62) subHurt(a.y-230,"¡Esos lobos marinos descansan! Rodealos"); }
  } else if(S.key==="trees"){
    for(const o of S.trees){ if(S.inv<=0&&Math.abs(o.y-S.y)<o.r*0.7+14&&Math.abs(o.x-S.x)<o.r*0.7+16){ subHurt(o.y-190,"¡Chocaste con un árbol! Buscá el hueco"); break; } }
  } else if(S.key==="stones"){
    const sx=s=>stX(S,s);
    if(!S.hop){ S.moving=false; const cur=sx(S.on); if(S.px!=null) S.x+=cur-S.px; S.px=cur; S.x=Math.max(cur-S.on.r+8,Math.min(cur+S.on.r-8,S.x)); S.y=S.rows[S.row].y;
      if(jp&&S.row<S.rows.length-1){ S.hop={t:0,y0:S.y}; S.air=0.55; S.px=null; AM.sfx("jump"); } }
    if(S.hop){ const H=S.hop; H.t+=dt; const k=Math.min(1,H.t/0.55); S.y=H.y0+(S.rows[S.row+1].y-H.y0)*k; S.moving=true;
      if(H.t>=0.55){ const nr=S.rows[S.row+1], hit=nr.st.find(q=>Math.abs(S.x-sx(q))<q.r+10);
        if(hit){ S.row++; S.on=hit; S.y=nr.y; S.px=null; S.hop=null; if(hit.star&&!hit.got){ hit.got=true; S.got++; addScore(25); AM.sfx("collect"); } else AM.sfx("ok"); }
        else { S.hop=null; S.px=null; S.y=S.rows[S.row].y; toast("¡Splash! Calculá mejor el salto"); subHurt(S.y,"¡Splash! Calculá mejor el salto");
          const ri=Math.max(0,Math.min(S.rows.length-1,Math.round(S.y/200))); S.row=ri; S.y=S.rows[ri].y; S.on=S.rows[ri].st.reduce((a,b)=>Math.abs(sx(a)-S.x)<Math.abs(sx(b)-S.x)?a:b); S.x=sx(S.on); S.air=0; } } }
  } else if(S.key==="fog"){
    const F=S.fl; F.t-=dt; if(F.st==="idle"&&F.t<=0){ F.st="warn"; F.t=1.0; AM.sfx("open"); } else if(F.st==="warn"&&F.t<=0){ F.st="flash"; F.t=1.6; AM.sfx("collect"); } else if(F.st==="flash"&&F.t<=0){ F.st="idle"; F.t=4.2; }
    for(const o of S.ob){ if(o.kind==="ice") o.x=o.ox+o.amp*Math.sin(S.t*0.7+o.ph); if(S.inv<=0&&Math.abs(o.y-S.y)<o.r*0.8+16&&Math.abs(o.x-S.x)<o.r+14){ subHurt(o.y-230,o.kind==="faro"?"¡Islote del faro! Esperá el destello":o.kind==="buoy"?"¡Una boya!":o.kind==="ice"?"¡Hielo flotante!":"¡Rocas! Esperá el destello del faro"); break; } }
  } else {
    const Wd=S.wind; Wd.t-=dt;
    if(Wd.state==="idle"&&Wd.t<=0){ Wd.state="warn"; Wd.t=1.0; Wd.dir=hh(S.t*3)<.5?-1:1; }
    else if(Wd.state==="warn"&&Wd.t<=0){ Wd.state="gust"; Wd.t=1.7+hh(S.t)*0.8; }
    else if(Wd.state==="gust"){ S.x=Math.max(-S.TW+30,Math.min(S.TW-30,S.x+Wd.dir*(200+60*prog)*dt)); if(Wd.t<=0){ Wd.state="idle"; Wd.t=2.4+hh(S.t*2)*1.5; } }
    S.evT-=dt; if(S.evT<=0){ S.evT=Math.max(0.8,1.4-prog*0.5)+hh(S.t)*0.4; const aim=hh(S.t*4)<.5; S.ev.push({x:aim?Math.max(-S.TW+40,Math.min(S.TW-40,S.x+(hh(S.t*6)-.5)*160)):(hh(S.t*9)-.5)*2*(S.TW-60),y:S.y+650,t:0,fall:false}); }
    for(const r of S.ev){ r.t+=dt; if(r.t>0.9) r.y-=380*dt; if(S.inv<=0&&r.t>0.9&&Math.abs(r.x-S.x)<36&&Math.abs(r.y-S.y)<40){ r.hit=true; subHurt(S.y-150,"¡Piedra! Esquivala moviéndote al costado"); } }
    S.ev=S.ev.filter(r=>r.y>S.y-300&&!r.hit);
  }
  if(S.y>=S.LEN-1 && !S.done) finishSub();
}
/* ====== ARTE DE SUBNIVELES (v0.9): paleta propia de cada mundo ====== */
const SUBBG={};
function sbE(x,y,rx,ry,fill,stroke,lw,rot){ ctx.beginPath(); ctx.ellipse(x,y,Math.max(0.5,rx),Math.max(0.5,ry),rot||0,0,6.3); if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw||3;ctx.stroke();} }
function sbSprite(S,cx,wy,yBot,yTop,key,every,seed,out,sc){ const im=img[key]; if(!im) return; const tm=performance.now()/1000;
  for(let k=Math.floor(yBot/every)-1;k<=Math.ceil(yTop/every)+1;k++){ if(hh(k*3.3+seed)<.35) continue; const sd=hh(k*1.7+seed)<.5?-1:1, x=cx+sd*(S.TW+out+hh(k+seed)*30), y=wy(k*every+every*hh(k*2.1+seed)); if(y<-120||y>VH+160) continue;
    const H=sizeH()*sc, kk=H/im.naturalHeight, bob=Math.sin(tm*2+k)*1.5; drawShadow(x,y,H*0.3,.3); ctx.save(); ctx.translate(x,y+bob); ctx.scale(sd<0?-1:1,1); ctx.drawImage(im,-im.naturalWidth*kk/2,-im.naturalHeight*kk,im.naturalWidth*kk,im.naturalHeight*kk); ctx.restore(); } }
function sbLenga(x,y,s,pal){ for(const [dx,dy,r,c] of [[-1,0.2,1,pal[0]],[1,0.1,1,pal[1]],[0,-0.6,1.05,pal[2]]]){ sbE(x+dx*s*0.7,y+dy*s*0.7,s*0.8,s*0.6,c,"#3a1c0a",2); } sbE(x-s*0.2,y-s*0.9,s*0.35,s*0.22,"#ffffff44"); }
function sbTuft(x,y,s,c){ ctx.strokeStyle=c; ctx.lineWidth=2.5; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(x+i*3,y); ctx.quadraticCurveTo(x+i*5,y-s*0.6,x+i*8,y-s); ctx.stroke(); } }

/* ---- El Calafate: glaciar, lago turquesa, témpanos ---- */
SUBBG.ice=(S,cx,wy,yTop,yBot,tm)=>{ const TW=S.TW;
  let g=ctx.createLinearGradient(0,0,VW,0); g.addColorStop(0,"#1c93b8"); g.addColorStop(.5,"#3cc6d4"); g.addColorStop(1,"#1c93b8"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
  ctx.strokeStyle="#ffffff55"; ctx.lineWidth=2; for(let k=Math.floor(yBot/60);k<=Math.ceil(yTop/60);k++) for(let j=0;j<4;j++){ const sd=j%2?1:-1, x=cx+sd*(TW+60+hh(k*5+j)*260), y=wy(k*60+hh(k+j)*50); ctx.beginPath(); ctx.moveTo(x-16,y); ctx.quadraticCurveTo(x,y-5+Math.sin(tm*2+k)*2,x+16,y); ctx.stroke(); }
  for(let k=Math.floor(yBot/340);k<=Math.ceil(yTop/340);k++) for(const sd of [-1,1]){ const x=cx+sd*(TW+110+hh(k*3+sd)*160), y=wy(k*340+hh(k+sd)*200); if(y<-90||y>VH+90) continue; const w=34+hh(k+sd*2)*26;
    sbE(x,y+10,w*1.1,w*0.5,"#3a9fd0"); ctx.fillStyle="#f4fcff"; ctx.strokeStyle="#7cc4e6"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-w,y+8); ctx.lineTo(x-w*0.4,y-w*0.9); ctx.lineTo(x+w*0.1,y-w*0.4); ctx.lineTo(x+w*0.55,y-w*1.1); ctx.lineTo(x+w,y+8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#bfe6f6"; ctx.beginPath(); ctx.moveTo(x+w*0.1,y-w*0.4); ctx.lineTo(x+w*0.55,y-w*1.1); ctx.lineTo(x+w,y+8); ctx.lineTo(x+w*0.2,y+8); ctx.closePath(); ctx.fill(); }
  g=ctx.createLinearGradient(cx-TW,0,cx+TW,0); g.addColorStop(0,"#d8f0fb"); g.addColorStop(.5,"#f7fcff"); g.addColorStop(1,"#d8f0fb"); ctx.fillStyle=g; ctx.fillRect(cx-TW,0,TW*2,VH);
  for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++){ const y=wy(k*70+hh(k)*40); ctx.fillStyle="rgba(120,185,225,.22)"; ctx.beginPath(); ctx.moveTo(cx-TW,y); for(let x=-TW;x<=TW;x+=40) ctx.lineTo(cx+x,y+Math.sin(x*0.03+k*2)*5+(hh(x+k)*4)); for(let x=TW;x>=-TW;x-=40) ctx.lineTo(cx+x,y+12+Math.sin(x*0.03+k*2)*5); ctx.closePath(); ctx.fill(); }
  ctx.strokeStyle="#8fd0ec"; ctx.lineWidth=2; for(let k=Math.floor(yBot/90);k<=Math.ceil(yTop/90);k++){ const x=cx+(hh(k*3.1)-.5)*2*(TW-30), y=wy(k*90), l=26+hh(k)*40; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+l*0.4,y-l*0.5); ctx.lineTo(x-l*0.2,y-l); ctx.stroke(); }
  for(let k=Math.floor(yBot/110);k<=Math.ceil(yTop/110);k++){ const x=cx+(hh(k*7.7)-.5)*2*(TW-20), y=wy(k*110+hh(k)*50); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.moveTo(x-5,y); ctx.lineTo(x,y-7); ctx.lineTo(x+5,y); ctx.lineTo(x,y+7); ctx.fill(); }
  for(const sd of [-1,1]){ const ex=cx+sd*TW; ctx.fillStyle="#e9f8ff"; ctx.strokeStyle="#5aaedb"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(ex-sd*10,wy(yTop)); for(let k=Math.floor(yTop/34);k>=Math.floor(yBot/34);k--){ const y=wy(k*34); ctx.lineTo(ex+sd*(6+hh(k*1.7)*22),y); ctx.lineTo(ex+sd*(1+hh(k*2.3)*6),y+17); } ctx.lineTo(ex-sd*10,wy(yBot)); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle="#9fd6ee"; ctx.lineWidth=3; ctx.beginPath(); for(let k=Math.floor(yTop/34);k>=Math.floor(yBot/34);k--){ const y=wy(k*34); ctx.lineTo(ex-sd*(6+hh(k)*6),y); } ctx.stroke(); }
  const grp={}; for(const c of S.cre){ (grp[c.y0]=grp[c.y0]||[]).push(c); }
  for(const key in grp){ const gr=grp[key], a=wy(gr[0].y1), b=wy(gr[0].y0); if(b<-60||a>VH+60) continue;
    for(const c of gr){ const L=cx+c.x0, R=cx+c.x1; const grad=ctx.createLinearGradient(0,a,0,b); grad.addColorStop(0,"#1b6fb0"); grad.addColorStop(.5,"#0a2c55"); grad.addColorStop(1,"#165e9c");
      ctx.beginPath(); ctx.moveTo(L,a+3); for(let x=c.x0;x<=c.x1;x+=22) ctx.lineTo(cx+x,a+hh(x*0.1+c.y0)*8-2); ctx.lineTo(R,a+3); ctx.lineTo(R,b-3); for(let x=c.x1;x>=c.x0;x-=22) ctx.lineTo(cx+x,b-hh(x*0.1+c.y0+3)*8+2); ctx.lineTo(L,b-3); ctx.closePath(); ctx.fillStyle=grad; ctx.fill(); ctx.strokeStyle="#ffffff"; ctx.lineWidth=3.5; ctx.stroke();
      ctx.strokeStyle="#6cc8ee"; ctx.lineWidth=2; ctx.beginPath(); for(let x=c.x0+10;x<=c.x1-10;x+=26){ const yy=(a+b)/2+Math.sin(x*0.07)*3; if(x===c.x0+10) ctx.moveTo(cx+x,yy); else ctx.lineTo(cx+x,yy); } ctx.stroke(); }
    if(gr.length===2){ const Lc=gr[0].x1<=gr[1].x0?gr[0]:gr[1], Rc=Lc===gr[0]?gr[1]:gr[0], mx=cx+(Lc.x1+Rc.x0)/2, rx=(Rc.x0-Lc.x1)/2+14, my=(a+b)/2;
      sbE(mx,my,rx,(b-a)/2+8,"#ffffff","#a9ddf2",3); ctx.strokeStyle="#d4eefa"; ctx.lineWidth=2; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(mx+i*rx*0.35,my-(b-a)/2); ctx.lineTo(mx+i*rx*0.35,my+(b-a)/2); ctx.stroke(); } } }
  const sb=wy(S.breakY); if(sb<VH+40){ const gw=ctx.createLinearGradient(0,sb-6,0,VH); gw.addColorStop(0,"#5fe0e6"); gw.addColorStop(1,"#12708f"); ctx.fillStyle=gw; ctx.fillRect(0,sb,VW,VH-sb+10); ctx.strokeStyle="#fff"; ctx.lineWidth=5; ctx.beginPath(); for(let x=0;x<=VW;x+=22) ctx.lineTo(x,sb+Math.sin(x*0.3+tm*6)*6); ctx.stroke();
    ctx.fillStyle="#f4fcff"; ctx.strokeStyle="#7cc4e6"; ctx.lineWidth=3; for(let x=20;x<VW;x+=90){ const y=sb-14-hh(x)*24; ctx.beginPath(); ctx.moveTo(x-16,sb+2); ctx.lineTo(x-4,y); ctx.lineTo(x+8,sb-8); ctx.lineTo(x+20,sb+2); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
};

/* ---- Bariloche: bosque andino (coihue, arrayán, ciprés), pudú y huemul ---- */
function sbTree(x,y,o){ const r=o.r, kind=o.k?"arr":(hh(o.x*0.13+o.y*0.07)<.3?"cip":"coi");
  sbE(x+10,y+4,r*1.1,r*0.4,"rgba(0,30,10,.28)");
  if(kind==="cip"){ ctx.strokeStyle="#0d2e22"; ctx.lineWidth=3; ctx.fillStyle="#5a4630"; rr(x-6,y-20,12,26,3); ctx.fill(); ctx.stroke();
    for(let i=0;i<4;i++){ const w=r*(1.55-i*0.28), yy=y-22-i*r*0.62; ctx.fillStyle=["#1f5a44","#2a6e50","#37815c","#48966a"][i]; ctx.beginPath(); ctx.moveTo(x-w,yy+r*0.55); ctx.lineTo(x,yy-r*0.7); ctx.lineTo(x+w,yy+r*0.55); ctx.closePath(); ctx.fill(); ctx.stroke(); } return; }
  if(kind==="arr"){ const g=ctx.createLinearGradient(x-12,0,x+12,0); g.addColorStop(0,"#b8662c"); g.addColorStop(.5,"#e8a463"); g.addColorStop(1,"#a85a26"); ctx.fillStyle=g; ctx.strokeStyle="#5a2a0c"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-13,y+6); ctx.quadraticCurveTo(x-9,y-18,x-5,y-34); ctx.lineTo(x+5,y-34); ctx.quadraticCurveTo(x+9,y-18,x+13,y+6); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle="#ffd9a8"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-2,y); ctx.lineTo(x-1,y-26); ctx.stroke();
    for(const [dx,dy,rr2,c] of [[-0.7,-0.2,0.75,"#6fb85a"],[0.7,-0.2,0.75,"#7cc664"],[0,-0.75,0.9,"#8ed46e"]]){ sbE(x+dx*r*1.1,y-44+dy*r*1.1,r*rr2*1.1,r*rr2*0.95,c,"#25511f",3); } sbE(x-r*0.3,y-44-r*0.8,r*0.4,r*0.25,"#d6f5a8"); return; }
  ctx.fillStyle="#6a5a48"; ctx.strokeStyle="#2a1d10"; ctx.lineWidth=3; rr(x-8,y-32,16,38,4); ctx.fill(); ctx.stroke();
  const R=r*1.25; for(const [dx,dy,k2,c] of [[-0.8,0.1,0.78,"#1f6a34"],[0.8,0.1,0.78,"#25783a"],[0,-0.7,0.95,"#2d8a42"],[-0.35,-0.1,0.8,"#2a8040"],[0.4,-0.05,0.8,"#32904a"]]){ sbE(x+dx*R*0.9,y-42+dy*R,R*k2,R*k2*0.9,c,"#0f3a1c",3); }
  sbE(x-R*0.3,y-42-R*0.75,R*0.38,R*0.2,"#8fdc72"); sbE(x+R*0.35,y-42-R*0.3,R*0.22,R*0.12,"#78c862"); }
SUBBG.trees=(S,cx,wy,yTop,yBot,tm)=>{ const TW=S.TW;
  let g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#5f9f43"); g.addColorStop(1,"#79b957"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
  const lit=["#c77f3a","#e0a84a","#8a5a2b","#4f8a36"]; for(let k=Math.floor(yBot/50);k<=Math.ceil(yTop/50);k++) for(let j=0;j<6;j++){ sbE(cx+(hh(k*7+j)-.5)*2*(TW+60),wy(k*50+hh(k+j)*45),6+hh(k*2+j)*6,3+hh(k+j*2)*3,lit[Math.floor(hh(k*11+j)*4)]); }
  for(let k=Math.floor(yBot/110);k<=Math.ceil(yTop/110);k++) for(let j=0;j<3;j++){ const x=cx+(hh(k*5+j+90)-.5)*2*(TW-10), y=wy(k*110+hh(k+j)*90), c=hh(k*9+j)<.5?"#e03a2f":"#f4c430"; ctx.strokeStyle="#2f6a2c"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-10); ctx.stroke(); for(let i=0;i<5;i++){ const a=i*1.26; sbE(x+Math.cos(a)*5,y-12+Math.sin(a)*5,3.2,3.2,c); } sbE(x,y-12,2.4,2.4,"#fff2a0"); }
  ctx.strokeStyle="#3f7a2c"; ctx.lineWidth=2.5; for(let k=Math.floor(yBot/130);k<=Math.ceil(yTop/130);k++){ const x=cx+(hh(k*3.9)-.5)*2*(TW-20), y=wy(k*130+hh(k)*80); for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+i*9,y-18,x+i*15,y-8+Math.abs(i)*4); ctx.stroke(); } }
  ctx.save(); ctx.globalAlpha=.16; ctx.fillStyle="#fff7b0"; for(let i=0;i<4;i++){ const x=((i*260+tm*10)%(VW+300))-150; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+70,0); ctx.lineTo(x-90,VH); ctx.lineTo(x-170,VH); ctx.closePath(); ctx.fill(); } ctx.restore();
  for(const sd of [-1,1]){ const x0=sd<0?0:cx+TW+16, w=sd<0?Math.max(0,cx-TW-16):Math.max(0,VW-x0); if(w<=0) continue; ctx.fillStyle="#1f4f2a"; ctx.fillRect(x0,0,w,VH);
    for(let k=Math.floor(yTop/95);k>=Math.floor(yBot/95);k--){ const y=wy(k*95+hh(k*sd+7)*40), x=cx+sd*(TW+26+hh(k*sd)*70), R=46+hh(k+sd)*26; sbE(x+6,y+8,R,R*0.5,"rgba(0,20,8,.3)"); ctx.fillStyle=hh(k*3+sd)<.5?"#1a5a30":"#236b38"; ctx.strokeStyle="#0f2e18"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y-30,R,0,6.3); ctx.fill(); ctx.stroke(); sbE(x-R*0.3,y-30-R*0.3,R*0.5,R*0.4,"#3f9a52"); } }
  sbSprite(S,cx,wy,yBot,yTop,"pudu",1100,2,70,0.55); sbSprite(S,cx,wy,yBot,yTop,"huemul",1700,5,80,0.7);
  for(const o of S.trees){ const y=wy(o.y); if(y<-120||y>VH+120) continue; sbTree(cx+o.x,y,o); }
};

/* ---- El Chaltén: río glaciar, granito, lenga, huemul ---- */
SUBBG.stones=(S,cx,wy,yTop,yBot,tm)=>{ const TW=S.TW;
  let g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#5ec4cf"); g.addColorStop(1,"#3a9db8"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
  ctx.strokeStyle="#ffffff70"; ctx.lineWidth=3; for(let k=Math.floor(yBot/45);k<=Math.ceil(yTop/45);k++) for(let j=0;j<4;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+30), y=wy(k*45+hh(k+j*3)*40); ctx.beginPath(); ctx.moveTo(x-22,y); ctx.quadraticCurveTo(x,y-5+Math.sin(tm*3+k+j)*3,x+22,y); ctx.stroke(); }
  ctx.fillStyle="#ffffff18"; for(let k=Math.floor(yBot/200);k<=Math.ceil(yTop/200);k++){ const x=cx+(hh(k*4.4)-.5)*2*TW, y=wy(k*200); sbE(x,y,90,30,"#ffffff1c"); }
  for(const sd of [-1,1]){ const ex=cx+sd*(TW+22), x0=sd<0?0:ex-6, w=sd<0?Math.max(0,ex+6):Math.max(0,VW-x0); ctx.fillStyle="#8d8872"; ctx.beginPath(); ctx.moveTo(sd<0?0:VW,wy(yTop)); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*24),wy(k*40)); ctx.lineTo(sd<0?0:VW,wy(yBot)); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#ffffff"; ctx.globalAlpha=.7; ctx.lineWidth=4; ctx.beginPath(); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*24)-sd*3,wy(k*40)); ctx.stroke(); ctx.globalAlpha=1;
    for(let k=Math.floor(yTop/70);k>=Math.floor(yBot/70);k--){ const y=wy(k*70+hh(k+sd)*40), x=ex+sd*(30+hh(k*sd*3)*130); if(y<-60||y>VH+60) continue; const t=hh(k*2+sd);
      if(t<.4){ const R=22+hh(k)*20; sbE(x+4,y+6,R,R*0.55,"rgba(0,0,0,.25)"); ctx.fillStyle="#8c8aa6"; ctx.strokeStyle="#34324a"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-R,y); ctx.lineTo(x-R*0.5,y-R*0.8); ctx.lineTo(x+R*0.5,y-R*0.9); ctx.lineTo(x+R,y-R*0.1); ctx.lineTo(x+R*0.6,y+R*0.5); ctx.lineTo(x-R*0.6,y+R*0.5); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#b4b2cc"; ctx.beginPath(); ctx.moveTo(x-R*0.5,y-R*0.8); ctx.lineTo(x+R*0.5,y-R*0.9); ctx.lineTo(x+R*0.1,y-R*0.1); ctx.lineTo(x-R*0.7,y-R*0.1); ctx.closePath(); ctx.fill(); sbE(x+R*0.2,y-R*0.4,4,3,"#e8a23c"); }
      else if(t<.75) sbLenga(x,y,16+hh(k)*10,hh(k+5)<.5?["#d9742c","#c8501f","#e8a02c"]:["#b8402a","#d9742c","#e8b43c"]); else sbTuft(x,y,16,"#c9b25a"); } }
  sbSprite(S,cx,wy,yBot,yTop,"huemul",1500,9,95,0.72);
  for(let i=0;i<S.rows.length;i++){ const row=S.rows[i], y=wy(row.y); if(y<-70||y>VH+70) continue; const tgt=(i===S.row+1&&!S.hop);
    for(const q of row.st){ const x=cx+stX(S,q), R=q.r; ctx.strokeStyle="#ffffffaa"; ctx.lineWidth=3; sbE(x,y+3,R+10+Math.sin(tm*3+i)*1.5,R*0.72+8,"rgba(255,255,255,.18)","#ffffff99",3);
      sbE(x+5,y+9,R+3,R*0.72+3,"rgba(10,50,70,.35)");
      const gr=ctx.createLinearGradient(x-R,y-R*0.7,x+R,y+R*0.7); gr.addColorStop(0,q===S.on?"#b9b7d2":"#a3a1bd"); gr.addColorStop(1,"#6c6a86"); ctx.fillStyle=gr; ctx.strokeStyle="#2f2d44"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,R,R*0.72,0,0,6.3); ctx.fill(); ctx.stroke();
      ctx.strokeStyle="#4b4968"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x-R*0.5,y-R*0.1); ctx.lineTo(x-R*0.1,y+R*0.15); ctx.lineTo(x+R*0.3,y-R*0.05); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x+R*0.1,y+R*0.2); ctx.lineTo(x+R*0.4,y+R*0.4); ctx.stroke();
      sbE(x-R*0.28,y-R*0.28,R*0.42,R*0.2,"#ffffff55"); sbE(x+R*0.45,y+R*0.05,3.5,2.6,"#e8a23c"); sbE(x+R*0.3,y+R*0.22,2.6,2,"#f0c25a"); sbE(x-R*0.5,y+R*0.25,3,2.2,"#e8a23c");
      if(tgt){ ctx.save(); ctx.setLineDash([7,7]); ctx.strokeStyle="#ffe45a"; ctx.lineWidth=3.5; ctx.beginPath(); ctx.ellipse(x,y,R+12,R*0.72+9,0,0,6.3); ctx.stroke(); ctx.restore(); }
      if(q.star&&!q.got) drawStar(x,y-6,16,Math.sin(tm*2+i)*0.15); } }
};

/* ---- Ushuaia: canal Beagle, bosque subantártico, faros rojiblancos ---- */
function sbLight(x,y,glow,tm){ if(glow){ const gl=ctx.createRadialGradient(x,y-76,6,x,y-76,glow>1?170:110); gl.addColorStop(0,"rgba(255,240,150,"+(glow>1?0.9:0.35+0.35*Math.sin(tm*18))+")"); gl.addColorStop(1,"rgba(255,240,150,0)"); ctx.fillStyle=gl; ctx.fillRect(x-180,y-250,360,360); }
  ctx.strokeStyle="#3b1410"; ctx.lineWidth=3; for(let i=0;i<3;i++){ const y0=y-i*24, w0=17-i*2.4, w1=w0-2.4; ctx.fillStyle=i%2?"#fff":"#e03a2f"; ctx.beginPath(); ctx.moveTo(x-w0,y0); ctx.lineTo(x+w0,y0); ctx.lineTo(x+w1,y0-24); ctx.lineTo(x-w1,y0-24); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle="#2a2a2a"; ctx.fillRect(x-14,y-76,28,5); ctx.fillStyle=glow?"#ffe45a":"#9a9a7a"; ctx.fillRect(x-9,y-92,18,16); ctx.strokeRect(x-9,y-92,18,16); ctx.fillStyle="#e03a2f"; ctx.beginPath(); ctx.moveTo(x-13,y-92); ctx.lineTo(x,y-108); ctx.lineTo(x+13,y-92); ctx.closePath(); ctx.fill(); ctx.stroke(); }
SUBBG.fog=(S,cx,wy,yTop,yBot,tm)=>{ const TW=S.TW, F=S.fl, fl=F.st==="flash", wn=F.st==="warn";
  let g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#7f9fae"); g.addColorStop(1,"#3d6f84"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
  ctx.strokeStyle="#ffffff44"; ctx.lineWidth=3; for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++) for(let j=0;j<4;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+120), y=wy(k*70+hh(k+j*3)*60); ctx.beginPath(); ctx.moveTo(x-14,y); ctx.quadraticCurveTo(x,y-6+Math.sin(tm*2+k)*2,x+14,y); ctx.stroke(); }
  for(const sd of [-1,1]){ const ex=cx+sd*(TW+26); ctx.fillStyle="#2c4a3a"; ctx.beginPath(); ctx.moveTo(sd<0?0:VW,wy(yTop)); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*20),wy(k*40)); ctx.lineTo(sd<0?0:VW,wy(yBot)); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#cfd8dc"; ctx.lineWidth=5; ctx.beginPath(); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*20),wy(k*40)); ctx.stroke();
    for(let k=Math.floor(yTop/60);k>=Math.floor(yBot/60);k--){ const y=wy(k*60+hh(k+sd)*30), x=ex+sd*(26+hh(k*sd)*110), R=20+hh(k)*14; if(y<-60||y>VH+60) continue; const col=hh(k*3+sd)<.2?"#b8402a":"#1f4a34"; ctx.fillStyle=col; ctx.strokeStyle="#0f2418"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-R*0.8,y+4); ctx.lineTo(x,y-R*2); ctx.lineTo(x+R*0.8,y+4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#ffffff30"; ctx.beginPath(); ctx.moveTo(x-R*0.5,y-R*0.7); ctx.lineTo(x,y-R*2); ctx.lineTo(x+R*0.2,y-R*1.2); ctx.closePath(); ctx.fill(); }
    for(let k=Math.floor(yBot/900);k<=Math.ceil(yTop/900);k++){ const ly=wy(k*900+(sd>0?450:0)+200); if(ly<-120||ly>VH+120) continue; sbLight(ex+sd*70,ly,fl?2:(wn?1:0),tm); } }
  for(const o of S.ob){ const y=wy(o.y), x=cx+o.x, a=fogA(S,o.y); if(a<=0.02||y<-150||y>VH+150) continue; ctx.save(); ctx.globalAlpha=a; sbE(x+6,y+8,o.r,o.r*0.5,"rgba(0,20,30,.3)");
    if(o.kind==="buoy"){ ctx.fillStyle="#e03a2f"; ctx.strokeStyle="#3a1010"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-20,y+14); ctx.lineTo(x+20,y+14); ctx.lineTo(x+9,y-26); ctx.lineTo(x-9,y-26); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.fillRect(x-15,y-8,30,9); ctx.strokeRect(x-15,y-8,30,9); ctx.fillStyle="#2a2a2a"; ctx.fillRect(x-2,y-40,4,14); sbE(x,y-44,7,7,"#ffd45a","#3a1010",3); sbE(x,y+16,22,6,"#ffffff88"); }
    else if(o.kind==="ice"){ const gr=ctx.createLinearGradient(x-o.r,y-40,x+o.r,y+10); gr.addColorStop(0,"#f4fcff"); gr.addColorStop(1,"#8fcfe8"); ctx.fillStyle=gr; ctx.strokeStyle="#3f8fc0"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-o.r,y+10); ctx.lineTo(x-o.r*0.55,y-28); ctx.lineTo(x-o.r*0.1,y-10); ctx.lineTo(x+o.r*0.5,y-40); ctx.lineTo(x+o.r*0.75,y-12); ctx.lineTo(x+o.r,y+10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#7fc4e8aa"; ctx.beginPath(); ctx.moveTo(x+o.r*0.5,y-40); ctx.lineTo(x+o.r*0.75,y-12); ctx.lineTo(x+o.r,y+10); ctx.lineTo(x+o.r*0.3,y+10); ctx.closePath(); ctx.fill(); sbE(x,y+12,o.r*1.1,7,"#ffffffaa"); }
    else { const gr=ctx.createLinearGradient(x,y-o.r*0.6,x,y+o.r*0.6); gr.addColorStop(0,"#6b7378"); gr.addColorStop(1,"#3a4146"); ctx.fillStyle=gr; ctx.strokeStyle="#161a1d"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-o.r,y+8); ctx.lineTo(x-o.r*0.7,y-o.r*0.4); ctx.lineTo(x-o.r*0.2,y-o.r*0.62); ctx.lineTo(x+o.r*0.5,y-o.r*0.5); ctx.lineTo(x+o.r,y+6); ctx.lineTo(x+o.r*0.6,y+o.r*0.45); ctx.lineTo(x-o.r*0.6,y+o.r*0.45); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#ffffff33"; ctx.beginPath(); ctx.moveTo(x-o.r*0.6,y-o.r*0.3); ctx.lineTo(x-o.r*0.2,y-o.r*0.55); ctx.lineTo(x+o.r*0.2,y-o.r*0.4); ctx.lineTo(x-o.r*0.3,y-o.r*0.1); ctx.closePath(); ctx.fill(); sbE(x,y+o.r*0.42,o.r*0.95,6,"#ffffff99");
      if(o.kind==="faro"){ sbLight(x,y-4,0,tm); }
      else if(img.pinguino&&hh(o.y*0.37)<.6){ const im=img.pinguino, H=sizeH()*0.55, k=H/im.naturalHeight; ctx.drawImage(im,x-im.naturalWidth*k/2,y-4-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); } }
    ctx.restore(); }
  const gf=ctx.createLinearGradient(0,0,0,VH*0.8); gf.addColorStop(0,"rgba(222,230,236,"+(fl?0.18:0.96)+")"); gf.addColorStop(1,"rgba(222,230,236,0)"); ctx.fillStyle=gf; ctx.fillRect(0,0,VW,VH*0.8);
  ctx.strokeStyle="rgba(205,222,235,.6)"; ctx.lineWidth=2; for(let i=0;i<26;i++){ const xx=((i*137+tm*120)%(VW+80))-40, yy=((i*71+tm*520)%VH); ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx-8,yy+22); ctx.stroke(); }
  if(wn||fl){ ctx.save(); ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; rr(VW/2-190,176,380,40,14); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.font="900 20px sans-serif"; ctx.textAlign="center"; ctx.fillText(wn?"¡El faro va a destellar!":"¡Destello! Memorizá el hueco",VW/2,203); ctx.restore(); }
};

/* ---- Puerto Madryn: golfo turquesa, acantilados, ballena franca, lobo marino ---- */
function sbWhale(x,y,up,k){ ctx.save(); ctx.translate(x,y); ctx.scale(1,0.55+0.45*k); ctx.lineJoin="round";
  ctx.beginPath(); ctx.moveTo(100,0); ctx.bezierCurveTo(96,-30,40,-44,-30,-34); ctx.bezierCurveTo(-60,-28,-78,-14,-92,-6); ctx.lineTo(-112,-26); ctx.quadraticCurveTo(-104,-10,-100,0); ctx.quadraticCurveTo(-104,10,-112,26); ctx.lineTo(-92,6); ctx.bezierCurveTo(-78,14,-60,28,-30,34); ctx.bezierCurveTo(40,44,96,30,100,0); ctx.closePath();
  const gr=ctx.createLinearGradient(0,-40,0,40); gr.addColorStop(0,"#3a4f6e"); gr.addColorStop(.6,"#26364f"); gr.addColorStop(1,"#3c506b"); ctx.fillStyle=gr; ctx.strokeStyle="#0b1422"; ctx.lineWidth=5; ctx.fill(); ctx.stroke();
  ctx.fillStyle="#1d2a40"; for(const sd of [-1,1]){ ctx.beginPath(); ctx.ellipse(28,sd*40,26,8,sd*0.5,0,6.3); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle="#efe8d6"; for(const [dx,dy,r] of [[78,-10,6],[68,8,5],[88,4,4],[56,-14,4]]){ ctx.beginPath(); ctx.arc(dx,dy,r,0,6.3); ctx.fill(); }
  ctx.fillStyle="#0b1422"; ctx.beginPath(); ctx.arc(70,-26,3,0,6.3); ctx.fill(); ctx.beginPath(); ctx.arc(70,26,3,0,6.3); ctx.fill();
  ctx.strokeStyle="#5f7a9a"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(48,-6); ctx.lineTo(54,-2); ctx.moveTo(48,6); ctx.lineTo(54,2); ctx.stroke(); ctx.restore(); }
function sbSeal(x,y){ sbE(x+4,y+10,62,34,"rgba(10,40,60,.3)"); ctx.fillStyle="#7e8387"; ctx.strokeStyle="#262a2e"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-62,y+6); ctx.lineTo(x-44,y-24); ctx.lineTo(x+10,y-32); ctx.lineTo(x+52,y-18); ctx.lineTo(x+64,y+8); ctx.lineTo(x+30,y+30); ctx.lineTo(x-34,y+30); ctx.closePath(); ctx.fill(); ctx.stroke();
  sbE(x-6,y-4,44,19,"#8a5a30","#3d2410",3); sbE(x-12,y-9,28,9,"#6e4524"); sbE(x+40,y-8,13,11,"#a47a48","#3d2410",3); sbE(x+51,y-5,5,4,"#1a1a1a"); sbE(x+43,y-12,2.3,2.3,"#111"); ctx.strokeStyle="#e8e0c8"; ctx.lineWidth=1.5; for(const dy of [-3,0,3]){ ctx.beginPath(); ctx.moveTo(x+52,y-5+dy); ctx.lineTo(x+66,y-8+dy*2); ctx.stroke(); }
  sbE(x+12,y+17,17,6,"#7a4e28","#3d2410",2,0.3); ctx.fillStyle="#6e4524"; ctx.beginPath(); ctx.moveTo(x-48,y+4); ctx.lineTo(x-64,y-4); ctx.lineTo(x-62,y+14); ctx.lineTo(x-48,y+12); ctx.closePath(); ctx.fill(); ctx.stroke(); }
SUBBG.sail=(S,cx,wy,yTop,yBot,tm)=>{ const TW=S.TW;
  let g=ctx.createLinearGradient(0,0,VW,0); g.addColorStop(0,"#52d0cc"); g.addColorStop(.3,"#2aa9c9"); g.addColorStop(.7,"#1f86bb"); g.addColorStop(1,"#52d0cc"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
  ctx.strokeStyle="#ffffff90"; ctx.lineWidth=3; for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++) for(let j=0;j<5;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+120), y=wy(k*70+hh(k+j*3)*60); ctx.beginPath(); ctx.moveTo(x-14,y); ctx.quadraticCurveTo(x,y-7+Math.sin(tm*2+k)*2,x+14,y); ctx.stroke(); }
  ctx.fillStyle="#ffffffcc"; for(let k=Math.floor(yBot/120);k<=Math.ceil(yTop/120);k++){ const x=cx+(hh(k*8.8)-.5)*2*TW, y=wy(k*120+hh(k)*100); if(Math.sin(tm*3+k*2)>0.4){ ctx.beginPath(); ctx.moveTo(x-5,y); ctx.lineTo(x,y-6); ctx.lineTo(x+5,y); ctx.lineTo(x,y+6); ctx.fill(); } }
  for(const sd of [-1,1]){ const ex=cx+sd*(TW+28);
    ctx.fillStyle="#8fe4d6"; ctx.beginPath(); ctx.moveTo(sd<0?0:VW,wy(yTop)); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.3)*10),wy(k*40)); ctx.lineTo(sd<0?0:VW,wy(yBot)); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#ecd49a"; ctx.beginPath(); ctx.moveTo(sd<0?0:VW,wy(yTop)); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(6+hh(k*1.9)*14),wy(k*40)); ctx.lineTo(sd<0?0:VW,wy(yBot)); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#ffffff"; ctx.lineWidth=4; ctx.beginPath(); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*14),wy(k*40)); ctx.stroke();
    const cx0=ex+sd*52; ctx.fillStyle="#bd8c50"; ctx.beginPath(); ctx.moveTo(sd<0?0:VW,wy(yTop)); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(cx0+sd*(hh(k*2.7)*12),wy(k*40)); ctx.lineTo(sd<0?0:VW,wy(yBot)); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#6e4a24"; ctx.lineWidth=4; ctx.beginPath(); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(cx0+sd*(hh(k*2.7)*12),wy(k*40)); ctx.stroke();
    ctx.strokeStyle="#d9b172"; ctx.lineWidth=3; for(let k=Math.floor(yBot/46);k<=Math.ceil(yTop/46);k++){ const y=wy(k*46); ctx.beginPath(); ctx.moveTo(cx0+sd*18,y); ctx.lineTo(cx0+sd*(60+hh(k)*60),y+hh(k+2)*5); ctx.stroke(); }
    for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++){ const y=wy(k*70+hh(k*sd)*50), x=cx0+sd*(30+hh(k*sd*3)*90); sbTuft(x,y,13,"#a8a050"); }
    for(let k=Math.floor(yBot/420);k<=Math.ceil(yTop/420);k++){ const y=wy(k*420+hh(k+sd)*250), x=ex+sd*30; if(y<-30||y>VH+30) continue; sbE(x,y,22,10,"#7b5230","#3d2410",2); sbE(x+sd*12,y-4,8,6,"#9a6a3a","#3d2410",2); } }
  const tt=performance.now()/1000; for(let i=0;i<4;i++){ const gx=((i*330-tt*70)%(VW+200)+VW+200)%(VW+200)-100, gy=70+i*40+Math.sin(tt*2+i)*8; ctx.strokeStyle="#fff"; ctx.lineWidth=3; const f=Math.sin(tt*9+i)*5; ctx.beginPath(); ctx.moveTo(gx-13,gy-f); ctx.quadraticCurveTo(gx-6,gy-6-f,gx,gy); ctx.quadraticCurveTo(gx+6,gy-6+f,gx+13,gy+f); ctx.stroke(); }
  for(const a of S.an){ const x=cx+a.x, y=wy(a.y); if(y<-140||y>VH+140) continue;
    if(a.kind==="seal") sbSeal(x,y);
    else { const ph=a.ph||0;
      if(!a.up){ ctx.fillStyle="rgba(8,50,90,"+(0.22+(ph>1?0.18:0))+")"; ctx.beginPath(); ctx.ellipse(x,y,98,38,0,0,6.3); ctx.fill(); if(ph>1.0&&ph<=2.0){ const f=(ph-1); ctx.strokeStyle="rgba(255,255,255,"+(0.85-0.35*f)+")"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,50+60*f,20+24*f,0,0,6.3); ctx.stroke(); } }
      else { const k=Math.min(1,(ph-2)/0.4)*Math.min(1,(3.9-ph)/0.4); sbWhale(x,y,true,k); ctx.strokeStyle="#ffffffdd"; ctx.lineWidth=4; for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.moveTo(x+52,y-6); ctx.quadraticCurveTo(x+52+i*16,y-52-Math.sin(tm*8)*4,x+52+i*30,y-34); ctx.stroke(); } } } }
};
function drawBoat(bx,by,tm){ ctx.save(); ctx.lineJoin="round"; ctx.strokeStyle="#ffffffb0"; ctx.lineWidth=4; for(const sd of [-1,1]){ ctx.beginPath(); ctx.moveTo(bx+sd*26,by+6); ctx.quadraticCurveTo(bx+sd*52,by+40,bx+sd*70,by+88+Math.sin(tm*6)*4); ctx.stroke(); }
  sbE(bx,by+10,34,10,"rgba(0,30,60,.3)"); ctx.beginPath(); ctx.moveTo(bx,by-84); ctx.bezierCurveTo(bx+22,by-60,bx+34,by-26,bx+30,by+10); ctx.lineTo(bx+24,by+18); ctx.lineTo(bx-24,by+18); ctx.lineTo(bx-30,by+10); ctx.bezierCurveTo(bx-34,by-26,bx-22,by-60,bx,by-84); ctx.closePath(); ctx.fillStyle="#d9402f"; ctx.strokeStyle="#4a120c"; ctx.lineWidth=4; ctx.fill(); ctx.stroke();
  ctx.fillStyle="#f6e9c8"; ctx.beginPath(); ctx.moveTo(bx,by-70); ctx.bezierCurveTo(bx+15,by-50,bx+23,by-24,bx+20,by+8); ctx.lineTo(bx-20,by+8); ctx.bezierCurveTo(bx-23,by-24,bx-15,by-50,bx,by-70); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#7a4a26"; ctx.lineWidth=2.5; ctx.stroke();
  ctx.strokeStyle="#c9a96e"; ctx.lineWidth=2; for(const dy of [-30,-8,12]){ ctx.beginPath(); ctx.moveTo(bx-16,by+dy); ctx.lineTo(bx+16,by+dy); ctx.stroke(); }
  ctx.fillStyle="#fff"; ctx.fillRect(bx-31,by-10,62,6); ctx.strokeStyle="#4a120c"; ctx.lineWidth=2; ctx.strokeRect(bx-31,by-10,62,6); ctx.restore(); }

function subRender(){
  const S=sub; ctx.setTransform(scaleCv,0,0,scaleCv,0,0); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high";
  const cx=VW/2-S.x, PYv=VH*0.8-16, TW=S.TW, wy=y=>PYv-(y-S.y), yTop=S.y+PYv+80, yBot=S.y-(VH-PYv)-80, tm=performance.now()/1000;
  ctx.lineJoin="round"; ctx.lineCap="round";
  if(SUBBG[S.key]){ SUBBG[S.key](S,cx,wy,yTop,yBot,tm); }
  else if(S.key==="ice"){
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#e8f8ff"); g.addColorStop(1,"#bfe6fa"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.strokeStyle="#9ccbe6"; ctx.lineWidth=3;
    for(let k=Math.floor(yBot/80);k<=Math.ceil(yTop/80);k++){ const x=cx+(hh(k*3.1)-.5)*2*TW, y=wy(k*80), l=30+hh(k)*60; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+l*0.4,y-l*0.5); ctx.lineTo(x-l*0.2,y-l); ctx.stroke(); }
    for(const sd of [-1,1]){ ctx.fillStyle="#2a86c8"; ctx.beginPath(); const ex=cx+sd*TW; ctx.moveTo(sd<0?0:VW,-20); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--){ ctx.lineTo(ex+sd*(6+hh(k*1.7)*26)*(-1)*(-1),wy(k*40)); } ctx.lineTo(sd<0?0:VW,VH+20); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#0f4a82"; ctx.lineWidth=4; ctx.stroke(); }
    for(const c of S.cre){ const a=wy(c.y1), b=wy(c.y0); if(b<-50||a>VH+50) continue; ctx.fillStyle="#0e3a66"; ctx.beginPath(); ctx.moveTo(cx+c.x0,a); for(let x=c.x0;x<=c.x1;x+=24) ctx.lineTo(cx+x,a+(hh(x)*8)); ctx.lineTo(cx+c.x1,b); for(let x=c.x1;x>=c.x0;x-=24) ctx.lineTo(cx+x,b-(hh(x+5)*8)); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.stroke(); }
    for(const e of S.ev){ const ex=cx+e.x, ey=wy(e.y); if(e.t<1.3){ const sh=Math.sin(tm*40)*2*(e.t/1.3); ctx.strokeStyle="#2a6fb0"; ctx.lineWidth=4; for(let i=0;i<7;i++){ const a=i*0.9+e.x; ctx.beginPath(); ctx.moveTo(ex+sh,ey); ctx.lineTo(ex+sh+Math.cos(a)*e.r*(e.t/1.3),ey+Math.sin(a)*e.r*0.7*(e.t/1.3)); ctx.stroke(); } } else { ctx.fillStyle=e.t<1.65?"#2d7bb8":"#0e3a66"; ctx.beginPath(); ctx.ellipse(ex,ey,e.r,e.r*0.72,0,0,6.3); ctx.fill(); ctx.strokeStyle="#fff"; ctx.lineWidth=3; ctx.stroke(); } }
    const sb=wy(S.breakY); if(sb<VH+40){ const gw=ctx.createLinearGradient(0,sb-6,0,VH); gw.addColorStop(0,"#5ec8f0"); gw.addColorStop(1,"#14609c"); ctx.fillStyle=gw; ctx.fillRect(0,sb,VW,VH-sb+10); ctx.strokeStyle="#fff"; ctx.lineWidth=5; ctx.beginPath(); for(let x=0;x<=VW;x+=26) ctx.lineTo(x,sb+Math.sin(x*0.3+tm*6)*7); ctx.stroke(); ctx.strokeStyle="#2a6fb0"; ctx.lineWidth=3; for(let x=10;x<VW;x+=70){ ctx.beginPath(); ctx.moveTo(x,sb-4); ctx.lineTo(x+14,sb-30-hh(x)*30); ctx.stroke(); } }
  } else if(S.key==="forest"){
    ctx.fillStyle="#2f6a2c"; ctx.fillRect(0,0,VW,VH);
    const pw=TW*0.82; ctx.fillStyle="#b7824a"; ctx.fillRect(cx-pw,0,pw*2,VH); ctx.fillStyle="#8c5f30"; ctx.fillRect(cx-pw,0,10,VH); ctx.fillRect(cx+pw-10,0,10,VH);
    ctx.fillStyle="#9b6c3a"; for(let k=Math.floor(yBot/50);k<=Math.ceil(yTop/50);k++){ ctx.beginPath(); ctx.ellipse(cx+(hh(k*2.3)-.5)*2*pw*0.8,wy(k*50),6+hh(k)*8,3+hh(k+1)*4,0,0,6.3); ctx.fill(); }
    for(let k=Math.floor(yBot/110);k<=Math.ceil(yTop/110);k++) for(const sd of [-1,1]){ const x=cx+sd*(TW*0.95+30+hh(k*(sd+5))*240), y=wy(k*110+hh(k*sd)*60), r=52+hh(k+sd)*26; ctx.fillStyle="#1f4a22"; ctx.strokeStyle="#102a12"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y,r,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#3d7a35"; ctx.beginPath(); ctx.arc(x-r*0.25,y-r*0.25,r*0.55,0,6.3); ctx.fill(); }
    for(const l of S.ev){ const a=wy(l.y1), b=wy(l.y0); if(b<-80||a>VH+80) continue; const w=l.x1-l.x0;
      if(l.state==="warn"){ const f=Math.min(1,l.t/1.0); ctx.fillStyle="rgba(224,82,63,"+(0.25+0.25*Math.sin(tm*18))+")"; ctx.fillRect(cx+l.x0,a-10,w,b-a+20); ctx.fillStyle="#e0523f"; ctx.font="900 34px sans-serif"; ctx.textAlign="center"; ctx.fillText("!",cx+(l.x0+l.x1)/2,(a+b)/2+12); const off=(1-f)*(1-f)*140; ctx.save(); ctx.globalAlpha=0.55; ctx.fillStyle="#8a5a2b"; ctx.fillRect(cx+l.x0,a-off,w,b-a); ctx.restore(); }
      else { ctx.fillStyle="#8a5a2b"; ctx.strokeStyle="#3a2208"; ctx.lineWidth=4; rr(cx+l.x0,a,w,b-a,14); ctx.fill(); ctx.stroke(); ctx.strokeStyle="#5a3a1a"; ctx.lineWidth=2; for(let x=l.x0+30;x<l.x1-20;x+=46){ ctx.beginPath(); ctx.moveTo(cx+x,a+8); ctx.lineTo(cx+x+14,b-8); ctx.stroke(); } ctx.fillStyle="#d8b27a"; ctx.beginPath(); ctx.ellipse(cx+(l.x0<0&&l.x0<=-TW+1?l.x1:l.x0),(a+b)/2,10,(b-a)/2-3,0,0,6.3); ctx.fill(); ctx.stroke(); } }
  } else if(S.key==="train"){
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#3f7a3a"); g.addColorStop(1,"#2d5e2e"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    const cols=["#e2701e","#c8461c","#eaa02c","#5f9a3c"];
    for(let k=Math.floor(yBot/130);k<=Math.ceil(yTop/130);k++) for(const sd of [-1,1]){ const x=cx+sd*(TW+80+hh(k*(sd+5))*300), y=wy(k*130+hh(k*sd)*70), r=44+hh(k+sd)*26; ctx.fillStyle=cols[Math.floor(hh(k*3+sd)*4)]; ctx.strokeStyle="#3a1c0a"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y,r,0,6.3); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle="#7a6a4a"; ctx.fillRect(cx-TW-30,0,10,VH); ctx.fillRect(cx+TW+20,0,10,VH);
    const trk=(fn,y0,y1)=>{ const a=Math.max(yBot,y0), b=Math.min(yTop,y1); if(b<a) return;
      ctx.fillStyle="#6b4a2a"; for(let y=Math.ceil(a/38)*38;y<=b;y+=38) ctx.fillRect(cx+fn(y)-26,wy(y)-4,52,8);
      for(const sd of [-15,15]){ ctx.beginPath(); for(let y=a;y<=b;y+=16){ const X=cx+fn(y)+sd, Y=wy(y); if(y===a) ctx.moveTo(X,Y); else ctx.lineTo(X,Y); } ctx.strokeStyle="#2a2a2a"; ctx.lineWidth=8; ctx.stroke(); ctx.strokeStyle="#d5dade"; ctx.lineWidth=4; ctx.stroke(); } };
    trk(y=>trkX(S,y),yBot-20,yTop+20);
    for(const f of S.forks){ trk(y=>trkBranch(S,f,y),f.y0,f.y1);
      const lx=wy(f.y0-60); if(lx>-60&&lx<VH+60){ const mx=cx+trkX(S,f.y0-60); ctx.lineWidth=3; ctx.strokeStyle="#222"; for(const [dx,col] of [[-f.dir*60,"#38d65a"],[f.dir*60,"#e0382f"]]){ ctx.fillStyle="#444"; ctx.fillRect(mx+dx-3,lx-4,6,36); ctx.fillStyle=col; ctx.beginPath(); ctx.arc(mx+dx,lx-12,13,0,6.3); ctx.fill(); ctx.stroke(); } }
      const by=wy(f.y1), bx=cx+trkBranch(S,f,f.y1); if(by>-40&&by<VH+40){ for(let i=0;i<4;i++){ ctx.fillStyle=i%2?"#fff":"#e0382f"; ctx.fillRect(bx-34+i*17,by-8,17,16); } ctx.strokeStyle="#222"; ctx.lineWidth=3; ctx.strokeRect(bx-34,by-8,68,16); } }
  } else if(S.key==="sail"){
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#1f66b8"); g.addColorStop(1,"#2a9ad8"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.strokeStyle="#ffffff90"; ctx.lineWidth=3; for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++) for(let j=0;j<5;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+120), y=wy(k*70+hh(k+j*3)*60); ctx.beginPath(); ctx.moveTo(x-14,y); ctx.quadraticCurveTo(x,y-7+Math.sin(tm*2+k)*2,x+14,y); ctx.stroke(); }
    for(const sd of [-1,1]){ ctx.fillStyle="#dcb86c"; const ex=cx+sd*(TW+30); ctx.beginPath(); ctx.moveTo(sd<0?0:VW,-20); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*22),wy(k*40)); ctx.lineTo(sd<0?0:VW,VH+20); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#fff"; ctx.lineWidth=5; ctx.stroke(); }
    for(const a of S.an){ const x=cx+a.x, y=wy(a.y); if(y<-140||y>VH+140) continue;
      if(a.kind==="seal"){ ctx.fillStyle="#7d8288"; ctx.strokeStyle="#2a2d31"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,58,34,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#a8743f"; ctx.strokeStyle="#4a2c10"; ctx.beginPath(); ctx.ellipse(x-6,y-8,32,15,-0.1,0,6.3); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(x+24,y-14,12,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(x+29,y-16,2.6,0,6.3); ctx.fill(); }
      else { const ph=a.ph||0;
        if(!a.up){ ctx.fillStyle="rgba(10,40,90,"+(0.25+(ph>1?0.2:0))+")"; ctx.beginPath(); ctx.ellipse(x,y,98,38,0,0,6.3); ctx.fill(); if(ph>1.0&&ph<=2.0){ const f=(ph-1)/1; ctx.strokeStyle="rgba(255,255,255,"+(0.8-0.3*f)+")"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,50+60*f,20+24*f,0,0,6.3); ctx.stroke(); } }
        else { const k=Math.min(1,(ph-2)/0.4)*Math.min(1,(3.9-ph)/0.4); ctx.save(); ctx.translate(x,y); ctx.scale(1,0.55+0.45*k); ctx.fillStyle="#2c3f66"; ctx.strokeStyle="#0c1624"; ctx.lineWidth=5; ctx.beginPath(); ctx.ellipse(0,0,104,44,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e8e2d0"; for(const [dx,dy] of [[60,-18],[74,-4],[52,-6]]){ ctx.beginPath(); ctx.arc(dx,dy,7,0,6.3); ctx.fill(); } ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(76,2,4,0,6.3); ctx.fill(); ctx.fillStyle="#2c3f66"; ctx.beginPath(); ctx.moveTo(-98,0); ctx.lineTo(-140,-22); ctx.lineTo(-132,0); ctx.lineTo(-140,22); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
          ctx.strokeStyle="#ffffffcc"; ctx.lineWidth=4; for(let i=-1;i<=1;i++){ ctx.beginPath(); ctx.moveTo(x-8,y-30); ctx.quadraticCurveTo(x+i*18,y-62-Math.sin(tm*8)*4,x+i*30,y-48); ctx.stroke(); } } } }
  } else if(S.key==="trees"){
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#3d7a35"); g.addColorStop(1,"#5a9a3e"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.fillStyle="#4e8b38"; for(let k=Math.floor(yBot/60);k<=Math.ceil(yTop/60);k++) for(let j=0;j<5;j++){ ctx.beginPath(); ctx.ellipse(cx+(hh(k*5+j)-.5)*2*(TW+200),wy(k*60+hh(k+j)*50),18,7,0,0,6.3); ctx.fill(); }
    ctx.fillStyle="#2f6a2c"; for(const sd of [-1,1]) ctx.fillRect(sd<0?0:cx+TW+14,0,sd<0?Math.max(0,cx-TW-14):VW,VH);
    for(const o of S.trees){ const y=wy(o.y), x=cx+o.x; if(y<-110||y>VH+110) continue; ctx.fillStyle="rgba(0,0,0,.22)"; ctx.beginPath(); ctx.ellipse(x+8,y+4,o.r*0.9,o.r*0.35,0,0,6.3); ctx.fill();
      ctx.fillStyle="#6b4a2a"; ctx.strokeStyle="#2f1d0c"; ctx.lineWidth=3; rr(x-9,y-34,18,40,4); ctx.fill(); ctx.stroke();
      const R=o.r*1.7; ctx.fillStyle=o.k?"#2f7d3a":"#1f5a28"; ctx.strokeStyle="#0f2e14"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y-48,R,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle=o.k?"#56a851":"#3d8a3c"; ctx.beginPath(); ctx.arc(x-R*0.25,y-48-R*0.25,R*0.55,0,6.3); ctx.fill(); }
  } else if(S.key==="stones"){
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#1f8fc4"); g.addColorStop(1,"#2ab0d8"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.strokeStyle="#ffffffa0"; ctx.lineWidth=3; for(let k=Math.floor(yBot/60);k<=Math.ceil(yTop/60);k++) for(let j=0;j<5;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+60), y=wy(k*60+hh(k+j*3)*50); ctx.beginPath(); ctx.moveTo(x-18,y); ctx.quadraticCurveTo(x,y-6+Math.sin(tm*3+k+j)*3,x+18,y); ctx.stroke(); }
    for(const sd of [-1,1]){ ctx.fillStyle="#6f6a66"; const ex=cx+sd*(TW+26); ctx.beginPath(); ctx.moveTo(sd<0?0:VW,-20); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*24),wy(k*40)); ctx.lineTo(sd<0?0:VW,VH+20); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#3b3a36"; ctx.lineWidth=5; ctx.stroke(); }
    for(let i=0;i<S.rows.length;i++){ const row=S.rows[i], y=wy(row.y); if(y<-70||y>VH+70) continue; const tgt=(i===S.row+1&&!S.hop);
      for(const q of row.st){ const x=cx+stX(S,q); ctx.fillStyle="rgba(0,40,80,.3)"; ctx.beginPath(); ctx.ellipse(x+5,y+8,q.r+4,q.r*0.72+3,0,0,6.3); ctx.fill();
        ctx.fillStyle=q===S.on?"#c9c2b4":"#a39d92"; ctx.strokeStyle="#3b3a36"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,q.r,q.r*0.72,0,0,6.3); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#ffffff55"; ctx.beginPath(); ctx.ellipse(x-q.r*0.25,y-q.r*0.22,q.r*0.45,q.r*0.2,0,0,6.3); ctx.fill();
        if(tgt){ ctx.save(); ctx.setLineDash([7,7]); ctx.strokeStyle="#ffffffcc"; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y,q.r+8,q.r*0.72+6,0,0,6.3); ctx.stroke(); ctx.restore(); }
        if(q.star&&!q.got) drawStar(x,y-6,16,Math.sin(tm*2+i)*0.15); } }
  } else if(S.key==="fog"){
    const F=S.fl, fl=F.st==="flash", wn=F.st==="warn";
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#8fa7b5"); g.addColorStop(1,"#4f7d96"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.strokeStyle="#ffffff55"; ctx.lineWidth=3; for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++) for(let j=0;j<4;j++){ const x=cx+(hh(k*5+j)-.5)*2*(TW+120), y=wy(k*70+hh(k+j*3)*60); ctx.beginPath(); ctx.moveTo(x-14,y); ctx.quadraticCurveTo(x,y-6+Math.sin(tm*2+k)*2,x+14,y); ctx.stroke(); }
    for(const sd of [-1,1]){ ctx.fillStyle="#4a5a52"; const ex=cx+sd*(TW+30); ctx.beginPath(); ctx.moveTo(sd<0?0:VW,-20); for(let k=Math.floor(yTop/40);k>=Math.floor(yBot/40);k--) ctx.lineTo(ex+sd*(hh(k*1.9)*22),wy(k*40)); ctx.lineTo(sd<0?0:VW,VH+20); ctx.closePath(); ctx.fill(); ctx.strokeStyle="#cfd8dc"; ctx.lineWidth=5; ctx.stroke();
      for(let k=Math.floor(yBot/900);k<=Math.ceil(yTop/900);k++){ const ly=wy(k*900+(sd>0?450:0)+200), lx=ex+sd*70; if(ly<-120||ly>VH+120) continue;
        if(wn||fl){ const gl=ctx.createRadialGradient(lx,ly-70,6,lx,ly-70,fl?170:110); gl.addColorStop(0,"rgba(255,240,150,"+(fl?0.9:0.35+0.35*Math.sin(tm*18))+")"); gl.addColorStop(1,"rgba(255,240,150,0)"); ctx.fillStyle=gl; ctx.fillRect(lx-180,ly-250,360,360); }
        ctx.fillStyle="#fff"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(lx-16,ly); ctx.lineTo(lx+16,ly); ctx.lineTo(lx+10,ly-70); ctx.lineTo(lx-10,ly-70); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#e0382f"; ctx.fillRect(lx-13,ly-46,26,14); ctx.fillRect(lx-11,ly-22,22,12); ctx.fillStyle=(wn||fl)?"#ffe45a":"#8a8a6a"; ctx.fillRect(lx-9,ly-86,18,16); ctx.strokeRect(lx-9,ly-86,18,16); ctx.fillStyle="#3b2410"; ctx.beginPath(); ctx.moveTo(lx-13,ly-86); ctx.lineTo(lx,ly-102); ctx.lineTo(lx+13,ly-86); ctx.fill(); } }
    for(const o of S.ob){ const y=wy(o.y), x=cx+o.x, a=fogA(S,o.y); if(a<=0.02||y<-140||y>VH+140) continue; ctx.save(); ctx.globalAlpha=a;
      if(o.kind==="buoy"){ ctx.fillStyle="#e0382f"; ctx.strokeStyle="#3a1010"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-18,y+14); ctx.lineTo(x+18,y+14); ctx.lineTo(x+10,y-24); ctx.lineTo(x-10,y-24); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.fillRect(x-14,y-8,28,8); ctx.fillStyle="#ffd45a"; ctx.beginPath(); ctx.arc(x,y-30,7,0,6.3); ctx.fill(); ctx.stroke(); }
      else if(o.kind==="ice"){ ctx.fillStyle="#eaf8ff"; ctx.strokeStyle="#4a9ad0"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-o.r,y+10); ctx.lineTo(x-o.r*0.5,y-26); ctx.lineTo(x+o.r*0.1,y-8); ctx.lineTo(x+o.r*0.6,y-34); ctx.lineTo(x+o.r,y+10); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      else { ctx.fillStyle="#5f6468"; ctx.strokeStyle="#22252a"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(x,y,o.r,o.r*0.62,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#7d8388"; ctx.beginPath(); ctx.ellipse(x-o.r*0.2,y-o.r*0.18,o.r*0.55,o.r*0.3,0,0,6.3); ctx.fill();
        if(o.kind==="faro"){ ctx.fillStyle="#fff"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-14,y-6); ctx.lineTo(x+14,y-6); ctx.lineTo(x+9,y-66); ctx.lineTo(x-9,y-66); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e0382f"; ctx.fillRect(x-12,y-30,24,12); ctx.fillStyle="#ffe45a"; ctx.fillRect(x-8,y-82,16,16); ctx.strokeRect(x-8,y-82,16,16); } }
      ctx.restore(); }
    const gf=ctx.createLinearGradient(0,0,0,VH*0.8); gf.addColorStop(0,"rgba(222,230,236,"+(fl?0.18:0.96)+")"); gf.addColorStop(1,"rgba(222,230,236,0)"); ctx.fillStyle=gf; ctx.fillRect(0,0,VW,VH*0.8);
    ctx.strokeStyle="rgba(200,220,235,.55)"; ctx.lineWidth=2; for(let i=0;i<26;i++){ const xx=((i*137+tm*120)%(VW+80))-40, yy=((i*71+tm*520)%VH); ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx-8,yy+22); ctx.stroke(); }
    if(wn||fl){ ctx.save(); ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; rr(VW/2-190,176,380,40,14); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.font="900 20px sans-serif"; ctx.textAlign="center"; ctx.fillText(wn?"¡El faro va a destellar!":"¡Destello! Memorizá el hueco",VW/2,203); ctx.restore(); }
  } else {
    const g=ctx.createLinearGradient(0,0,0,VH); g.addColorStop(0,"#8a7a6a"); g.addColorStop(1,"#6a5848"); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH);
    ctx.fillStyle="#9a8874"; ctx.fillRect(cx-TW,0,TW*2,VH);
    ctx.strokeStyle="#5a4a3a"; ctx.lineWidth=3; for(let k=Math.floor(yBot/70);k<=Math.ceil(yTop/70);k++){ const y=wy(k*70); ctx.beginPath(); for(let x=0;x<=VW;x+=40) ctx.lineTo(x,y+Math.sin(x*0.02+k)*6); ctx.stroke(); }
    ctx.fillStyle="#4a3a2c"; for(let k=Math.floor(yBot/90);k<=Math.ceil(yTop/90);k++) for(let j=0;j<4;j++){ ctx.beginPath(); ctx.ellipse(cx+(hh(k*4+j)-.5)*2*TW,wy(k*90+hh(k+j)*80),9,5,0,0,6.3); ctx.fill(); }
    const snow=Math.max(0,Math.min(1,(S.y-S.LEN*0.45)/(S.LEN*0.55))); if(snow>0){ ctx.fillStyle="rgba(255,255,255,"+(snow*0.5)+")"; ctx.fillRect(0,0,VW,VH); }
    for(const c of S.ice){ const y=wy(c.y); if(y<-100||y>VH+100) continue; ctx.fillStyle="#cdeeff"; ctx.strokeStyle="#4a9ad0"; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(cx+c.x,y,c.r,c.r*0.6,0,0,6.3); ctx.fill(); ctx.stroke(); }
    for(const r of S.ev){ const y=wy(r.y), x=cx+r.x; if(r.t<0.9){ ctx.fillStyle="#e0523f"; ctx.beginPath(); ctx.moveTo(x-16,20); ctx.lineTo(x+16,20); ctx.lineTo(x,48); ctx.fill(); continue; } ctx.fillStyle="#6c7078"; ctx.strokeStyle="#22252a"; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(x,y,28,0,6.3); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x-10,y-6); ctx.lineTo(x+2,y+2); ctx.lineTo(x-4,y+14); ctx.stroke(); }
  }
  if(S.key==="forest"){
    for(const l of S.lit){ if(l.got) continue; const y=wy(l.y); if(y<-30||y>VH+30) continue; const x=cx+l.x; ctx.strokeStyle="#1b1b1b"; ctx.lineWidth=3;
      if(l.k==="can"){ ctx.fillStyle="#c9ced4"; rr(x-10,y-16,20,28,4); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e0523f"; ctx.fillRect(x-10,y-8,20,8); }
      else if(l.k==="bottle"){ ctx.fillStyle="#6ec6f5"; rr(x-9,y-6,18,24,5); ctx.fill(); ctx.stroke(); ctx.fillRect(x-4,y-20,8,14); ctx.strokeRect(x-4,y-20,8,14); }
      else { ctx.fillStyle="#f4f4f4"; ctx.beginPath(); ctx.ellipse(x,y,16,13,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x-6,y-12); ctx.lineTo(x,y-20); ctx.lineTo(x+6,y-12); ctx.stroke(); }
      ctx.strokeStyle="#ffd45a"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,y-2,26+Math.sin(tm*4)*2,0,6.3); ctx.stroke(); }
    for(const a of S.an){ const y=wy(a.y), x=cx+a.x, im=img[a.kind]; if(!im||y<-160||y>VH+160) continue; const H=sizeH()*(a.kind==="huemul"?1.0:0.85), k=H/im.naturalHeight, sway=Math.sin(tm*9+a.y)*3;
      drawShadow(x,y,H*0.3,.3); ctx.save(); ctx.translate(x,y+sway); ctx.scale(a.vx>0?-1:1,1); ctx.drawImage(im,-im.naturalWidth*k/2,-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); ctx.restore();
      if(!a.on||Math.abs(a.x)>S.TW+20){ if(a.y-S.y<620&&a.y>S.y){ ctx.fillStyle="#e0523f"; ctx.font="900 30px sans-serif"; ctx.textAlign="center"; ctx.fillText(a.vx>0?"▶":"◀",Math.max(30,Math.min(VW-30,x)),Math.max(40,y-20)); } } }
  }
  if(S.key==="climb"){ const Wd=S.wind;
    if(Wd.state==="warn"||Wd.state==="gust"){ const dir=Wd.dir, a=Wd.state==="warn"?(0.45+0.35*Math.sin(tm*16)):0.8;
      if(Wd.state==="gust"){ ctx.strokeStyle="rgba(255,255,255,.65)"; ctx.lineWidth=3; for(let i=0;i<14;i++){ const yy=((i*83+tm*500)%VH), xx=((i*191+tm*900*dir)%VW+VW)%VW; ctx.beginPath(); ctx.moveTo(xx,yy); ctx.lineTo(xx+dir*70,yy); ctx.stroke(); } }
      ctx.save(); ctx.globalAlpha=a; ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; rr(VW/2-110,176,220,44,14); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.font="900 24px sans-serif"; ctx.textAlign="center"; ctx.fillText(dir>0?"¡VIENTO  ▶▶▶":"◀◀◀  VIENTO!",VW/2,207); ctx.restore(); } }
  // estrellas, meta
  for(const st of S.stars){ if(st.got) continue; const y=wy(st.y); if(y<-30||y>VH+30) continue; const fa=S.key==="fog"?fogA(S,st.y):1; if(fa<=0.02) continue; ctx.globalAlpha=fa; drawStar(cx+st.x,y+Math.sin(tm*3+st.y)*4,17,Math.sin(tm*2+st.y)*0.15); ctx.globalAlpha=1; }
  const gy=wy(S.LEN); if(gy>-80&&gy<VH+80){ for(let i=0;i<14;i++){ ctx.fillStyle=i%2?"#fff":"#222"; ctx.fillRect(cx-TW+i*(TW*2/14),gy-10,TW*2/14,12); ctx.fillStyle=i%2?"#222":"#fff"; ctx.fillRect(cx-TW+i*(TW*2/14),gy+2,TW*2/14,12); }
    ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; rr(cx-90,gy-70,180,44,12); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.font="900 26px sans-serif"; ctx.textAlign="center"; ctx.fillText("¡META!",cx,gy-39); }
  if(S.key==="train"){ const ex=VW/2, ey=PYv+16; ctx.save(); ctx.lineJoin="round"; ctx.strokeStyle="#111"; ctx.lineWidth=4;
    ctx.fillStyle="#222"; ctx.beginPath(); ctx.moveTo(ex-30,ey-96); ctx.lineTo(ex+30,ey-96); ctx.lineTo(ex+30,ey+22); ctx.lineTo(ex-30,ey+22); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#c8301f"; ctx.fillRect(ex-30,ey-30,60,52); ctx.strokeRect(ex-30,ey-30,60,52); ctx.fillStyle="#555"; ctx.beginPath(); ctx.arc(ex,ey-88,24,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#ffd45a"; ctx.beginPath(); ctx.arc(ex,ey-88,9,0,6.3); ctx.fill();
    ctx.fillStyle="#fff"; ctx.globalAlpha=.55; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.arc(ex+Math.sin(tm*3+i)*6,ey-50+i*30+((tm*60)%30),8+i*2,0,6.3); ctx.fill(); } ctx.restore(); }
  else if(S.key==="sail"||S.key==="fog"){ drawBoat(VW/2,PYv+16,tm); }
  // jugador
  const H=sizeH()*(S.key==="climb"?1.0:(S.key==="train"||S.key==="sail"||S.key==="fog")?0.72:0.95), im=(S.moving&&S.air<=0)?img.run:img.idle, k=H/im.naturalHeight, as=Math.abs(Math.sin(P.phase*Math.PI));
  const lift=S.air>0?Math.sin(Math.PI*(1-S.air/0.55))*60:0, px=VW/2, py=PYv+16-(S.key==="train"?6:(S.key==="sail"||S.key==="fog")?18:0);
  drawShadow(px,PYv+14,H*0.25*(1-lift/200),0.35);
  ctx.save(); ctx.translate(px,py-lift-(S.moving?as*5:0)); if(S.inv>0&&Math.floor(tm*14)%2) ctx.globalAlpha=0.45; ctx.scale(S.face>0?1:-1,1); ctx.drawImage(im,-im.naturalWidth*k/2,-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); ctx.restore();
  // HUD del subnivel: barra de avance y título
  const bx=VW-30, b0=120, b1=VH-210; ctx.fillStyle="#0008"; rr(bx-6,b0,12,b1-b0,6); ctx.fill(); ctx.fillStyle="#ffd45a"; rr(bx-6,b1-(b1-b0)*(S.y/S.LEN),12,(b1-b0)*(S.y/S.LEN),6); ctx.fill();
  ctx.fillStyle="#fff"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(bx,b1-(b1-b0)*(S.y/S.LEN),9,0,6.3); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; const tt="Subnivel · "+S.inf.title+(S.key==="forest"?"  ·  Basura "+S.litGot+"/"+S.lit.length:""); ctx.font="800 18px sans-serif"; const tw=ctx.measureText(tt).width+28; rr(VW/2-tw/2,132,tw,34,12); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2a1d14"; ctx.textAlign="center"; ctx.fillText(tt,VW/2,155);
  if(S.cd>0){ ctx.fillStyle="#fff"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=8; ctx.font="900 130px sans-serif"; ctx.textAlign="center"; const n=Math.ceil(S.cd-0.2), txt=n>0?String(n):"¡YA!"; ctx.strokeText(txt,VW/2,VH*0.42); ctx.fillText(txt,VW/2,VH*0.42); }
}

/* ---------- escena: objeto de misión ---------- */
const GI={
 boots:'<svg viewBox="0 0 100 108"><path d="M28 10h28v36c0 8 8 12 18 15 10 3 16 9 16 18v7H20V60c0-6 2-10 8-14z" fill="#8a5a2b" stroke="#3b2410" stroke-width="4" stroke-linejoin="round"/><rect x="20" y="78" width="70" height="10" fill="#3b2410"/><path d="M30 90l6 14 6-14M48 90l6 14 6-14M66 90l6 14 6-14" fill="#b5bcc4" stroke="#2e3238" stroke-width="3" stroke-linejoin="round"/><path d="M32 22h20M32 31h20M32 40h20" stroke="#f3ecc8" stroke-width="4" stroke-linecap="round"/></svg>',
 ticket:'<svg viewBox="0 0 100 100"><path d="M6 26h88v16a9 9 0 0 0 0 18v16H6V60a9 9 0 0 0 0-18z" fill="#ffd45a" stroke="#3b2410" stroke-width="4" stroke-linejoin="round"/><line x1="70" y1="30" x2="70" y2="72" stroke="#3b2410" stroke-width="3" stroke-dasharray="4 4"/><text x="13" y="52" font-size="12" font-weight="900" fill="#3b2410" font-family="sans-serif">AEROSILLA</text><text x="13" y="68" font-size="9" font-weight="800" fill="#7a4a26" font-family="sans-serif">BARILOCHE</text><text x="76" y="56" font-size="20" fill="#e0523f">★</text></svg>',
 poles:'<svg viewBox="0 0 100 100"><g stroke="#3b2410" stroke-width="4" stroke-linecap="round"><line x1="30" y1="12" x2="42" y2="92" stroke="#2f7fd6" stroke-width="7"/><line x1="64" y1="12" x2="76" y2="92" stroke="#2f7fd6" stroke-width="7"/></g><rect x="22" y="6" width="16" height="22" rx="6" fill="#e0523f" stroke="#3b2410" stroke-width="3" transform="rotate(-8 30 17)"/><rect x="56" y="6" width="16" height="22" rx="6" fill="#e0523f" stroke="#3b2410" stroke-width="3" transform="rotate(-8 64 17)"/><ellipse cx="40" cy="80" rx="10" ry="4" fill="#3b2410"/><ellipse cx="74" cy="80" rx="10" ry="4" fill="#3b2410"/></svg>',
 boat:'<svg viewBox="0 0 100 100"><path d="M8 62h84l-16 24H24z" fill="#e0523f" stroke="#3b2410" stroke-width="4" stroke-linejoin="round"/><line x1="50" y1="10" x2="50" y2="62" stroke="#3b2410" stroke-width="4"/><path d="M54 14v42h28z" fill="#fff" stroke="#3b2410" stroke-width="3" stroke-linejoin="round"/></svg>',
 binoc:'<svg viewBox="0 0 100 100"><rect x="14" y="26" width="28" height="56" rx="9" fill="#3a3f45" stroke="#14171a" stroke-width="4"/><rect x="58" y="26" width="28" height="56" rx="9" fill="#3a3f45" stroke="#14171a" stroke-width="4"/><rect x="38" y="40" width="24" height="16" fill="#5c646c" stroke="#14171a" stroke-width="3"/><circle cx="28" cy="78" r="9" fill="#8fd6ff" stroke="#14171a" stroke-width="3"/><circle cx="72" cy="78" r="9" fill="#8fd6ff" stroke="#14171a" stroke-width="3"/></svg>'
};
const GART={
 ice:'<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#8fd0f5"/><polygon points="0,170 70,90 120,140 190,66 260,150 330,100 400,160 400,300 0,300" fill="#7a8fb8"/><polygon points="190,66 172,100 190,95 206,112" fill="#fff"/><rect y="196" width="400" height="104" fill="#d3f0ff"/><path d="M40 226 L90 248 L130 222 M200 214 L240 246 L300 228 M330 262 L362 236" stroke="#2a6fb0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 chair:'<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#8fd0f5"/><polygon points="0,150 80,70 140,120 230,50 300,120 400,80 400,300 0,300" fill="#6f87b0"/><rect y="190" width="400" height="110" fill="#2f7d4a"/><path d="M110 190 Q200 310 290 190z" fill="#12425f"/><path d="M0 50 Q200 100 400 50" stroke="#2b2f36" stroke-width="4" fill="none"/><line x1="20" y1="45" x2="20" y2="190" stroke="#2b2f36" stroke-width="5"/><line x1="380" y1="45" x2="380" y2="190" stroke="#2b2f36" stroke-width="5"/><g transform="translate(250,72)"><line x1="0" y1="0" x2="0" y2="46" stroke="#2b2f36" stroke-width="3"/><rect x="-24" y="44" width="48" height="12" rx="4" fill="#e0523f" stroke="#3b2410" stroke-width="3"/></g></svg>',
 river:'<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#8fd0f5"/><polygon points="0,160 60,70 100,120 170,30 230,130 300,60 400,150 400,300 0,300" fill="#8c86a8"/><polygon points="170,30 152,70 172,64 190,84" fill="#fff"/><rect y="196" width="400" height="104" fill="#2aa8d8"/><path d="M0 214q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/><path d="M0 250q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/><g fill="#8d949c" stroke="#2e3238" stroke-width="4"><ellipse cx="120" cy="218" rx="30" ry="12"/><ellipse cx="205" cy="232" rx="30" ry="12"/><ellipse cx="290" cy="218" rx="30" ry="12"/></g></svg>',
 sea:'<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#a9c3d6"/><polygon points="0,160 70,90 130,140 210,70 290,150 340,110 400,160 400,300 0,300" fill="#5d7596"/><polygon points="210,70 192,104 212,98 228,116" fill="#fff"/><rect y="176" width="400" height="124" fill="#1f6fb0"/><path d="M0 206q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#fff" stroke-width="4" fill="none"/><path d="M150 214h110l-18 26h-74z" fill="#e0523f" stroke="#3b2410" stroke-width="4" stroke-linejoin="round"/><rect x="196" y="176" width="6" height="38" fill="#3b2410"/><path d="M204 180v30h32z" fill="#fff" stroke="#3b2410" stroke-width="3"/></svg>',
 coast:'<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#8fd0f5"/><polygon points="0,150 60,120 140,120 190,150 190,200 0,200" fill="#d9a85c"/><rect y="170" width="400" height="130" fill="#2a8fd0"/><path d="M0 200q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#fff" stroke-width="4" fill="none"/><path d="M290 190c10-30 30-40 50-20-14 4-18 12-18 24z" fill="#243a5e" stroke="#0c1624" stroke-width="3"/><ellipse cx="312" cy="206" rx="60" ry="20" fill="#34507f" stroke="#0c1624" stroke-width="3"/></svg>'
};
function updGate(){
  const gi=GATE_ITEMS[LV.id], own=!!sv.gateOwned[LV.id], can=score>=gi.price;
  $("gTitle").textContent=gi.title; $("gSay").textContent=own?"¡Listo! Ya tengo "+gi.short.toLowerCase()+". ¡Vamos a cruzar!":gi.say;
  $("gIcon").innerHTML=GI[gi.icon]; $("gName").textContent=gi.name; $("gDesc").textContent=gi.desc;
  $("gPrice").textContent="★ "+gi.price; $("gStars").textContent="★ "+score; $("gFill").style.width=Math.min(100,score/gi.price*100)+"%";
  $("gHint").textContent=own?"Ya lo tenés en tu bolso.":can?"¡Tenés estrellas suficientes!":"Te faltan ★ "+(gi.price-score)+". Juntá casi todas las estrellas del mundo, la basura, las fotos y las respuestas. También se compra en 🎁 Recompensas. Ayuda: ¡fotografiá al cóndor!";
  const b=$("gBuy"); b.textContent=own?"Usar y cruzar ▸":"Comprar ★ "+gi.price; b.classList.toggle("no",!own&&!can); $("gLater").style.display=own?"none":"";
}
function openGateScene(g,dir){
  gateCur={g,dir}; talking=true; for(const k in keys) keys[k]=false; releaseJump(); P.vx=0; AM.sfx("open");
  const gi=GATE_ITEMS[LV.id]; $("gArt").innerHTML=GART[gi.art]||""; $("gPas").src=IMG.idle; updGate(); $("gateScene").classList.add("on");
}
function updSign(){
  const gi=GATE_ITEMS[LV.id], own=!!sv.gateOwned[LV.id];
  $("siT").textContent="Cartel: "+gi.title; $("siIcon").innerHTML=GI[gi.icon]; $("siName").textContent=gi.name; $("siDesc").textContent=gi.desc;
  $("siHow").innerHTML=gi.howto+" <b>Lo comprás en 🎁 Recompensas, en la sección «Objetos de misión».</b>";
  $("siPrice").textContent="★ "+gi.price; $("siStars").textContent="★ "+score; $("siFill").style.width=Math.min(100,score/gi.price*100)+"%";
  $("siHint").textContent=own?"¡Ya lo tenés en tu bolso! Acercate al obstáculo para usarlo.":score>=gi.price?"¡Ya te alcanzan las estrellas! Abrí Recompensas y comprálo.":"Te faltan ★ "+(gi.price-score)+". Juntá estrellas, basura, fotos y respuestas correctas durante el mundo.";
  $("siShop").style.display=own?"none":"";
}
function openSign(){ if(talking||paused||scene!=="game"||sub||cine) return; talking=true; for(const k in keys) keys[k]=false; releaseJump(); P.vx=0; AM.sfx("open"); updSign(); $("signInfo").classList.add("on"); }
function closeSign(){ $("signInfo").classList.remove("on"); talking=false; }
$("siX").addEventListener("click",closeSign); $("siOk").addEventListener("click",closeSign);
$("siShop").addEventListener("click",()=>{ closeSign(); setRewards(true); setTimeout(()=>{ const h=$("shopMission"); if(h) h.scrollIntoView({block:"start"}); },60); });
window.addEventListener("pointerdown",e=>{
  if(scene!=="game"||paused||talking||sub||cine||lvl.fin) return; const tg=e.target; if(!(tg===cv||tg.id==="lz")) return;
  const lx=e.clientX*VW/innerWidth, ly=e.clientY*VH/innerHeight;
},true);
function closeGate(){ $("gateScene").classList.remove("on"); talking=false; }
$("gBuy").addEventListener("click",()=>{
  if(!gateCur) return; const gi=GATE_ITEMS[LV.id], g=gateCur.g, dir=gateCur.dir;
  if(!sv.gateOwned[LV.id]){
    if(score<gi.price){ AM.sfx("bad"); toast("Te faltan "+(gi.price-score)+" estrellas"); return; }
    addScore(-gi.price); sv.gateOwned[LV.id]=true; saveGame(); AM.sfx("buy"); AM.sfx("ok"); updGate(); return;
  }
  closeGate(); gateCur=null; startCine(g,dir);
});
$("gLater").addEventListener("click",()=>{ if(!gateCur) return; const g=gateCur.g, dir=gateCur.dir; closeGate(); gateCur=null; g.cool=1.2; P.x=dir===1?g.x0-80:g.x1+80; });

/* ---------- ajustes ---------- */
const SL = [
  ["walk","Velocidad al caminar (px/s)",120,400,5],
  ["run","Velocidad al correr (px/s)",250,720,5],
  ["jump","Altura de salto (px)",80,320,5],
  ["gravity","Gravedad",1200,4200,50],
  ["size","Tamaño de Pascacio (% de la pantalla)",10,35,1],
  ["screenPos","Posición en pantalla (% desde la izquierda)",25,60,1],
  ["cam","Seguimiento de cámara (más alto = más rápido)",2,20,1],
];
function buildSliders(){
  const box=$("sliders"); box.innerHTML="";
  SL.forEach(([k,label,min,max,step])=>{
    const l=document.createElement("label"); l.innerHTML=label+'<span id="v_'+k+'"></span>';
    const r=document.createElement("input"); r.type="range"; r.min=min; r.max=max; r.step=step; r.value=cfg[k];
    r.addEventListener("input",()=>{cfg[k]=+r.value; $("v_"+k).textContent=cfg[k]; save();});
    box.appendChild(l); box.appendChild(r); $("v_"+k).textContent=cfg[k];
  });
}
function save(){ try{localStorage.setItem("gp_cfg",JSON.stringify(cfg));}catch(e){} }
buildSliders();
/* ---------- recompensas y tienda ---------- */
const ICONS={
  boots:'<svg viewBox="0 0 24 24" fill="#8a5a2c" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="M7 3h6v8l5.5 2.2c1.1.5 1.5 1.2 1.5 2.3V19H5V3z"/><path d="M5 15h15" stroke="#ffd45a"/></svg>',
  stick:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M17 3L7 21"/><ellipse cx="9.4" cy="16.8" rx="4" ry="1.8" transform="rotate(-30 9.4 16.8)" stroke-width="1.8"/></svg>',
  feather:'<svg viewBox="0 0 24 24" fill="#fff" stroke="#0f2c55" stroke-width="1.6" stroke-linejoin="round"><path d="M20 3.5C10 3.5 5 9 5 16l-1.5 4.5L8 19c7.5 0 12-5.5 12-15.5z"/><path d="M5 20L14 10" stroke="#2f7fd6" stroke-linecap="round" stroke-width="1.8"/></svg>',
  magnet:'<svg viewBox="0 0 24 24" fill="#e5483a" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="M4.5 3.5h5v8a2.5 2.5 0 0 0 5 0v-8h5v8a7.5 7.5 0 0 1-15 0z"/><path d="M4.5 7h5M14.5 7h5" stroke="#cfd6dc"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path fill="#e53935" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" d="M12 21s-8.5-5.3-8.5-11.2A4.8 4.8 0 0 1 12 7.2a4.8 4.8 0 0 1 8.5 2.6C20.5 15.7 12 21 12 21z"/></svg>'
};
const CATALOG=[
  {id:"boots",  name:"Botas ligeras",       unit:"% velocidad",   price:300, val:15, min:5,  max:60,  step:5,  desc:v=>"+"+v+"% de velocidad al caminar y al correr."},
  {id:"stick",  name:"Bastón de trekking",  unit:"% altura",      price:400, val:20, min:5,  max:60,  step:5,  desc:v=>"+"+v+"% de altura en cada salto."},
  {id:"feather",name:"Pluma de Künu",       unit:"% caída lenta", price:600, val:60, min:20, max:90,  step:5,  desc:v=>"Mantené saltar en el aire para planear: la caída es "+v+"% más lenta."},
  {id:"magnet", name:"Imán de estrellas",   unit:"radio (px)",    price:350, val:160,min:60, max:400, step:20, desc:v=>"Atrae las estrellas que estén a menos de "+v+" px."},
  {id:"heart",  name:"Corazón extra",       unit:"corazones",     price:500, val:1,  min:1,  max:3,   step:1,  passive:true, desc:v=>"+"+v+" corazón"+(v>1?"es":"")+" permanente"+(v>1?"s":"")+"."}
];
let sv={owned:{},equipped:{},cat:{},score:0,gateOwned:{},best:{}};
try{ const s0=JSON.parse(localStorage.getItem("gp_save")||"null"); if(s0&&typeof s0==="object") sv=Object.assign(sv,s0); }catch(e){}
if((sv.ver|0)<2){ sv.wbest={}; sv.best={}; sv.ver=2; }
score=sv.score|0; sv.wbest=sv.wbest||{}; sv.name=sv.name||"Pascacio"; sv.gateOwned=sv.gateOwned||{}; sv.best=sv.best||{};
function saveGame(){ sv.score=score; try{localStorage.setItem("gp_save",JSON.stringify(sv));}catch(e){} }
function it(id){ const b=CATALOG.find(c=>c.id===id), o=sv.cat[id]||{}; return Object.assign({},b,{price:o.price!=null?o.price:b.price, val:o.val!=null?o.val:b.val}); }
function eff(id){ return (sv.owned[id]&&sv.equipped[id]) ? it(id).val : 0; }
const spdMul=()=>1+eff("boots")/100, jumpMul=()=>1+eff("stick")/100;
let runEarned=0;
function addScore(n){ if(n>0){ sv.total=(sv.total|0)+n; runEarned+=n; } score=Math.max(0,score+n); saveGame(); }
let lives=3;
const heartOff=heartSVG.replace("#e53935","#4b4f55").replace("#7a0d0d","#1f2226");
function maxLives(){ return 3+(sv.owned.heart?it("heart").val:0); }
function renderHearts(){ const mx=maxLives(); lives=Math.max(0,Math.min(mx,lives)); let h=""; for(let i=0;i<mx;i++) h+=(i<lives?heartSVG:heartOff); $("hearts").innerHTML=h; }
function renderShop(){
  $("rwScore").textContent=score;
  const edit=$("editMode").checked, g=$("shopGrid"); g.innerHTML="";
  CATALOG.forEach(b=>{
    const d=it(b.id), own=!!sv.owned[b.id], eq=!!sv.equipped[b.id];
    const c=document.createElement("div"); c.className="card"+(own?" own":"");
    let h='<div class="ic">'+ICONS[b.id]+'</div><div class="tx"><b>'+b.name+'</b><span>'+b.desc(d.val)+'</span>';
    if(edit) h+='<div class="ed"><label>Precio (★)<input type="number" inputmode="numeric" data-id="'+b.id+'" data-f="price" min="0" max="9999" step="10" value="'+d.price+'"></label><label>'+b.unit+'<input type="number" inputmode="numeric" data-id="'+b.id+'" data-f="val" min="'+b.min+'" max="'+b.max+'" step="'+b.step+'" value="'+d.val+'"></label></div>';
    h+='</div><div class="act">';
    if(!own) h+='<button data-buy="'+b.id+'"'+(score<d.price?' class="no"':'')+'>★ '+d.price+'</button>';
    else if(b.passive) h+='<em>Obtenido ✓</em>';
    else h+='<button class="tog'+(eq?' on':'')+'" data-tog="'+b.id+'">'+(eq?'Activo':'Apagado')+'</button>';
    c.innerHTML=h+'</div>'; g.appendChild(c);
  });
  const hd=document.createElement("div"); hd.id="shopMission"; hd.style.cssText="grid-column:1/-1;font-weight:900;color:#5a3a12;margin-top:6px"; hd.textContent="🗺️ Objetos de misión (uno por mundo, para pasar el obstáculo)"; g.appendChild(hd);
  Object.keys(GATE_ITEMS).forEach(id=>{
    const gi=GATE_ITEMS[id], L=LEVELS.find(l=>l.id===id), own=!!sv.gateOwned[id], here=LV&&LV.id===id&&scene==="game";
    const c=document.createElement("div"); c.className="card"+(own?" own":"");
    c.innerHTML='<div class="ic">'+GI[gi.icon]+'</div><div class="tx"><b>'+gi.name+'</b><span>'+gi.desc+' · Mundo: '+(L?L.name:id)+'</span></div><div class="act">'+(own?'<em>Obtenido ✓</em>':'<button data-gbuy="'+id+'"'+(score<gi.price?' class="no"':'')+'>★ '+gi.price+'</button>')+'</div>';
    g.appendChild(c);
  });
}
function buyGate(id){
  const gi=GATE_ITEMS[id]; if(sv.gateOwned[id]) return;
  if(score<gi.price){ AM.sfx("bad"); toast("Te faltan "+(gi.price-score)+" estrellas"); return; }
  addScore(-gi.price); sv.gateOwned[id]=true; saveGame(); AM.sfx("buy"); renderShop(); toast("¡Compraste "+gi.name+"!");
}
function buy(id){
  const d=it(id); if(sv.owned[id]) return;
  if(score<d.price){ toast("Te faltan "+(d.price-score)+" puntos"); return; }
  addScore(-d.price); AM.sfx("buy"); sv.owned[id]=true; sv.equipped[id]=true; saveGame(); if(id==="heart") lives=maxLives(); renderHearts(); renderShop(); toast("¡Compraste "+d.name+"!");
}
$("shopGrid").addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  if(b.dataset.gbuy) buyGate(b.dataset.gbuy);
  else if(b.dataset.buy) buy(b.dataset.buy);
  else if(b.dataset.tog){ sv.equipped[b.dataset.tog]=!sv.equipped[b.dataset.tog]; saveGame(); renderShop(); }
});
$("shopGrid").addEventListener("change",e=>{
  const i=e.target; if(!i.dataset||!i.dataset.id) return; const b=CATALOG.find(c=>c.id===i.dataset.id);
  let v=+i.value; if(isNaN(v)) v=b[i.dataset.f];
  if(i.dataset.f==="price") v=Math.max(0,Math.min(9999,Math.round(v))); else v=Math.max(b.min,Math.min(b.max,v));
  (sv.cat[b.id]=sv.cat[b.id]||{})[i.dataset.f]=v; saveGame(); renderHearts(); renderShop();
});
$("editMode").addEventListener("change",renderShop);
$("plus").addEventListener("click",()=>{ addScore(500); renderShop(); });
$("rsCat").addEventListener("click",()=>{ sv.cat={}; saveGame(); renderHearts(); renderShop(); });
$("rsBuy").addEventListener("click",()=>{ sv.owned={}; sv.equipped={}; sv.gateOwned={}; saveGame(); renderHearts(); renderShop(); });
document.querySelectorAll(".tabs button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x===b));
  ["tabShop","tabCfg"].forEach(id=>$(id).style.display=(id===b.dataset.tab)?"block":"none");
}));
function setRewards(open){
  if(open===paused||(open&&scene!=="game")) return;
  paused=open; $("rewards").classList.toggle("on",open);
  if(open){ for(const k in keys) keys[k]=false; releaseJump(); renderShop(); }
}
const SPK_ON='<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" fill="none" stroke-linecap="round"/></svg>';
const SPK_OFF='<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9l6 6M22 9l-6 6" fill="none" stroke-linecap="round"/></svg>';
function updAud(){ const S=AM.S, off=S.mute||(!S.music&&!S.sfx); document.querySelectorAll(".audBtn").forEach(b=>{ b.innerHTML=off?SPK_OFF:SPK_ON; b.title=off?"Sonido desactivado":"Sonido activado"; });
  $("aMusic").checked=S.music; $("aSfx").checked=S.sfx; $("aMute").checked=S.mute; $("aVol").value=Math.round(S.vol*100); $("aMus").value=Math.round(S.musVol*100); $("aNat").value=Math.round(S.natVol*100); }
document.querySelectorAll(".audBtn").forEach(b=>b.addEventListener("click",()=>{ updAud(); $("m_audio").classList.add("on"); }));
$("audClose").addEventListener("click",()=>$("m_audio").classList.remove("on"));
$("aMusic").addEventListener("change",e=>{ AM.set("music",e.target.checked); updAud(); });
$("aSfx").addEventListener("change",e=>{ AM.set("sfx",e.target.checked); updAud(); });
$("aMute").addEventListener("change",e=>{ AM.set("mute",e.target.checked); updAud(); });
$("aVol").addEventListener("input",e=>AM.set("vol",e.target.value/100)); $("aMus").addEventListener("input",e=>AM.set("musVol",e.target.value/100)); $("aNat").addEventListener("input",e=>AM.set("natVol",e.target.value/100));
$("aTest").addEventListener("click",()=>{ AM.unlock(); AM.sfx("ok"); });
updAud();
$("rwBtn").addEventListener("click",()=>setRewards(true));
$("rwClose").addEventListener("click",()=>setRewards(false));
renderHearts();
$("reset").addEventListener("click",()=>{cfg=Object.assign({},DEFAULTS);save();buildSliders();});
$("home").addEventListener("click",()=>{P.x=450;P.y=GROUND;P.vx=P.vy=0;cam=0;lives=maxLives();P.inv=0;renderHearts();});
// Pantalla completa automática al girar el celular (donde el navegador lo permite)
(function(){ const de=document.documentElement;
  const isFull=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
  const land=()=>innerWidth>innerHeight;
  function goFull(){ if(isFull()||!land()) return; try{ const f=de.requestFullscreen||de.webkitRequestFullscreen; if(f){ const r=f.call(de); if(r&&r.catch) r.catch(()=>{}); } }catch(e){}
    try{ if(screen.orientation&&screen.orientation.lock) screen.orientation.lock("landscape").catch(()=>{}); }catch(e){} }
  function arm(){ const h=()=>{ if(land()){ goFull(); } }; document.addEventListener("touchend",h,{passive:true}); document.addEventListener("click",h); }
  arm();
  window.addEventListener("orientationchange",()=>setTimeout(goFull,250));
  window.addEventListener("resize",()=>{ if(land()) setTimeout(goFull,150); });
})();
function toggleFull(){ const e=document.documentElement, fe=document.fullscreenElement||document.webkitFullscreenElement;
  if(fe){ try{ (document.exitFullscreen||document.webkitExitFullscreen).call(document); }catch(x){} return; }
  const f=e.requestFullscreen||e.webkitRequestFullscreen;
  if(!f){ $("m_full").classList.add("on"); return; }
  try{ const r=f.call(e); if(r&&r.catch) r.catch(()=>$("m_full").classList.add("on")); }catch(x){ $("m_full").classList.add("on"); }
  try{ if(screen.orientation&&screen.orientation.lock) screen.orientation.lock("landscape").catch(()=>{}); }catch(x){} }
$("full").addEventListener("click",toggleFull); $("fsBtn").addEventListener("click",toggleFull); $("pmFull").addEventListener("click",toggleFull); $("fullClose").addEventListener("click",()=>$("m_full").classList.remove("on"));
$("dbg").addEventListener("change",e=>{$("state").style.display=e.target.checked?"block":"none";});

function toast(msg){const e=$("toast");e.textContent=msg;e.style.opacity=1;clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.opacity=0,1400);}

/* ---------- entrada: teclado ---------- */
window.addEventListener("keydown",e=>{
  const k=e.key.toLowerCase();
  if(e.repeat) return;
  if(scene==="menu"){ if(k==="escape"){ const o=document.querySelector(".modal.on"); if(o) o.classList.remove("on"); else if(menuScr==="modes") openScr("worlds"); else if(menuScr==="worlds") openScr("title"); } return; }
  if(miniKey){ miniKey(k); return; }
  if(quiz&&quiz.stage==="ask"&&["1","2","3"].includes(k)){ answer(+k-1); return; }
  if(k==="escape"||(k==="p"&&!(e.target&&e.target.tagName==="INPUT"))){ setRewards(!paused); return; }
  if(paused) return;
  if(["arrowleft","arrowright","arrowup","arrowdown"," ","spacebar"].includes(k)) e.preventDefault();
  keys[k]=true;
  if(k===" "||k==="arrowup"||k==="w") pressJump();
  if(k==="f") takePhoto();
  if(k==="e") interact();
});
window.addEventListener("keyup",e=>{
  const k=e.key.toLowerCase(); keys[k]=false;
  if(k===" "||k==="arrowup"||k==="w") releaseJump();
});
window.addEventListener("blur",()=>{for(const k in keys)keys[k]=false; input.stickOn=false; releaseJump();});

/* ---------- entrada: táctil (multitáctil con Pointer Events) ---------- */
const stick={id:null,ox:0,oy:0,R:46};
const base=$("stickBase"), knob=$("stickKnob");
function placeBase(x,y){base.style.left=x+"px";base.style.top=y+"px";}
function barGeom(){ const st=document.body.classList.contains("stones"), w=innerWidth*(st?0.66:0.94); return {w,cx:innerWidth*0.03+w/2,y:innerHeight-Math.max(56,innerHeight*0.13),R:w/2-36}; }
function restBase(){ const sb=document.body.classList.contains("sub"); const bg=barGeom(); stick.R=sb?bg.R:46; const lzE=$("lz");
  if(sb){ base.style.width=bg.w+"px"; base.style.marginLeft=(-bg.w/2)+"px"; lzE.style.left="0"; lzE.style.width=(bg.cx+bg.w/2+innerWidth*0.03)+"px"; lzE.style.top="50%"; placeBase(bg.cx,bg.y); } else { base.style.width=""; base.style.marginLeft=""; lzE.style.left=""; lzE.style.width=""; lzE.style.top=""; }
  if(!sb) placeBase(Math.max(74,innerWidth*0.085), innerHeight-Math.max(74,innerHeight*0.2)); knob.style.transform="translate(0,0)"; base.classList.remove("on"); }
restBase(); window.addEventListener("resize",()=>{ if(stick.id===null) restBase(); });
const lz=$("lz");
lz.addEventListener("pointerdown",e=>{
  if(stick.id!==null) return;
  stick.id=e.pointerId; if(sub){ const bg=barGeom(); stick.ox=bg.cx; stick.oy=bg.y; } else { stick.ox=e.clientX; stick.oy=e.clientY; placeBase(e.clientX,e.clientY); } base.classList.add("on");
  lz.setPointerCapture(e.pointerId); input.stickOn=true; input.stickX=0; input.stickY=0; e.preventDefault();
});
lz.addEventListener("pointermove",e=>{
  if(e.pointerId!==stick.id) return;
  let dx=e.clientX-stick.ox, dy=e.clientY-stick.oy; if(sub) dy=0; const d=Math.hypot(dx,dy);
  if(d>stick.R){dx*=stick.R/d;dy*=stick.R/d;}
  knob.style.transform="translate("+dx+"px,"+dy+"px)";
  input.stickX=dx/stick.R; input.stickY=dy/stick.R; e.preventDefault();
});
function endStick(e){ if(e.pointerId!==stick.id) return; stick.id=null; input.stickOn=false; input.stickX=input.stickY=0; restBase(); }
lz.addEventListener("pointerup",endStick); lz.addEventListener("pointercancel",endStick); lz.addEventListener("lostpointercapture",endStick);

function bindBtn(el,down,up){
  el.addEventListener("pointerdown",e=>{el.classList.add("down");el.setPointerCapture(e.pointerId);down&&down();e.preventDefault();});
  const end=e=>{el.classList.remove("down");up&&up();};
  el.addEventListener("pointerup",end); el.addEventListener("pointercancel",end);
}
bindBtn($("bJump"),pressJump,releaseJump);
bindBtn($("bPhoto"),takePhoto);
bindBtn($("bTalk"),interact);
$("dialog").addEventListener("pointerdown",e=>{ if(quiz&&quiz.stage==="ask") return; interact(); e.preventDefault(); });

function pressJump(){ if(talking||paused){return;} input.jump=true; P.jumpBuf=0.14; P.jumpHeld=true; }
function releaseJump(){ input.jump=false; P.jumpHeld=false; }

/* ---------- foto e interacción ---------- */
function takePhoto(){
  if(talking||paused||scene!=="game") return;
  if(photos>=5){ if(condor.active){ const f=$("flash"); f.style.transition="none"; f.style.opacity=.85; requestAnimationFrame(()=>{f.style.transition="opacity .35s";f.style.opacity=0;}); AM.sfx("photo"); condorShot(); return; } toast("Ya usaste tus 5 fotos de este mundo"); AM.sfx("nophoto"); return; }
  photos++; addScore(100); AM.sfx("photo"); $("photos").textContent=photos+"/5"; $("bPhoto").classList.toggle("empty",photos>=5);
  const f=$("flash"); f.style.transition="none"; f.style.opacity=.85; requestAnimationFrame(()=>{f.style.transition="opacity .35s";f.style.opacity=0;});
  toast("Foto "+photos+"/5 guardada en el bolso");
  if(condor.active) condorShot();
}
function interact(){
  if(paused||scene!=="game"||lvl.fin) return;
  if(!talking&&!quiz&&ranger&&ranger.t>1.5&&Math.abs(P.x-ranger.x)<220){ openRanger(); return; }
  if(quiz){ if(quiz.stage==="fb") afterQuiz(); return; }
  if(talking){
    if($("mini").style.display==="flex") return;
    dlgIndex++;
    if(dlgIndex>=dlg.length){ if(NPC.done) endTalk(); else showQuiz(); }
    else { $("dText").textContent=dlg[dlgIndex]; AM.sfx("talk",{p:NPC.pitch}); }
    return;
  }
  if(!P.tgtNear){ toast("Seguí la brújula: te marca la basura y a los personajes"); return; }
  if(P.tgt.k==="trash"){
    const tr=P.tgt.o; tr.got=true; trashCount++; addScore(50); AM.sfx("trash"); $("trashCt").textContent=trashCount+"/"+trash.length;
    toast(trashCount===trash.length?"¡Camino limpio! Sos un verdadero Guardián":"¡Recogiste "+tr.name+"! +50");
  } else { NPC=P.tgt.o; talking=true; dlg=NPC.done?DONE_LINES:NPC.lines; dlgIndex=0; $("dName").textContent=NPC.name; $("dText").textContent=dlg[0]; $("dialog").style.display="block"; P.vx=0; AM.sfx("open"); }
}

/* ---------- modos y preguntas ---------- */
const MODES = {
  turista:   {name:"Turista",   q:0, mpts:80, keep:(i,h)=>h.k==="bush"&&i%2===0, extra:false, weedV:1,   trashHurts:false, wrongLife:false, pts:60,  spd:1,   tel:1,   inv:3.2, hs:0.7},
  viajero:   {name:"Viajero",   q:1, mpts:120, keep:(i,h)=>h.k==="bush"||h.k==="weed"||h.k==="fox"||((h.k==="bird"||h.k==="piche")&&i%2===0), extra:false, weedV:0.85, trashHurts:false, wrongLife:false, pts:100, spd:0.85, tel:1.3, inv:2.6, hs:0.9},
  explorador:{name:"Explorador",q:2, mpts:200, keep:()=>true, extra:false, weedV:1,   trashHurts:false, wrongLife:true,  pts:150, spd:1,   tel:1,   inv:2.2, hs:1}
};
const DONE_LINES = ["¡Ya charlamos, Guardián! Seguí tu camino y cuidá la Patagonia."];
let scene="menu", menuScr="title", mode="viajero", quiz=null, dlg=[];
function applyMode(key){
  const m=MODES[key]; mode=key; hazards.length=0;
  HZ_BASE.forEach((h,i)=>{ if(m.keep(i,h)){ const c=Object.assign({},h); if(c.k==="weed") c.v*=m.weedV; c.spd=m.spd; c.tel=m.tel; c.hs=m.hs; hazards.push(c); } });
  if(m.extra) HZ_EXTRA.forEach(h=>{ const c=Object.assign({},h); if(c.k==="weed") c.v*=m.weedV; c.spd=m.spd; c.tel=m.tel; c.hs=m.hs; hazards.push(c); });
}
function startGame(key){
  loadLevel(pickLevel); applyMode(key); score=0; runEarned=0; saveGame(); photos=0; $("photos").textContent="0/5"; $("bPhoto").classList.remove("empty");
  trash.forEach(x=>x.got=false); trashCount=0; $("trashCt").textContent="0/"+trash.length;
  coins.forEach(c=>{c.got=false;c.x=c.ox;c.y=c.oy;}); NPCS.forEach(n=>{n.done=false;n.near=false;}); lvl.time=0; lvl.fin=false; lvl.q=0; lvl.mg=0; pendingHurt=false; clearMini(); $("mini").style.display="none"; $("result").classList.remove("on"); quiz=null; talking=false; $("dialog").style.display="none"; $("dOpts").innerHTML="";
  Object.assign(P,{x:450,y:GROUND,vx:0,vy:0,face:1,ground:true,inv:0,glide:false}); cp=450; cine=null; gateCur=null; $("gateScene").classList.remove("on"); sub=null; ranger=null; Object.assign(condor,{spawned:false,active:false,t:0,shot:false,wait:0,gone:0,n:0}); document.body.classList.remove("sub","stones"); ["rangerScene","subDone"].forEach(i=>$(i).classList.remove("on")); lives=maxLives(); renderHearts();
  cam=Math.max(0,P.x-VW*cfg.screenPos/100);
  scene="game"; document.body.classList.remove("menu");
  $("modeNow").textContent="Mundo: "+LV.name+" · Modo: "+MODES[key].name; AM.play(LV.id);
  toast(LV.name+" · Modo "+MODES[key].name+" · recogé la basura con la brújula");
}
document.body.appendChild($("pauseMenu")); document.body.appendChild($("gameOver")); document.body.appendChild($("m_exit"));
let pmWas=false, pmArm=0;
function openPause(){ if(scene!=="game"||$("pauseMenu").classList.contains("on")) return; pmWas=paused; paused=true; for(const k in keys) keys[k]=false; try{ releaseJump(); }catch(e){} stick.id=null; input.stickOn=false; input.stickX=0; input.stickY=0; $("pauseMenu").classList.add("on"); $("pmRestart").textContent="⟲ Reiniciar este mundo"; pmArm=0; AM.sfx("open"); }
function gameOver(){ if($("gameOver").classList.contains("on")) return; paused=true; for(const k in keys) keys[k]=false; try{ releaseJump(); }catch(e){} stick.id=null; input.stickOn=false; input.stickX=0; input.stickY=0; AM.sfx("bad"); $("gameOver").classList.add("on"); }
function goRestart(w){ $("gameOver").classList.remove("on"); paused=false; pmWas=false; if(w!=null) pickLevel=w; startGame(mode); }
$("goLevel").addEventListener("click",()=>goRestart(null)); $("goStart").addEventListener("click",()=>goRestart(0));
$("goQuit").addEventListener("click",()=>{ $("gameOver").classList.remove("on"); $("m_exit").classList.add("on"); $("m_exit").dataset.from="over"; try{ window.close(); }catch(e){} });
function closePause(){ $("pauseMenu").classList.remove("on"); paused=pmWas; pmWas=false; }
$("faceWrap").addEventListener("click",e=>{ e.stopPropagation(); openPause(); });
$("pmClose").addEventListener("click",closePause); $("pmResume").addEventListener("click",closePause);
$("pmRestart").addEventListener("click",()=>{ if(!pmArm){ pmArm=1; $("pmRestart").textContent="¿Seguro? Tocá de nuevo para reiniciar"; clearTimeout(openPause.t); openPause.t=setTimeout(()=>{ pmArm=0; $("pmRestart").textContent="⟲ Reiniciar este mundo"; },2800); return; }
  $("pauseMenu").classList.remove("on"); paused=false; pmWas=false; startGame(mode); });
$("pmWorlds").addEventListener("click",()=>{ $("pauseMenu").classList.remove("on"); paused=false; pmWas=false; showMenu(); openScr("worlds"); });
$("pmHome").addEventListener("click",()=>{ $("pauseMenu").classList.remove("on"); paused=false; pmWas=false; showMenu(); });
$("pmSound").addEventListener("click",()=>{ updAud(); $("m_audio").classList.add("on"); });
$("pmExit").addEventListener("click",()=>{ $("pauseMenu").classList.remove("on"); $("m_exit").classList.add("on"); $("m_exit").dataset.from="game"; try{ window.close(); }catch(e){} });
$("exitBack").addEventListener("click",()=>{ $("m_exit").classList.remove("on"); const f=$("m_exit").dataset.from; $("m_exit").dataset.from=""; if(f==="game") $("pauseMenu").classList.add("on"); if(f==="over") $("gameOver").classList.add("on"); });
function showMenu(){ $("pauseMenu").classList.remove("on"); $("gameOver").classList.remove("on"); paused=false; talking=false; sub=null; document.body.classList.remove("sub"); setRewards(false); scene="menu"; document.body.classList.add("menu"); openScr("title"); AM.play("menu"); }
function openScr(n){
  if(n==="info"||n==="tuto"||n==="exit"){ $("m_"+n).classList.add("on"); return; }
  document.querySelectorAll(".modal").forEach(m=>m.classList.remove("on"));
  $("scrTitle").style.display=n==="title"?"block":"none"; $("scrWorlds").style.display=n==="worlds"?"block":"none"; $("scrModes").style.display=n==="modes"?"block":"none"; menuScr=n;
  if(n==="title") LV=LEVELS[0];
  if(n==="worlds") refreshWorlds();
}
const WMETA=[{n:"El Calafate",st:"★☆☆",d:"Fácil",p:"P. N. Los Glaciares"},{n:"Bariloche",st:"★★☆",d:"Fácil–media",p:"P. N. Nahuel Huapi"},{n:"El Chaltén",st:"★★★",d:"Media–alta",p:"P. N. Los Glaciares (norte)"},{n:"Ushuaia",st:"★★★★",d:"Difícil",p:"P. N. Tierra del Fuego"},{n:"Puerto Madryn",st:"★★★★★",d:"Experto",p:"Península Valdés"}];
const WCARDS=[], WPINS=[];
function isUnlocked(i){ const L=LEVELS[i]; if(!L||!L.open) return false; if(i===0||/dev/.test(location.hash)) return true; const q=LEVELS[i-1]; return !!q&&sv.wbest[q.id]!=null; }
function refreshWorlds(){ WMETA.forEach((w,i)=>{ const b=WCARDS[i], pn=WPINS[i]; if(!b) return; const ok=isUnlocked(i), L=LEVELS[i];
  b.className="mc "+(ok?"w"+(i+1):"lock"); pn.className="mpin "+(ok?"w"+(i+1):"lock"); pn.textContent=ok?(i+1):"🔒";
  b.querySelector("small").textContent=ok?w.p:(L&&L.open?"🔒 Completá el mundo "+i:"Próximamente"); b.style.pointerEvents="auto"; }); }
(function(){
  $("worldsHead").textContent="Elegí un mundo · Patagonia Argentina";
  const ARG=[[-66.2,-22.1],[-64.5,-22.0],[-62.7,-22.3],[-62.3,-24.2],[-60.0,-24.1],[-58.3,-24.9],[-57.6,-25.5],[-57.9,-27.3],[-56.2,-27.5],[-54.8,-26.0],[-53.8,-26.3],[-55.2,-28.0],[-57.0,-30.0],[-58.2,-32.5],[-58.4,-34.0],[-57.1,-35.3],[-56.8,-36.5],[-57.6,-38.1],[-59.5,-38.8],[-61.1,-38.95],[-62.2,-39.0],[-62.3,-39.9],[-63.0,-40.85],[-64.1,-40.9],[-65.05,-40.8],[-65.1,-41.2],[-64.9,-41.8],[-64.2,-42.15],[-63.8,-42.07],[-63.6,-42.3],[-63.6,-42.77],[-64.3,-42.6],[-65.0,-42.72],[-64.5,-43.0],[-65.1,-43.3],[-65.3,-44.3],[-65.6,-44.9],[-66.5,-45.4],[-67.5,-45.9],[-67.5,-46.4],[-66.5,-47.0],[-65.8,-47.2],[-65.9,-47.75],[-66.9,-48.5],[-67.7,-49.3],[-68.5,-50.1],[-68.6,-50.9],[-69.0,-51.6],[-68.4,-52.35],[-70.0,-52.1],[-72.2,-51.8],[-72.3,-51.5],[-72.6,-50.6],[-73.1,-49.8],[-72.7,-48.5],[-72.4,-47.0],[-71.9,-45.8],[-71.5,-44.5],[-71.6,-43.5],[-71.8,-42.0],[-71.6,-40.8],[-71.2,-39.5],[-70.9,-38.0],[-70.4,-36.5],[-70.0,-35.0],[-69.8,-33.0],[-70.0,-31.0],[-69.3,-29.0],[-69.0,-27.5],[-68.5,-25.0],[-67.0,-22.9]];
  const TDF=[[-68.6,-52.65],[-68.2,-53.2],[-67.7,-53.85],[-66.6,-54.2],[-65.3,-54.65],[-65.7,-54.85],[-67.0,-54.9],[-68.6,-54.95]];
  const PX=lo=>422+(lo+67.6)*13.83, PY=la=>28+(-la-37)*18.2;
  const path=(pts,fx,fy)=>"M"+pts.map(q=>fx(q[0]).toFixed(1)+","+fy(q[1]).toFixed(1)).join("L")+"Z";
  const X=PX, Y=PY, ink="#3b2a1a", H=(a,b)=>{ const v=Math.sin(a*127.1+b*311.7)*43758.5453; return v-Math.floor(v); };
  const P2=(pts,dx)=>pts.map(q=>X(q[0]+(dx||0)).toFixed(1)+","+Y(q[1]).toFixed(1));
  const ARGd=path(ARG,PX,PY), TDFd=path(TDF,PX,PY);
  // Islas Malvinas
  const MAL_E=[[-58.95,-51.4],[-58.4,-51.3],[-57.75,-51.45],[-57.7,-51.75],[-58.05,-51.95],[-58.55,-52.1],[-58.95,-51.95],[-58.5,-51.8],[-58.95,-51.65]];
  const MAL_W=[[-60.55,-51.3],[-60.05,-51.35],[-59.75,-51.6],[-60.05,-51.95],[-60.55,-52.15],[-60.4,-51.8],[-60.85,-51.65]];
  const MAL_X=[[-59.5,-51.95,.9],[-59.3,-52.15,.7],[-60.9,-52.0,.6]];
  const malD=path(MAL_E,PX,PY)+path(MAL_W,PX,PY);
  const malvinas='<path d="'+malD+'" fill="none" stroke="#c9f4fb" stroke-width="9" stroke-linejoin="round" opacity=".85"/><path d="'+malD+'" fill="#a9c76a" stroke="'+ink+'" stroke-width="2.6" stroke-linejoin="round"/><path d="'+malD+'" fill="none" stroke="#e5e2a0" stroke-width="3" stroke-linejoin="round" opacity=".6"/>'
    +MAL_X.map(q=>'<ellipse cx="'+PX(q[0]).toFixed(1)+'" cy="'+PY(q[1]).toFixed(1)+'" rx="'+(5*q[2]).toFixed(1)+'" ry="'+(3*q[2]).toFixed(1)+'" fill="#a9c76a" stroke="'+ink+'" stroke-width="1.8"/>').join("")
    +'<path d="M'+PX(-58.5)+','+(PY(-51.7)+2)+'q4,-6 8,0" fill="none" stroke="#4f7a2f" stroke-width="1.6" stroke-linecap="round"/><path d="M'+PX(-60.2)+','+(PY(-51.75)+2)+'q4,-6 8,0" fill="none" stroke="#4f7a2f" stroke-width="1.6" stroke-linecap="round"/>'
    +'<g transform="translate('+PX(-58.35).toFixed(1)+','+(PY(-51.75)).toFixed(1)+')"><path d="M0,0L0,-22" stroke="'+ink+'" stroke-width="2" stroke-linecap="round"/><rect x="0" y="-22" width="16" height="11" rx="1.5" fill="#fff" stroke="'+ink+'" stroke-width="1.4"/><rect x="0.7" y="-21.3" width="14.6" height="3.4" fill="#74acdf"/><rect x="0.7" y="-14.7" width="14.6" height="3.4" fill="#74acdf"/><circle cx="8" cy="-16.5" r="1.6" fill="#f6b40e"/></g>'
    +'<text x="'+PX(-59.5).toFixed(1)+'" y="'+(PY(-52.5)+8).toFixed(1)+'" font-size="11" font-weight="900" fill="#fff" stroke="'+ink+'" stroke-width="2.6" paint-order="stroke" text-anchor="middle">Islas Malvinas</text>';
  // ----- decoraciones con curvas -----
  const mtn=(x,y,w,h,k)=>{ const f=(a)=>a.toFixed(1);
    return '<path d="M'+f(x-w)+','+f(y)+'C'+f(x-w*.78)+','+f(y-h*.5)+' '+f(x-w*.35)+','+f(y-h*.82)+' '+f(x)+','+f(y-h)+'C'+f(x+w*.3)+','+f(y-h*.78)+' '+f(x+w*.8)+','+f(y-h*.42)+' '+f(x+w)+','+f(y)+'Z" fill="#b4b1d6" stroke="'+ink+'" stroke-width="2" stroke-linejoin="round"/>'
    +'<path d="M'+f(x)+','+f(y-h)+'C'+f(x+w*.3)+','+f(y-h*.78)+' '+f(x+w*.8)+','+f(y-h*.42)+' '+f(x+w)+','+f(y)+'L'+f(x+w*.05)+','+f(y)+'Q'+f(x+w*.2)+','+f(y-h*.5)+' '+f(x)+','+f(y-h)+'Z" fill="#7d7aab"/>'
    +(k===2?'':'<path d="M'+f(x-w*.42)+','+f(y-h*.64)+'Q'+f(x-w*.24)+','+f(y-h*.52)+' '+f(x-w*.08)+','+f(y-h*.62)+'Q'+f(x+w*.06)+','+f(y-h*.5)+' '+f(x+w*.2)+','+f(y-h*.62)+'Q'+f(x+w*.3)+','+f(y-h*.57)+' '+f(x+w*.4)+','+f(y-h*.5)+'C'+f(x+w*.3)+','+f(y-h*.78)+' '+f(x+w*.1)+','+f(y-h*.9)+' '+f(x)+','+f(y-h)+'C'+f(x-w*.2)+','+f(y-h*.88)+' '+f(x-w*.36)+','+f(y-h*.76)+' '+f(x-w*.42)+','+f(y-h*.64)+'Z" fill="#fff"/>'); };
  const spire=(x,y,w,h)=>'<path d="M'+(x-w)+','+y+'Q'+(x-w*.6)+','+(y-h*.7)+' '+(x-w*.2)+','+(y-h)+'Q'+x+','+(y-h*1.04)+' '+(x+w*.25)+','+(y-h*.9)+'Q'+(x+w*.7)+','+(y-h*.5)+' '+(x+w)+','+y+'Z" fill="#b9b3c9" stroke="'+ink+'" stroke-width="2" stroke-linejoin="round"/><path d="M'+(x+w*.25)+','+(y-h*.9)+'Q'+(x+w*.7)+','+(y-h*.5)+' '+(x+w)+','+y+'L'+(x+w*.1)+','+y+'Q'+(x+w*.3)+','+(y-h*.5)+' '+(x+w*.05)+','+(y-h*.98)+'Z" fill="#8a84a2"/><path d="M'+(x-w*.4)+','+(y-h*.72)+'Q'+(x-w*.1)+','+(y-h*.62)+' '+(x+w*.12)+','+(y-h*.78)+'Q'+(x+w*.3)+','+(y-h*.66)+' '+(x+w*.5)+','+(y-h*.7)+'Q'+(x+w*.36)+','+(y-h*.9)+' '+(x+w*.22)+','+(y-h*.92)+'Q'+x+','+(y-h*1.04)+' '+(x-w*.2)+','+(y-h)+'Q'+(x-w*.34)+','+(y-h*.86)+' '+(x-w*.4)+','+(y-h*.72)+'Z" fill="#fff"/>';
  const tree=(x,y,s)=>'<ellipse cx="'+x+'" cy="'+(y+s*.9)+'" rx="'+s*.9+'" ry="'+s*.28+'" fill="#0003"/><rect x="'+(x-s*.14)+'" y="'+(y+s*.2)+'" width="'+s*.28+'" height="'+s*.7+'" rx="1" fill="#7a4a26"/><circle cx="'+x+'" cy="'+y+'" r="'+s*.62+'" fill="#4f9a3c" stroke="#244a1a" stroke-width="1.5"/><circle cx="'+(x-s*.36)+'" cy="'+(y+s*.2)+'" r="'+s*.42+'" fill="#5fae48" stroke="#244a1a" stroke-width="1.3"/><circle cx="'+(x+s*.34)+'" cy="'+(y+s*.15)+'" r="'+s*.42+'" fill="#438a33" stroke="#244a1a" stroke-width="1.3"/><circle cx="'+(x-s*.2)+'" cy="'+(y-s*.22)+'" r="'+s*.2+'" fill="#8fd16e" opacity=".8"/>';
  const pine=(x,y,s)=>'<ellipse cx="'+x+'" cy="'+(y+s*.2)+'" rx="'+s*.6+'" ry="'+s*.18+'" fill="#0003"/><path d="M'+x+','+(y-s*1.3)+'Q'+(x+s*.34)+','+(y-s*.7)+' '+(x+s*.5)+','+(y-s*.3)+'Q'+(x+s*.2)+','+(y-s*.38)+' '+(x+s*.62)+','+(y+s*.1)+'Q'+x+','+(y+s*.02)+' '+(x-s*.62)+','+(y+s*.1)+'Q'+(x-s*.2)+','+(y-s*.38)+' '+(x-s*.5)+','+(y-s*.3)+'Q'+(x-s*.34)+','+(y-s*.7)+' '+x+','+(y-s*1.3)+'Z" fill="#2f7a4a" stroke="#173f26" stroke-width="1.5" stroke-linejoin="round"/><path d="M'+x+','+(y-s*1.3)+'Q'+(x-s*.2)+','+(y-s*.7)+' '+(x-s*.5)+','+(y-s*.3)+'Q'+(x-s*.2)+','+(y-s*.5)+' '+(x-s*.05)+','+(y-s*.9)+'Z" fill="#58b070" opacity=".7"/>';
  const lake=(x,y,s,r)=>'<g transform="translate('+x+','+y+') rotate('+(r||0)+') scale('+s+')"><path d="M-14,0Q-10,-5-2,-3Q6,-8 12,-3Q18,0 12,4Q4,8-4,4Q-12,7-14,0Z" fill="#58d2ec" stroke="#14607a" stroke-width="'+(2/s)+'" stroke-linejoin="round"/><path d="M-9,-1Q-4,-4 2,-3" fill="none" stroke="#fff" stroke-width="'+(1.4/s)+'" stroke-linecap="round" opacity=".8"/></g>';
  const river=(a,b)=>'<path d="'+a+'" fill="none" stroke="#14607a" stroke-width="4.2" stroke-linecap="round"/><path d="'+a+'" fill="none" stroke="#58d2ec" stroke-width="2.4" stroke-linecap="round"/>';
  const whale=(x,y,s,fl)=>'<g transform="translate('+x+','+y+') scale('+s*fl+','+s+')"><path d="M-30,6C-34,-8-16,-16 6,-12C20,-9 30,-2 36,-14C36,-4 40,2 46,-2C42,6 38,10 30,10C14,16-18,18-30,6Z" fill="#3d6fae" stroke="'+ink+'" stroke-width="2.4" stroke-linejoin="round"/><path d="M-26,8C-12,14 12,14 30,9C14,11-12,10-26,8Z" fill="#cfe4f6"/><circle cx="-18" cy="-2" r="2.4" fill="#111"/><path d="M-8,-12Q-10,-24-4,-28M-8,-12Q-2,-24 6,-26" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g>';
  const peng=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')"><ellipse cx="0" cy="14" rx="8" ry="2.4" fill="#0003"/><path d="M-7,12C-10,-2-6,-12 0,-12C6,-12 10,-2 7,12Z" fill="#1d2b3a" stroke="'+ink+'" stroke-width="1.6"/><path d="M-4,10C-6,0-3,-8 0,-8C3,-8 6,0 4,10Z" fill="#fff"/><circle cx="-2" cy="-8" r="1.2" fill="#111"/><path d="M1,-7L7,-5L1,-4Z" fill="#f2a23a"/><path d="M-4,13l-3,2M4,13l3,2" stroke="#f2a23a" stroke-width="2" stroke-linecap="round"/></g>';
  const boat=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')"><path d="M-16,4Q0,12 18,4L14,10Q0,15-12,10Z" fill="#c8402e" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M0,2L0,-24" stroke="'+ink+'" stroke-width="2"/><path d="M2,-22Q14,-12 14,0L2,0Z" fill="#fff" stroke="'+ink+'" stroke-width="1.5" stroke-linejoin="round"/><path d="M-2,-18Q-10,-8-12,0L-2,0Z" fill="#fff6d8" stroke="'+ink+'" stroke-width="1.5" stroke-linejoin="round"/></g>';
  const farol=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')"><path d="M-6,0L-4,-20L4,-20L6,0Z" fill="#fff" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M-5,-6L5,-6L4.4,-11L-4.4,-11Z" fill="#d9412f"/><rect x="-4.5" y="-26" width="9" height="6" rx="1.5" fill="#ffd45a" stroke="'+ink+'" stroke-width="1.6"/><path d="M-6,-26L0,-32L6,-26Z" fill="#d9412f" stroke="'+ink+'" stroke-width="1.6" stroke-linejoin="round"/></g>';
  const condor=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')"><path d="M-30,-2C-22,-14-10,-12 0,-2C10,-12 22,-14 30,-2C20,-8 10,-4 0,4C-10,-4-20,-8-30,-2Z" fill="#26303c" stroke="'+ink+'" stroke-width="1.8" stroke-linejoin="round"/><path d="M-20,-4L-14,-1M-12,-5L-7,-1M12,-5L7,-1M20,-4L14,-1" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="0" cy="3" r="2.6" fill="#fff"/></g>';
  const cloud=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')" opacity=".95"><path d="M-26,8Q-34,8-32,0Q-30,-8-20,-6Q-18,-16-6,-14Q4,-20 12,-10Q24,-12 26,-2Q34,0 30,8Z" fill="#fff" stroke="#bfe3f7" stroke-width="2" stroke-linejoin="round"/></g>';
  const rose=(x,y,s)=>'<g transform="translate('+x+','+y+') scale('+s+')"><circle r="17" fill="#fff6d8cc" stroke="'+ink+'" stroke-width="2"/><path d="M0,-15L4,-4L15,0L4,4L0,15L-4,4L-15,0L-4,-4Z" fill="#d9822a" stroke="'+ink+'" stroke-width="1.6" stroke-linejoin="round"/><path d="M0,-15L4,-4L0,0L-4,-4Z" fill="#c8402e"/><text y="-19" font-size="9" font-weight="900" text-anchor="middle" fill="#fff" stroke="'+ink+'" stroke-width="2.4" paint-order="stroke">N</text></g>';
  // ----- Chile (franja verde con relieve) -----
  const andes=ARG.filter(q=>q[0]<-69.5&&q[1]>-52&&q[1]<-36);
  // Chile: franja angosta con costa de fiordos e islas
  const W=andes.map((q,i)=>{ const notch=(i%5===2); return [q[0]-1.05-H(i,4)*0.4-(notch?0:0), q[1], notch]; });
  let wp=[]; W.forEach((w,i)=>{ if(w[2]){ wp.push([w[0]-0.15,w[1]+0.18]); wp.push([w[0]+0.85,w[1]]); wp.push([w[0]-0.15,w[1]-0.18]); } else wp.push([w[0],w[1]]); });
  wp.reverse();
  const wxy=wp.map(q=>[X(q[0]),Y(q[1])]);
  let coast=""; wxy.forEach((q,k)=>{ if(k===0){ coast+="L"+q[0].toFixed(1)+","+q[1].toFixed(1); return; } const m=wxy[k-1]; coast+="Q"+m[0].toFixed(1)+","+m[1].toFixed(1)+" "+((m[0]+q[0])/2).toFixed(1)+","+((m[1]+q[1])/2).toFixed(1); });
  const chile="M"+P2(andes,0).join("L")+coast+"Z";
  let isl=""; [[-43.0,-1.2,5,3],[-44.3,-1.6,4,2.5],[-45.5,-1.4,6,3.2],[-46.8,-1.7,5,3],[-48.2,-1.5,4.5,2.6],[-49.6,-1.8,6,3.2],[-50.6,-1.5,4,2.4],[-41.6,-1.3,4,2.6],[-39.8,-1.2,3.5,2.2]].forEach((q,k)=>{ const x=X(-73.3+q[1]+(q[0]<-47?-0.2:0)), y=Y(q[0]); isl+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="'+q[2]+'" ry="'+q[3]+'" transform="rotate('+(-20+k*13)+' '+x.toFixed(1)+' '+y.toFixed(1)+')" fill="#7fb064" stroke="'+ink+'" stroke-width="1.8"/><circle cx="'+(x-1)+'" cy="'+(y-1)+'" r="'+(q[3]*.5)+'" fill="#4f8a3f" opacity=".8"/>'; });
  let chTrees=""; andes.forEach((a,i)=>{ if(i%2||(a[1]<-43.1&&a[1]>-44.5)) return; const x=X(a[0]-0.45-H(i,6)*0.3), y=Y(a[1])+2; chTrees+=pine(x,y,3.4+H(i,8)*1.4); });
  let chSnow=""; andes.forEach((a,i)=>{ if(i%3!==1) return; const x=X(a[0]-0.2), y=Y(a[1]); chSnow+='<circle cx="'+x.toFixed(1)+'" cy="'+(y-2).toFixed(1)+'" r="2" fill="#fff" opacity=".85"/>'; });
  // franja de bosque andino
  const forest="M"+P2(andes,0.15).join("L")+"L"+andes.slice().reverse().map((q,i)=>X(q[0]+1.35+((i*5)%3)*0.3).toFixed(1)+","+Y(q[1]).toFixed(1)).join("L")+"Z";
  // cordillera
  let ridge=""; andes.slice().reverse().forEach((a,i)=>{ if(i%2) return; const w=12+H(i,2)*5, h=24+H(2,i)*14; ridge+=mtn(X(a[0]+0.5),Y(a[1])+5,w,h,0); });
  ridge+=spire(X(-72.55)+2,Y(-49.0)+6,5,32)+spire(X(-72.55)+11,Y(-49.0)+8,5.5,40)+spire(X(-72.55)+20,Y(-49.0)+6,4.5,28);
  ridge+=mtn(X(-71.3)+9,Y(-41.5)+4,13,34,0);
  // bosque y estepa
  let trees=""; [[-72.0,-39.0],[-71.8,-40.1],[-71.45,-42.3],[-71.5,-43.1],[-71.2,-44.0],[-71.4,-45.2],[-71.7,-46.2],[-72.1,-47.2],[-72.3,-48.2],[-72.2,-51.2],[-71.9,-51.8],[-71.6,-37.6],[-71.2,-38.2]].forEach((q,i)=>{ trees+=(i%2?pine:tree)(X(q[0]+0.7),Y(q[1]),5.2+H(i,3)*2); });
  let tufts=""; for(let i=0;i<42;i++){ const lo=-70.4+H(i,1)*5.6, la=-37.8-H(i,2)*13.5; const x=X(lo),y=Y(la); tufts+='<path d="M'+(x-4)+','+y+'Q'+(x-3)+','+(y-5)+' '+(x-1)+','+(y-8)+'M'+x+','+y+'Q'+x+','+(y-6)+' '+(x+1)+','+(y-10)+'M'+(x+4)+','+y+'Q'+(x+3)+','+(y-5)+' '+(x+2)+','+(y-8)+'" fill="none" stroke="#9a7a3a" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>'; }
  let patches=""; const pc=["#c9b36a","#b9ab62","#e9d79a","#d6a867","#a9b36a"]; for(let i=0;i<16;i++){ const lo=-70+H(i,5)*5.4, la=-38-H(i,6)*13.5; patches+='<ellipse cx="'+X(lo)+'" cy="'+Y(la)+'" rx="'+(12+H(i,7)*16)+'" ry="'+(5+H(i,8)*6)+'" transform="rotate('+(H(i,9)*50-25)+' '+X(lo)+' '+Y(la)+')" fill="'+pc[i%5]+'" opacity=".55"/>'; }
  let contour=""; for(let k=0;k<9;k++){ const y=Y(-38.6-k*1.6); contour+='<path d="M330,'+y+'q20,-8 40,0t40,0t40,0t40,0t40,0t40,0" fill="none" stroke="#a9843f" stroke-width="1.5" opacity=".3"/>'; }
  const rivers=river('M'+X(-70.6)+','+Y(-39.9)+'C'+X(-69)+','+Y(-39.4)+' '+X(-67)+','+Y(-41.6)+' '+X(-63.2)+','+Y(-40.85))+river('M'+X(-71.2)+','+Y(-43.3)+'C'+X(-69.6)+','+Y(-42.4)+' '+X(-67)+','+Y(-44.2)+' '+X(-65.2)+','+Y(-43.3))+river('M'+X(-71.6)+','+Y(-50.3)+'C'+X(-70.4)+','+Y(-49.7)+' '+X(-69.4)+','+Y(-50.6)+' '+X(-68.5)+','+Y(-50.1))+river('M'+X(-71.9)+','+Y(-51.7)+'C'+X(-70.8)+','+Y(-51.2)+' '+X(-69.8)+','+Y(-52)+' '+X(-69.0)+','+Y(-51.6));
  const lakes=lake(X(-71.45),Y(-41.1),1.35,-12)+lake(X(-71.1),Y(-46.6),1.5,10)+lake(X(-72.45),Y(-49.65),1.05,-20)+lake(X(-72.0),Y(-50.28),1.6,8)+lake(X(-67.7),Y(-54.62),1.0,-6);
  const glac='<path d="M'+(X(-72.75))+','+(Y(-50.05)+6)+'l4,-9 4,5 4,-8 4,7 4,-6 4,9z" fill="#eafcff" stroke="#6fcfe8" stroke-width="1.8" stroke-linejoin="round"/>';
  // Tierra del Fuego
  let tdf=pine(X(-68.1),Y(-54.2),4.6)+pine(X(-67.5),Y(-54.55),4.2)+pine(X(-68.4),Y(-54.7),4)+pine(X(-66.6),Y(-54.5),3.8)+mtn(X(-67.2),Y(-54.1)+4,8,16,0)+mtn(X(-68.3),Y(-53.7)+4,7,13,0);
  const waves=[[96,330],[190,250],[266,296],[214,112],[560,70],[610,118],[528,350],[700,350],[672,156],[520,214],[120,150],[760,230]].map((q,i)=>'<path d="M'+q[0]+','+q[1]+'q8,-8 16,0t16,0t16,0" fill="none" stroke="#ffffff'+(i%2?"90":"c0")+'" stroke-width="2.4" stroke-linecap="round"/>').join("");
  $("mapSvg").innerHTML='<defs><linearGradient id="mfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63bff0"/><stop offset="1" stop-color="#63bff0" stop-opacity="0"/></linearGradient>'
   +'<linearGradient id="stp" gradientUnits="userSpaceOnUse" x1="350" y1="0" x2="520" y2="0"><stop offset="0" stop-color="#c9a85f"/><stop offset=".45" stop-color="#e5cb86"/><stop offset="1" stop-color="#f5e6b6"/></linearGradient>'
   +'<linearGradient id="chl" gradientUnits="userSpaceOnUse" x1="335" y1="0" x2="372" y2="0"><stop offset="0" stop-color="#4f8a45"/><stop offset="1" stop-color="#8dbb6f"/></linearGradient>'
   +'<radialGradient id="sun" cx=".85" cy=".05" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".85"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>'
   +'<clipPath id="landClip"><path d="'+ARGd+'"/><path d="'+TDFd+'"/></clipPath><filter id="soft"><feGaussianBlur stdDeviation="1.2"/></filter></defs>'
   +'<rect width="844" height="390" fill="url(#sun)"/>'+waves
   +cloud(668,34,1.1)+cloud(560,22,.8)+cloud(250,26,.9)
   // plataforma costera
   +'<path d="'+ARGd+'" fill="none" stroke="#8be6f5" stroke-width="22" stroke-linejoin="round" opacity=".45"/><path d="'+TDFd+'" fill="none" stroke="#8be6f5" stroke-width="22" stroke-linejoin="round" opacity=".45"/>'
   +'<path d="'+ARGd+'" fill="none" stroke="#c9f4fb" stroke-width="10" stroke-linejoin="round" opacity=".8"/><path d="'+TDFd+'" fill="none" stroke="#c9f4fb" stroke-width="10" stroke-linejoin="round" opacity=".8"/>'
   // Chile
   +'<path d="'+chile+'" fill="none" stroke="#c9f4fb" stroke-width="9" stroke-linejoin="round" opacity=".85"/><path d="'+chile+'" fill="url(#chl)" stroke="'+ink+'" stroke-width="3" stroke-linejoin="round"/>'+isl+chSnow+chTrees
   // tierra argentina
   +'<path d="'+ARGd+'" fill="url(#stp)"/><path d="'+TDFd+'" fill="#bfd07a"/>'
   +'<g clip-path="url(#landClip)">'+patches+contour+rivers+tufts
   +'<path d="'+forest+'" fill="#6aa84c" opacity=".92" stroke="#3f7a35" stroke-width="2"/>'
   +'<path d="'+ARGd+'" fill="none" stroke="#fff1c0" stroke-width="9" stroke-linejoin="round" opacity=".55"/><path d="'+TDFd+'" fill="none" stroke="#fff1c0" stroke-width="8" opacity=".5"/></g>'
   +'<path d="'+ARGd+'" fill="none" stroke="'+ink+'" stroke-width="3.4" stroke-linejoin="round"/><path d="'+TDFd+'" fill="none" stroke="'+ink+'" stroke-width="3.4" stroke-linejoin="round"/>'
   +lakes+glac+trees+tdf+ridge
   +'<text x="404" y="222" font-size="15" font-weight="900" fill="#fff" stroke="'+ink+'" stroke-width="3.4" paint-order="stroke" text-anchor="middle" letter-spacing="3" transform="rotate(90 404 222)">PATAGONIA</text>'
   +'<text x="356" y="150" font-size="9" font-weight="900" fill="#eef9e6" stroke="#2a4a20" stroke-width="2.4" paint-order="stroke" text-anchor="middle" letter-spacing="1" transform="rotate(-90 356 150)">CHILE</text>'
   +'<text x="560" y="262" font-size="13" font-weight="800" fill="#ffffffd0" text-anchor="middle" font-style="italic">Océano Atlántico</text>'
   +'<text x="300" y="318" font-size="12" font-weight="800" fill="#ffffffb0" text-anchor="middle" font-style="italic">Océano Pacífico</text>'
   +whale(560,160,.9,1)+peng(436,330,1)+peng(452,338,.8)+boat(560,366,.9)+boat(250,296,.7)+farol(X(-66.0),Y(-54.62)-2,1)+condor(620,84,.9)+condor(590,104,.6)+rose(238,352,1)
   +malvinas+'<text x="330" y="372" font-size="9" font-weight="800" fill="#ffffffcc">Canal Beagle ›</text>'
   +'<rect x="0" y="0" width="844" height="46" fill="url(#mfade)"/>';
  // inset: Argentina completa
  const IX=lo=>(lo+74)*2+4, IY=la=>(-la-21.5)*2.7+4, ytop=IY(-37.6);
  $("mapInset").innerHTML='<defs><clipPath id="patClip"><rect x="0" y="'+ytop+'" width="50" height="80"/></clipPath></defs><rect x="0" y="0" width="50" height="112" rx="5" fill="#3b2a1acc"/>'
   +'<path d="'+path(ARG,IX,IY)+'" fill="#c9b878" stroke="#fff" stroke-width="1" stroke-linejoin="round"/><path d="'+path(TDF,IX,IY)+'" fill="#c9b878" stroke="#fff" stroke-width="1"/>'
   +'<g clip-path="url(#patClip)"><path d="'+path(ARG,IX,IY)+'" fill="#ffb347" stroke="#fff" stroke-width="1"/><path d="'+path(TDF,IX,IY)+'" fill="#ffb347" stroke="#fff" stroke-width="1"/></g>'
   +'<path d="M'+IX(-58.9)+','+IY(-51.45)+'l4,0 0,3 -4,0z M'+IX(-60.6)+','+IY(-51.45)+'l3,0 0,3 -3,0z" fill="#ffb347" stroke="#fff" stroke-width=".6"/>'+'<text x="25" y="108" font-size="6.2" font-weight="900" fill="#ffe08a" text-anchor="middle">ARGENTINA</text>';
  // pines y tarjetas: [lon,lat, cardX, cardY]
  const POS=[[-71.6,-50.6,18,236],[-71.3,-41.13,18,62],[-72.9,-49.33,18,150],[-68.3,-54.8,640,284],[-65.03,-42.77,640,196]];
  const box=$("worldCards"), svg=$("mapSvg"); let lines="";
  WMETA.forEach((w,i)=>{ const L=LEVELS[i], open=!!(L&&L.open); const b=document.createElement("button"); b.className="mc "+(open?"w"+(i+1):"lock"); b.disabled=!open;
    b.innerHTML="<b>"+(i+1)+" · "+w.n+"</b><span class='l'><span class='st'>"+w.st+"</span> "+w.d+"</span><small>"+(open?w.p:"Próximamente")+"</small>";
    const go=()=>{ if(!isUnlocked(i)){ toast("🔒 Completá primero el mundo "+i+" ("+WMETA[i-1].n+")"); return; } pickLevel=i; LV=LEVELS[i]; openScr("modes"); }; b.addEventListener("click",go); WCARDS[i]=b;
    const [lo,la,cx,cy]=POS[i], px=PX(lo), py=PY(la);
    b.style.left=(cx/8.44)+"%"; b.style.top=(cy/3.9)+"%"; box.appendChild(b);
    const ex=cx<400?cx+178:cx, ey=cy+32; lines+='<path d="M'+ex+','+ey+'L'+px+','+py+'" stroke="#3b2a1a" stroke-width="2.6" stroke-dasharray="2 5" stroke-linecap="round" fill="none"/><path d="M'+ex+','+ey+'L'+px+','+py+'" stroke="#fff" stroke-width="1.2" stroke-dasharray="2 5" stroke-linecap="round" fill="none"/>';
    const pin=document.createElement("button"); pin.className="mpin "+(open?"w"+(i+1):"lock"); pin.textContent=i+1; pin.setAttribute("aria-label",w.n); pin.style.left=(px/8.44)+"%"; pin.style.top=(py/3.9)+"%"; pin.style.animationDelay=(i*0.25)+"s";
    pin.addEventListener("click",go); WPINS[i]=pin; box.appendChild(pin); });
  refreshWorlds();
  svg.insertAdjacentHTML("beforeend",lines);
})();
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>openScr(b.dataset.go)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>b.closest(".modal").classList.remove("on")));
document.querySelectorAll("[data-mode]").forEach(b=>b.addEventListener("click",()=>startGame(b.dataset.mode)));
$("toMenu").addEventListener("click",showMenu);
function renderMenu(){
  ctx.setTransform(scaleCv,0,0,scaleCv,0,0); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high";
  const md=menuScr!=="title", dy=md?-170:-70, foot=GROUND+dy, H=VH*(md?0.30:0.45);
  cam=120+Math.sin(t*0.25)*110;
  ctx.fillStyle="#4aa3e8"; ctx.fillRect(0,0,VW,VH);
  ctx.save(); ctx.translate(0,dy);
  LV.bg(); lightFx();
  drawPath(); ctx.restore();
  const g=ctx.createLinearGradient(0,GROUND+42+dy,0,VH); g.addColorStop(0,"#a67a3e"); g.addColorStop(1,"#6e4f26"); ctx.fillStyle=g; ctx.fillRect(0,GROUND+41+dy,VW,VH);
  drawShadow(VW/2,foot,H*0.27,.35);
  drawSprite(img.idle,VW/2,foot,H,{sx:1-Math.sin(t*2.2)*0.006,sy:1+Math.sin(t*2.2)*0.012});
  drawFront();
}
function closeDialog(){ $("dialog").style.display="none"; $("dOpts").innerHTML=""; $("dialog").classList.remove("quiz"); }
function endTalk(){ talking=false; closeDialog(); }
function afterQuiz(){ const wl=quiz.wrongLife; quiz=null; closeDialog(); pendingHurt=wl; startMini(NPC); }

const EASYQ={
 level_01:[{q:"🧊 Un glaciar es una montaña de…",o:["Hielo","Chocolate"],c:0,e:"¡Sí! El glaciar es hielo muy grande y muy frío."},
  {q:"🦙 ¿Qué animal de lana vive en la Patagonia?",o:["El guanaco","El delfín"],c:0,e:"El guanaco vive en la Patagonia y corre muy rápido."},
  {q:"🗑️ ¿Dónde tiramos la basura?",o:["En el tacho","En el lago"],c:0,e:"La basura va al tacho, así cuidamos el lago."},
  {q:"💧 ¿De qué color es el agua del lago del glaciar?",o:["Celeste turquesa","Roja"],c:0,e:"El lago es celeste turquesa, ¡hermoso!"},
  {q:"🐾 Si vemos un animal, ¿qué hacemos?",o:["Lo miramos de lejos","Corremos tras él"],c:0,e:"Los animales se miran de lejos, sin asustarlos."}],
 level_02:[{q:"🦌 El pudú es un ciervo…",o:["Muy chiquito","Gigante"],c:0,e:"El pudú es un ciervito muy pequeño."},
  {q:"🍫 En Bariloche hay mucho…",o:["Chocolate","Arena"],c:0,e:"¡Bariloche es famosa por su chocolate!"},
  {q:"🌳 Los árboles son casa de los…",o:["Pájaros","Autos"],c:0,e:"Los pájaros viven en los árboles."},
  {q:"🏞️ En Bariloche hay muchos…",o:["Lagos y montañas","Desiertos"],c:0,e:"Bariloche tiene lagos y montañas."},
  {q:"🐦 ¿Les damos comida a los animales del bosque?",o:["No, ellos tienen su comida","Sí, galletitas"],c:0,e:"Los animales comen su propia comida del bosque."}],
 level_03:[{q:"⛰️ El Chaltén es famoso por sus…",o:["Montañas","Playas"],c:0,e:"El Chaltén tiene montañas altísimas."},
  {q:"🥾 ¿Por dónde caminamos en la montaña?",o:["Por el sendero","Por cualquier lado"],c:0,e:"Siempre por el sendero, para cuidar las plantas."},
  {q:"🦌 El huemul es un…",o:["Ciervo","Pez"],c:0,e:"El huemul es un ciervo de la montaña."},
  {q:"🫐 Las frutitas del calafate son…",o:["Azules","Verdes con rayas"],c:0,e:"El calafate tiene frutitas azules."},
  {q:"🍾 Si llevo una botella a la montaña, la…",o:["Traigo de vuelta","Dejo en el suelo"],c:0,e:"Nos llevamos nuestra basura de vuelta."}],
 level_04:[{q:"🐧 El pingüino camina…",o:["Balanceándose","Volando"],c:0,e:"El pingüino camina balanceándose, ¡qué gracioso!"},
  {q:"🚢 Ushuaia está al lado del…",o:["Mar y las montañas","Desierto"],c:0,e:"Ushuaia tiene mar y montañas."},
  {q:"🌧️ En Ushuaia llueve…",o:["Seguido","Nunca"],c:0,e:"En Ushuaia llueve seguido, ¡hay que llevar piloto!"},
  {q:"💡 El faro sirve para…",o:["Guiar a los barcos","Hacer sombra"],c:0,e:"El faro tiene luz y guía a los barcos."},
  {q:"🧥 En Ushuaia hace…",o:["Fresco o frío","Mucho calor"],c:0,e:"Es una zona fresca: ¡abrigate!"}],
 level_05:[{q:"🐋 La ballena es un animal…",o:["Enorme del mar","Chiquito del árbol"],c:0,e:"La ballena es enorme y vive en el mar."},
  {q:"🌊 En Puerto Madryn hay…",o:["Mar y playas","Nieve todo el año"],c:0,e:"Puerto Madryn tiene mar y playas."},
  {q:"🐧 El pingüino es un ave que…",o:["Nada muy bien","Vive en los árboles"],c:0,e:"El pingüino es un gran nadador."},
  {q:"📸 Para ver ballenas, las miramos…",o:["De lejos y en silencio","Tocándolas"],c:0,e:"A las ballenas se las mira de lejos y sin ruido."},
  {q:"🦭 El lobo marino toma sol en la…",o:["Playa","Nube"],c:0,e:"Los lobos marinos descansan al sol en la playa."}]
};
const HARDQ={
 level_01:[{q:"El glaciar Perito Moreno es famoso porque…",o:["Su frente llega al Lago Argentino y forma un dique de hielo que cada tanto se rompe","Se derrite por completo cada verano","Flota en el mar como un iceberg"],c:0,e:"Al avanzar sobre la península Magallanes represa el Brazo Rico; cuando sube el agua, el dique se rompe."},
  {q:"El Parque Nacional Los Glaciares fue declarado Patrimonio Mundial de la UNESCO en…",o:["1981","1950","2005"],c:0,e:"Fue declarado Patrimonio Mundial en 1981."},
  {q:"El Campo de Hielo Patagónico es…",o:["Una de las mayores masas de hielo del planeta fuera de los polos","Un lago congelado pequeño","Un desierto de sal"],c:0,e:"Es una gigantesca reserva de hielo compartida con Chile."},
  {q:"Muchos glaciares patagónicos retroceden por…",o:["El aumento de la temperatura global","Que nieva más","Los guanacos"],c:0,e:"El calentamiento global acelera su derretimiento."},
  {q:"El principio de «no dejar rastro» en un parque propone…",o:["Llevarse toda la basura y minimizar el impacto","Marcar los árboles para no perderse","Dejar piedras apiladas en el camino"],c:0,e:"Se trata de dejar el lugar tal como lo encontraste."}],
 level_02:[{q:"El primer parque nacional de la Argentina, Nahuel Huapi, se creó en…",o:["1934","1900","1970"],c:0,e:"El Parque Nacional Nahuel Huapi se creó en 1934."},
  {q:"El arrayán se reconoce por…",o:["Su corteza color canela, lisa y fría al tacto","Sus hojas en forma de aguja","Sus flores amarillas"],c:0,e:"Su tronco color canela y fresco al tacto es inconfundible."},
  {q:"El pudú es…",o:["Uno de los ciervos más pequeños del mundo","Un roedor","Un felino"],c:0,e:"Mide unos 40 cm de alto y vive en bosques andino-patagónicos."},
  {q:"Los bosques andino-patagónicos están dominados por…",o:["Nothofagus (lengas, ñires, coihues)","Eucaliptos","Pinos"],c:0,e:"Los Nothofagus son los árboles típicos de estos bosques."},
  {q:"El lago Nahuel Huapi tiene origen…",o:["Glaciar","Volcánico","Artificial"],c:0,e:"Fue excavado por glaciares hace miles de años."}],
 level_03:[{q:"La altura aproximada del cerro Fitz Roy es de…",o:["3.400 m","8.800 m","1.200 m"],c:0,e:"El Fitz Roy mide cerca de 3.400 metros."},
  {q:"El huemul está en peligro principalmente por…",o:["Pérdida de hábitat, caza y enfermedades del ganado","Migrar a África","Falta de nieve"],c:0,e:"Su población es pequeña y muy amenazada."},
  {q:"El Chaltén es conocido como…",o:["Capital Nacional del Trekking","Capital del chocolate","Capital del vino"],c:0,e:"Cada año recibe a miles de senderistas."},
  {q:"Para cruzar un arroyo en un sendero, lo más seguro es…",o:["Buscar el cruce marcado o más angosto y aflojar la mochila","Correr rápido","Cruzar de noche"],c:0,e:"Siempre se elige el paso más seguro, sin apuro."},
  {q:"El viento patagónico es tan fuerte porque…",o:["Los vientos del oeste cruzan los Andes y soplan casi sin barreras","Hay muchos ventiladores","Está cerca del Ecuador"],c:0,e:"Los vientos del oeste son constantes en esas latitudes."}],
 level_04:[{q:"El Parque Nacional Tierra del Fuego es especial porque combina…",o:["Montaña, bosque y costa marina","Selva y cataratas","Desierto y salinas"],c:0,e:"Reúne bosques subantárticos, montañas y costa del Canal Beagle."},
  {q:"El Canal Beagle separa Tierra del Fuego de…",o:["Isla Navarino (Chile)","Brasil","Islas Malvinas"],c:0,e:"Al sur del canal está la isla Navarino."},
  {q:"Una turbera es…",o:["Un humedal que acumula materia vegetal y guarda carbono","Un tipo de volcán","Un glaciar de roca"],c:0,e:"Las turberas almacenan mucho carbono."},
  {q:"Ushuaia se conoce como…",o:["La ciudad más austral del mundo","La ciudad más alta","La más antigua"],c:0,e:"Se la llama «fin del mundo»."},
  {q:"El castor en Tierra del Fuego es…",o:["Una especie introducida que daña los bosques","Un animal nativo protegido","Un pariente del huemul"],c:0,e:"Se lo introdujo en 1946 y modifica los ríos y bosques."}],
 level_05:[{q:"La ballena franca austral llega a Península Valdés para…",o:["Reproducirse y criar a sus ballenatos","Cazar pingüinos","Escapar del calor"],c:0,e:"Llega a los golfos protegidos a parir y criar."},
  {q:"Península Valdés es Patrimonio Natural de la Humanidad desde…",o:["1999","1970","2015"],c:0,e:"La UNESCO la declaró en 1999."},
  {q:"Las orcas de Valdés son famosas por…",o:["Varar en la playa para cazar crías de lobo marino","Comer solo algas","Vivir en los Andes"],c:0,e:"Es una conducta rara y muy estudiada."},
  {q:"Las ballenas francas se reconocen por…",o:["Las callosidades blancas en la cabeza","Una aleta dorsal alta","Su color rosa"],c:0,e:"No tienen aleta dorsal y sus callosidades son únicas, como una huella."},
  {q:"El mar patagónico es rico en vida porque…",o:["Sus aguas frías llevan muchos nutrientes","Es muy caliente","Tiene agua dulce"],c:0,e:"Las aguas frías y ricas en nutrientes sostienen una gran cadena alimentaria."}]
};
const EXTRAQ={
 level_01:[{q:"El glaciar Perito Moreno está en el Parque Nacional…",o:["Los Glaciares","Iguazú","Talampaya"],c:0,e:"Está en el Parque Nacional Los Glaciares, en Santa Cruz."},
  {q:"Un glaciar se forma por…",o:["Nieve acumulada que se compacta durante muchos años","Lluvia congelada en una noche","Agua de mar congelada"],c:0,e:"La nieve se acumula y se transforma lentamente en hielo."},
  {q:"El Lago Argentino tiene color turquesa porque…",o:["El hielo arrastra polvo de roca muy fino","Tiene pintura","Es muy poco profundo"],c:0,e:"El «polvo de roca» suspendido en el agua le da ese color."},
  {q:"Si ves un guanaco, lo mejor es…",o:["Mirarlo desde lejos","Correr detrás","Darle comida"],c:0,e:"Hay que respetar su espacio y no alimentarlo."},
  {q:"Las grandes caídas de bloques de hielo del glaciar ocurren en…",o:["Su frente, sobre el lago","La cima de la montaña","El bosque"],c:0,e:"Se desprenden en el frente del glaciar, donde toca el lago."}],
 level_02:[{q:"El Parque Nacional Nahuel Huapi es…",o:["Uno de los parques nacionales más antiguos del país","Un parque recién inventado","Un parque marino"],c:0,e:"Es uno de los parques nacionales más antiguos de la Argentina."},
  {q:"El tronco del arrayán es de color…",o:["Canela, medio anaranjado","Azul","Rojo fuego"],c:0,e:"Su corteza canela y suave lo hace inconfundible."},
  {q:"El pudú es…",o:["El ciervo más pequeño del mundo","Un pez","Un ave marina"],c:0,e:"Es un ciervo muy pequeño de los bosques andino-patagónicos."},
  {q:"Los incendios del bosque suelen empezar por…",o:["Fuegos mal apagados o colillas","Las nubes","El lago"],c:0,e:"Muchos incendios los provoca la gente sin querer."},
  {q:"El lago Nahuel Huapi se formó por…",o:["El paso de antiguos glaciares","Un meteorito","Una excavadora"],c:0,e:"Los glaciares que bajaron de los Andes excavaron la cuenca."}],
 level_03:[{q:"El Chaltén es llamado la capital nacional del…",o:["Trekking","Surf","Esquí en el mar"],c:0,e:"Es famoso por sus senderos de montaña."},
  {q:"El cerro Fitz Roy mide…",o:["Más de 3.000 metros","300 metros","10 metros"],c:0,e:"Supera los 3.000 metros de altura."},
  {q:"Antes de salir a caminar a la montaña conviene mirar…",o:["El pronóstico del tiempo","El menú del hotel","La hora del cine"],c:0,e:"El clima de montaña cambia muy rápido."},
  {q:"Los glaciares están retrocediendo principalmente por…",o:["El calentamiento global","Los senderistas","El viento del sur"],c:0,e:"El aumento de la temperatura derrite el hielo más rápido."},
  {q:"En un sendero de montaña llevás…",o:["Abrigo, agua y la basura de vuelta","Parlantes y petardos","Solo una gaseosa"],c:0,e:"Prepararse bien cuida tu seguridad y el ambiente."}],
 level_04:[{q:"El Parque Nacional Tierra del Fuego se destaca por tener…",o:["Costa sobre el mar","Desierto de arena","Volcanes activos"],c:0,e:"Es un parque con bosques, turberas, montañas y costa marina."},
  {q:"El castor en Tierra del Fuego es…",o:["Una especie introducida que daña los bosques","Un animal nativo en peligro","Un animal marino"],c:0,e:"Fue traído de otro continente y modifica los bosques y arroyos."},
  {q:"Las turberas son…",o:["Terrenos húmedos que guardan agua y carbono","Cuevas de pingüinos","Playas de arena"],c:0,e:"Son ecosistemas muy valiosos y delicados."},
  {q:"Los lobos marinos del Canal Beagle…",o:["Descansan en islotes: hay que mirarlos de lejos","Aman que los toquen","Viven en el bosque"],c:0,e:"Los islotes son su lugar de descanso; no hay que molestarlos."},
  {q:"El tren del Fin del Mundo recorre…",o:["Un antiguo camino usado para llevar leña","Una selva","Un desierto"],c:0,e:"Sigue una ruta histórica por el valle del río Pipo."}],
 level_05:[{q:"Península Valdés es famosa por sus…",o:["Ballenas francas, elefantes marinos y orcas","Volcanes y géiseres","Cataratas"],c:0,e:"Es una reserva de fauna marina muy importante."},
  {q:"En Punta Tombo hay una gran colonia de…",o:["Pingüinos de Magallanes","Flamencos","Monos"],c:0,e:"Es una de las mayores colonias de pingüinos de Magallanes."},
  {q:"El elefante marino es…",o:["El mayor de los lobos y focas del mundo","Un elefante con aletas pequeñas","Un pez grande"],c:0,e:"El elefante marino del sur es el mayor de los pinnípedos."},
  {q:"En una playa con fauna, lo correcto es…",o:["No acercarse ni tocar a los animales","Tocarlos para una foto","Darles de comer"],c:0,e:"Mantener la distancia protege a los animales y a vos."},
  {q:"Las ballenas francas australes se ven en…",o:["Golfo Nuevo y Península Valdés","El Chaco","La Puna"],c:0,e:"Es uno de los mejores lugares del mundo para verlas."}]
};
function pickQ(){
  const ex=EXTRAQ[LV.id]||[], qm=MODES[mode].q, pool=qm===0?(EASYQ[LV.id]||NPC.qs).slice():qm===1?NPC.qs.concat(ex):(HARDQ[LV.id]||ex).slice(); sv.seenQ=sv.seenQ||[];
  let fresh=pool.filter(q=>!sv.seenQ.includes(q.q)); if(!fresh.length){ sv.seenQ=sv.seenQ.filter(x=>!pool.some(q=>q.q===x)); fresh=pool; }
  const q=fresh[Math.floor(Math.random()*fresh.length)]; sv.seenQ.push(q.q); if(sv.seenQ.length>100) sv.seenQ.shift(); saveGame(); return q;
}
function showQuiz(){
  const q=pickQ();
  const opts=q.o.map((t,i)=>({t,ok:i===q.c})).sort(()=>Math.random()-.5);
  quiz={stage:"ask",q,opts,wrongLife:false};
  $("dText").textContent=q.q; $("dialog").classList.add("quiz");
  const box=$("dOpts"); box.innerHTML="";
  opts.forEach((o,i)=>{ const b=document.createElement("button"); b.className="opt"; b.textContent=(i+1)+". "+o.t; b.addEventListener("click",()=>answer(i)); box.appendChild(b); });
}
function answer(i){
  if(!quiz||quiz.stage!=="ask") return; const m=MODES[mode], ok=quiz.opts[i].ok;
  quiz.stage="fb"; $("dOpts").innerHTML=""; $("dialog").classList.remove("quiz");
  if(ok){ AM.sfx("ok"); lvl.q++; addScore(m.pts); $("dText").textContent="¡Correcto! +"+m.pts+" estrellas. "+quiz.q.e; }
  else { AM.sfx("bad"); quiz.wrongLife=m.wrongLife; $("dText").textContent="Casi. "+quiz.q.e+(m.wrongLife?" (Perdés un corazón.)":""); }
}

/* ---------- minijuegos ---------- */
const PAW='<svg viewBox="0 0 24 24" fill="#fff" stroke="#3b2410" stroke-width="1.2"><ellipse cx="12" cy="15.5" rx="5.2" ry="4.2"/><circle cx="5.6" cy="10.2" r="2.1"/><circle cx="9.4" cy="6.4" r="2.1"/><circle cx="14.6" cy="6.4" r="2.1"/><circle cx="18.4" cy="10.2" r="2.1"/></svg>';
const DROP='<svg viewBox="0 0 24 24"><path d="M12 2.5C9 8 6 11 6 15a6 6 0 0 0 12 0c0-4-3-7-6-12.5z" fill="#4aa3e8" stroke="#0f2c55" stroke-width="1.6"/><path d="M9.5 15a2.6 2.6 0 0 0 2 2.4" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
const JUNK='<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="16" rx="3" fill="#cfd3da" stroke="#1b2a2a" stroke-width="1.6"/><rect x="6" y="11" width="12" height="4.5" fill="#e5483a" stroke="#1b2a2a" stroke-width="1.2"/></svg>';
const YN=[["Llevar mi basura de vuelta",1],["Darle comida a un guanaco",0],["Quedarme en el sendero",1],["Arrancar una flor de recuerdo",0],["Acercarme al borde del glaciar",0],["Mirar a los animales desde lejos",1],["Perseguir a un animal para la foto",0],["Dejar una cáscara de naranja en el suelo",0]];
let mTimers=[], miniTry=0;
const mSet=(f,ms)=>{ const id=setTimeout(f,ms); mTimers.push(id); return id; };
const mInt=(f,ms)=>{ const id=setInterval(f,ms); mTimers.push(id); return id; };
const rnd=n=>(Math.random()*n)|0;
function clearMini(){ mTimers.forEach(id=>{clearTimeout(id);clearInterval(id);}); mTimers=[]; miniKey=null; }
const MG_INFO={memory:["Memoria de huellas","Mirá en qué orden se iluminan las huellas y repetilo."],drops:["Riego del notro","Tocá las gotas para regar. ¡No toques la basura!"],timing:["Congelá el tiempo","Frená la barra dentro de la zona azul. Acertá 2 de 3."],yesno:["Código del Guardián","¿Esto lo hace un Guardián? Respondé Sí o No."]};
const MG={};
function startMini(n){ AM.sfx("miniStart"); talking=true; miniTry=0; $("mini").style.display="flex"; runMini(n); }
function runMini(n){
  clearMini(); const inf=n.info||MG_INFO[n.mini]; $("miniT").textContent=inf[0]+" · "+n.name; $("miniI").textContent=inf[1]; $("miniS").textContent=""; $("miniA").innerHTML=""; $("miniB").innerHTML="";
  MG[n.mini](n,$("miniA"),ok=>miniResult(n,ok));
}
function miniResult(n,ok){
  clearMini(); const m=MODES[mode]; $("miniA").innerHTML="";
  AM.sfx(ok?"reward":"bad"); $("miniI").textContent=ok?"¡Muy bien! +"+m.mpts+" estrellas":"No salió esta vez. "+(miniTry<1?"¿Querés reintentar?":"Seguimos el camino.");
  const b=$("miniB"); b.innerHTML="";
  const add=(txt,f,cls)=>{ const x=document.createElement("button"); x.className="mbtn"+(cls?" "+cls:""); x.textContent=txt; x.addEventListener("click",f); b.appendChild(x); };
  if(!ok&&miniTry<1) add("Reintentar",()=>{miniTry++; runMini(n);});
  add("Seguir ▸",()=>endMini(n,ok),(!ok&&miniTry<1)?"sec":"");
}
function endMini(n,ok){
  clearMini(); $("mini").style.display="none"; n.done=true; if(ok){ lvl.mg++; addScore(MODES[mode].mpts); }
  talking=false; if(pendingHurt){ pendingHurt=false; hurt({k:"quiz",x:P.x+1}); }
}
MG.memory=(n,box,done)=>{
  const L=[3,4,5][MODES[mode].q], seq=Array.from({length:L},()=>rnd(4)); let pos=0, ready=false;
  const cols=["#e5483a","#2f7fd6","#4fa81e","#f0a81c"];
  const w=document.createElement("div"); w.className="pads"; box.appendChild(w);
  const pads=cols.map((c,i)=>{ const b=document.createElement("button"); b.className="pad"; b.style.background=c; b.innerHTML=PAW; b.addEventListener("click",()=>press(i)); w.appendChild(b); return b; });
  const lit=(i,ms)=>{ pads[i].classList.add("lit"); mSet(()=>pads[i].classList.remove("lit"),ms); };
  function press(i){ if(!ready) return; lit(i,180); if(i===seq[pos]){ pos++; $("miniS").textContent="¡Tu turno! "+pos+"/"+L; if(pos>=L){ ready=false; mSet(()=>done(true),350); } } else { ready=false; mSet(()=>done(false),350); } }
  $("miniS").textContent="Mirá…";
  seq.forEach((sq,k)=>mSet(()=>lit(sq,420),600+k*720));
  mSet(()=>{ ready=true; $("miniS").textContent="¡Tu turno! 0/"+L; },600+L*720);
  MG.memory.seq=seq;
};
MG.drops=(n,box,done)=>{
  const q=MODES[mode].q, goal=[5,7,9][q], life=[1250,950,750][q], gap=[800,650,520][q], total=[16,14,14][q]; let got=0,left=total,over=false;
  const g=document.createElement("div"); g.className="grid3"; box.appendChild(g);
  const cells=[]; for(let i=0;i<9;i++){ const b=document.createElement("button"); b.className="cell"; b.addEventListener("click",()=>tap(i)); g.appendChild(b); cells.push({b,k:null,id:0}); }
  const upd=()=>{ $("miniS").textContent="Gotas "+got+"/"+goal+" · "+left+" s"; };
  function clr(c){ c.k=null; c.b.innerHTML=""; }
  function tap(i){ const c=cells[i]; if(!c.k||over) return; if(c.k==="d") got++; else got=Math.max(0,got-1); clr(c); upd(); if(got>=goal){ over=true; mSet(()=>done(true),250); } }
  function spawn(){ if(over) return; const free=cells.filter(c=>!c.k); if(!free.length) return; const c=free[rnd(free.length)]; c.k=Math.random()<[0.2,0.28,0.35][q]?"t":"d"; c.b.innerHTML=c.k==="d"?DROP:JUNK; const id=++c.id; mSet(()=>{ if(c.id===id&&c.k) clr(c); },life); }
  mInt(spawn,gap); spawn();
  mInt(()=>{ if(over) return; left--; upd(); if(left<=0){ over=true; done(got>=goal); } },1000);
  upd(); MG.drops.cells=cells;
};
MG.timing=(n,box,done)=>{
  const q=MODES[mode].q, zw=[0.26,0.19,0.13][q], sp=[2.2,3.0,4.0][q]; let att=0,hits=0,misses=0,phase=0,zc=0.5,locked=false;
  box.innerHTML='<div class="bar"><div class="zone" id="zn"></div><div class="mk" id="mk"></div></div><button class="mbtn big" id="frz">¡Congelar!</button>';
  const zn=$("zn"), mk=$("mk");
  const newZone=()=>{ zc=0.2+Math.random()*0.6; zn.style.left=((zc-zw/2)*100)+"%"; zn.style.width=(zw*100)+"%"; MG.timing.zc=zc; };
  const upd=()=>{ $("miniS").textContent="Intento "+Math.min(att+1,3)+"/3 · aciertos "+hits; };
  newZone(); upd(); let last=performance.now();
  mInt(()=>{ const now=performance.now(); if(!locked) phase+=(now-last)/1000*sp; last=now; MG.timing.pos=(Math.sin(phase)+1)/2; mk.style.left=(MG.timing.pos*100)+"%"; },16);
  function press(){
    if(locked) return; const pos=(Math.sin(phase)+1)/2; locked=true; att++;
    if(Math.abs(pos-zc)<=zw/2){ hits++; $("miniI").textContent="¡Justo!"; } else { misses++; $("miniI").textContent="Casi… ¡otra vez!"; }
    upd(); if(hits>=2){ mSet(()=>done(true),500); return; } if(misses>=2){ mSet(()=>done(false),500); return; }
    mSet(()=>{ locked=false; newZone(); },600);
  }
  $("frz").addEventListener("click",press); box.addEventListener("pointerdown",e=>{ if(e.target.id!=="frz"&&!e.target.closest("#frz")) press(); }); miniKey=k=>{ if(k===" ") press(); };
  MG.timing.press=press;
};
MG.puzzle=(n,box,done)=>{
  const q=MODES[mode].q, N=[2,3,3][q], total=N*N, S=Math.max(150,Math.min(250,Math.floor(innerHeight*0.46))), im=img[n.img];
  const cvp=document.createElement("canvas"); cvp.width=cvp.height=480; const c2=cvp.getContext("2d"); const gr=c2.createLinearGradient(0,0,0,480); gr.addColorStop(0,"#9fd8f7"); gr.addColorStop(1,"#d9efc8"); c2.fillStyle=gr; c2.fillRect(0,0,480,480);
  const k=Math.min(430/im.naturalWidth,430/im.naturalHeight); c2.drawImage(im,(480-im.naturalWidth*k)/2,470-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); const url=cvp.toDataURL("image/jpeg",0.85);
  let order=[...Array(total).keys()]; do{ order=order.sort(()=>Math.random()-.5); }while(order.every((v,i)=>v===i));
  let sel=-1, moves=0, tm=[120,100,90][q], fin=false;
  const wrap=document.createElement("div"); wrap.style.cssText="display:flex;gap:14px;align-items:center;justify-content:center"; box.appendChild(wrap);
  const pv=document.createElement("div"); pv.className="pzp"; pv.style.cssText="width:"+Math.round(S*0.42)+"px;height:"+Math.round(S*0.42)+"px;background:url("+url+") center/cover"; wrap.appendChild(pv);
  const g=document.createElement("div"); g.className="pz"; g.style.cssText="width:"+S+"px;height:"+S+"px;grid-template-columns:repeat("+N+",1fr);grid-template-rows:repeat("+N+",1fr)"; wrap.appendChild(g);
  const btns=[]; for(let i=0;i<total;i++){ const b=document.createElement("button"); b.addEventListener("click",()=>tap(i)); g.appendChild(b); btns.push(b); }
  const upd=()=>{ $("miniS").textContent="Movimientos: "+moves+" · "+tm+" s"; };
  const paint=()=>{ btns.forEach((b,i)=>{ const id=order[i], r=Math.floor(id/N), c=id%N; b.style.backgroundImage="url("+url+")"; b.style.backgroundSize=(N*100)+"% "+(N*100)+"%"; b.style.backgroundPosition=(c*100/(N-1))+"% "+(r*100/(N-1))+"%"; b.className=(i===sel?"sel ":"")+(id===i?"ok":""); }); };
  function tap(i){ if(fin) return; if(sel<0){ if(order[i]===i) return; sel=i; AM.sfx("open"); paint(); return; }
    if(sel===i){ sel=-1; paint(); return; } if(order[i]===i){ return; }
    [order[sel],order[i]]=[order[i],order[sel]]; sel=-1; moves++; AM.sfx(order.every((v,j)=>v===j)?"ok":"collect"); paint(); upd();
    if(order.every((v,j)=>v===j)){ fin=true; mSet(()=>done(true),700); } }
  mInt(()=>{ if(fin) return; tm--; if(tm<=0){ fin=true; done(false); } else upd(); },1000);
  paint(); upd();
};
MG.yesno=(n,box,done)=>{
  const q=MODES[mode].q, need=[3,4,4][q], tl=[0,0,6][q]; const items=YN.slice().sort(()=>Math.random()-.5).slice(0,5); let i=0,ok=0,bad=0,tm=0,fin=false;
  box.innerHTML='<div class="yn"><div id="ynq"></div><div class="ynb"><button class="mbtn big no" id="ynN">No</button><button class="mbtn big yes" id="ynY">Sí</button></div></div>';
  const upd=()=>{ $("miniS").textContent=(i+1)+"/5 · bien "+ok+(tl?" · "+tm+" s":""); };
  const show=()=>{ $("ynq").textContent=items[i][0]; tm=tl; upd(); };
  function ans(v){
    if(fin) return; const right=(items[i][1]===v); if(right) ok++; else bad++; i++;
    if(ok>=need){ fin=true; mSet(()=>done(true),300); return; } if(bad>5-need||i>=5){ fin=true; mSet(()=>done(ok>=need),300); return; }
    show();
  }
  $("ynY").addEventListener("click",()=>ans(1)); $("ynN").addEventListener("click",()=>ans(0)); miniKey=k=>{ if(k==="s"||k==="y") ans(1); if(k==="n") ans(0); };
  if(tl) mInt(()=>{ tm--; if(tm<=0) ans(-1); else upd(); },1000);
  MG.yesno.items=items; show();
};

/* ---------- fin de nivel ---------- */
function fmt(sec){ sec=sec|0; return (sec/60|0)+":"+String(sec%60).padStart(2,"0"); }
const RIVALS=[["Cóndor Viajero",9500],["Pudú Curioso",7200],["Huemul Valiente",5400],["Pingüino Aventurero",3600],["Ballenita Soñadora",2000]];
function myTotal(){ return Object.values(sv.wbest||{}).reduce((a,b)=>a+b,0); }
function worldsDone(){ return LEVELS.filter(l=>sv.wbest[l.id]!=null).length; }
function myRank(){ const t=myTotal(); return 1+RIVALS.filter(r=>r[1]>t).length; }
const fmtN=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".");
function openBoard(fin){
  const t=myTotal(), done=worldsDone(), all=done>=LEVELS.length;
  const rows=RIVALS.map(r=>({n:r[0],p:r[1]})); rows.push({n:sv.name,p:t,me:true}); rows.sort((a,b)=>(b.p-a.p)||(b.me?1:-1));
  const medal=["🥇","🥈","🥉","4","5","6"], list=$("bdList"); list.innerHTML="";
  const mk=(r,i)=>{ const d=document.createElement("div"); d.className="bdrow"+(r.me?" me":""); const nm=r.me?'<input id="bdName" maxlength="14" aria-label="Tu nombre" value="">':"<span>"+r.n+"</span>"; d.innerHTML='<span style="text-align:center;font-size:20px">'+medal[i]+"</span>"+nm+'<span class="pts">'+fmtN(r.p)+" ★</span>"; if(r.me){ d.querySelector("input").value=r.n; } return d; };
  rows.slice(0,5).forEach((r,i)=>list.appendChild(mk(r,i)));
  const mi=rows.findIndex(r=>r.me); if(mi>=5){ const sp=document.createElement("div"); sp.className="bdsep"; sp.textContent="⋮"; list.appendChild(sp); list.appendChild(mk(rows[mi],mi)); }
  const inp=$("bdName"); if(inp) inp.addEventListener("input",()=>{ sv.name=(inp.value.trim()||"Pascacio").slice(0,14); saveGame(); });
  $("bdT").textContent=all?"🏆 ¡Aventura completada!":"🏆 Tabla de posiciones";
  $("bdSub").textContent=all?"Completaste los 5 mundos. Tu puesto final: "+(mi+1)+".º":"Mundos completados: "+done+"/"+LEVELS.length+". Sumá estrellas para subir de puesto.";
  $("bdNote").textContent="Podés cambiar tu nombre tocándolo. Tabla de este dispositivo; el ranking online con otros jugadores llega más adelante.";
  $("m_board").classList.add("on");
}
$("bdX").addEventListener("click",()=>$("m_board").classList.remove("on")); $("bdOk").addEventListener("click",()=>$("m_board").classList.remove("on"));
document.querySelectorAll("[data-board]").forEach(b=>b.addEventListener("click",()=>openBoard(false)));
function openFinale(){
  $("result").classList.remove("on"); $("finStats").innerHTML="⭐ Puntaje total: <b>"+fmtN(myTotal())+"</b> · 🏆 Puesto <b>"+myRank()+".º</b> · 🌎 Mundos completados: <b>"+worldsDone()+"/"+LEVELS.length+"</b>";
  $("finale").scrollTop=0; $("finale").classList.add("on"); AM.sfx("reward"); }
document.body.appendChild($("finale"));
$("finBoard").addEventListener("click",()=>{ $("finale").classList.remove("on"); openBoard(true); });
$("finHome").addEventListener("click",()=>{ $("finale").classList.remove("on"); showMenu(); });
function finishLevel(){
  if(lvl.fin) return; lvl.fin=true; talking=true;
  const nd=NPCS.filter(n=>n.done).length, bonus=speedBonus(lvl.time); if(bonus) addScore(bonus);
  const prev=sv.best[LV.id], rec=!prev||lvl.time<prev; if(rec){ sv.best[LV.id]=lvl.time; }
  sv.wbest[LV.id]=Math.max(sv.wbest[LV.id]||0,runEarned); saveGame();
  const medal=lvl.time<=170?"🥇 Oro":lvl.time<=250?"🥈 Plata":lvl.time<=340?"🥉 Bronce":"Sin medalla";
  const row=(a,b)=>"<tr><td>"+a+"</td><td>"+b+"</td></tr>", rowH=(a,b)=>"<tr class=\"hl\"><td><b>"+a+"</b></td><td><b>"+b+"</b></td></tr>";
  const lastW=levelIdx===LEVELS.length-1; $("rsT").textContent=lastW?"¡Último mundo completado!":("¡Mundo "+(levelIdx+1)+" completado!");
  $("rsBody").innerHTML='<table>'+rowH("★ Ganadas en este mundo",fmtN(runEarned))+rowH("★ Acumuladas en el juego",fmtN(myTotal()))+row("Tiempo",fmt(lvl.time)+" · "+medal+(rec?" · ¡nuevo récord!":""))+row("Personajes conocidos",nd+"/"+NPCS.length)+row("Preguntas acertadas",lvl.q+"/"+NPCS.length)+row("Minijuegos ganados",lvl.mg+"/"+NPCS.length)+row("Basura recogida",trashCount+"/"+trash.length)+row("Fotos tomadas",photos+"/5")+row("Bonus por velocidad","+"+bonus+" estrellas")+row("Mundos completados",worldsDone()+"/"+LEVELS.length)+'</table>'+(nd===NPCS.length?'<p style="margin:10px 0 0;font-weight:900;color:#4a7a12">★ Insignia de '+LV.name+' desbloqueada</p>':'<p style="margin:10px 0 0;font-size:13px;color:#8a4a00">Conociendo a todos los personajes desbloqueás la insignia de '+LV.name+'.</p>');
  const nx=LEVELS[levelIdx+1]; $("rsNext").style.display=(nx&&nx.open&&isUnlocked(levelIdx+1))?"":"none"; if(nx) $("rsNext").textContent="Siguiente mundo: "+nx.name+" ▸";
  $("rsBody").insertAdjacentHTML("beforeend",'<p style="font-size:13px;opacity:.75;margin:8px 0 0">🏆 Tabla de posiciones: vas '+myRank()+'.º con '+fmtN(myTotal())+' ★</p>');
  if(lastW&&worldsDone()>=LEVELS.length){ $("rsT").textContent="¡Aventura completada!"; setTimeout(openFinale,1100); }
  $("result").classList.add("on"); AM.sfx("reward");
}
document.querySelectorAll("[data-donate]").forEach(b=>b.addEventListener("click",()=>{ $("m_donate").classList.add("on"); }));
$("donClose").addEventListener("click",()=>$("m_donate").classList.remove("on"));
$("donGo").disabled=!DONATE_URL; $("donNote").textContent=DONATE_URL?"":"El enlace de donación todavía no está configurado.";
$("donGo").addEventListener("click",()=>{ if(DONATE_URL) window.open(DONATE_URL,"_blank","noopener"); });
$("rsAgain").addEventListener("click",()=>startGame(mode));
const IL_KEYS=["poncho","notrito","glaciarito","kallfu","pudu","arrayanin","chocolatin","lafken","huemul","calafatin","fitz","kallfun","pinguino","lenguita","farolito","yagan","ballenita","jarillita","boyita","aman"];
const shuf=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const SORT_ITEMS=[["🥤","un vaso de plástico","plastico"],["🥫","una lata","plastico"],["🧃","un envase de jugo","plastico"],["🍾","una botella de vidrio","vidrio"],["🫙","un frasco de vidrio","vidrio"],["🍌","una cáscara de banana","organico"],["🍎","el resto de una manzana","organico"],["🍞","un pedazo de pan","organico"]];
const TF_ITEMS=[["Se puede alimentar a los animales silvestres con galletitas.",false,"Alimentarlos les hace mal y cambia su comportamiento."],["Hay que caminar por los senderos marcados.",true,"Salirse del sendero daña la vegetación."],["Está bien llevarse una flor de recuerdo.",false,"Las plantas son hogar y alimento de la fauna."],["Las fotos de fauna se sacan desde lejos.",true,"Así no los molestás."],["La basura se lleva de vuelta; no se entierra.",true,"Los residuos enterrados siguen dañando el ambiente."],["Podés hacer fuego en cualquier lugar del parque.",false,"Solo en lugares habilitados: los incendios destruyen bosques."],["Los pingüinos y lobos marinos necesitan que les dejemos espacio.",true,"Acercarse los estresa."],["Perseguir a un guanaco para una foto es buena idea.",false,"Hay que observarlo sin perseguirlo."],["Conviene llevar agua y abrigo cuando salís a caminar.",true,"El clima cambia rápido en la Patagonia."],["Tirar una cáscara de banana al sendero está bien porque es orgánica.",false,"Tarda mucho en degradarse y atrae animales."]];
function ilFinish(pts,msg,next){
  addScore(pts); if(pts>0) AM.sfx("reward");
  $("ilT").textContent="¡Desafío completado!"; $("ilBody").innerHTML='<div class="ilbig">🏅</div><p class="ilp">'+msg+'</p><p class="ilp">+'+pts+' ★ para tu bolso</p><div class="ilbtns"><button class="mbtn" id="ilGo">Siguiente mundo ▸</button></div>';
  $("ilSkip").style.display="none"; $("ilGo").addEventListener("click",()=>{ $("interlude").classList.remove("on"); next(); });
}
function ilMemory(next){
  const keys=shuf(IL_KEYS.filter(k=>IMG[k])).slice(0,4), cards=shuf(keys.concat(keys)); let open=[],found=0,moves=0,lock=false;
  $("ilT").textContent="Desafío: memoria de personajes"; $("ilBody").innerHTML='<p class="ilp">Encontrá las 4 parejas de personajes.</p><div class="ilgrid" id="ilG"></div><p class="ilp" id="ilInfo">Intentos: 0</p>';
  cards.forEach(k=>{ const b=document.createElement("button"); b.className="ilc"; b.dataset.k=k; b.innerHTML='<span class="bk">?</span><img src="'+IMG[k]+'" alt="">';
    b.onclick=()=>{ if(lock||b.classList.contains("up")||b.classList.contains("ok")) return; b.classList.add("up"); AM.sfx("open"); open.push(b);
      if(open.length===2){ moves++; $("ilInfo").textContent="Intentos: "+moves; lock=true; const [a,c]=open;
        if(a.dataset.k===c.dataset.k){ a.classList.add("ok"); c.classList.add("ok"); AM.sfx("ok"); open=[]; lock=false; found++; if(found===4) setTimeout(()=>ilFinish(moves<=7?250:150,"¡Las encontraste en "+moves+" intentos!",next),700); }
        else setTimeout(()=>{ a.classList.remove("up"); c.classList.remove("up"); open=[]; lock=false; },800); } };
    $("ilG").appendChild(b); });
}
function ilSort(next){
  const items=shuf(SORT_ITEMS).slice(0,5); let i=0,good=0; $("ilT").textContent="Desafío: separá los residuos";
  const show=()=>{ const it=items[i]; $("ilBody").innerHTML='<p class="ilp">En el pueblo se separa. ¡En el parque todo se lleva de vuelta!  ('+(i+1)+'/5)</p><div class="ilbig">'+it[0]+'</div><p class="ilp">'+it[1]+'</p><div class="ilbtns"><button class="mbtn" data-b="plastico">Plástico y latas</button><button class="mbtn" data-b="vidrio">Vidrio</button><button class="mbtn" data-b="organico">Orgánico</button></div>';
    $("ilBody").querySelectorAll("[data-b]").forEach(b=>b.onclick=()=>{ const ok=b.dataset.b===it[2]; if(ok){ good++; AM.sfx("ok"); } else AM.sfx("bad"); $("ilBody").querySelectorAll("[data-b]").forEach(x=>x.disabled=true); const p=document.createElement("p"); p.className="ilp"; p.textContent=ok?"¡Correcto!":"Casi: va en «"+({plastico:"Plástico y latas",vidrio:"Vidrio",organico:"Orgánico"})[it[2]]+"»."; $("ilBody").appendChild(p); setTimeout(()=>{ i++; if(i>=5) ilFinish(good*40,"Separaste bien "+good+" de 5 residuos.",next); else show(); },1000); }); };
  show();
}
function ilTF(next){
  const items=shuf(TF_ITEMS).slice(0,5); let i=0,good=0; $("ilT").textContent="Desafío: verdadero o falso";
  const show=()=>{ const it=items[i]; $("ilBody").innerHTML='<p class="ilp">('+(i+1)+'/5)</p><p class="ilp" style="font-size:clamp(15px,3.6vh,21px)">'+it[0]+'</p><div class="ilbtns"><button class="mbtn" data-v="1">Verdadero</button><button class="mbtn sec" data-v="0">Falso</button></div>';
    $("ilBody").querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{ const ok=(b.dataset.v==="1")===it[1]; if(ok){ good++; AM.sfx("ok"); } else AM.sfx("bad"); $("ilBody").querySelectorAll("[data-v]").forEach(x=>x.disabled=true); const p=document.createElement("p"); p.className="ilp"; p.textContent=(ok?"¡Correcto! ":"Casi. ")+it[2]; $("ilBody").appendChild(p); setTimeout(()=>{ i++; if(i>=5) ilFinish(good*40,"Acertaste "+good+" de 5.",next); else show(); },1500); }); };
  show();
}
function openInterlude(next){
  $("result").classList.remove("on"); const games=[ilMemory,ilSort,ilTF]; sv.il=((sv.il||0)+1+Math.floor(Math.random()*2))%games.length; saveGame();
  $("ilSkip").style.display=""; $("ilSkip").onclick=()=>{ $("interlude").classList.remove("on"); next(); };
  $("interlude").classList.add("on"); AM.sfx("open"); games[sv.il](next);
}
$("rsNext").addEventListener("click",()=>{ openInterlude(()=>{ pickLevel=levelIdx+1; startGame(mode); }); });
$("rsMenu").addEventListener("click",()=>{ $("result").classList.remove("on"); showMenu(); });

/* ---------- vidas ---------- */
function hurt(src){
  AM.sfx("hurt"); lives--; renderHearts();
  if(lives<=0){
    gameOver(); return;
  }
  const k=P.x<src.x?-1:1; P.vx=k*320; P.vy=-520; P.ground=false; P.inv=MODES[mode].inv; P.jumpCut=true;
  toast(src.k==="quiz"?"Respuesta incorrecta: perdés un corazón":src.k==="fox"?"¡Un zorrito asustado! A la fauna se la respeta: rodealo o saltalo":src.k==="bird"?(src.sp==="skua"?"¡Una skúa defiende su territorio! No te acerques a las aves":"¡Un carancho! Mirá la sombra roja y esquivalo a tiempo"):src.k==="piche"?"¡Un piche asustado! Dejalo pasar, no hay que molestar a la fauna":src.k==="bush"||src.k==="weed"?"¡Ay! Saltá los obstáculos":"¡Cuidado! Recogé la basura con la brújula");
}

/* ---------- física ---------- */
const sizeH = () => cfg.size/100*VH;                  // alto de Pascacio en px lógicos
const halfW = () => sizeH()*0.17;
const bodyH = () => sizeH()*(P.crouch?0.55:0.86);
function inGap(x){ for(const g of gaps) if(x>g.x0+8&&x<g.x1-8) return g; for(const g of gates) if(x>g.x0+8&&x<g.x1-8) return g; return null; }
function floorBelow(x,bottom){
  let f=inGap(x)?GROUND+900:GROUND; const hw=halfW();
  for(const s of solids){ const top=GROUND-s.h; if(x+hw>s.x && x-hw<s.x+s.w && top>=bottom-6) f=Math.min(f,top); }
  for(const l of ledges){ if(x+hw>l.x && x-hw<l.x+l.w && l.top>=bottom-6) f=Math.min(f,l.top); }
  for(const r of rafts){ if(x+hw>r.x && x-hw<r.x+r.w && r.top>=bottom-6) f=Math.min(f,r.top); }
  return f;
}
function splash(){
  const g=inGap(P.x)||gaps[0]||gates[0]; AM.sfx("splash"); lives--; renderHearts();
  if(lives<=0){ gameOver(); }
  else { const mid=(g.x0+g.x1)/2; P.x=P.x<mid?g.x0-90:g.x1+90; P.inv=MODES[mode].inv; toast("¡Al agua! Saltá con cuidado o usá las balsas"); }
  P.y=GROUND; P.vx=P.vy=0; P.ground=true;
}
/* ---- cruces con objeto de misión ---- */
function startCine(g,dir){
  const w=g.x1-g.x0; cine={g,dir,t:0,type:g.type,xs:dir===1?g.x0-60:g.x1+60,xe:dir===1?g.x1+75:g.x0-75,dur:g.type==="chair"?5.2:g.type==="river"?4.6:g.type==="boat"?6.2:g.type==="binoc"?4.6:3.8};
  if(g.type==="river"){ cine.st=g.stones.map(f=>g.x0+w*f); if(dir===-1) cine.st.reverse(); }
  P.face=dir; P.vx=0; P.crouch=false; releaseJump(); AM.sfx("open"); toast(GATE_ITEMS[LV.id].toast);
}
const smooth=u=>u*u*(3-2*u);
function updateCine(dt){
  const c=cine; c.t+=dt; const u=Math.min(1,c.t/c.dur), len=Math.abs(c.xe-c.xs);
  if(c.type==="ice"||c.type==="binoc"){ P.x=c.xs+(c.xe-c.xs)*u; P.y=GROUND; P.state="walk"; P.phase+=len/c.dur*dt*0.036; }
  else if(c.type==="boat"){ const k=smooth(Math.min(1,u/0.12))*smooth(Math.min(1,(1-u)/0.12)); P.x=c.xs+(c.xe-c.xs)*Math.min(1,Math.max(0,(u-0.05)/0.9)); P.y=GROUND-6-14*k+Math.sin(c.t*3)*3*k; P.state="idle"; }
  else if(c.type==="chair"){ const k=smooth(Math.min(1,u/0.16))*smooth(Math.min(1,(1-u)/0.16)); P.x=c.xs+(c.xe-c.xs)*Math.min(1,Math.max(0,(u-0.06)/0.88)); P.y=GROUND-230*k; P.state="idle"; }
  else { const pts=[c.xs].concat(c.st,[c.xe]), seg=pts.length-1, v=u*seg, i=Math.min(seg-1,Math.floor(v)), f=v-i;
    const base=j=>(j===0||j===seg)?GROUND:GROUND-8;
    P.x=pts[i]+(pts[i+1]-pts[i])*f; P.y=base(i)+(base(i+1)-base(i))*f-120*Math.sin(Math.PI*f); P.state=f<0.12||f>0.9?"land":"jump";
    if(f<0.03&&c.lastI!==i){ c.lastI=i; AM.sfx("jump"); } }
  if(u>=1){ cine=null; P.x=c.xe; P.y=GROUND; P.vx=P.vy=0; P.ground=true; P.state="idle"; P.inv=MODES[mode].inv; c.g.cool=0.8; return; }
  cam+=((P.x-VW*cfg.screenPos/100)-cam)*Math.min(1,cfg.cam*dt); cam=Math.max(0,Math.min(WORLD-VW,cam));
}
function gateTouch(g,dir){
  if(g.cool>0||cine||gateCur) return;
  if(sv.gateOwned[LV.id]) startCine(g,dir); else openGateScene(g,dir);
}
function step(dt){
  for(const g of gates) g.cool=Math.max(0,g.cool-dt);
  if(cine){ updateCine(dt); return; }
  if(!lvl.fin && !talking) lvl.time+=dt;
  if(!talking) condorUpdate(dt);
  const run = keys["shift"] || Math.abs(input.stickX)>0.72;
  let ax = 0;
  if(input.stickOn) ax = Math.abs(input.stickX)<0.12?0:input.stickX;
  else ax = (keys["arrowright"]||keys["d"]?1:0) - (keys["arrowleft"]||keys["a"]?1:0);
  const wantCrouch = (keys["arrowdown"]||keys["s"]||input.stickY>0.6) && P.ground;
  if(talking||paused){ ax=0; }
  P.crouch = wantCrouch && !talking;
  let maxV = (run?cfg.run:cfg.walk)*spdMul();
  if(input.stickOn && !run) maxV = cfg.walk*spdMul()*Math.min(1,Math.abs(ax)/0.72+0.15);
  if(P.crouch) maxV = 70;
  const target = Math.sign(ax)*maxV;
  const acc = P.ground ? (Math.abs(target)>Math.abs(P.vx)?2600:3200) : 1600;
  if(P.vx<target) P.vx=Math.min(target,P.vx+acc*dt); else if(P.vx>target) P.vx=Math.max(target,P.vx-acc*dt);
  if(Math.abs(ax)>0.05 && !talking) P.face = ax>0?1:-1;

  // salto: coyote + buffer + altura variable
  P.coyote = P.ground?0.1:Math.max(0,P.coyote-dt); P.jumpBuf=Math.max(0,P.jumpBuf-dt);
  if(P.jumpBuf>0 && (P.ground||P.coyote>0) && !talking){
    P.vy = -Math.sqrt(2*cfg.gravity*cfg.jump*jumpMul()); AM.sfx("jump"); P.ground=false; P.coyote=0; P.jumpBuf=0; P.jumpCut=false; P.crouch=false;
  }
  if(!P.ground && !P.jumpHeld && P.vy<-300 && !P.jumpCut){ P.vy*=0.5; P.jumpCut=true; }
  P.vy += cfg.gravity*dt; if(P.vy>1700) P.vy=1700;
  P.glide=false; const fe=eff("feather");
  if(fe>0 && !P.ground && P.jumpHeld && P.vy>0 && !talking){ const cap=900*(1-fe/100); if(P.vy>cap) P.vy=cap; P.glide=true; }

  for(const r of rafts){ const o=r.x; r.x+=r.dir*r.v*dt; if(r.x>r.b){r.x=r.b;r.dir=-1;} if(r.x<r.a){r.x=r.a;r.dir=1;}
    if(P.ground && Math.abs(P.y-r.top)<3 && P.x+halfW()>o && P.x-halfW()<o+r.w) P.x+=r.x-o; }
  // movimiento horizontal con colisión lateral contra rocas
  const hw=halfW(); let nx=P.x+P.vx*dt;
  for(const g of gates){ if(P.x+hw<=g.x0 && nx+hw>g.x0){ nx=g.x0-hw; P.vx=0; gateTouch(g,1); } else if(P.x-hw>=g.x1 && nx-hw<g.x1){ nx=g.x1+hw; P.vx=0; gateTouch(g,-1); } }
  for(const s of solids){
    const top=GROUND-s.h;
    if(P.y>top+4){                                // el cuerpo cruza el alto de la roca
      if(P.x+hw<=s.x && nx+hw>s.x){ nx=s.x-hw; P.vx=0; }
      else if(P.x-hw>=s.x+s.w && nx-hw<s.x+s.w){ nx=s.x+s.w+hw; P.vx=0; }
    }
  }
  P.x=Math.max(70,Math.min(WORLD-70,nx));

  // movimiento vertical
  const prevY=P.y; P.y+=P.vy*dt;
  const fl=floorBelow(P.x,prevY);
  const wasAir=!P.ground;
  if(P.y>=fl && P.vy>=0){ P.y=fl; if(wasAir && P.vy>500){ P.land=0.14; AM.sfx("land"); } P.vy=0; P.ground=true; }
  else if(P.ground && P.y<fl-0.5){ P.ground=false; }
  if(P.ground && P.y<fl-0.5) P.ground=false;
  // si estaba apoyado y el piso desapareció (caminó fuera de una roca), cae
  if(P.ground){ const f2=floorBelow(P.x,P.y-1); if(f2>P.y+1){ P.ground=false; } }
  P.land=Math.max(0,P.land-dt);
  if(P.y>GROUND+45 && inGap(P.x)){ splash(); return; }

  // fase de pasos según distancia recorrida
  const sp=Math.abs(P.vx);
  P.phase += sp*dt*(sp>cfg.walk*spdMul()*1.15?0.032:0.036);

  // estado
  if(talking) P.state="talk";
  else if(!P.ground) P.state = P.vy<0?"jump":"fall";
  else if(P.crouch) P.state="crouch";
  else if(P.land>0) P.state="land";
  else if(sp>cfg.walk*spdMul()*1.15) P.state="run";
  else if(sp>25) P.state="walk";
  else P.state="idle";

  // monedas
  const mg=eff("magnet"), chy=P.y-sizeH()*0.45;
  for(const c of coins){
    if(c.got) continue;
    if(mg>0){ const dx=P.x-c.x, dy=chy-c.y, dd=Math.hypot(dx,dy); if(dd<mg && dd>1){ const m=Math.min(dd,(380+(mg-dd)*2.5)*dt); c.x+=dx/dd*m; c.y+=dy/dd*m; } }
    if(Math.abs(c.x-P.x)<46 && Math.abs(c.y-chy)<60){ c.got=true; addScore(20); AM.sfx("collect"); }
  }

  // personajes y objetivo de la brújula (lo más cercano entre personajes pendientes y basura)
  let best=null,bd=1e9;
  for(const n of NPCS){ const dd=Math.abs(P.x-n.x); n.near=dd<230; n.face=n.near?(P.x<n.x?-1:1):-1; if(!n.done&&dd<bd){bd=dd;best={k:"npc",o:n,x:n.x};} }
  for(const tr of trash){ if(tr.got) continue; const dd=Math.abs(tr.x-P.x); if(dd<bd){bd=dd;best={k:"trash",o:tr,x:tr.x};} }
  if(!best) best={k:"goal",x:GOAL_X+30};
  for(const g of gates){ if(P.x<g.x0&&best.x>g.x1) best={k:"goal",x:g.x0-40}; else if(P.x>g.x1&&best.x<g.x0) best={k:"goal",x:g.x1+40}; }
  P.tgt=best; P.tgtNear = best.k==="trash"?bd<TRASH_R:best.k==="npc"?best.o.near:false;

  // puntos de control
  for(const c of CPS) if(P.x>c) cp=Math.max(cp,c);

  // aviso del obstáculo: aparece el cartel antes de llegar
  for(const g of gates){ if(!g.warned&&!talking&&!cine&&!sub&&P.x>=g.x0-75-30&&P.x<g.x0+20){ g.warned=true; openSign(); break; } }
  // peligros: patrullas y choques
  for(const h of hazards){ if(h.k==="fox"){ const dx=P.x-h.x, d=Math.abs(dx), sd=dx>0?1:-1;
      if(h.st==="patrol"){ h.x+=h.dir*h.v*dt; if(h.x>h.b){h.x=h.b;h.dir=-1;} if(h.x<h.a){h.x=h.a;h.dir=1;} h.face=h.dir; h.cd=Math.max(0,(h.cd||0)-dt); if(!h.cd&&d<340&&Math.abs(P.y-GROUND)<150&&sd===h.dir){ h.st="alert"; h.t=1.1*(h.tel||1); h.face=sd; AM.sfx("open"); } }
      else if(h.st==="alert"){ h.t-=dt; h.face=sd; if(h.t<=0){ h.st="dash"; h.t=0.7; h.dir=h.face; } }
      else if(h.st==="dash"){ h.x+=h.dir*215*(h.spd||1)*dt; h.x=Math.max(h.a-120,Math.min(h.b+120,h.x)); h.t-=dt; if(h.t<=0){ h.st="patrol"; h.cd=2.4; h.dir=-h.dir; } } }
    if(h.k==="bird"){ h.t+=dt; h.cd=Math.max(0,(h.cd||0)-dt);
      if(h.st==="hover"){ const tg=h.a+(h.b-h.a)*(0.5+0.5*Math.sin(h.t*0.55+h.ph)); h.face=tg>=h.x?1:-1; h.x+=(tg-h.x)*Math.min(1,1.6*dt); h.y=GROUND-290+Math.sin(h.t*2.2)*14;
        if(!h.cd&&Math.abs(P.x-h.x)<380&&P.y>GROUND-220&&P.inv<=0){ h.st="mark"; h.tm=1.4*(h.tel||1); h.tx=P.x+P.face*100; AM.sfx("open"); } }
      else if(h.st==="mark"){ h.tm-=dt; h.face=h.tx>=h.x?1:-1; h.x+=(h.tx-h.x)*Math.min(1,5*dt); h.y=GROUND-290+Math.sin(h.t*18)*6; if(h.tm<=0){ h.st="dive"; h.tm=0.5; h.x=h.tx; } }
      else if(h.st==="dive"){ h.tm-=dt; const q=Math.max(0,Math.min(1,1-h.tm/0.5)); h.y=GROUND-290+(260*q*q); if(h.tm<=0){ h.st="rise"; h.tm=0.9; } }
      else if(h.st==="rise"){ h.tm-=dt; h.y-=300*dt; if(h.tm<=0){ h.st="hover"; h.cd=3.4; } } }
    if(h.k==="piche"){ const dx=P.x-h.x, d=Math.abs(dx), sd=dx>0?1:-1; h.cd=Math.max(0,(h.cd||0)-dt);
      if(h.st==="walk"){ h.x+=h.dir*h.v*dt; if(h.x>h.b){h.x=h.b;h.dir=-1;} if(h.x<h.a){h.x=h.a;h.dir=1;} h.face=h.dir; if(!h.cd&&d<340&&Math.abs(P.y-GROUND)<150&&sd===h.dir){ h.st="curl"; h.t=1.1*(h.tel||1); h.face=sd; AM.sfx("open"); } }
      else if(h.st==="curl"){ h.t-=dt; h.face=sd; if(h.t<=0){ h.st="roll"; h.t=1.0; h.dir=h.face; } }
      else if(h.st==="roll"){ h.x+=h.dir*250*(h.spd||1)*dt; h.x=Math.max(h.a-260,Math.min(h.b+260,h.x)); h.rot=(h.rot||0)+h.dir*dt*18; h.t-=dt; if(h.t<=0){ h.st="walk"; h.cd=2.6; h.dir=-h.dir; } } }
    if(h.k==="weed"){ h.x+=h.dir*h.v*dt; if(h.x>h.b){h.x=h.b;h.dir=-1;} if(h.x<h.a){h.x=h.a;h.dir=1;} h.rot+=h.dir*h.v*dt/29; } }
  P.inv=Math.max(0,P.inv-dt);
  if(!talking && P.inv<=0){
    const hw2=halfW()*0.8, top=P.y-bodyH(), bot=P.y-2; let hit=null;
    const ov=r=>P.x+hw2>r.x0&&P.x-hw2<r.x1&&bot>r.y0&&top<r.y1;
    for(const h of hazards){ if(ov(hrect(h))){hit=h;break;} }
    if(!hit && MODES[mode].trashHurts) for(const tr of trash){ if(!tr.got&&ov(trect(tr))){hit=tr;break;} }
    if(hit) hurt(hit);
  }

  if(!lvl.fin && P.x>GOAL_X) finishLevel();

  // cámara
  const look = P.face*50*Math.min(1,sp/cfg.run);
  const targetCam = P.x - VW*cfg.screenPos/100 + look;
  cam += (targetCam-cam)*Math.min(1,cfg.cam*dt);
  cam = Math.max(0,Math.min(WORLD-VW,cam));
}

/* ---------- dibujo ---------- */
function hsh(n){ const x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function repObj(period,factor,fn){ const off=cam*factor, k0=Math.floor(off/period)-1, k1=Math.ceil((off+VW)/period)+1; for(let k=k0;k<=k1;k++) fn(k*period-off,k); }
function skyG(h,c0,c1){ const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,c0); g.addColorStop(1,c1); ctx.fillStyle=g; ctx.fillRect(0,0,VW,h); }
function ridge(f,baseY,hmin,hmax,col,seed,snowH){
  ctx.beginPath(); ctx.moveTo(0,baseY+2);
  for(let x=0;x<=VW+24;x+=24){ const wx=x+cam*f, n=0.5+0.5*(Math.sin(wx*0.0031+seed)+0.6*Math.sin(wx*0.0077+seed*2)+0.35*Math.sin(wx*0.017+seed*3))/1.95; ctx.lineTo(x,baseY-(hmin+(hmax-hmin)*n)); }
  ctx.lineTo(VW+24,baseY+2); ctx.closePath(); ctx.fillStyle=col; ctx.fill();
  if(snowH){ ctx.save(); ctx.clip(); ctx.fillStyle="#f2f7ff"; ctx.fillRect(0,baseY-hmax-4,VW+30,hmax+4-snowH); ctx.restore(); }
}
function cloudBlob(x,y,s,col){ ctx.fillStyle=col; for(const [dx,dy,r] of [[0,0,30],[34,-10,38],[74,0,32],[40,10,34]]){ ctx.beginPath(); ctx.arc(x+dx*s,y+dy*s,r*s,0,6.3); ctx.fill(); } }
function drawLighthouse(x,y,sc){
  ctx.save(); ctx.translate(x,y); ctx.scale(sc,sc); ctx.lineJoin="round"; ctx.strokeStyle="#4a1410"; ctx.lineWidth=2.5;
  ctx.fillStyle="#7d7f86"; ctx.beginPath(); ctx.ellipse(0,2,46,12,0,0,6.3); ctx.fill();
  for(let i=0;i<4;i++){ const y0=-i*17, w0=11-i*1.2, w1=11-(i+1)*1.2; ctx.fillStyle=i%2?"#fff":"#d8342c"; ctx.beginPath(); ctx.moveTo(-w0,y0); ctx.lineTo(w0,y0); ctx.lineTo(w1,y0-17); ctx.lineTo(-w1,y0-17); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle="#3a3f45"; ctx.fillRect(-9,-77,18,9); ctx.fillStyle="#ffe27a"; ctx.fillRect(-6,-76,12,7); ctx.fillStyle="#d8342c"; ctx.beginPath(); ctx.moveTo(-11,-77); ctx.lineTo(0,-90); ctx.lineTo(11,-77); ctx.closePath(); ctx.fill(); ctx.stroke();
  const b=0.14+0.12*Math.sin(t*2.2); ctx.fillStyle="rgba(255,240,150,"+b+")"; ctx.beginPath(); ctx.moveTo(0,-72); ctx.lineTo(-210,-98); ctx.lineTo(-210,-48); ctx.closePath(); ctx.fill(); ctx.restore();
}
function drawShip(x,y,sc,kind){
  ctx.save(); ctx.translate(x,y); ctx.scale(sc,sc); ctx.lineJoin="round"; ctx.lineWidth=2.5; ctx.strokeStyle="#1b2433";
  if(kind===0){ ctx.fillStyle="#22344f"; ctx.beginPath(); ctx.moveTo(-70,-12); ctx.lineTo(70,-12); ctx.lineTo(52,10); ctx.lineTo(-52,10); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.fillRect(-30,-36,60,24); ctx.strokeRect(-30,-36,60,24); ctx.fillStyle="#d8342c"; ctx.fillRect(-10,-52,18,16); ctx.strokeRect(-10,-52,18,16); ctx.fillStyle="#7fb8e8"; for(let i=-24;i<24;i+=12) ctx.fillRect(i,-30,8,7); }
  else { ctx.fillStyle="#f4f4f4"; ctx.beginPath(); ctx.moveTo(-4,-70); ctx.lineTo(-4,-8); ctx.lineTo(-40,-8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(4,-60); ctx.lineTo(4,-8); ctx.lineTo(34,-8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle="#c8301f"; ctx.beginPath(); ctx.moveTo(-46,-8); ctx.lineTo(42,-8); ctx.lineTo(30,8); ctx.lineTo(-34,8); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
function drawWhaleTail(x,y,v){
  ctx.save(); ctx.translate(x,y-v*30); ctx.lineJoin="round"; ctx.fillStyle="#1f3556"; ctx.strokeStyle="#0b1626"; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(-6,30); ctx.lineTo(-5,8); ctx.quadraticCurveTo(-30,4,-44,-16); ctx.quadraticCurveTo(-24,-8,-2,-4); ctx.quadraticCurveTo(24,-8,44,-16); ctx.quadraticCurveTo(30,4,5,8); ctx.lineTo(6,30); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  ctx.strokeStyle="rgba(255,255,255,.8)"; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(x,y+2,34+v*10,7,0,0,6.3); ctx.stroke();
}
function drawGull(x,y,s,ph){ const f=Math.sin(ph)*7*s; ctx.strokeStyle="#fff"; ctx.lineWidth=2.6*s; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(x-16*s,y+f); ctx.quadraticCurveTo(x-7*s,y-7*s,x,y); ctx.quadraticCurveTo(x+7*s,y-7*s,x+16*s,y+f); ctx.stroke(); }
function drawSeaLion(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle="#9a6a3c"; ctx.strokeStyle="#3d2410"; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(0,-10,34,15,-0.12,0,6.3); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(26,-28,11,8,-0.5,0,6.3); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(18,-20); ctx.lineTo(24,-8); ctx.lineTo(10,-10); ctx.closePath(); ctx.fill(); ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(30,-30,1.8,0,6.3); ctx.fill(); ctx.restore(); }
function drawPeng(x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle="#1d2530"; ctx.strokeStyle="#0a0f14"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.ellipse(0,-22,12,22,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.beginPath(); ctx.ellipse(2,-18,7,16,0,0,6.3); ctx.fill(); ctx.fillStyle="#f0a020"; ctx.beginPath(); ctx.moveTo(8,-36); ctx.lineTo(18,-33); ctx.lineTo(8,-30); ctx.closePath(); ctx.fill(); ctx.restore(); }
function lightFx(){
  const id=LV&&LV.id; ctx.save();
  const tint=(c,a,y0)=>{ ctx.globalCompositeOperation="multiply"; ctx.globalAlpha=a; ctx.fillStyle=c; ctx.fillRect(0,y0,VW,VH-y0); ctx.globalAlpha=1; ctx.globalCompositeOperation="source-over"; };
  const glow=(x,y,r,c0,a)=>{ ctx.globalCompositeOperation="screen"; const g=ctx.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,c0.replace("A",a)); g.addColorStop(1,c0.replace("A",0)); ctx.fillStyle=g; ctx.fillRect(0,0,VW,VH); ctx.globalCompositeOperation="source-over"; };
  if(id==="level_01"){ tint("#bcd8f6",0.5,470); glow(VW*0.72,40,620,"rgba(235,248,255,A)",0.45); }
  else if(id==="level_02"){ tint("#ffd59a",0.42,0); glow(VW*0.16,70,640,"rgba(255,190,90,A)",0.5); ctx.globalCompositeOperation="screen"; ctx.fillStyle="rgba(255,210,120,.10)"; for(let i=0;i<4;i++){ const x=VW*0.1+i*150+Math.sin(t*0.3+i)*20; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+70,0); ctx.lineTo(x+330,520); ctx.lineTo(x+170,520); ctx.closePath(); ctx.fill(); } ctx.globalCompositeOperation="source-over"; }
  else if(id==="level_03"){ tint("#d9e0a2",0.38,470); const g=ctx.createLinearGradient(0,0,0,330); g.addColorStop(0,"rgba(255,140,110,.30)"); g.addColorStop(1,"rgba(255,140,110,0)"); ctx.globalCompositeOperation="screen"; ctx.fillStyle=g; ctx.fillRect(0,0,VW,330); ctx.globalCompositeOperation="source-over";
    ctx.strokeStyle="rgba(255,255,255,.35)"; ctx.lineWidth=3; ctx.lineCap="round"; for(let i=0;i<9;i++){ const y=60+i*34+Math.sin(i)*10, x=(((i*263+t*160)%(VW+300))-150); ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+120+i*8,y); ctx.stroke(); } }
  else if(id==="level_04"){ tint("#aab9cf",0.55,0); const g=ctx.createLinearGradient(0,300,0,470); g.addColorStop(0,"rgba(200,215,230,0)"); g.addColorStop(1,"rgba(200,215,230,.35)"); ctx.fillStyle=g; ctx.fillRect(0,300,VW,170); }
  else if(id==="level_05"){ tint("#ffeaa8",0.34,470); glow(VW*0.8,90,560,"rgba(255,250,210,A)",0.55); }
  ctx.restore();
}
function tileLayer(im,factor,y,hDraw,wDraw){
  const w=wDraw!==undefined?wDraw:im.naturalWidth*LAYER_SCALE, h=hDraw!==undefined?hDraw:im.naturalHeight*LAYER_SCALE;
  const u0=cam*factor; let k=Math.floor(u0/w);
  for(let sx=k*w-u0; sx<VW; sx+=w,k++){
    ctx.save();
    if(k%2!==0){ ctx.translate(sx+w+1,y); ctx.scale(-1,1); ctx.drawImage(im,0,0,w+1,h); }
    else ctx.drawImage(im,sx,y,w+1,h);
    ctx.restore();
  }
}
function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
const PROPS={
 level_01:["ice","snow","rockS","ice","stakes","snow","rockS","ice"],
 level_02:["pine","mush","log","flower","pine","fence","flower","pine"],
 level_03:["cairn","boulder","deadtree","flag","boulder","cairn","deadtree","boulder"],
 level_04:["lenga","driftwood","buoy","mush","rope","lenga","buoy","lenga"],
 level_05:["shell","star","buoy","driftwood","net","shell","post","star"]
};
function propDraw(kind,x,y,s,k){
  ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.lineJoin="round"; ctx.lineCap="round"; ctx.lineWidth=2.5;
  const ell=(cx,cy,rx,ry,f,st)=>{ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,6.3); ctx.fillStyle=f; ctx.fill(); if(st){ ctx.strokeStyle=st; ctx.stroke(); } };
  switch(kind){
   case "ice": ctx.fillStyle="#bfe8ff"; ctx.strokeStyle="#2a6fb0"; for(const [dx,h,w] of [[-14,34,10],[0,52,12],[15,28,9]]){ ctx.beginPath(); ctx.moveTo(dx-w,0); ctx.lineTo(dx-w*0.4,-h); ctx.lineTo(dx+w*0.4,-h*0.9); ctx.lineTo(dx+w,0); ctx.closePath(); ctx.fill(); ctx.stroke(); } break;
   case "snow": ell(0,-3,34,9,"#f4fbff","#9ccbe6"); ell(14,-9,18,7,"#ffffff"); break;
   case "rockS": ell(0,-9,22,12,"#9aa3ad","#3a4048"); ell(-8,-12,8,4,"#c5ccd3"); break;
   case "calaf": ell(0,-14,26,16,"#3a7a3a","#17401a"); ctx.fillStyle="#2c3f9a"; for(const [dx,dy] of [[-12,-16],[0,-22],[11,-14],[-2,-10],[16,-22]]){ ctx.beginPath(); ctx.arc(dx,dy,4,0,6.3); ctx.fill(); } break;
   case "stakes": ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-52); ctx.stroke(); ctx.fillStyle="#e0523f"; ctx.fillRect(0,-52,22,12); ctx.lineWidth=2; ctx.strokeRect(0,-52,22,12); break;
   case "tuft": ctx.strokeStyle="#7a8a3a"; ctx.lineWidth=3; for(let i=-3;i<=3;i++){ ctx.beginPath(); ctx.moveTo(i*4,0); ctx.quadraticCurveTo(i*5,-16,i*8,-24+Math.abs(i)*3); ctx.stroke(); } break;
   case "pine": ctx.fillStyle="#5a3a1e"; ctx.fillRect(-4,-22,8,22); for(let i=0;i<3;i++){ ctx.fillStyle=i%2?"#2f7a38":"#256a30"; ctx.strokeStyle="#0f3a18"; ctx.beginPath(); ctx.moveTo(-26+i*4,-18-i*26); ctx.lineTo(0,-58-i*26); ctx.lineTo(26-i*4,-18-i*26); ctx.closePath(); ctx.fill(); ctx.stroke(); } break;
   case "fern": ctx.strokeStyle="#2f8a3a"; ctx.lineWidth=3.5; for(let i=-3;i<=3;i++){ ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(i*10,-26,i*17,-24+Math.abs(i)*5); ctx.stroke(); } break;
   case "mush": ctx.fillStyle="#f4ead2"; ctx.fillRect(-3,-12,6,12); ell(0,-14,13,8,"#d8342c","#5a1410"); ctx.fillStyle="#fff"; for(const dx of [-5,3,7]){ ctx.beginPath(); ctx.arc(dx,-16,2,0,6.3); ctx.fill(); } break;
   case "log": ell(0,-9,34,10,"#8a5a2b","#3a2208"); ell(34,-9,8,10,"#d8b27a","#3a2208"); break;
   case "flower": for(const [dx,col] of [[-10,"#ff7ab0"],[2,"#ffd45a"],[12,"#fff"]]){ ctx.strokeStyle="#2f8a3a"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(dx,0); ctx.lineTo(dx,-20); ctx.stroke(); ctx.fillStyle=col; ctx.beginPath(); ctx.arc(dx,-24,6,0,6.3); ctx.fill(); ctx.fillStyle="#e07a1f"; ctx.beginPath(); ctx.arc(dx,-24,2.4,0,6.3); ctx.fill(); } break;
   case "fence": ctx.strokeStyle="#5a3a1e"; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-34,-30); ctx.lineTo(34,-30); ctx.moveTo(-34,-16); ctx.lineTo(34,-16); for(const dx of [-34,0,34]){ ctx.moveTo(dx,0); ctx.lineTo(dx,-40); } ctx.stroke(); break;
   case "cairn": ell(0,-8,22,9,"#9aa0a8","#3a4048"); ell(0,-22,16,8,"#b0b6bd","#3a4048"); ell(0,-34,10,7,"#c9ced4","#3a4048"); break;
   case "boulder": ell(0,-18,36,22,"#8a8f98","#2e3238"); ell(-12,-26,12,6,"#b5bbc3"); break;
   case "deadtree": ctx.strokeStyle="#4a3a2a"; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(2,-60); ctx.moveTo(1,-38); ctx.lineTo(-22,-58); ctx.moveTo(2,-48); ctx.lineTo(24,-70); ctx.stroke(); break;
   case "flag": ctx.strokeStyle="#3b2410"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-64); ctx.stroke(); ctx.fillStyle="#2f7fd6"; ctx.beginPath(); ctx.moveTo(0,-64); ctx.lineTo(30+Math.sin(t*5+k)*4,-56); ctx.lineTo(0,-46); ctx.closePath(); ctx.fill(); break;
   case "lenga": ctx.fillStyle="#5a3a1e"; ctx.fillRect(-4,-30,8,30); ell(0,-44,24,22,"#e0701e","#6a2a0a"); ell(-10,-52,10,8,"#eaa02c"); break;
   case "driftwood": ctx.strokeStyle="#b8a583"; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(-30,-6); ctx.quadraticCurveTo(0,-20,32,-8); ctx.moveTo(-8,-14); ctx.lineTo(-18,-30); ctx.stroke(); break;
   case "buoy": ctx.fillStyle="#e0523f"; ctx.strokeStyle="#3a1010"; ctx.beginPath(); ctx.arc(0,-18,16,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#fff"; ctx.fillRect(-16,-22,32,8); ctx.strokeRect(-16,-22,32,8); ctx.fillStyle="#3a3f45"; ctx.fillRect(-3,-42,6,10); break;
   case "rope": ctx.strokeStyle="#b79a5a"; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(0,-8,14,0,6.3); ctx.stroke(); ctx.beginPath(); ctx.arc(0,-8,7,0,6.3); ctx.stroke(); break;
   case "shell": ell(0,-8,14,10,"#f6e3d0","#a8805a"); ctx.strokeStyle="#c9a07a"; ctx.lineWidth=1.5; for(const dx of [-6,0,6]){ ctx.beginPath(); ctx.moveTo(dx,-2); ctx.lineTo(dx*1.5,-16); ctx.stroke(); } break;
   case "star": ctx.fillStyle="#f08a3a"; ctx.strokeStyle="#7a3a10"; ctx.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, r=i%2?7:16; ctx.lineTo(Math.cos(a)*r,-14+Math.sin(a)*r); } ctx.closePath(); ctx.fill(); ctx.stroke(); break;
   case "net": ctx.strokeStyle="#7a8a9a"; ctx.lineWidth=2; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(-26+i*13,-2); ctx.lineTo(-20+i*13,-26); ctx.stroke(); } for(let j=0;j<3;j++){ ctx.beginPath(); ctx.moveTo(-26,-6-j*9); ctx.lineTo(26,-6-j*9); ctx.stroke(); } break;
   case "grassd": ctx.strokeStyle="#c9b24a"; ctx.lineWidth=3; for(let i=-4;i<=4;i++){ ctx.beginPath(); ctx.moveTo(i*4,0); ctx.quadraticCurveTo(i*6+Math.sin(t*2+k)*3,-18,i*9,-30+Math.abs(i)*3); ctx.stroke(); } break;
   case "post": ctx.strokeStyle="#5a3a1e"; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-50); ctx.stroke(); ctx.strokeStyle="#c9b48a"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(0,-44); ctx.quadraticCurveTo(26,-34,52,-44); ctx.stroke(); break;
  }
  ctx.restore();
}
function drawProps(){
  const list=PROPS[LV.id]; if(!list) return; const step=LV.id==="level_02"?150:170, k0=Math.floor((cam-120)/step), k1=Math.ceil((cam+VW+120)/step);
  for(let k=Math.max(1,k0);k<=k1;k++){
    const x=k*step+hsh(k*3.7)*100-30; if(x<260||x>WORLD-120) continue; const sx=x-cam; if(sx<-100||sx>VW+100) continue;
    if(inGap(x)||inGap(x+40)||inGap(x-40)) continue;
    if(solids.some(q=>x>q.x-50&&x<q.x+q.w+50)||hazards.some(h=>Math.abs(h.x-x)<120)||trash.some(r=>Math.abs(r.x-x)<80)||NPCS.some(n=>Math.abs(n.x-x)<150)) continue;
    propDraw(list[Math.floor(hsh(k*9.1+LV.id.length)*list.length)],sx,GROUND-2+hsh(k*5.3)*5,0.8+hsh(k*1.7)*0.6,k);
  }
}
function drawPath(){
  const y0=GROUND-16;
  const g=ctx.createLinearGradient(0,y0,0,y0+58); g.addColorStop(0,"#d9b878"); g.addColorStop(.5,"#c39a58"); g.addColorStop(1,"#a67a3e");
  ctx.fillStyle=g; ctx.globalAlpha=.9; ctx.fillRect(0,y0,VW,58); ctx.globalAlpha=1;
  ctx.fillStyle="#6e8f2a"; ctx.fillRect(0,y0-3,VW,5);
  // piedritas del sendero (se desplazan con el suelo)
  ctx.fillStyle="#8d7a62";
  for(let i=0;i<40;i++){ const wx=i*173+((i*53)%71); let sx=wx-cam; sx=((sx%(VW+200))+VW+200)%(VW+200)-100; const sy=y0+12+((i*37)%34); ctx.beginPath(); ctx.ellipse(sx,sy,6+(i%4)*2,3+(i%3),0,0,6.3); ctx.fill(); }
}
function drawWater(x0,x1,rapids){
  const a=x0-cam,b=x1-cam; if(b<-20||a>VW+20) return; const top=GROUND-16;
  ctx.save(); ctx.beginPath(); ctx.rect(a,top,b-a,VH-top); ctx.clip();
  const g=ctx.createLinearGradient(0,top,0,VH); g.addColorStop(0,"#6fe0f2"); g.addColorStop(.35,"#2aa8d8"); g.addColorStop(1,"#14609c"); ctx.fillStyle=g; ctx.fillRect(a,top,b-a,VH-top);
  ctx.strokeStyle="#ffffffb0"; ctx.lineWidth=3; ctx.lineCap="round";
  const sp=rapids?70:24, n=Math.ceil((b-a)/38)+2;
  for(let i=0;i<n;i++){ const x=a+i*38+((t*sp+i*17)%38), y=GROUND-4+(i%4)*17; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+10,y-6,x+20,y); ctx.stroke(); }
  if(rapids){ ctx.fillStyle="#ffffffcc"; for(let i=0;i<n;i++){ const x=a+((i*61+t*90)%(b-a)), y=GROUND-6+(i%3)*22; ctx.beginPath(); ctx.ellipse(x,y,9,4,0,0,6.3); ctx.fill(); } }
  ctx.restore();
  ctx.strokeStyle="#2e1f0e"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(a,top); ctx.lineTo(a,VH); ctx.moveTo(b,top); ctx.lineTo(b,VH); ctx.stroke();
}
function drawGate(g){
  const a=g.x0-cam,b=g.x1-cam; if(b<-200||a>VW+200) return; const top=GROUND-16, w=g.x1-g.x0;
  if(g.type==="ice"){
    ctx.save(); const gr=ctx.createLinearGradient(0,top,0,VH); gr.addColorStop(0,"#e4f6ff"); gr.addColorStop(1,"#86c8ee"); ctx.fillStyle=gr; ctx.fillRect(a,top,b-a,VH-top);
    ctx.strokeStyle="#2a6fb0"; ctx.lineWidth=5; ctx.lineCap="round"; ctx.lineJoin="round";
    for(let i=0;i<5;i++){ const x=a+20+i*(w-40)/4; ctx.beginPath(); ctx.moveTo(x,top+10+(i%2)*6); ctx.lineTo(x+22,top+30); ctx.lineTo(x-8,top+48); ctx.lineTo(x+16,top+66); ctx.stroke(); }
    ctx.fillStyle="#ffffffd0"; for(let i=0;i<9;i++){ const x=a+((i*47+t*8)%w), y=top+8+(i*13)%52; ctx.fillRect(x,y,4,4); }
    ctx.strokeStyle="#2e1f0e"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(a,top); ctx.lineTo(a,VH); ctx.moveTo(b,top); ctx.lineTo(b,VH); ctx.stroke(); ctx.restore();
  } else if(g.type==="binoc"){
    ctx.save(); const gr=ctx.createLinearGradient(0,top,0,VH); gr.addColorStop(0,"#f1dda0"); gr.addColorStop(1,"#cfae60"); ctx.fillStyle=gr; ctx.fillRect(a,top,b-a,VH-top);
    ctx.strokeStyle="#7a5a2a"; ctx.lineWidth=4; ctx.lineCap="round"; ctx.fillStyle="#9a6a38";
    const n=Math.floor(w/90); for(let i=0;i<=n;i++){ const x=a+i*w/n; ctx.fillRect(x-4,top-34,8,40); if(i<n){ ctx.beginPath(); ctx.moveTo(x+4,top-24); ctx.quadraticCurveTo(x+w/n/2,top-10,x+w/n-4,top-24); ctx.stroke(); } }
    ctx.fillStyle="#ffffffb0"; for(let i=0;i<8;i++){ const x=a+((i*61+t*10)%w); ctx.fillRect(x,top+14+(i*17)%50,5,3); }
    ctx.strokeStyle="#2e1f0e"; ctx.beginPath(); ctx.moveTo(a,top); ctx.lineTo(a,VH); ctx.moveTo(b,top); ctx.lineTo(b,VH); ctx.stroke(); ctx.restore();
  } else drawWater(g.x0,g.x1,g.type==="river");
  if(g.type==="boat"){ ctx.save(); ctx.fillStyle="#8a5a2b"; ctx.strokeStyle="#3a2208"; ctx.lineWidth=3; for(const x of [a-16,a+8,b-8,b+16]){ ctx.fillRect(x-5,GROUND-30,10,52); ctx.strokeRect(x-5,GROUND-30,10,52); } const bx=a+w*0.5+Math.sin(t*0.6)*w*0.05, by=GROUND-2+Math.sin(t*2)*2; ctx.fillStyle="#e0523f"; ctx.beginPath(); ctx.moveTo(bx-46,by-8); ctx.lineTo(bx+46,by-8); ctx.lineTo(bx+30,by+14); ctx.lineTo(bx-30,by+14); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
  if(g.type==="river"){ const st=g.stones; for(const f of st){ const x=a+w*f; ctx.save(); ctx.fillStyle="#8d949c"; ctx.strokeStyle="#2e3238"; ctx.lineWidth=3.5; ctx.beginPath(); ctx.ellipse(x,GROUND-3,40,15,0,Math.PI,0); ctx.lineTo(x+40,GROUND+8); ctx.lineTo(x-40,GROUND+8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } }
  if(g.type==="chair"){
    const cy=GROUND-345, ax=a-40, bx=b+40; ctx.save(); ctx.strokeStyle="#3a3f45"; ctx.lineWidth=4;
    for(const x of [ax,bx]){ ctx.beginPath(); ctx.moveTo(x,cy-12); ctx.lineTo(x,GROUND-10); ctx.stroke(); ctx.fillStyle="#cfd5db"; ctx.fillRect(x-16,cy-18,32,10); ctx.strokeRect(x-16,cy-18,32,10); }
    ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(ax,cy-6); ctx.quadraticCurveTo((ax+bx)/2,cy+18,bx,cy-6); ctx.stroke();
    const span=bx-ax; for(let i=0;i<3;i++){ const f=((t*0.05+i/3)%1), x=ax+span*f, y=cy-6+4*Math.sin(Math.PI*f)*4; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+36); ctx.stroke(); ctx.fillStyle="#e0523f"; ctx.fillRect(x-17,y+36,34,9); ctx.strokeRect(x-17,y+36,34,9); }
    ctx.restore();
  }
  drawSign(g.x0-75,"Necesitás:",g.sign);
}
function drawRaft(r){
  const x=r.x-cam; if(x<-260||x>VW+100) return; const y=r.top+Math.sin(t*2+r.x*0.01)*2.5;
  ctx.save(); ctx.lineJoin="round"; ctx.strokeStyle="#3a2208"; ctx.lineWidth=3.5; const n=Math.round(r.w/34);
  for(let i=0;i<n;i++){ ctx.fillStyle=i%2?"#c4905a":"#b07d48"; ctx.beginPath(); ctx.rect(x+i*r.w/n,y,r.w/n+1,16); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle="#8a5a2b"; ctx.fillRect(x-4,y+14,r.w+8,8); ctx.strokeRect(x-4,y+14,r.w+8,8);
  ctx.strokeStyle="#e8d9a8"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+10,y+2); ctx.lineTo(x+10,y+20); ctx.moveTo(x+r.w-10,y+2); ctx.lineTo(x+r.w-10,y+20); ctx.stroke();
  ctx.restore();
}
function drawCineItem(){
  if(!cine) return; const x=P.x-cam, y=P.y, H=sizeH(), c=cine;
  ctx.save(); ctx.lineCap="round";
  if(c.type==="river"){
    for(const sd of [-1,1]){ ctx.strokeStyle="#2b2f36"; ctx.lineWidth=5; const hx=x+c.dir*10+sd*8, hy=y-H*0.36, air=P.state==="jump", tx=x+c.dir*(air?-16:34)+sd*10, ty=air?y+4:Math.min(y+2,GROUND+4);
      ctx.beginPath(); ctx.moveTo(hx,hy); ctx.lineTo(tx,ty); ctx.stroke(); ctx.strokeStyle="#e0523f"; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(hx,hy); ctx.lineTo(hx+(tx-hx)*0.12,hy+(ty-hy)*0.12); ctx.stroke(); }
  } else if(c.type==="ice"){
    ctx.fillStyle="#b5bcc4"; ctx.strokeStyle="#2e3238"; ctx.lineWidth=2; for(const dx of [-14,-4,6,16]){ ctx.beginPath(); ctx.moveTo(x+dx-3,y); ctx.lineTo(x+dx,y+7); ctx.lineTo(x+dx+3,y); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle="#ffffffd8"; for(let i=0;i<4;i++){ const sx=x-c.dir*(i*14+((t*70)%14)), sy=y-4-((i*5+t*30)%16); ctx.fillRect(sx,sy,4,4); }
  } else if(c.type==="boat"){
    ctx.fillStyle="#e0523f"; ctx.strokeStyle="#3a1010"; ctx.lineWidth=3.5; ctx.beginPath(); ctx.moveTo(x-58,y-2); ctx.lineTo(x+58,y-2); ctx.lineTo(x+38,y+22); ctx.lineTo(x-38,y+22); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#fff"; ctx.fillRect(x-52,y+4,104,5); ctx.strokeStyle="#ffffffb0"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-70,y+26); ctx.quadraticCurveTo(x-100,y+20,x-130,y+26); ctx.stroke();
  } else if(c.type==="binoc"){
    const hx=x+c.dir*16, hy=y-H*0.64; ctx.fillStyle="#3a3f45"; ctx.strokeStyle="#14171a"; ctx.lineWidth=2.5; for(const dx of [-5,5]){ ctx.beginPath(); ctx.roundRect?ctx.roundRect(hx+dx-4,hy-8,8,16,3):ctx.rect(hx+dx-4,hy-8,8,16); ctx.fill(); ctx.stroke(); }
  } else if(c.type==="chair"){
    const cy=GROUND-345; ctx.strokeStyle="#2b2f36"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x-20,y+6); ctx.lineTo(x-20,cy); ctx.moveTo(x+20,y+6); ctx.lineTo(x+20,cy); ctx.stroke();
    ctx.fillStyle="#e0523f"; ctx.strokeStyle="#3a1010"; ctx.lineWidth=3; ctx.beginPath(); ctx.rect(x-32,y+4,64,10); ctx.fill(); ctx.stroke(); ctx.fillStyle="#2b2f36"; ctx.fillRect(x-24,y-14,48,4); }
  ctx.restore();
}
function drawRock(s){
  const x=s.x-cam; if(x>VW+50||x+s.w<-50) return; const top=GROUND-s.h, bot=GROUND+16;
  ctx.save();
  ctx.beginPath(); ctx.moveTo(x,bot);
  ctx.quadraticCurveTo(x-6,top+s.h*0.35,x+s.w*0.14,top+8);
  ctx.quadraticCurveTo(x+s.w*0.3,top-4,x+s.w*0.5,top);
  ctx.quadraticCurveTo(x+s.w*0.85,top-3,x+s.w*0.97,top+10);
  ctx.quadraticCurveTo(x+s.w+8,top+s.h*0.5,x+s.w,bot); ctx.closePath();
  const g=ctx.createLinearGradient(x,top,x+s.w,bot); g.addColorStop(0,"#a09aa8"); g.addColorStop(.55,"#7b7684"); g.addColorStop(1,"#57525f");
  ctx.fillStyle=g; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle="#2f2a36"; ctx.lineJoin="round"; ctx.stroke();
  ctx.clip();
  ctx.fillStyle="#ffffff30"; ctx.beginPath(); ctx.ellipse(x+s.w*0.35,top+s.h*0.25,s.w*0.22,s.h*0.1,-0.3,0,6.3); ctx.fill();
  ctx.strokeStyle="#2f2a3680"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(x+s.w*0.55,top+10); ctx.lineTo(x+s.w*0.5,top+s.h*0.5); ctx.lineTo(x+s.w*0.62,top+s.h*0.8); ctx.stroke();
  // musgo arriba
  ctx.fillStyle="#7fa32c"; ctx.beginPath(); ctx.moveTo(x+s.w*0.1,top+14); ctx.quadraticCurveTo(x+s.w*0.5,top-12,x+s.w*0.95,top+14); ctx.lineTo(x+s.w*0.95,top+22); ctx.quadraticCurveTo(x+s.w*0.5,top+6,x+s.w*0.1,top+24); ctx.fill();
  ctx.restore();
}
function drawLedge(l){
  const x=l.x-cam; if(x>VW+50||x+l.w<-50) return; const h=34;
  ctx.save(); rr(x,l.top,l.w,h,14);
  const g=ctx.createLinearGradient(0,l.top,0,l.top+h); g.addColorStop(0,"#9a6b3f"); g.addColorStop(1,"#5e3d22");
  ctx.fillStyle=g; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle="#2c1a0d"; ctx.stroke();
  rr(x-4,l.top-9,l.w+8,17,8); ctx.fillStyle="#86b02e"; ctx.fill(); ctx.stroke();
  ctx.fillStyle="#b9d95a"; for(let i=0;i<l.w;i+=22){ ctx.beginPath(); ctx.moveTo(x+i,l.top-6); ctx.lineTo(x+i+5,l.top-15); ctx.lineTo(x+i+10,l.top-6); ctx.fill(); }
  ctx.restore();
}
function drawSign(wx,l1,l2){
  const x=wx-cam; if(x>VW+200||x<-300) return;
  ctx.save(); ctx.lineJoin="round";
  ctx.fillStyle="#6b4a2a"; ctx.strokeStyle="#2c1a0d"; ctx.lineWidth=4;
  rr(x-9,GROUND-150,18,170,5); ctx.fill(); ctx.stroke();
  rr(x-118,GROUND-245,236,110,10); const g=ctx.createLinearGradient(0,GROUND-245,0,GROUND-135); g.addColorStop(0,"#a8683a"); g.addColorStop(1,"#7a4a26"); ctx.fillStyle=g; ctx.fill(); ctx.stroke();
  ctx.fillStyle="#f3e6c8"; ctx.beginPath(); ctx.moveTo(x-18,GROUND-208); ctx.lineTo(x,GROUND-236); ctx.lineTo(x+18,GROUND-208); ctx.closePath(); ctx.fill();
  ctx.textAlign="center"; ctx.font="800 19px 'Trebuchet MS',system-ui,sans-serif"; ctx.fillStyle="#fff2d4";
  ctx.fillText(l1,x,GROUND-186); ctx.fillText(l2,x,GROUND-162);

  ctx.restore();
}
function drawStar(x,y,r,rot){
  ctx.beginPath(); for(let i=0;i<10;i++){const a=rot+i*Math.PI/5-Math.PI/2; const rad=i%2?r*0.45:r; ctx.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad);} ctx.closePath();
  ctx.fillStyle="#f6c343"; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle="#7a4a00"; ctx.lineJoin="round"; ctx.stroke();
}
function drawSprite(im,cx,fy,H,o){
  const k=H/404, w=im.naturalWidth*k, h=im.naturalHeight*k;
  ctx.save(); ctx.translate(cx,fy); if(o.rot) ctx.rotate(o.rot); ctx.scale((o.flip?-1:1)*(o.sx||1),o.sy||1);
  ctx.drawImage(im,-w/2,-h,w,h); ctx.restore();
}
function drawShadow(cx,fy,w,alpha){
  ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle="#1b2a3a"; ctx.beginPath(); ctx.ellipse(cx,fy+4,w,w*0.2,0,0,6.3); ctx.fill(); ctx.restore();
}
function drawNPC(){
  for(const n of NPCS){
    const x=n.x-cam; if(x<-200||x>VW+200) continue;
    const im=img[n.img], H=sizeH()*n.hs, k=H/im.naturalHeight, br=1+Math.sin(t*2.1+n.x)*0.012;
    drawShadow(x,GROUND,H*0.32,.35);
    ctx.save(); ctx.translate(x,GROUND-(n.bust?8:0)); if(n.ap0===undefined) n.ap0=t; const ap=Math.min(1,(t-n.ap0)/0.8), ez=ap<1?1+2.70158*Math.pow(ap-1,3)+1.70158*Math.pow(ap-1,2):1; ctx.globalAlpha=Math.min(1,ap*2.2); ctx.scale(((n.noflip||n.face===1)?1:-1)*ez,br*ez); ctx.rotate(n.near?Math.sin(t*3)*0.02:0);
    ctx.drawImage(im,-im.naturalWidth*k/2,-im.naturalHeight*k,im.naturalWidth*k,im.naturalHeight*k); ctx.restore();
    if(t-n.ap0<0.8){ const q=(t-n.ap0)/0.8; ctx.strokeStyle="rgba(255,244,160,"+(1-q)+")"; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(x,GROUND-H*0.45,H*0.25+q*H*0.7,0,6.3); ctx.stroke(); }
    if(n.bust){ ctx.save(); ctx.translate(x,GROUND+2); ctx.fillStyle="#7fa32c"; ctx.strokeStyle="#22380d"; ctx.lineWidth=3.5; ctx.beginPath(); ctx.ellipse(0,0,H*0.34,15,0,0,6.3); ctx.fill(); ctx.stroke(); ctx.fillStyle="#b9d95a"; for(let i=-3;i<=3;i++){ ctx.beginPath(); ctx.moveTo(i*14-5,-6); ctx.lineTo(i*14,-18-Math.abs(i%2)*5); ctx.lineTo(i*14+5,-6); ctx.fill(); } ctx.restore(); }
    if(n.done){ const by=GROUND-H-16+Math.sin(t*3)*2; ctx.save(); ctx.translate(x,by); ctx.fillStyle="#4fa81e"; ctx.strokeStyle="#173f12"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,13,0,6.3); ctx.fill(); ctx.stroke(); ctx.strokeStyle="#fff"; ctx.lineWidth=3.5; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(-6,0); ctx.lineTo(-1.5,5); ctx.lineTo(7,-5); ctx.stroke(); ctx.restore(); }
  }
}
function drawPlayer(){
  const H=sizeH(), x=P.x-cam, fy=P.y;
  const under=floorBelow(P.x,P.y-2);
  const hAbove=Math.max(0,under-P.y);
  drawShadow(x,under,H*0.27*Math.max(.5,1-hAbove/500),Math.max(.12,.4-hAbove/700));
  let im=img.idle, o={flip:P.face<0,sx:1,sy:1,rot:0}, bob=0;
  const s=Math.sin(P.phase*Math.PI), as=Math.abs(s);
  switch(P.state){
    case "idle": o.sy=1+Math.sin(t*2.2)*0.012; o.sx=1-Math.sin(t*2.2)*0.006; break;
    case "walk": bob=as*H*0.022; o.rot=s*0.035; o.sy=1-as*0.018; o.sx=1+as*0.012; break;
    case "run":  im=img.run; bob=as*H*0.05; o.rot=P.face*0.03+s*0.03; o.sy=1-as*0.035; o.sx=1+as*0.03; break;
    case "jump": im=img.run; o.sy=1.08; o.sx=.93; o.rot=P.face*0.07; break;
    case "fall": im=img.run; o.sy=1.03; o.sx=.97; o.rot=P.face*-0.03; break;
    case "land": o.sy=.84; o.sx=1.12; break;
    case "crouch": o.sy=.7; o.sx=1.1; break;
    case "talk": o.sy=1+Math.sin(t*3)*0.01; o.rot=Math.sin(t*1.6)*0.015; break;
  }
  if(P.inv>0 && ((t*14)|0)%2) ctx.globalAlpha=.35;
  drawSprite(im,x,fy-bob,H,o); ctx.globalAlpha=1;
  if(P.glide){
    ctx.save(); ctx.translate(x,fy-H*1.02); ctx.fillStyle="#fff7df"; ctx.strokeStyle="#3b2410"; ctx.lineWidth=3; ctx.lineJoin="round";
    const fl=Math.sin(t*9)*H*0.03;
    for(const sd of [-1,1]){ ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(sd*H*0.34,-H*0.3+fl,sd*H*0.62,-H*0.06); ctx.quadraticCurveTo(sd*H*0.34,H*0.01,0,0); ctx.fill(); ctx.stroke(); }
    ctx.restore();
  }
}
function drawFront(){
  // matas de primer plano (más rápidas que el suelo) para dar profundidad
  for(let i=0;i<26;i++){
    const wx=i*290+((i*131)%140); let sx=wx-cam*1.35; sx=((sx%(VW+400))+VW+400)%(VW+400)-200;
    const h=26+((i*47)%26), by=VH+10;
    ctx.save(); ctx.translate(sx,by);
    ctx.fillStyle=i%3?"#4f7a1f":"#6b9a26"; ctx.strokeStyle="#22380d"; ctx.lineWidth=3; ctx.lineJoin="round";
    ctx.beginPath(); for(let b=-3;b<=3;b++){ ctx.moveTo(b*13-9,0); ctx.quadraticCurveTo(b*13+(b*5),-h*0.6,b*13+b*8,-h+(Math.abs(b)*9)); ctx.quadraticCurveTo(b*13+12,-h*0.4,b*13+9,0); }
    ctx.fill(); ctx.stroke();
    if(i%4===0){ ctx.fillStyle="#e2432a"; for(let b=0;b<3;b++){ ctx.beginPath(); ctx.arc(-14+b*14,-h*0.7-(b%2)*10,6,0,6.3); ctx.fill(); ctx.stroke(); } }
    ctx.restore();
  }
}
function render(){
  ctx.setTransform(scaleCv,0,0,scaleCv,0,0); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high";
  ctx.fillStyle="#4aa3e8"; ctx.fillRect(0,0,VW,VH);
  LV.bg(); lightFx();
  drawCondor();
  drawPath(); drawProps();
  drawSign(900,LV.sign[0],LV.sign[1]);
  drawSign(GOAL_X+90,"¡Meta!","Fin del mundo");
  gaps.forEach(g=>drawWater(g.x0,g.x1,false)); gates.forEach(drawGate);
  solids.forEach(drawRock); ledges.forEach(drawLedge); rafts.forEach(drawRaft);
  for(const c of coins){ if(c.got) continue; const x=c.x-cam; if(x<-30||x>VW+30) continue; drawStar(x,c.y+Math.sin(t*3+c.x)*5,17,Math.sin(t*2+c.x)*0.15); }
  hazards.forEach(drawHazard); trash.forEach(drawTrash);
  drawNPC(); drawRanger(); drawPlayer(); drawCineItem(); drawFront(); drawLight();
  // indicador de conversación
  const tp=$("talkPrompt"), tb=$("bTalk");
  const nd=P.tgt?(P.tgt.x>P.x?1:-1):1, near=!!P.tgtNear&&!talking;
  const wob=Math.sin(t*(near?5:2.4))*(near?10:18);
  $("needle").setAttribute("transform","rotate("+(nd*82+wob)+" 50 50)");
  const rn=!!ranger&&!talking&&ranger.t>1.5&&Math.abs(P.x-ranger.x)<220; tb.classList.toggle("near",near||rn);
  if(near){
    const isT=P.tgt.k==="trash";
    const px=(P.tgt.x-cam)*(innerWidth/VW), py=(isT?GROUND-76:GROUND-sizeH()*(P.tgt.o.hs||1)-14)*(innerHeight/VH);
    tp.textContent=isT?"E · Recoger":"E · Hablar"; tp.style.display="block"; tp.style.left=px+"px"; tp.style.top=py+"px";
  } else if(rn){ tp.textContent="E · Guardaparque"; tp.style.display="block"; tp.style.left=((ranger.x-cam)*(innerWidth/VW))+"px"; tp.style.top=((GROUND-sizeH()*1.08-14)*(innerHeight/VH))+"px"; }
  else { tp.style.display="none"; }
}

/* ---------- bucle ---------- */
let last=performance.now(), fpsAcc=0, fpsN=0, fps=60;
function loop(now){
  const dt=Math.min(0.05,(now-last)/1000); last=now; t+=dt;
  const portrait = innerHeight>innerWidth;
  if(scene==="menu") renderMenu(); else if(sub){ if(!portrait && !paused) subStep(dt); subRender(); } else { if(!portrait && !paused) step(dt); render(); }
  fpsAcc+=dt; fpsN++; if(fpsAcc>0.5){fps=Math.round(fpsN/fpsAcc);fpsAcc=0;fpsN=0;}
  AM.setDuck(talking&&scene==="game"); AM.setPaused(paused&&scene==="game"); AM.setStage(scene==="game"?Math.min(4,Math.floor(lightProgress()*5)):0);
  $("score").textContent=String(score).padStart(6,"0");
  $("tm").textContent=fmt(lvl.time); $("tb").textContent="▸ ★"+speedBonus(lvl.time); $("timer").classList.toggle("warn",lvl.time>210&&lvl.time<=420); $("timer").classList.toggle("over",lvl.time>420);
  if($("dbg").checked) $("state").textContent="FPS "+fps+" · estado: "+P.state+"\nx "+Math.round(P.x)+"  vx "+Math.round(P.vx)+"  vy "+Math.round(P.vy)+"  suelo "+(P.ground?"sí":"no");
  requestAnimationFrame(loop);
}

/* ---------- retrato de Pascacio para el HUD ---------- */
function drawFace(){
  const c=$("face").getContext("2d"), im=img.idle;
  c.fillStyle="#cfe8ff"; c.fillRect(0,0,116,116);
  const sw=im.naturalWidth, sh=im.naturalHeight*0.36;
  const k=Math.min(112/sw,112/sh)*1.05;
  c.drawImage(im,0,0,sw,sh,(116-sw*k)/2,4,sw*k,sh*k);
}

loadAll().then(()=>{ drawFace(); $("loading").style.display="none"; requestAnimationFrame(t0=>{last=t0;loop(t0);}); window.__ready=true; AM.play("menu"); })
 .catch(err=>{ $("loading").textContent="Error: "+err.message; });
window.__gp={openFinale,solids,ledges,openBoard,myTotal,myRank,worldsDone,stX,coins,ECON,gatePrice,gateReach,GATE_ITEMS,renderShop,buyGate,condor,get ranger(){return ranger;},get sub(){return sub;},enterSub,finishSub,subStep,CONDOR_T,addScore,gates,gaps,rafts,sv,get cine(){return cine;},openGateScene,AM,LEVELS,loadLevel,get levelIdx(){return levelIdx;},lightProgress,lightColor,NPCS,lvl,MG,finishLevel,startGame,openInterlude,ilMemory,ilSort,ilTF,pickQ,openScr,get scene(){return scene;},get mode(){return mode;},P,cfg,hazards,trash,get lives(){return lives;},sv,setRewards,buy,eff,get cam(){return cam;},get photos(){return photos;},get score(){return score;},NPC,keys,input,get talking(){return talking;}};

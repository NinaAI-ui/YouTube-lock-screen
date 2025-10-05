function getTargetUrlFromQuery(){
  const p=new URLSearchParams(location.search);
  let t=p.get("target");
  if(!t)return"https://www.youtube.com/";
  try{t=decodeURIComponent(t)}catch{}
  return t;
}

/* relógio */
function updateTimeDisplay(){
  const d=new Date();
  const h=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"America/Sao_Paulo"});
  const el=document.getElementById("current-time");
  if(el)el.textContent=`Hora de Brasília: ${h}h`;
}

/* estrelas com movimento real */
const starContainer=document.getElementById("stars-container");
let stars=[],frame;
function setupStars(){
  if(!starContainer)return;
  starContainer.innerHTML="";stars=[];
  for(let i=0;i<150;i++){
    const e=document.createElement("div");
    e.className="star";
    const s=Math.random()*2+1,d=Math.random()*10+5;
    e.style.width=`${s}px`;e.style.height=`${s}px`;
    e.style.setProperty("--twinkle-duration",`${d}s`);
    e.style.setProperty("--twinkle-delay",`-${Math.random()*d}s`);
    starContainer.appendChild(e);
    stars.push({el:e,x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.1,vy:(Math.random()-.5)*.1});
  }
}
function animate(){
  const W=innerWidth,H=innerHeight;
  for(const s of stars){
    s.x+=s.vx; s.y+=s.vy;
    if(s.x<0)s.x=W;if(s.x>W)s.x=0;
    if(s.y<0)s.y=H;if(s.y>H)s.y=0;
    s.el.style.transform=`translate3d(${s.x}px,${s.y}px,0)`;
  }
  frame=requestAnimationFrame(animate);
}
function startStars(){if(frame)cancelAnimationFrame(frame);setupStars();animate();}

/* desbloqueio */
document.addEventListener("DOMContentLoaded",()=>{
  updateTimeDisplay();setInterval(updateTimeDisplay,5000);
  if(starContainer){startStars();addEventListener("resize",startStars);}
  const f=document.getElementById("block-form"),inp=document.getElementById("password"),
        err=document.getElementById("error-message-container"),att=document.getElementById("attempts-container");
  const CORRECT="YTULA";let tries=0;
  const showErr=m=>err.innerHTML=`<div class="error-message"><svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>${m}</div>`;
  const showTries=()=>att.innerHTML=tries>0?`<p class="text-sm text-gray-400 text-center mt-2">Tentativas: <span class="font-semibold text-red-600">${tries}</span></p>`:"";
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const val=inp.value.trim();inp.value="";
    if(val===CORRECT){
      const t=getTargetUrlFromQuery(),sep=t.includes("?")?"&":"?";
      document.body.innerHTML='<div class="main-container"><div class="block-card" style="padding:4rem"><h2 class="text-3xl font-bold text-green-500">Acesso Liberado!</h2><p class="text-gray-400 mt-2">Redirecionando...</p></div></div>';
      location.replace(`${t}${sep}unlocked=true`);
    }else{tries++;showErr("Senha incorreta. Tente novamente.");showTries();}
  });
});

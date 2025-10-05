function getTargetUrlFromQuery(){
  const p=new URLSearchParams(location.search);
  let t=p.get('target');
  if(!t)return'https://www.youtube.com/';
  try{t=decodeURIComponent(t);}catch{}
  return t;
}

function updateTimeDisplay(){
  const d=new Date();
  const h=d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Sao_Paulo'});
  const el=document.getElementById('current-time');
  if(el)el.textContent=`Hora de Brasília: ${h}h`;
}
updateTimeDisplay();
setInterval(updateTimeDisplay,5000);

/* Estrelas com movimento e brilho contínuos */
const container=document.getElementById('stars-container');
let stars=[];
function generateStars(){
  if(!container)return;
  container.innerHTML='';
  for(let i=0;i<150;i++){
    const s=document.createElement('div');
    s.className='star';
    const size=Math.random()*2+1;
    const x=Math.random()*100;
    const y=Math.random()*100;
    const dx=(Math.random()-0.5)*50;
    const dy=(Math.random()-0.5)*50;
    const durMove=Math.random()*30+20;
    const delayMove=-(Math.random()*durMove);
    const durTwinkle=Math.random()*10+5;
    const delayTwinkle=-(Math.random()*durTwinkle);
    s.style.cssText=`
      left:${x}vw;top:${y}vh;width:${size}px;height:${size}px;
      --dx:${dx}vw;--dy:${dy}vh;
      --movement-duration:${durMove}s;--movement-delay:${delayMove.toFixed(2)}s;
      --twinkle-duration:${durTwinkle.toFixed(2)}s;--twinkle-delay:${delayTwinkle.toFixed(2)}s;`;
    container.appendChild(s);
  }
}

/* Form */
document.addEventListener('DOMContentLoaded',()=>{
  generateStars();
  window.addEventListener('resize',generateStars);

  const form=document.getElementById('block-form');
  const pass=document.getElementById('password');
  const err=document.getElementById('error-message-container');
  const tries=document.getElementById('attempts-container');
  let count=0;
  const CORRECT='YTULA';

  function showError(msg){
    err.innerHTML=`<div class="error-message"><svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>${msg}</div>`;
  }
  function showTries(){
    tries.innerHTML=count>0?`<p class="text-sm text-gray-400 text-center mt-2">Tentativas: <span class="font-semibold text-red-600">${count}</span></p>`:'';
  }

  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(pass.value===CORRECT){
      const t=getTargetUrlFromQuery(),sep=t.includes('?')?'&':'?';
      document.body.innerHTML='<div class="main-container"><div class="block-card" style="padding:4rem"><h2 class="text-3xl font-bold text-green-500">Acesso Liberado!</h2><p class="text-gray-400 mt-2">Redirecionando para o seu destino...</p></div></div>';
      location.replace(`${t}${sep}unlocked=true`);
    }else{
      count++;
      showError('Senha incorreta. Tente novamente.');
      showTries();
      pass.value='';
    }
  });
});

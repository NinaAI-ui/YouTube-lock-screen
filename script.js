// -----------------------------------------------------
// FUNÇÃO PARA PEGAR O URL DE DESTINO
// -----------------------------------------------------
function getTargetUrlFromQuery() {
    const params = new URLSearchParams(window.location.search);
    let target = params.get('target');
    if (!target) return 'https://www.youtube.com/';
    try {
        target = decodeURIComponent(target);
    } catch (e) {
        console.error("Erro ao decodificar a URL:", e);
        return 'https://www.youtube.com/';
    }
    return target;
}

// -----------------------------------------------------
// LÓGICA DE TEMPO E RELÓGIO
// -----------------------------------------------------
function updateTimeDisplay() {
    const date = new Date();
    const hourString = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' });
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.innerText = `Hora de Brasília: ${hourString}h`;
    }
}

// -----------------------------------------------------
// SISTEMA DE ANIMAÇÃO DE ESTRELAS (BASEADO EM JAVASCRIPT)
// -----------------------------------------------------
const starContainer = document.getElementById('stars-container');
let stars = [];
let animationFrameId;

function setupStars() {
    if (!starContainer) return;
    starContainer.innerHTML = '';
    stars = [];
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const starElement = document.createElement('div');
        starElement.className = 'star';

        const size = Math.random() * 2 + 1;
        const twinkleDuration = Math.random() * 5 + 3; // 3s a 8s

        starElement.style.width = `${size}px`;
        starElement.style.height = `${size}px`;
        starElement.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
        starElement.style.setProperty('--twinkle-delay', `-${Math.random() * twinkleDuration}s`);

        starContainer.appendChild(starElement);

        stars.push({
            element: starElement,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
        });
    }
}

function animateStars() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = screenWidth;
        if (star.x > screenWidth) star.x = 0;
        if (star.y < 0) star.y = screenHeight;
        if (star.y > screenHeight) star.y = 0;

        star.element.style.transform = `translate3d(${star.x}px, ${star.y}px, 0)`;
    }

    animationFrameId = requestAnimationFrame(animateStars);
}

function startAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    setupStars();
    animateStars();
}

// -----------------------------------------------------
// LÓGICA DE DESBLOQUEIO E INICIALIZAÇÃO
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 5000);

    if (starContainer) {
        startAnimation();
        window.addEventListener('resize', startAnimation);
    }

    const form = document.getElementById('block-form');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-message-container');
    const attemptsContainer = document.getElementById('attempts-container');
    const CORRECT_PASSWORD = 'YTULA';
    let attempts = 0;

    const updateAttempts = () => {
        if (attempts > 0) {
            attemptsContainer.innerHTML = `<div class="mt-4 text-center"><p class="text-sm text-gray-400">Tentativas: <span class="font-semibold text-red-600">${attempts}</span></p></div>`;
        } else {
            attemptsContainer.innerHTML = '';
        }
    };

    const displayError = (message) => {
        errorContainer.innerHTML = `<div class="error-message"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" style="width:1rem;height:1rem;margin-right:0.5rem;"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>${message}</div>`;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value;
        passwordInput.value = '';

        if (password === CORRECT_PASSWORD) {
            const targetUrl = getTargetUrlFromQuery();
            const separator = targetUrl.includes('?') ? '&' : '?';
            const unlockUrl = `${targetUrl}${separator}unlocked=true`;
            
            document.body.innerHTML = `<div class="main-container"><div class="block-card" style="padding: 4rem;"><h2 class="text-3xl font-bold text-green-500">Acesso Liberado!</h2><p class="text-gray-400 mt-2">Redirecionando para o seu destino...</p></div></div>`;
            
            window.location.replace(unlockUrl);
        } else {
            attempts++;
            displayError('Senha incorreta. Tente novamente.');
            updateAttempts();
        }
    });
});

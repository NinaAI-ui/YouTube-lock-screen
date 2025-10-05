// -----------------------------------------------------
// FUNÇÃO PARA PEGAR O URL DE DESTINO (MANTIDA)
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
// LÓGICA DE TEMPO E RELÓGIO (MANTIDA)
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
// NOVO SISTEMA DE ANIMAÇÃO DE ESTRELAS (BASEADO EM JAVASCRIPT)
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
        // Duração e atraso do brilho ainda via CSS para simplicidade
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
            // Velocidade muito baixa para um movimento sutil
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
        });
    }
}

function animateStars() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (const star of stars) {
        // Atualiza a posição
        star.x += star.vx;
        star.y += star.vy;

        // Lógica de "wrapping": se sair da tela, volta do outro lado
        if (star.x < 0) star.x = screenWidth;
        if (star.x > screenWidth) star.x = 0;
        if (star.y < 0) star.y = screenHeight;
        if (star.y > screenHeight) star.y = 0;

        // Aplica a posição via transform (muito mais performático)
        star.element.style.transform = `translate3d(${star.x}px, ${star.y}px, 0)`;
    }

    // Continua o loop de animação
    animationFrameId = requestAnimationFrame(animateStars);
}

function startAnimation() {
    // Cancela qualquer animação anterior para evitar duplicação
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
    // Inicia o relógio
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 5000);

    // Inicia a animação das estrelas
    if (starContainer) {
        startAnimation();
        // Recria as estrelas se a janela for redimensionada
        window.addEventListener('resize', startAnimation);
    }

    // Lógica do formulário de senha (sem alterações)
    const form = document.getElementById('block-form');
    const passwordInput = document.getElementById('password');
    // ... (resto do seu código do formulário aqui, igual ao anterior) ...
});

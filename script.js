// -----------------------------------------------------
// LÓGICA DE FUNDO SIMPLIFICADA (APENAS NOITE)
// -----------------------------------------------------
function updateTimeDisplay() {
    // Converte a hora para o fuso horário de São Paulo (BRT/BRST)
    const date = new Date();
    const hourString = date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false, 
        timeZone: 'America/Sao_Paulo' 
    });
    
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.innerText = `Hora de Brasília: ${hourString}h`;
    }
}

// Chama a função imediatamente
updateTimeDisplay(); 
// Apenas atualiza o relógio a cada 5 segundos
setInterval(updateTimeDisplay, 5000); 

// -----------------------------------------------------
// LÓGICA DE DESBLOQUEIO (Mantida)
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('block-form');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-message-container');
    const attemptsContainer = document.getElementById('attempts-container');
    const CORRECT_PASSWORD = 'YTULA';
    const STORAGE_KEY = 'youtube_block_unlocked';
    let attempts = 0;

    const updateAttempts = () => {
        if (attempts > 0) {
            attemptsContainer.innerHTML = `
                <div class="mt-4 text-center">
                    <p class="text-sm text-gray-400">
                        Tentativas: <span class="font-semibold text-red-600">${attempts}</span>
                    </p>
                </div>
            `;
        } else {
            attemptsContainer.innerHTML = '';
        }
    };

    const displayError = (message) => {
        errorContainer.innerHTML = `
            <div class="error-message">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                ${message}
            </div>
        `;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value;

        if (password === CORRECT_PASSWORD) {
            localStorage.setItem(STORAGE_KEY, 'true');
            window.location.replace('https://www.youtube.com/');
        } else {
            attempts++;
            passwordInput.value = '';
            displayError('Senha incorreta. Tente novamente.');
            updateAttempts();
        }
    });
});

// -----------------------------------------------------
// LÓGICA DE GERAÇÃO E ANIMAÇÃO DE ESTRELAS (Mantida)
// -----------------------------------------------------
const starsContainer = document.getElementById('stars-container');

function generateAnimatedStars() {
    if (!starsContainer) return;
    starsContainer.innerHTML = ''; // Limpa estrelas antigas, se houver
    const starCount = 150; 
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1; // Tamanho entre 1px e 3px
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Propriedades para movimento
        const dx = (Math.random() - 0.5) * 50; 
        const dy = (Math.random() - 0.5) * 50; 
        const durationMovement = Math.random() * 30 + 20; 
        const delayMovement = Math.random() * 10; 

        // Propriedades para brilho (twinkle)
        const durationTwinkle = Math.random() * 4 + 2; 
        const delayTwinkle = Math.random() * 5; 

        star.style.cssText = `
            left: ${x}vw; 
            top: ${y}vh;
            width: ${size}px;
            height: ${size}px;
            /* Variáveis CSS para o movimento */
            --dx: ${dx}vw; 
            --dy: ${dy}vh;
            /* Animações */
            animation-duration: ${durationMovement}s, ${durationTwinkle}s;
            animation-delay: ${delayMovement}s, ${delayTwinkle}s;
        `;
        starsContainer.appendChild(star);
    }
}

// Define a animação 'twinkle' (Brilho das estrelas) globalmente (para o CSS)
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(styleSheet);


// Inicializa as estrelas animadas no carregamento
document.addEventListener('DOMContentLoaded', generateAnimatedStars);
window.addEventListener('resize', generateAnimatedStars);

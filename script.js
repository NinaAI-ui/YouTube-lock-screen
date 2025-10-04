// -----------------------------------------------------
// LÓGICA DE TROCA DE FUNDO BASEADA NA HORA (FUSO HORÁRIO BRASIL)
// -----------------------------------------------------
function updateBackground() {
    // Converte a hora para o fuso horário de São Paulo (BRT/BRST)
    const date = new Date();
    const hourString = date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false, 
        timeZone: 'America/Sao_Paulo' 
    });
    
    // Pega apenas a hora (00-23) para a lógica de fundo
    const hour = parseInt(hourString.substring(0, 2), 10);
    
    const body = document.body;
    const fancyNightSky = document.getElementById('fancy-night-sky'); // NOVO ELEMENTO
    const timeDisplay = document.getElementById('current-time');

    if (timeDisplay) {
        timeDisplay.innerText = `Hora de Brasília: ${hourString}h`;
    }

    // Remove todas as classes de fundo e esconde o céu da noite por padrão
    body.classList.remove('background-morning', 'background-day', 'background-night');
    if (fancyNightSky) {
        fancyNightSky.classList.add('hidden-sky'); 
    }

    // Lógica de tempo (Horário de São Paulo/Brasil)
    if (hour >= 5 && hour < 11) {
        // 🌅 AMANHECER (5:00h até 10:59h)
        body.classList.add('background-morning');
    } else if (hour >= 11 && hour < 18) {
        // ☀️ DIA (11:00h até 17:59h)
        body.classList.add('background-day');
    } else {
        // 🌙 NOITE (18:00h até 4:59h)
        body.classList.add('background-night');
        if (fancyNightSky) {
            fancyNightSky.classList.remove('hidden-sky'); // MOSTRA O NOVO CÉU NOTURNO
        }
    }
}

// Chama a função imediatamente
updateBackground(); 
setInterval(updateBackground, 5000); 

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
// LÓGICA DE GERAÇÃO DE ESTRELAS SIMPLES
// -----------------------------------------------------
const starsContainer = document.getElementById('stars-container');

function generateStars() {
    if (!starsContainer) return;
    const starCount = 100;
    let starsHTML = '';

    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;

        // Cria uma estrela simples com um pequeno efeito de brilho e animação
        starsHTML += `
            <div style="
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background-color: white;
                border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
                opacity: 0.8;
                animation: twinkle ${duration}s ease-in-out infinite alternate;
                animation-delay: ${delay}s;
            "></div>
        `;
    }
    starsContainer.innerHTML = starsHTML;
}

// Define a animação 'twinkle' (Brilho das estrelas) globalmente
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(styleSheet);


// Inicializa as estrelas no carregamento
document.addEventListener('DOMContentLoaded', generateStars);

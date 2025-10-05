// -----------------------------------------------------
// FUNÇÃO PARA PEGAR O URL DE DESTINO DA QUERY STRING
// -----------------------------------------------------
function getTargetUrlFromQuery() {
    const params = new URLSearchParams(window.location.search);
    let target = params.get('target');
    
    if (!target) {
        return 'https://www.youtube.com/'; 
    }
    
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
updateTimeDisplay(); 
setInterval(updateTimeDisplay, 5000); 

// -----------------------------------------------------
// LÓGICA DE GERAÇÃO E ANIMAÇÃO DE ESTRELAS (CHAMADA APENAS UMA VEZ)
// -----------------------------------------------------
function generateAnimatedStars() {
    const currentStarsContainer = document.getElementById('stars-container');

    if (!currentStarsContainer) {
        console.warn("Contêiner de estrelas não encontrado. Verifique o ID no HTML.");
        return; 
    }
    currentStarsContainer.innerHTML = ''; 
    const starCount = 150; 
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 

        // Parâmetros de Movimento
        const dx = (Math.random() - 0.5) * 50; 
        const dy = (Math.random() - 0.5) * 50; 
        const durationMovement = Math.random() * 30 + 20; // 20s a 50s
        // Atraso negativo para iniciar a animação de movimento em um ponto aleatório
        const delayMovement = -(Math.random() * durationMovement); 

        // Parâmetros de Brilho
        // Duração aleatória mais curta (5s a 15s)
        const durationTwinkle = Math.random() * 10 + 5; 
        // Atraso negativo para iniciar a animação de brilho em um ponto aleatório
        const delayTwinkle = -(Math.random() * durationTwinkle); 

        // Injetando as propriedades via variáveis CSS (Custom Properties)
        star.style.cssText = `
            left: ${x}vw; 
            top: ${y}vh;
            width: ${size}px;
            height: ${size}px;
            --dx: ${dx}vw; 
            --dy: ${dy}vh; 
            
            /* Duração e Atraso do Movimento (Negativo para iniciar em movimento) */
            --movement-duration: ${durationMovement}s;
            --movement-delay: ${delayMovement.toFixed(2)}s;
            
            /* Duração e Atraso do Brilho (Negativo para iniciar brilhando) */
            --twinkle-duration: ${durationTwinkle.toFixed(2)}s;
            --twinkle-delay: ${delayTwinkle.toFixed(2)}s;
        `;
        currentStarsContainer.appendChild(star);
    }
}

// Estilo auxiliar (mantido)
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `.text-green-500 { color: #10b981; }`;
document.head.appendChild(styleSheet);


// -----------------------------------------------------
// LÓGICA DE DESBLOQUEIO E INICIALIZAÇÃO (DOMContentLoaded)
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Lógica de Desbloqueio 
    const form = document.getElementById('block-form');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-message-container');
    const attemptsContainer = document.getElementById('attempts-container');
    const CORRECT_PASSWORD = 'YTULA';
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
        passwordInput.value = '';

        if (password === CORRECT_PASSWORD) {
            
            const targetUrl = getTargetUrlFromQuery();
            const separator = targetUrl.includes('?') ? '&' : '?';
            const unlockUrl = targetUrl + separator + 'unlocked=true';
            
            document.body.innerHTML = '<div class="main-container"><div class="block-card" style="padding: 4rem;"><h2 class="text-3xl font-bold text-green-500">Acesso Liberado!</h2><p class="text-gray-400 mt-2">Redirecionando para o seu destino...</p></div></div>';
            
            window.location.replace(unlockUrl); 

        } else {
            attempts++;
            displayError('Senha incorreta. Tente novamente.');
            updateAttempts();
        }
    });

    // Inicialização do Gerador de Estrelas
    
    // CHAMADA ÚNICA: O setInterval foi removido para evitar interrupções.
    generateAnimatedStars(); 
    
    // As estrelas são regeneradas apenas se a tela mudar de tamanho.
    window.addEventListener('resize', generateAnimatedStars);
});

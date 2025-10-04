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
    const particlesContainer = document.getElementById('particles-js');
    const timeDisplay = document.getElementById('current-time');

    if (timeDisplay) {
        timeDisplay.innerText = `Hora de Brasília: ${hourString}h`;
    }

    // Remove todas as classes de fundo
    body.classList.remove('background-morning', 'background-day', 'background-night');
    
    // Lógica de tempo (Horário de São Paulo/Brasil)
    if (hour >= 5 && hour < 11) {
        // 🌅 AMANHECER (5:00h até 10:59h)
        body.classList.add('background-morning');
        particlesContainer.style.display = 'none'; 
    } else if (hour >= 11 && hour < 18) {
        // ☀️ DIA (11:00h até 17:59h)
        body.classList.add('background-day');
        particlesContainer.style.display = 'none';
    } else {
        // 🌙 NOITE (18:00h até 4:59h)
        body.classList.add('background-night');
        // Garante que o container de partículas seja exibido à noite
        particlesContainer.style.display = 'block';
    }
}

// Chama a função imediatamente
updateBackground(); 

// Atualiza a cada 5 segundos.
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
// LÓGICA DAS PARTÍCULAS
// -----------------------------------------------------
function initializeParticles(id) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    document.getElementById(id).appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    const colors = ['#ff0000', '#93c5fd', '#a78bfa', '#fde047']; 

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5; // Raio fixo e pequeno
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            };
            this.opacity = 0.8;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); 
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
            if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;

            this.draw();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
        });
    }

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a animação de partículas
    initializeParticles('particles-js'); 
});

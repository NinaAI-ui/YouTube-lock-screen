// -----------------------------------------------------
// GERADOR DE ESTRELAS PERMANENTES
// -----------------------------------------------------
function createStarElement() {
    const star = document.createElement('div');
    star.className = 'star';

    const size = Math.random() * 2 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Movimento suave
    const dx = (Math.random() - 0.5) * 50;
    const dy = (Math.random() - 0.5) * 50;
    const durationMovement = Math.random() * 30 + 20;
    const delayMovement = -(Math.random() * durationMovement);

    // Brilho variável
    const durationTwinkle = Math.random() * 20 + 5;
    const delayTwinkle = -(Math.random() * durationTwinkle);

    star.style.cssText = `
        left: ${x}vw;
        top: ${y}vh;
        width: ${size}px;
        height: ${size}px;
        --dx: ${dx}vw;
        --dy: ${dy}vh;
        --movement-duration: ${durationMovement}s;
        --movement-delay: ${delayMovement.toFixed(2)}s;
        --twinkle-duration: ${durationTwinkle.toFixed(2)}s;
        --twinkle-delay: ${delayTwinkle.toFixed(2)}s;
        opacity: 0;
        transition: opacity 3s ease;
    `;

    return star;
}

function generateAnimatedStars(initial = false) {
    const container = document.getElementById('stars-container');
    if (!container) return;

    // quantidade alvo
    const starCount = 150;

    if (initial) {
        for (let i = 0; i < starCount; i++) {
            const star = createStarElement();
            container.appendChild(star);
            requestAnimationFrame(() => {
                star.style.opacity = 1;
            });
        }
        return;
    }

    // adicionar de forma contínua, removendo suavemente as antigas
    const current = container.querySelectorAll('.star');
    const extras = 10;

    for (let i = 0; i < extras; i++) {
        const star = createStarElement();
        container.appendChild(star);
        requestAnimationFrame(() => (star.style.opacity = 1));
    }

    // se passou do limite, apagar as mais antigas suavemente
    if (current.length > starCount) {
        const excess = current.length - starCount;
        for (let i = 0; i < excess; i++) {
            const old = current[i];
            old.style.transition = 'opacity 3s ease';
            old.style.opacity = 0;
            setTimeout(() => old.remove(), 3000);
        }
    }
}

// -----------------------------------------------------
// INICIALIZAÇÃO AUTOMÁTICA
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    generateAnimatedStars(true);
    // a cada 10s, repõe pequenas quantidades
    setInterval(() => generateAnimatedStars(false), 10000);
});

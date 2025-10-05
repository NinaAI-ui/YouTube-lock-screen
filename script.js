// -----------------------------------------------------
// GERADOR DE ESTRELAS SUAVE E RENOVÁVEL
// -----------------------------------------------------
function generateAnimatedStars(initial = false) {
    const container = document.getElementById('stars-container');
    if (!container) return;

    const existingStars = container.querySelectorAll('.star');
    const starCount = 150;

    // Criar estrelas adicionais apenas se ainda houver espaço
    const starsToAdd = initial ? starCount : 10;
    const starsToRemove = existingStars.length + starsToAdd - starCount;

    // Remover o excesso de estrelas mais antigas se precisar
    if (starsToRemove > 0) {
        for (let i = 0; i < starsToRemove; i++) {
            if (existingStars[i]) existingStars[i].remove();
        }
    }

    // Adicionar novas estrelas
    for (let i = 0; i < starsToAdd; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Movimento
        const dx = (Math.random() - 0.5) * 50;
        const dy = (Math.random() - 0.5) * 50;
        const durationMovement = Math.random() * 30 + 20;
        const delayMovement = -(Math.random() * durationMovement);

        // Brilho
        const TWINKLE_DURATION = 60;
        const durationTwinkle = Math.random() * 10 + 5; // mais variado
        const delayTwinkle = -(Math.random() * TWINKLE_DURATION);

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

        container.appendChild(star);

        // Aparição gradual
        requestAnimationFrame(() => {
            star.style.opacity = 1;
        });
    }
}

// -----------------------------------------------------
// INICIALIZAÇÃO
// -----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    generateAnimatedStars(true);

    // a cada 10 segundos, renovar parcialmente
    setInterval(() => generateAnimatedStars(false), 10000);
});

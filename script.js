// -----------------------------------------------------
// LÓGICA DE GERAÇÃO E ANIMAÇÃO DE ESTRELAS (O GERADOR)
// -----------------------------------------------------

function generateAnimatedStars() {
    const currentStarsContainer = document.getElementById('stars-container');
    // ... (rest of the check) ...
    currentStarsContainer.innerHTML = ''; 
    const starCount = 150; 
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1; 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 

        // Parâmetros de Movimento e Atraso (serão injetados como variáveis CSS)
        const dx = (Math.random() - 0.5) * 50; 
        const dy = (Math.random() - 0.5) * 50; 
        const durationMovement = Math.random() * 30 + 20; // 20s a 50s
        const delayMovement = Math.random() * 10; 

        // Parâmetros de Brilho
        // NOVO CÁLCULO: Inicia a animação no meio do ciclo (30s) com um atraso negativo
        // para que a estrela comece visível, mas ainda tenha um atraso aleatório para parecer natural.
        const TWINKLE_DURATION = 60; // 60 segundos (de style.css)
        const startVisibleDelay = -(TWINKLE_DURATION / 2); // -30 segundos
        
        // Atraso de brilho (aleatório) adicionado ao atraso inicial
        const delayTwinkle = (Math.random() * 5) + startVisibleDelay; 

        // Injetando as propriedades via variáveis CSS (Custom Properties)
        star.style.cssText = `
            left: ${x}vw; 
            top: ${y}vh;
            width: ${size}px;
            height: ${size}px;
            --dx: ${dx}vw; 
            --dy: ${dy}vh; 
            
            /* Duração e Atraso do Movimento */
            --movement-duration: ${durationMovement}s;
            --movement-delay: ${delayMovement}s;
            
            /* Atraso do Brilho: INICIA NO MEIO DO CICLO (-30s) + um atraso aleatório */
            --twinkle-delay: ${delayTwinkle.toFixed(2)}s;
        `;
        currentStarsContainer.appendChild(star);
    }
}
// ... (o resto do código do script.js, com o intervalo de 40000ms, permanece o mesmo) ...

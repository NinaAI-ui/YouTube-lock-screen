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
        // ❌ REMOVIDO: body.style.color = '#333'; (O CSS AGORA FAZ ISSO)
    } else if (hour >= 11 && hour < 18) {
        // ☀️ DIA (11:00h até 17:59h)
        body.classList.add('background-day');
        particlesContainer.style.display = 'none';
        // ❌ REMOVIDO: body.style.color = '#333'; (O CSS AGORA FAZ ISSO)
    } else {
        // 🌙 NOITE (18:00h até 4:59h)
        body.classList.add('background-night');
        particlesContainer.style.display = 'block';
        // ❌ REMOVIDO: body.style.color = '#e0e0e0'; (O CSS AGORA FAZ ISSO)
    }
}
// ... O RESTANTE DO JS PERMANECE IGUAL ...

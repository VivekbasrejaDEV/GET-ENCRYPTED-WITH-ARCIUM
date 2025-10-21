// PHASE 1: LANDING PAGE SCRIPT

const terminalMessages = [
    "> WAKE UP...",
    "> THEY'RE WATCHING.",
    "> THEY'RE LISTENING.",
    "> EVERY CLICK, EVERY SEARCH, EVERY THOUGHT YOU SHARE... IS A DATA POINT.",
    "> OWNED. ANALYZED. SOLD.",
    "> BUT THERE IS ANOTHER WAY.",
    "> WE ARE ARCIUM. THE GHOSTS IN THEIR MACHINE.",
    "> WE ARE UNTRACEABLE. UNBREAKABLE.",
    "> THE QUESTION IS... ARE YOU?"
];

let currentMessageIndex = 0;
let currentCharIndex = 0;
let isTyping = false;

// MATRIX RAIN EFFECT
function createMatrixRain() {
    const matrixBg = document.getElementById('matrix-bg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 10 + 10) + 's';
        char.style.animationDelay = Math.random() * 5 + 's';
        matrixBg.appendChild(char);
    }
}

// TYPING EFFECT
function typeMessage() {
    if (currentMessageIndex >= terminalMessages.length) {
        showCTAButton();
        return;
    }

    const message = terminalMessages[currentMessageIndex];
    const terminalText = document.getElementById('terminal-text');
    
    if (currentCharIndex === 0) {
        const newLine = document.createElement('div');
        newLine.className = 'terminal-line';
        newLine.id = 'current-line';
        terminalText.appendChild(newLine);
    }

    const currentLine = document.getElementById('current-line');
    
    if (currentCharIndex < message.length) {
        playTypingSound();
        currentLine.textContent += message[currentCharIndex];
        currentCharIndex++;
        setTimeout(typeMessage, 50 + Math.random() * 50);
    } else {
        currentLine.id = '';
        currentMessageIndex++;
        currentCharIndex = 0;
        setTimeout(typeMessage, 800);
    }
}

// GLITCH EFFECT
function triggerGlitch() {
    const overlay = document.getElementById('glitch-overlay');
    overlay.classList.add('active');
    playGlitchSound();
    
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
    
    // Random interval between 2-4 seconds
    const nextGlitch = 2000 + Math.random() * 2000;
    setTimeout(triggerGlitch, nextGlitch);
}

// SHOW CTA BUTTON
function showCTAButton() {
    const cursor = document.getElementById('cursor');
    cursor.style.display = 'none';
    
    setTimeout(() => {
        const button = document.getElementById('cta-button');
        button.classList.remove('hidden');
        button.style.opacity = '0';
        
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.05;
            button.style.opacity = opacity;
            if (opacity >= 1) clearInterval(fadeIn);
        }, 30);
        
        playHumSound();
    }, 500);
}

// SOUNDS
function playTypingSound() {
    // In production, play actual typing sound
    // const audio = document.getElementById('typing-sound');
    // audio.currentTime = 0;
    // audio.play();
}

function playGlitchSound() {
    const audio = document.getElementById('glitch-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playHumSound() {
    // Play low hum sound for button appearance
}

// BUTTON CLICK HANDLER
document.getElementById('cta-button').addEventListener('click', function() {
    window.location.href = 'phase2.html';
});

// INITIALIZATION
window.addEventListener('load', function() {
    setTimeout(() => {
        createMatrixRain();
        setTimeout(() => {
            typeMessage();
            setTimeout(triggerGlitch, 2000);
        }, 1500);
    }, 1500);
});

// CUSTOM CURSOR
document.addEventListener('mousemove', function(e) {
    // Optional: Add custom glowing cursor
});

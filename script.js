const giantPoop = document.querySelector('.giant-poop');
const poopStatus = document.getElementById('poopStatus');
const tickleMeterFill = document.getElementById('tickleMeterFill');

let tickleLevel = 0;
let recentTickles = 0;
let calmTimeout;
let lastTouchAt = 0;

const statusLines = {
    calm: ['Tickle me gently!', 'Pat my head!', 'Hehe, say hi!'],
    happy: ['Hehe!', 'That tickles!', 'Eee! So silly!'],
    laugh: ['HAHAHA!', 'Stop, that is funny!', 'I cannot stop giggling!'],
    cry: ['Waaaah!', 'Too much tickling!', 'My tiny poop feelings!']
};

function setMood(mood) {
    giantPoop.classList.remove('mood-happy', 'mood-laugh', 'mood-cry');

    if (mood === 'laugh') {
        giantPoop.classList.add('mood-laugh');
    } else if (mood === 'cry') {
        giantPoop.classList.add('mood-cry');
    } else {
        giantPoop.classList.add('mood-happy');
    }
}

function pickLine(type) {
    const lines = statusLines[type];
    return lines[Math.floor(Math.random() * lines.length)];
}

function updateMeter() {
    tickleMeterFill.style.width = `${Math.max(0, Math.min(100, tickleLevel))}%`;
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: sparkle-fly 0.6s ease-out forwards;
        `;
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 600);
    }
}

function createTicklePop(x, y, mood) {
    const pop = document.createElement('div');
    pop.className = 'tickle-pop';
    pop.textContent = mood === 'cry' ? '😭' : mood === 'laugh' ? '😂' : '😆';
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

function evaluateMood() {
    if (recentTickles >= 8 || tickleLevel >= 75) return 'cry';
    if (recentTickles >= 4 || tickleLevel >= 35) return 'laugh';
    return 'happy';
}

function resetCalmTimer() {
    clearTimeout(calmTimeout);
    calmTimeout = setTimeout(() => {
        poopStatus.textContent = pickLine('calm');
    }, 1600);
}

function handleTickle(x, y) {
    tickleLevel = Math.min(100, tickleLevel + 14);
    recentTickles += 1;
    updateMeter();

    setTimeout(() => {
        recentTickles = Math.max(0, recentTickles - 1);
    }, 1200);

    const mood = evaluateMood();
    setMood(mood);
    poopStatus.textContent = pickLine(mood);

    createTicklePop(x, y, mood);
    resetCalmTimer();
}

// Add sparkle effects for mouse and touch users on doors
for (const door of document.querySelectorAll('.door')) {
    door.addEventListener('mouseenter', () => createSparkles(door));
    door.addEventListener('touchstart', () => createSparkles(door), { passive: true });
}

// Tickle interaction for face/body only
function onPoopInteract(event) {
    if (event.target.closest('.door')) return;
    if (event.type === 'click' && Date.now() - lastTouchAt < 450) return;

    const isTouch = event.touches && event.touches[0];
    if (isTouch) lastTouchAt = Date.now();
    const x = isTouch ? event.touches[0].clientX : event.clientX;
    const y = isTouch ? event.touches[0].clientY : event.clientY;
    handleTickle(x, y);
}

giantPoop.addEventListener('click', onPoopInteract);
giantPoop.addEventListener('touchstart', onPoopInteract, { passive: true });

// Calm down slowly over time
setInterval(() => {
    if (tickleLevel <= 0) return;

    tickleLevel = Math.max(0, tickleLevel - 2.2);
    updateMeter();

    if (tickleLevel < 35 && recentTickles < 4) {
        setMood('happy');
    }

    if (tickleLevel === 0 && recentTickles === 0) {
        setMood('happy');
        poopStatus.textContent = pickLine('calm');
    }
}, 250);

// Add sparkle animation once
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fly {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

setMood('happy');
updateMeter();
console.log('%c Welcome to Poop World! ', 'background: #8B4513; color: #FFD700; font-size: 20px; padding: 10px; border-radius: 10px;');

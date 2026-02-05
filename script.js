// Add sparkle effects when hovering doors
document.querySelectorAll('.door').forEach(door => {
    door.addEventListener('mouseenter', () => {
        createSparkles(door);
    });
});

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

// Add sparkle animation
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

// Add a fun welcome message
console.log('%c Welcome to Poop World! ', 'background: #8B4513; color: #FFD700; font-size: 20px; padding: 10px; border-radius: 10px;');

// Make the poop wiggle when clicked
document.querySelector('.giant-poop').addEventListener('click', (e) => {
    if (e.target.closest('.door')) return; // Don't wiggle when clicking doors

    const poop = document.querySelector('.giant-poop');
    poop.style.animation = 'wiggle 0.5s ease-in-out';

    setTimeout(() => {
        poop.style.animation = '';
    }, 500);
});

// Add wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(wiggleStyle);

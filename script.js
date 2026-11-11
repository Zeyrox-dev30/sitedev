// 1. Effet machine à écrire futuriste dans le titre
const phrases = [
    "du Web et du Mobile.",
    "des Applications Android.",
    "de l'Éducation Numérique."
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeEffect() {
    const target = document.getElementById("typed-text");
    if (!target) return;

    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        target.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        target.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 45 : 95;

    if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 1800; // Pause une fois le mot écrit
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// 2. Animation des compteurs de statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = Math.ceil(target / 40);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = current + (target === 100 ? "%" : "+");
                setTimeout(updateCounter, 35);
            } else {
                counter.innerText = target + (target === 100 ? "%" : "+");
            }
        };
        updateCounter();
    });
}

// 3. Réseau de particules lumineuses en arrière-plan
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 55; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 240, 255, 0.6)";

    particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Relier les particules proches par un trait néon subtil
        for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 - dist / 800})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(drawParticles);
}

// 4. Fenêtre modale d'aperçu
function openPreview() {
    document.getElementById('preview-modal').classList.add('active');
}
function closePreview() {
    document.getElementById('preview-modal').classList.remove('active');
}

// Démarrage des animations
window.onload = function() {
    typeEffect();
    animateCounters();
    drawParticles();
};

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // Intro Loader Handling with Progress Bar Count (0% to 100%)
    const loader = document.getElementById("intro-loader");
    const loaderBar = document.getElementById("loaderBar");
    const loaderPercent = document.getElementById("loaderPercent");

    let progress = 0;
    const duration = 2200; // total duration in ms
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const progressInterval = setInterval(() => {
        progress += step;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            loaderBar.style.width = `100%`;
            loaderPercent.textContent = `100%`;

            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
                typeEffect();
            }, 300);
        } else {
            loaderBar.style.width = `${Math.floor(progress)}%`;
            loaderPercent.textContent = `${Math.floor(progress)}%`;
        }
    }, intervalTime);

    // Fast 60FPS Reveal Animations
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
        const heading = section.querySelector('.center-heading');
        if (heading) {
            gsap.fromTo(heading, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    const cardGroups = [
        '.about-card',
        '.ticker-wrapper',
        '.projects-grid .project-card',
        '.video-section-container',
        '.contact-form',
        '.social-card'
    ];

    cardGroups.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.fromTo(elements,
                { opacity: 0, y: 35, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elements[0],
                        start: "top 88%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Active Nav Item Tracker
    const navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Typewriter Function
const roles = ["I'm a Frontend Developer", "I'm an AI Engineer", "I'm a Video Editor"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Background Matrix Canvas Animation
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
});

const nodes = [];
for (let i = 0; i < 45; i++) {
    nodes.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
    });
}

function drawBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = '#d4a373';
    bgCtx.strokeStyle = 'rgba(212, 163, 115, 0.08)';

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        if (nodes[i].x < 0 || nodes[i].x > bgCanvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > bgCanvas.height) nodes[i].vy *= -1;

        bgCtx.beginPath();
        bgCtx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        bgCtx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < 120) {
                bgCtx.beginPath();
                bgCtx.moveTo(nodes[i].x, nodes[i].y);
                bgCtx.lineTo(nodes[j].x, nodes[j].y);
                bgCtx.stroke();
            }
        }
    }
    requestAnimationFrame(drawBackground);
}
drawBackground();
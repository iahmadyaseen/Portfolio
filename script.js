gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // DARK / LIGHT MODE THEME SWITCHER LOGIC
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIcon = document.getElementById("themeIcon");

    // Check system or saved preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");

        if (isLight) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("portfolio-theme", "light");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("portfolio-theme", "dark");
        }
    });

    // Intro Loader Handling
    const loader = document.getElementById("intro-loader");
    const loaderBar = document.getElementById("loaderBar");
    const loaderPercent = document.getElementById("loaderPercent");

    let progress = 0;
    const duration = 2000;
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

    // Reveal Animations
    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
        const heading = section.querySelector('.center-heading');
        if (heading) {
            gsap.fromTo(heading, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
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

    // 60FPS Smooth Slide-In Animations for Both 2-Box Grids
    const twoBoxGrids = document.querySelectorAll('.two-box-grid');
    twoBoxGrids.forEach(grid => {
        const leftBox = grid.querySelector('.animate-from-left');
        const rightBox = grid.querySelector('.animate-from-right');

        if (leftBox) {
            gsap.fromTo(leftBox,
                { opacity: 0, x: -80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (rightBox) {
            gsap.fromTo(rightBox,
                { opacity: 0, x: 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Stagger animation for Other Cards
    const cardGroups = ['.about-card', '.ticker-wrapper', '.tiktok-header', '.contact-form', '.social-card'];
    cardGroups.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
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

// FASTER TYPEWRITER FUNCTION
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

    // Faster speeds (35ms typing, 18ms deleting)
    let typeSpeed = isDeleting ? 18 : 35;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1200; // Pause at full text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 250;
    }

    setTimeout(typeEffect, typeSpeed);
}

// ENHANCED MATRIX BACKGROUND CANVAS WITH HIGHER LINE VISIBILITY
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
});

const nodes = [];
for (let i = 0; i < 50; i++) {
    nodes.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8
    });
}

function drawBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    
    // Check active theme color for background lines & dots
    const isLight = document.body.classList.contains('light-theme');
    const nodeColor = isLight ? '#b87333' : '#d4a373';
    
    bgCtx.fillStyle = nodeColor;

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        if (nodes[i].x < 0 || nodes[i].x > bgCanvas.width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > bgCanvas.height) nodes[i].vy *= -1;

        bgCtx.beginPath();
        bgCtx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        bgCtx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            
            if (dist < 140) {
                // Increased line visibility (opacity & width)
                const alpha = (1 - dist / 140) * 0.35; 
                bgCtx.strokeStyle = isLight 
                    ? `rgba(184, 115, 51, ${alpha})` 
                    : `rgba(212, 163, 115, ${alpha})`;
                bgCtx.lineWidth = 1.2;

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
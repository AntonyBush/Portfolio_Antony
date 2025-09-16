// One Piece Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initParticles();
    initTypingEffect();
    initFormHandling();
    initScrollIndicator();
    initLoadingScreen();
    initSmoothScrolling();
    initNavbarScroll();
    initParallaxEffect();
    initCounterAnimations();
    // Theme toggle removed - dark mode only
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
        .about-card,
        .experience-card,
        .skill-category,
        .education-card,
        .project-card,
        .contact-card,
        .message-form,
        .stat-item
    `);

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        if (index % 2 === 0) {
            content.classList.add('slide-in-left');
        } else {
            content.classList.add('slide-in-right');
        }
        observer.observe(content);
    });
}

// Particle effect for hero section
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #FFD700, transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s infinite ease-in-out;
        opacity: ${Math.random() * 0.7 + 0.3};
    `;
    
    container.appendChild(particle);

    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, duration * 1000);
}

// Typing effect for hero title
function initTypingEffect() {
    const titleElement = document.querySelector('.title-line');
    if (!titleElement) return;

    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid #FFD700';
    
    let index = 0;
    const typeSpeed = 100;

    function typeWriter() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.message-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:antonybush95@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Message prepared! Your email client should open shortly.', 'success');
        
        // Reset form
        form.reset();
    });

    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Hide scroll indicator when user scrolls
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Loading screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-thunderbolt"></div>
            <div class="loading-text">Initializing System...</div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Format the number with appropriate suffix
                    const text = counter.textContent;
                    if (text.includes('%')) {
                        counter.textContent = Math.floor(current) + '%';
                    } else if (text.includes('M+')) {
                        counter.textContent = Math.floor(current) + 'M+';
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 20);

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
    }
    
    .particles div {
        animation: float var(--duration) infinite ease-in-out !important;
    }
    
    .skill-item:hover {
        animation: bounce 0.5s ease;
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .project-card:hover .project-title {
        animation: glow 1s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { text-shadow: 0 0 5px #DC143C; }
        to { text-shadow: 0 0 20px #DC143C, 0 0 30px #DC143C; }
    }
`;
document.head.appendChild(style);

// Easter eggs for One Piece fans
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create Luffy's hat falling animation
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFallingHat();
        }, i * 200);
    }
    
    showNotification("🏴‍☠️ You found the secret! Welcome to the crew! 🏴‍☠️", 'success');
    
    // Play One Piece sound effect (if available)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMbBDuX4vLGdSAFLIHO8tiJOQgZaLvt559NEAxPqOPwtmMcBjiR2O7Dcy4FJHfH8N2QQAoUXrTp66hVFApGn+DyvmMbBDuX4vLGdSAFLYDM9tiIOQgZZ7zr559NEAxPpuTvt2UdBjuR2O7DdC4FJHbJ8N2QQAoUXrTp66hVFApGnt/yvmMbBDuY4vLGdSAFLYDM9tiIOQgZZ7zr559NEAxOpuTvt2UdBjuR2O7DdC4FJHbJ8N2QQAoUXrTp66hVFApGnt/yv2MbBDuY4vLGdSAFLYDM9tiIOQgZZ7zr559OEAxOpuTvt2UdBjuR2O7DdC4FJHbJ8N2QQAoUXrTp66hVFApGnt/yv2MbBDuY4vLGdSAF');
        audio.play().catch(() => {});
    } catch (e) {}
}

function createFallingHat() {
    const hat = document.createElement('div');
    hat.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * window.innerWidth}px;
        width: 40px;
        height: 40px;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23D2B48C"/><circle cx="50" cy="50" r="35" fill="%23F4A460"/><rect x="20" y="45" width="60" height="10" fill="%23DC143C"/></svg>') center/contain no-repeat;
        z-index: 10000;
        pointer-events: none;
        animation: fall 3s linear forwards;
    `;
    
    document.body.appendChild(hat);
    
    setTimeout(() => {
        hat.remove();
    }, 3000);
}

// Add fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(fallStyle);

// Theme toggle functionality removed - dark mode only

// Add some fun interactions
document.addEventListener('click', function(e) {
    // Create ripple effect on click
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

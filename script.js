// Initialization Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const initScreen = document.querySelector('.init-screen');
    const progressBar = document.querySelector('.init-progress-bar');
    const initText = document.querySelector('.init-text');
    const messages = [
        'Initializing Security Protocol',
        'Verifying Token Integrity',
        'Establishing Secure Connection',
        'Loading Security Modules',
        'Preparing Authentication System'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    function updateProgress() {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        // Update message every 20% progress
        if (progress >= (messageIndex + 1) * 20 && messageIndex < messages.length - 1) {
            messageIndex++;
            initText.textContent = messages[messageIndex];
        }
        
        if (progress < 100) {
            setTimeout(updateProgress, 200);
        } else {
            // Add a small delay before hiding the init screen
            setTimeout(() => {
                initScreen.classList.add('hidden');
                // Enable scrolling after init screen is hidden
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }
    
    // Disable scrolling during initialization
    document.body.style.overflow = 'hidden';
    
    // Start the initialization process
    setTimeout(updateProgress, 500);
});

// Mobile Menu Toggle with Enhanced Animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav links with staggered delay
    const links = navLinks.querySelectorAll('a');
    if (isMenuOpen) {
        links.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
    } else {
        links.forEach((link) => {
            link.style.transitionDelay = '0s';
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-container')) {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        const links = navLinks.querySelectorAll('a');
        links.forEach((link) => {
            link.style.transitionDelay = '0s';
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
        });
    }
});

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (isMenuOpen) {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                const links = navLinks.querySelectorAll('a');
                links.forEach((link) => {
                    link.style.transitionDelay = '0s';
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                });
            }
        }
    });
});

// Enhanced Scroll Animation with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add appropriate animation class based on element type
            if (element.classList.contains('token-card')) {
                element.classList.add('slide-in-left');
            } else if (element.classList.contains('article-card')) {
                element.classList.add('slide-in-right');
            } else {
                element.classList.add('fade-in');
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .token-card, .article-card').forEach(element => {
    observer.observe(element);
});

// Enhanced Navbar Scroll Behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scroll progress bar
    const scrollProgress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.scroll-progress').style.width = `${scrollProgress}%`;
    
    // Handle navbar visibility
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up', 'scroll-down');
        return;
    }
    
    clearTimeout(scrollTimeout);
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Enhanced Animation on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll progress bar to DOM
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Animate hero elements with staggered delay
    const heroElements = document.querySelectorAll('.hero h1, .hero .subtitle, .hero-icons i');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('fade-in');
    });
    
    // Add hover effect to token cards
    document.querySelectorAll('.token-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            const links = navLinks.querySelectorAll('a');
            links.forEach((link) => {
                link.style.transitionDelay = '0s';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            });
        }
    }, 250);
});

// Floating Shield Button Modal Logic
const openShieldModal = document.getElementById('openShieldModal');
const shieldModal = document.getElementById('shieldModal');
const closeShieldModal = document.getElementById('closeShieldModal');

if (openShieldModal && shieldModal && closeShieldModal) {
    openShieldModal.addEventListener('click', () => {
        shieldModal.classList.add('active');
    });
    closeShieldModal.addEventListener('click', () => {
        shieldModal.classList.remove('active');
    });
    shieldModal.addEventListener('click', (e) => {
        if (e.target === shieldModal) {
            shieldModal.classList.remove('active');
        }
    });
}

// 3D Tilt Animation for Discussion Token Cards
const discussionCards = document.querySelectorAll('.token-comparison .token-card');
discussionCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        card.classList.add('tilt');
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.classList.remove('tilt');
    });
});

// Make Floating Shield Button Movable
(function() {
    const btn = document.getElementById('openShieldModal');
    if (!btn) return;
    let isDragging = false, offsetX = 0, offsetY = 0;
    let startX, startY;
    let lastX = window.innerWidth - 96, lastY = window.innerHeight - 96;
    let isCustomPosition = false;

    function setPosition(x, y) {
        btn.style.right = 'auto';
        btn.style.bottom = 'auto';
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    }

    function resetPosition() {
        btn.style.left = 'auto';
        btn.style.top = 'auto';
        btn.style.right = '32px';
        btn.style.bottom = '32px';
        isCustomPosition = false;
    }

    function onMouseDown(e) {
        isDragging = true;
        isCustomPosition = true;
        btn.classList.add('dragging');
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        const rect = btn.getBoundingClientRect();
        offsetX = startX - rect.left;
        offsetY = startY - rect.top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove, {passive:false});
        document.addEventListener('touchend', onMouseUp);
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        let clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        let x = clientX - offsetX;
        let y = clientY - offsetY;
        // Clamp to viewport
        x = Math.max(8, Math.min(window.innerWidth - btn.offsetWidth - 8, x));
        y = Math.max(8, Math.min(window.innerHeight - btn.offsetHeight - 8, y));
        setPosition(x, y);
        lastX = x; lastY = y;
        e.preventDefault();
    }

    function onMouseUp() {
        isDragging = false;
        btn.classList.remove('dragging');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
    }

    btn.addEventListener('mousedown', onMouseDown);
    btn.addEventListener('touchstart', onMouseDown, {passive:false});

    // On resize, handle position based on screen size
    window.addEventListener('resize', () => {
        if (!isCustomPosition) {
            resetPosition();
        } else {
            // If button was manually positioned, keep it in view
            lastX = Math.max(8, Math.min(window.innerWidth - btn.offsetWidth - 8, lastX));
            lastY = Math.max(8, Math.min(window.innerHeight - btn.offsetHeight - 8, lastY));
            setPosition(lastX, lastY);
        }
    });
})(); 
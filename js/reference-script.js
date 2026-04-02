// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced navbar scroll effect with hide/show
const nav = document.querySelector('.nav');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Update shadow
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    clearTimeout(scrollTimeout);
    
    if (currentScroll > lastScroll && currentScroll > 200) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    
    scrollTimeout = setTimeout(() => {
        nav.classList.remove('hidden');
    }, 1000);
    
    lastScroll = currentScroll;
});

// Advanced Intersection Observer with stagger effect
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation with stagger
const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat');
animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
    observer.observe(el);
});

// Parallax effect for scroll indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - scrolled / 500);
        const translateY = scrolled * 0.5;
        scrollIndicator.style.opacity = opacity;
        scrollIndicator.style.transform = `translate(-50%, ${translateY}px)`;
    }
});

// Mouse move parallax effect for hero
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
        }
    });
}

// Project images - removed tilt effect
// Images are now static, only grayscale to color transition on hover

// Smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateX(-50px)';
    title.style.transition = 'opacity 1s ease, transform 1s ease';
    titleObserver.observe(title);
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-3px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Cursor trail effect (optional - subtle)
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Smooth page load animation
// Removed duplicate - handled by loading screen

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--black)';
        }
    });
});

// Performance optimization - throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Additional scroll effects can go here
}, 100);

window.addEventListener('scroll', throttledScroll);

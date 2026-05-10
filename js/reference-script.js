// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to sections
    const sections = document.querySelectorAll('section, .project-card, .skill-category');
    sections.forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });

    // Magnetic Button Effect for CTA links
    const ctaLinks = document.querySelectorAll('.cta-link');
    ctaLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0px, 0px)';
        });
    });
});

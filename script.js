// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu
            document.querySelector('.nav-links')?.classList.remove('open');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    });
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

// Typing effect
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
    const words = ['Control Systems', 'Robotics', 'AUV Research', 'Haptic Systems'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const current = words[wordIndex];
        typingEl.textContent = isDeleting 
            ? current.substring(0, charIndex--) 
            : current.substring(0, charIndex++);
        
        if (!isDeleting && charIndex > current.length) {
            setTimeout(() => { isDeleting = true; type(); }, 2000);
            return;
        }
        if (isDeleting && charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
}

// Animate language bars on scroll
const langBars = document.querySelectorAll('.lang-bar-fill');
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            langObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
langBars.forEach(bar => {
    bar.dataset.width = bar.style.width;
    bar.style.width = '0';
    langObserver.observe(bar);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.style.color = (scrollY >= top && scrollY < top + height) 
                ? 'var(--primary)' : '';
        }
    });
});

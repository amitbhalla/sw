// Animation functionality for Saurav Wadhwa's website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add scroll animations
    window.addEventListener('scroll', animateOnScroll);
});

// Initialize animations
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        element.classList.add(`animate-${animationType}`);
        element.style.animationDelay = `${delay}s`;
    });
}

// Animate elements when scrolled into view
function animateOnScroll() {
    const scrollAnimElements = document.querySelectorAll('[data-scroll-animate]');
    
    scrollAnimElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (elementTop < windowHeight * 0.9) {
            const animationType = element.getAttribute('data-scroll-animate');
            element.classList.add(`animate-${animationType}`);
        }
    });
}

// Apply number counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, 16);
}

// Initialize counters when in viewport
function initCounters() {
    const counterElements = document.querySelectorAll('[data-counter]');
    
    counterElements.forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(element.getAttribute('data-counter'));
                    animateCounter(element, target);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
}

// Call additional animation initializations
document.addEventListener('DOMContentLoaded', function() {
    initCounters();
    initParallax();
});
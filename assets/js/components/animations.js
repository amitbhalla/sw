/**
 * Animations Component
 * Handles custom animations and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations once content is loaded
    window.addEventListener('load', () => {
        initTextAnimations();
        initHoverAnimations();
        initScrollAnimations();
        initPreloaderAnimation();
    });
});

/**
 * Initialize text animations (typing, reveal effects)
 */
function initTextAnimations() {
    // Text reveal animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Split text into words and wrap each word in a span
        const words = heroTitle.textContent.split(' ');
        heroTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.opacity = '0';
            wordSpan.style.transform = 'translateY(20px)';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            wordSpan.style.transitionDelay = `${index * 0.1}s`;
            
            heroTitle.appendChild(wordSpan);
            
            // Trigger animation after a short delay
            setTimeout(() => {
                wordSpan.style.opacity = '1';
                wordSpan.style.transform = 'translateY(0)';
            }, 500);
        });
    }
    
    // Highlight text animation
    document.querySelectorAll('.highlight').forEach(element => {
        // Add pulsing animation to highlight
        gsap.to(element, {
            backgroundSize: '100% 40%',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    });
}

/**
 * Initialize hover animations
 */
function initHoverAnimations() {
    // Expertise item hover effect
    document.querySelectorAll('.expertise-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.expertise-icon'), {
                y: -10,
                scale: 1.1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.expertise-icon'), {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });
    
    // Article card hover effect
    document.querySelectorAll('.article-card').forEach(card => {
        const image = card.querySelector('img');
        if (!image) return;
        
        card.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
    });
    
    // Button hover effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                y: -5,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                duration: 0.3
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                y: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
    });
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Parallax scrolling for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= window.innerHeight) {
                const translateY = scrollPosition * 0.4;
                heroSection.style.backgroundPositionY = `-${translateY}px`;
            }
        });
    }
    
    // Reveal animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Staggered animation for expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');
    if (expertiseItems.length > 0) {
        gsap.from(expertiseItems, {
            scrollTrigger: {
                trigger: '.expertise-grid',
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
}

/**
 * Initialize preloader animation
 */
function initPreloaderAnimation() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Animate logo path
    const logoPath = document.querySelector('.logo-path');
    if (logoPath) {
        gsap.from(logoPath, {
            strokeDashoffset: 300,
            duration: 2,
            ease: "power3.out"
        });
    }
    
    // Hide preloader after loading is complete
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    }, 2500);
}

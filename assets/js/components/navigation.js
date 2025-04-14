/**
 * Navigation Component
 * Handles smooth scrolling and navigation functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initMobileMenu();
    initScrollSpy();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    // Get all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if link is just "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            // Get header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Toggle menu icon animation
        const spans = menuToggle.querySelectorAll('span');
        
        if (menuToggle.classList.contains('active')) {
            // Animate to X
            gsap.to(spans[0], {
                rotation: 45,
                y: 7,
                duration: 0.3
            });
            
            gsap.to(spans[1], {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(spans[2], {
                rotation: -45,
                y: -7,
                duration: 0.3
            });
        } else {
            // Reset to hamburger
            gsap.to(spans[0], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
            
            gsap.to(spans[1], {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(spans[2], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        }
    });
    
    // Close menu when clicking nav items
    const navItems = nav.querySelectorAll('.nav-item a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            
            gsap.to(spans[0], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
            
            gsap.to(spans[1], {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(spans[2], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)
        ) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            
            gsap.to(spans[0], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
            
            gsap.to(spans[1], {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(spans[2], {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        }
    });
}

/**
 * Initialize scroll spy for navigation highlighting
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item a');
    
    if (sections.length === 0 || navItems.length === 0) return;
    
    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize active state based on current position
    window.dispatchEvent(new Event('scroll'));
}

/**
 * Testimonials Slider Component
 * Handles the testimonials swiper slider functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonials slider once content is loaded
    window.addEventListener('load', initTestimonialsSlider);
});

/**
 * Initialize testimonials slider
 */
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (!testimonialsSlider) return;
    
    // Create swiper instance
    const swiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        breakpoints: {
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                effect: 'slide',
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                effect: 'slide',
            }
        },
        on: {
            init: function() {
                // Add slide-in animation to testimonial cards
                animateTestimonials();
            },
            slideChangeTransitionStart: function() {
                // Reset and re-animate when slide changes
                animateTestimonials();
            }
        }
    });
    
    // Add custom animation to testimonial quotes
    function animateTestimonials() {
        const activeSlides = document.querySelectorAll('.swiper-slide-active, .swiper-slide-next, .swiper-slide-prev');
        
        activeSlides.forEach(slide => {
            const content = slide.querySelector('.testimonial-content');
            const author = slide.querySelector('.testimonial-author');
            
            if (content) {
                gsap.fromTo(content, 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
                );
            }
            
            if (author) {
                gsap.fromTo(author, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' }
                );
            }
        });
    }
    
    // Add float animation to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        gsap.to(card, {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2,
        });
    });
}

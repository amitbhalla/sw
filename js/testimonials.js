// Testimonials slider functionality

let currentTestimonialIndex = 0;
let testimonials = [];
let testimonialInterval;

document.addEventListener('DOMContentLoaded', function() {
    // Fetch testimonials from JSON
    fetchTestimonials();
});

// Fetch testimonials data
function fetchTestimonials() {
    fetch('data/testimonials.json')
        .then(response => response.json())
        .then(data => {
            testimonials = data.testimonials;
            renderTestimonials();
            setupTestimonialControls();
            startTestimonialAutoplay();
        })
        .catch(error => console.error('Error loading testimonials:', error));
}

// Render testimonials
function renderTestimonials() {
    const testimonialSlider = document.getElementById('testimonials-slider');
    if (!testimonialSlider || testimonials.length === 0) return;
    
    // Create testimonial container
    let testimonialHTML = `
        <div class="testimonial-card">
            <div class="testimonial-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <div class="testimonial-content">
                ${testimonials[currentTestimonialIndex].content}
            </div>
            <div class="testimonial-author">
                <div class="testimonial-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="testimonial-info">
                    <h4>${testimonials[currentTestimonialIndex].name}</h4>
                    <p>${testimonials[currentTestimonialIndex].position}, ${testimonials[currentTestimonialIndex].company}</p>
                </div>
            </div>
        </div>
        <div class="testimonial-controls">
            <div class="testimonial-dots"></div>
            <div class="testimonial-arrows">
                <button class="testimonial-prev" aria-label="Previous testimonial">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="testimonial-next" aria-label="Next testimonial">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
    
    testimonialSlider.innerHTML = testimonialHTML;
    
    // Create dots
    const dotsContainer = testimonialSlider.querySelector('.testimonial-dots');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });
}

// Setup testimonial controls
function setupTestimonialControls() {
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', previousTestimonial);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
}

// Go to specific testimonial
function goToTestimonial(index) {
    // Reset autoplay
    clearInterval(testimonialInterval);
    
    currentTestimonialIndex = index;
    updateTestimonial();
    
    startTestimonialAutoplay();
}

// Previous testimonial
function previousTestimonial() {
    // Reset autoplay
    clearInterval(testimonialInterval);
    
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
    
    startTestimonialAutoplay();
}

// Next testimonial
function nextTestimonial() {
    // Reset autoplay
    clearInterval(testimonialInterval);
    
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
    
    startTestimonialAutoplay();
}

// Update current testimonial
function updateTestimonial() {
    const testimonialContent = document.querySelector('.testimonial-content');
    const testimonialName = document.querySelector('.testimonial-info h4');
    const testimonialPosition = document.querySelector('.testimonial-info p');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!testimonialContent || !testimonialName || !testimonialPosition) return;
    
    // Fade out
    testimonialContent.style.opacity = 0;
    testimonialName.style.opacity = 0;
    testimonialPosition.style.opacity = 0;
    
    // Update content after fade out
    setTimeout(() => {
        testimonialContent.textContent = testimonials[currentTestimonialIndex].content;
        testimonialName.textContent = testimonials[currentTestimonialIndex].name;
        testimonialPosition.textContent = `${testimonials[currentTestimonialIndex].position}, ${testimonials[currentTestimonialIndex].company}`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Fade in
        testimonialContent.style.opacity = 1;
        testimonialName.style.opacity = 1;
        testimonialPosition.style.opacity = 1;
    }, 300);
}

// Start testimonial autoplay
function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
    }, 5000); // Change testimonial every 5 seconds
}
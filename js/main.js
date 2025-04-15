// Main JavaScript functionality for Saurav Wadhwa's website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Fetch and populate content from JSON files
    fetchInsights();
    fetchImpactStories();
    fetchTestimonials();
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Fetch insights from JSON and populate the insights section
function fetchInsights() {
    fetch('data/insights.json')
        .then(response => response.json())
        .then(data => {
            const insightsGrid = document.getElementById('insights-grid');
            if (!insightsGrid) return;
            
            let insightsHTML = '';
            
            data.insights.forEach((insight, index) => {
                insightsHTML += `
                    <div class="insight-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="insight-number">${index + 1}</div>
                        <h3 class="insight-title">${insight.title}</h3>
                        <p class="insight-description">${insight.description}</p>
                        <a href="${insight.link}" class="insight-action">
                            ${insight.linkText} <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;
            });
            
            insightsGrid.innerHTML = insightsHTML;
        })
        .catch(error => console.error('Error loading insights:', error));
}

// Fetch impact stories from JSON and populate the section
function fetchImpactStories() {
    fetch('data/impact-stories.json')
        .then(response => response.json())
        .then(data => {
            const impactGrid = document.getElementById('impact-grid');
            if (!impactGrid) return;
            
            let impactHTML = '';
            
            data.stories.forEach((story, index) => {
                impactHTML += `
                    <div class="impact-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="impact-img">
                            <i class="${story.icon}"></i>
                        </div>
                        <div class="impact-content">
                            <span class="impact-tag">${story.category}</span>
                            <h3 class="impact-title">${story.title}</h3>
                            <p class="impact-description">${story.description}</p>
                            <div class="impact-stats">
                                <div class="impact-stat">
                                    <div class="impact-stat-value">${story.stats[0].value}</div>
                                    <div class="impact-stat-label">${story.stats[0].label}</div>
                                </div>
                                <div class="impact-stat">
                                    <div class="impact-stat-value">${story.stats[1].value}</div>
                                    <div class="impact-stat-label">${story.stats[1].label}</div>
                                </div>
                            </div>
                            <a href="${story.link}" class="impact-link">
                                Read Case Study <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `;
            });
            
            impactGrid.innerHTML = impactHTML;
        })
        .catch(error => console.error('Error loading impact stories:', error));
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // In a real implementation, this would send the data to a server
    console.log('Form submitted with data:', formDataObj);
    
    // Show success message (for demo purposes)
    alert('Thank you for your interest! We will contact you shortly to schedule your consultation.');
    
    // Reset form
    e.target.reset();
}

// Scroll header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
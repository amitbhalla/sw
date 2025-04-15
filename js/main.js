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

// Fetch featured insights for insights.html
function fetchFeaturedInsights() {
    // Only run on insights.html
    if (!window.location.pathname.endsWith('/pages/insights.html')) return;
    fetch('../data/insights.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('featured-insights-container');
            if (!container) return;
            let html = '';
            data.insights.forEach((insight, idx) => {
                html += `
                    <div class="featured-insight" data-aos="fade-up" data-aos-delay="${idx * 100}">
                        <div class="featured-insight-image">
                            <span class="featured-insight-tag">${insight.tag || ''}</span>
                            <img src="${insight.image ? insight.image : '/images/blog/automation.jpg'}" alt="${insight.title}">
                        </div>
                        <div class="featured-insight-content">
                            <h2>${insight.title}</h2>
                            <div class="featured-insight-meta">
                                ${insight.date ? `<div class='featured-insight-meta-item'><i class='far fa-calendar'></i><span>${insight.date}</span></div>` : ''}
                                ${insight.readTime ? `<div class='featured-insight-meta-item'><i class='far fa-clock'></i><span>${insight.readTime}</span></div>` : ''}
                            </div>
                            <div class="featured-insight-excerpt">
                                <p>${insight.description}</p>
                            </div>
                            <a href="#" class="featured-insight-link" data-insight-index="${idx}">${insight.linkText} <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;

            // Modal logic
            const modal = document.getElementById('insight-modal');
            const modalClose = document.getElementById('modal-close');
            const modalOverlay = modal.querySelector('.modal-overlay');
            const modalTitle = document.getElementById('modal-title');
            const modalDate = document.getElementById('modal-date');
            const modalReadTime = document.getElementById('modal-readtime');
            const modalImage = document.getElementById('modal-image');
            const modalBody = document.getElementById('modal-body');

            // Open modal on link click
            container.addEventListener('click', function(e) {
                const link = e.target.closest('.featured-insight-link');
                if (link) {
                    e.preventDefault();
                    const idx = link.getAttribute('data-insight-index');
                    const insight = data.insights[idx];
                    if (insight) {
    modalTitle.textContent = insight.title;
    modalDate.textContent = insight.date || '';
    modalReadTime.textContent = insight.readTime || '';
    modalImage.src = insight.image || '';
    modalImage.alt = insight.title || '';
    modalBody.innerHTML = insight.fullText || '';
    // Render tag as badge
    const modalTag = document.getElementById('modal-tag');
    modalTag.textContent = insight.tag || '';
    modalTag.style.display = insight.tag ? 'inline-block' : 'none';
    // Render key takeaways if present
    const takeawaysSection = document.getElementById('modal-takeaways-section');
    const takeawaysList = document.getElementById('modal-takeaways');
    if (insight.takeaways && Array.isArray(insight.takeaways) && insight.takeaways.length > 0) {
        takeawaysList.innerHTML = insight.takeaways.map(t => `<li>${t}</li>`).join('');
        takeawaysSection.style.display = 'block';
    } else {
        takeawaysSection.style.display = 'none';
    }
    // Share links
    const shareUrl = window.location.origin + window.location.pathname + '#insight-' + idx;
    document.getElementById('modal-share-twitter').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(insight.title + ' - ' + shareUrl)}`;
    document.getElementById('modal-share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    document.getElementById('modal-share-copy').onclick = function(e) {
        e.preventDefault();
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.title = 'Copied!';
            setTimeout(() => { this.title = 'Copy Link'; }, 1500);
        });
    };
    // Animate modal appearance
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => { modal.style.opacity = 1; }, 10);
    document.body.style.overflow = 'hidden';
}
                }
            });
            // Close modal
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', closeModal);
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeModal();
            });
        })
        .catch(error => console.error('Error loading featured insights:', error));
}

// Call featured insights fetcher on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchFeaturedInsights);
} else {
    fetchFeaturedInsights();
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
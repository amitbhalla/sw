/**
 * Content Loader
 * Loads all website content from JSON files
 */

class ContentLoader {
    constructor() {
        this.baseUrl = 'assets/data/';
        this.contentCache = {};
    }

    /**
     * Load JSON data from a file
     * @param {string} fileName - Name of the JSON file to load
     * @returns {Promise<Object>} - Promise resolving to the JSON data
     */
    async loadJSON(fileName) {
        // Check if data is already cached
        if (this.contentCache[fileName]) {
            return this.contentCache[fileName];
        }

        try {
            const response = await fetch(`${this.baseUrl}${fileName}.json`);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}.json: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the data
            this.contentCache[fileName] = data;
            
            return data;
        } catch (error) {
            console.error(`Error loading ${fileName}.json:`, error);
            return null;
        }
    }

    /**
     * Load and render all site content
     */
    async loadAllContent() {
        try {
            // Load all content files in parallel
            const [
                siteInfo,
                navigation,
                hero,
                about,
                expertise,
                insights,
                experience,
                testimonials,
                contact,
                footer
            ] = await Promise.all([
                this.loadJSON('site-info'),
                this.loadJSON('navigation'),
                this.loadJSON('hero'),
                this.loadJSON('about'),
                this.loadJSON('expertise'),
                this.loadJSON('insights'),
                this.loadJSON('experience'),
                this.loadJSON('testimonials'),
                this.loadJSON('contact'),
                this.loadJSON('footer')
            ]);

            // Render all sections
            if (siteInfo) this.renderSiteInfo(siteInfo);
            if (navigation) this.renderNavigation(navigation);
            if (hero) this.renderHero(hero);
            if (about) this.renderAbout(about);
            if (expertise) this.renderExpertise(expertise);
            if (insights) this.renderInsights(insights);
            if (experience) this.renderExperience(experience);
            if (testimonials) this.renderTestimonials(testimonials);
            if (contact) this.renderContact(contact);
            if (footer) this.renderFooter(footer);

            // Hide preloader after content is loaded
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('fade-out');
            }, 500);

        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    /**
     * Render site info (title, meta description, etc.)
     */
    renderSiteInfo(data) {
        // Set page title
        document.title = data.title;
        
        // Set meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', data.description);
        }
        
        // Set favicon if provided
        if (data.favicon) {
            const favicon = document.querySelector('link[rel="icon"]');
            if (favicon) {
                favicon.setAttribute('href', data.favicon);
            }
        }
    }

    /**
     * Render navigation menu
     */
    renderNavigation(data) {
        // Set header logo
        const headerLogo = document.getElementById('header-logo');
        if (headerLogo) {
            headerLogo.innerHTML = `${data.logoText}<span class="logo-accent">${data.logoAccent}</span>`;
        }
        
        // Render navigation items
        const navList = document.getElementById('nav-list');
        if (navList && data.items) {
            navList.innerHTML = data.items.map(item => `
                <li class="nav-item">
                    <a href="#${item.link}" class="nav-link ${item.active ? 'active' : ''}">
                        ${item.text}
                    </a>
                </li>
            `).join('');
        }
    }

    /**
     * Render hero section
     */
    renderHero(data) {
        // Set hero title with highlight
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = data.title.replace(/\*\*(.*?)\*\*/g, '<span class="highlight">$1</span>')
                                       .replace(/\*\*(.*?)\*\*/g, '<span class="text-accent">$1</span>');
        }
        
        // Set hero subtitle
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.textContent = data.subtitle;
        }
        
        // Render CTA buttons
        const heroCta = document.getElementById('hero-cta');
        if (heroCta && data.cta) {
            heroCta.innerHTML = data.cta.map(button => `
                <a href="#${button.link}" class="btn ${button.type}">
                    ${button.text}
                </a>
            `).join('');
        }
        
        // Set hero image
        const heroImage = document.getElementById('hero-image');
        if (heroImage && data.image) {
            heroImage.innerHTML = `
                <img src="${data.image}" alt="${data.imageAlt || 'Saurav Wadhwa'}" class="profile-image">
                <div class="profile-backdrop"></div>
            `;
        }
    }

    /**
     * Render about section
     */
    renderAbout(data) {
        // Set section title and description
        const aboutTitle = document.getElementById('about-title');
        const aboutDescription = document.getElementById('about-description');
        
        if (aboutTitle) aboutTitle.textContent = data.title;
        if (aboutDescription) aboutDescription.textContent = data.description;
        
        // Render about text content
        const aboutText = document.getElementById('about-text');
        if (aboutText) {
            let principlesHtml = '';
            
            if (data.principles && data.principles.length > 0) {
                principlesHtml = `
                    <div class="key-principles">
                        ${data.principles.map((principle, index) => `
                            <div class="principle" data-aos="fade-up" data-aos-delay="${150 + (index * 50)}">
                                <div class="principle-icon">
                                    <i class="${principle.icon}"></i>
                                </div>
                                <h4>${principle.title}</h4>
                                <p>${principle.description}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            aboutText.innerHTML = `
                <h3>${data.heading}</h3>
                ${data.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
                ${principlesHtml}
            `;
            
            // Replace years of experience with dynamic calculation if needed
            const yearsElement = document.getElementById('yearsExperience');
            if (yearsElement && data.careerStartYear) {
                const currentYear = new Date().getFullYear();
                const yearsOfExperience = currentYear - data.careerStartYear;
                yearsElement.textContent = yearsOfExperience;
            }
        }
        
        // Render stats
        const aboutStats = document.getElementById('about-stats');
        if (aboutStats && data.stats) {
            aboutStats.innerHTML = data.stats.map((stat, index) => `
                <div class="stat-item" data-aos="fade-left" data-aos-delay="${150 + (index * 50)}">
                    <div class="stat-value" data-count="${stat.value}">0</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
        }
    }

    /**
     * Render expertise section
     */
    renderExpertise(data) {
        // Set section title and description
        const expertiseTitle = document.getElementById('expertise-title');
        const expertiseDescription = document.getElementById('expertise-description');
        
        if (expertiseTitle) expertiseTitle.textContent = data.title;
        if (expertiseDescription) expertiseDescription.textContent = data.description;
        
        // Render expertise items
        const expertiseGrid = document.getElementById('expertise-grid');
        if (expertiseGrid && data.items) {
            expertiseGrid.innerHTML = data.items.map((item, index) => `
                <div class="expertise-item" data-aos="fade-up" data-aos-delay="${100 + (index * 50)}">
                    <div class="expertise-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `).join('');
        }
    }

    /**
     * Render insights section with tabs
     */
    renderInsights(data) {
        // Set section title and description
        const insightsTitle = document.getElementById('insights-title');
        const insightsDescription = document.getElementById('insights-description');
        
        if (insightsTitle) insightsTitle.textContent = data.title;
        if (insightsDescription) insightsDescription.textContent = data.description;
        
        // Render tabs navigation
        const tabsNav = document.getElementById('insights-tabs-nav');
        if (tabsNav && data.tabs) {
            tabsNav.innerHTML = data.tabs.map((tab, index) => `
                <button class="tab-btn ${index === 0 ? 'active' : ''}" data-tab="${tab.id}">
                    ${tab.title}
                </button>
            `).join('');
        }
        
        // Render tabs content
        const tabsContent = document.getElementById('insights-tabs-content');
        if (tabsContent && data.tabs) {
            tabsContent.innerHTML = data.tabs.map((tab, index) => {
                let contentHtml = '';
                
                // Generate content based on tab type
                if (tab.id === 'articles') {
                    contentHtml = `
                        <div class="articles-grid">
                            ${tab.content.map((article, i) => `
                                <div class="article-card" data-aos="fade-up" data-aos-delay="${150 + (i * 50)}">
                                    <div class="article-img">
                                        <img src="${article.image}" alt="${article.title}">
                                    </div>
                                    <div class="article-content">
                                        <div class="article-tag">${article.tag}</div>
                                        <h3 class="article-title">${article.title}</h3>
                                        <p class="article-excerpt">${article.excerpt}</p>
                                        <a href="${article.link}" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else if (tab.id === 'speaking') {
                    contentHtml = `
                        <div class="speaking-grid">
                            ${tab.content.map((event, i) => `
                                <div class="speaking-card" data-aos="fade-up" data-aos-delay="${150 + (i * 50)}">
                                    <div class="speaking-date">${event.date}</div>
                                    <h3 class="speaking-title">${event.title}</h3>
                                    <p class="speaking-topic">${event.topic}</p>
                                    <div class="speaking-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                } else if (tab.id === 'resources') {
                    contentHtml = `
                        <div class="resources-grid">
                            ${tab.content.map((resource, i) => `
                                <div class="resource-card" data-aos="fade-up" data-aos-delay="${150 + (i * 50)}">
                                    <div class="resource-icon">
                                        <i class="${resource.icon}"></i>
                                    </div>
                                    <h3 class="resource-title">${resource.title}</h3>
                                    <p class="resource-desc">${resource.description}</p>
                                    <a href="${resource.link}" class="btn btn-sm">${resource.buttonText}</a>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
                
                return `
                    <div class="tab-pane ${index === 0 ? 'active' : ''}" id="${tab.id}">
                        ${contentHtml}
                    </div>
                `;
            }).join('');
        }
    }

    /**
     * Render experience timeline
     */
    renderExperience(data) {
        // Set section title and description
        const experienceTitle = document.getElementById('experience-title');
        const experienceDescription = document.getElementById('experience-description');
        
        if (experienceTitle) experienceTitle.textContent = data.title;
        if (experienceDescription) experienceDescription.textContent = data.description;
        
        // Render timeline items
        const experienceTimeline = document.getElementById('experience-timeline');
        if (experienceTimeline && data.timeline) {
            experienceTimeline.innerHTML = `
                <div class="timeline">
                    ${data.timeline.map((item, index) => `
                        <div class="timeline-item" data-aos="${index % 2 === 0 ? 'fade-right' : 'fade-left'}" data-aos-delay="${150 + (index * 50)}">
                            <div class="timeline-dot"></div>
                            <div class="timeline-date">${item.period}</div>
                            <div class="timeline-content">
                                <h3>${item.position}</h3>
                                <h4>${item.company}</h4>
                                <p>${item.description}</p>
                                ${item.achievements ? `
                                    <ul class="achievement-list">
                                        ${item.achievements.map(achievement => `
                                            <li>${achievement}</li>
                                        `).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    /**
     * Render testimonials slider
     */
    renderTestimonials(data) {
        // Set section title and description
        const testimonialsTitle = document.getElementById('testimonials-title');
        const testimonialsDescription = document.getElementById('testimonials-description');
        
        if (testimonialsTitle) testimonialsTitle.textContent = data.title;
        if (testimonialsDescription) testimonialsDescription.textContent = data.description;
        
        // Render testimonial slides
        const testimonialsWrapper = document.getElementById('testimonials-wrapper');
        if (testimonialsWrapper && data.items) {
            testimonialsWrapper.innerHTML = data.items.map(testimonial => `
                <div class="swiper-slide">
                    <div class="testimonial-card">
                        <div class="testimonial-content">
                            <p>${testimonial.content}</p>
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">
                                <img src="${testimonial.avatar}" alt="${testimonial.name}">
                            </div>
                            <div class="author-info">
                                <h4>${testimonial.name}</h4>
                                <p>${testimonial.position}, ${testimonial.company}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    /**
     * Render contact section
     */
    renderContact(data) {
        // Set section title and description
        const contactTitle = document.getElementById('contact-title');
        const contactDescription = document.getElementById('contact-description');
        
        if (contactTitle) contactTitle.textContent = data.title;
        if (contactDescription) contactDescription.textContent = data.description;
        
        // Render contact info
        const contactInfo = document.getElementById('contact-info');
        if (contactInfo && data.contactMethods) {
            contactInfo.innerHTML = data.contactMethods.map(method => `
                <div class="contact-method">
                    <h4><i class="${method.icon}"></i> ${method.title}</h4>
                    ${method.items.map(item => `
                        <p>${item.type === 'link' ? `<a href="${item.href}" target="_blank">${item.text}</a>` : item.text}</p>
                    `).join('')}
                </div>
            `).join('');
        }
        
        // Set contact form labels and placeholders
        if (data.form) {
            const formElements = [
                { id: 'name', type: 'input' },
                { id: 'email', type: 'input' },
                { id: 'subject', type: 'input' },
                { id: 'message', type: 'textarea' }
            ];
            
            formElements.forEach(element => {
                if (data.form[element.id]) {
                    const label = document.querySelector(`label[for="${element.id}"]`);
                    const input = document.getElementById(element.id);
                    
                    if (label) label.textContent = data.form[element.id].label;
                    if (input) input.setAttribute('placeholder', data.form[element.id].placeholder || '');
                }
            });
            
            // Set submit button text
            const submitButton = document.querySelector('#contact-form button[type="submit"]');
            if (submitButton && data.form.submitText) {
                submitButton.textContent = data.form.submitText;
            }
        }
    }

    /**
     * Render footer
     */
    renderFooter(data) {
        // Render footer content
        const footerContent = document.getElementById('footer-content');
        if (footerContent) {
            let footerHtml = '';
            
            // Footer info (logo and description)
            if (data.info) {
                footerHtml += `
                    <div class="footer-info">
                        <a href="#" class="footer-logo">
                            ${data.info.logoText}<span>${data.info.logoAccent}</span>
                        </a>
                        <p class="footer-description">${data.info.description}</p>
                    </div>
                `;
            }
            
            // Footer links columns
            if (data.links) {
                data.links.forEach(column => {
                    footerHtml += `
                        <div class="footer-links">
                            <h4 class="footer-title">${column.title}</h4>
                            <ul class="footer-nav">
                                ${column.items.map(item => `
                                    <li><a href="${item.url}">${item.text}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                    `;
                });
            }
            
            footerContent.innerHTML = footerHtml;
        }
        
        // Set copyright text
        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright && data.copyright) {
            const currentYear = new Date().getFullYear();
            footerCopyright.innerHTML = data.copyright.replace('{year}', currentYear);
        }
        
        // Render social links
        const socialLinks = document.getElementById('social-links');
        if (socialLinks && data.social) {
            socialLinks.innerHTML = data.social.map(item => `
                <a href="${item.url}" class="social-link" target="_blank" aria-label="${item.platform}">
                    <i class="${item.icon}"></i>
                </a>
            `).join('');
        }
    }
}

// Create a global contentLoader instance
const contentLoader = new ContentLoader();

// Load all content when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    contentLoader.loadAllContent();
});
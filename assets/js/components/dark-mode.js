/**
 * Dark Mode Component
 * Handles theme switching functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Add animation to the icon
            animateThemeToggle(themeToggle);
            
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            
            // Add animation to the icon
            animateThemeToggle(themeToggle);
        }
    });
}

/**
 * Animate theme toggle icon
 * @param {HTMLElement} element - The toggle button element
 */
function animateThemeToggle(element) {
    // Reset animation
    element.style.animation = 'none';
    
    // Trigger reflow
    void element.offsetWidth;
    
    // Apply animation
    element.style.animation = 'pulse-animation 0.5s ease-in-out';
    
    // Remove animation after it completes
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

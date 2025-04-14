/**
 * Stats Counter Component
 * Animated number counters for statistics
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters once content is loaded
    window.addEventListener('load', initStatCounters);
});

/**
 * Initialize stat counters
 */
function initStatCounters() {
    const statElements = document.querySelectorAll('.stat-value');
    
    if (statElements.length === 0) return;
    
    // Set up intersection observer to trigger counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the counter animation
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-count'), 10);
                
                if (!isNaN(targetValue)) {
                    animateCounter(target, targetValue);
                }
                
                // Stop observing once animated
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each stat element
    statElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} targetValue - The target number to count to
 */
function animateCounter(element, targetValue) {
    let startTime;
    const duration = 2000; // Animation duration in milliseconds
    const startValue = 0;
    
    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
        
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exactly the target value
            element.textContent = formatNumber(targetValue);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Easing function for smooth animation (ease-out-quart)
 * @param {number} x - Progress from 0 to 1
 * @returns {number} - Eased value
 */
function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

/**
 * Format numbers with commas
 * @param {number} number - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

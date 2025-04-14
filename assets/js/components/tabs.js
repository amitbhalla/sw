/**
 * Tabs Component
 * Handles tab functionality for the insights section
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tabs once content is loaded
    window.addEventListener('load', initTabs);
});

/**
 * Initialize tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
}

/**
 * Switch active tab
 * @param {Event} event - Click event
 */
function switchTab(event) {
    const clickedTab = event.currentTarget;
    const tabId = clickedTab.getAttribute('data-tab');
    const tabsContent = clickedTab.closest('.insights-tabs').querySelector('.tabs-content');
    
    if (!tabId || !tabsContent) return;
    
    // Update active tab button
    const allTabButtons = clickedTab.closest('.tabs-nav').querySelectorAll('.tab-btn');
    allTabButtons.forEach(btn => btn.classList.remove('active'));
    clickedTab.classList.add('active');
    
    // Show the selected tab content
    const allTabContents = tabsContent.querySelectorAll('.tab-pane');
    allTabContents.forEach(content => content.classList.remove('active'));
    
    const selectedTabContent = tabsContent.querySelector(`#${tabId}`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
        
        // Refresh AOS animations in the tab
        if (window.AOS) {
            setTimeout(() => {
                AOS.refresh();
            }, 10);
        }
    }
}

// Content script for eBird pages - extracts scientific names
(function() {
    'use strict';
    
    function extractScientificNames() {
        const scientificNames = new Set();
        
        // Look for the native/naturalized section
        const nativeSection = document.querySelector('section[aria-labelledby="nativeNaturalized"]');
        if (!nativeSection) {
            return Array.from(scientificNames);
        }
        
        // Find all species entries within the section
        const speciesEntries = nativeSection.querySelectorAll('.Species-sci');
        
        speciesEntries.forEach(entry => {
            const scientificName = entry.textContent.trim();
            if (scientificName) {
                scientificNames.add(scientificName);
            }
        });
        
		console.log("Following names extracted:");
		console.log(scientificNames);
        return Array.from(scientificNames);
    }
    
    // Listen for messages from popup
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'extractNames') {
            const names = extractScientificNames();
            sendResponse({names: names});
        }
    });
})();

console.log("Scientific name extraction script injected.");

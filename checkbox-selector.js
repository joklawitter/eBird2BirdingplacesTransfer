// Content script for target website - selects checkboxes based on scientific names
(function() {
    'use strict';
    
    function findAndCheckBirds(scientificNames) {
		console.log("Script started to try auto-select based on provided scientific names");
		
        if (!scientificNames || scientificNames.length === 0) {
			console.log("No scientific names provided.");
            return {checked: 0, total: 0};
        }
		scientificNames.forEach(entry => console.log(entry));
        
        // Find the bird selection container
        const birdSelectContainer = document.querySelector('.bird-select.column.is-two-thirds');
        if (!birdSelectContainer) {
            return {checked: 0, total: scientificNames.length};
        }
        
        // Find all bird rows
        const birdRows = birdSelectContainer.querySelectorAll('tr');
        let checkedCount = 0;
        
        birdRows.forEach(row => {
            // Look for the scientific name in parentheses
            const birdInfo = row.querySelector('td:last-child span');
            if (!birdInfo) return;
            
            const text = birdInfo.textContent;
            // Extract scientific name from format: "Common Name (Scientific name)"
            const scientificMatch = text.match(/\(([^)]+)\)/);
            if (!scientificMatch) return;
            
            const scientificName = scientificMatch[1].trim();
            
            // Check if this scientific name is in our list
            if (scientificNames.includes(scientificName)) {
				console.log("Found: " + scientificName);
                // Find the checkbox (fa-square-o icon)
                const checkbox = row.querySelector('i.fa-square-o');
                if (checkbox) {
                    // Click the checkbox to select it
                    checkbox.click();
                    checkedCount++;
					console.log("And checked it!");
                }
            }
        });
        
        return {checked: checkedCount, total: scientificNames.length};
    }
    
    // Listen for messages from popup
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'checkBirds') {
            const result = findAndCheckBirds(request.scientificNames);
            sendResponse(result);
        }
    });
})();

console.log("Scientific name auto-selector script injected.");
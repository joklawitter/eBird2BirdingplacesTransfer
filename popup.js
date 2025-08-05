let extractedNames = [];

document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    const checkBtn = document.getElementById('checkBtn');
    
    // Load saved names when popup opens
    browser.storage.local.get(['extractedNames'], function(result) {
        if (result.extractedNames) {
            extractedNames = result.extractedNames;
            console.log('Loaded saved names:', extractedNames.length, 'birds');
        }
    });
    
    // Extract names from current eBird page
    extractBtn.addEventListener('click', function() {
        console.log('Extract button clicked');
        
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTab = tabs[0];
            console.log('Current tab URL:', currentTab.url);
            
            browser.tabs.sendMessage(currentTab.id, {action: 'extractNames'}, function(response) {
                console.log('Response received:', response);
                
                if (browser.runtime.lastError) {
                    console.log('Runtime error details:', browser.runtime.lastError);
                    alert('Error: ' + browser.runtime.lastError.message + '\nTry refreshing the page first.');
                    return;
                }
                
                if (response && response.names && response.names.length > 0) {
                    extractedNames = response.names;
                    // Save to storage
                    browser.storage.local.set({extractedNames: extractedNames}, function() {
                        console.log('Saved', extractedNames.length, 'names to storage');
                    });
                    alert('Extracted ' + response.names.length + ' bird names!\n' + response.names.slice(0, 3).join(', ') + (response.names.length > 3 ? '...' : ''));
                } else {
                    console.log('No birds found or invalid response');
                    alert('No bird names found on this page\nMake sure you\'re on an eBird species list page');
                }
            });
        });
    });
    
    // Check birds on current page
    checkBtn.addEventListener('click', function() {
        console.log('Check button clicked');
        console.log('Current extractedNames length:', extractedNames.length);
        
        if (extractedNames.length === 0) {
            alert('No bird names extracted. Use "Extract from eBird" first.');
            return;
        }
        
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTab = tabs[0];
            
            browser.tabs.sendMessage(currentTab.id, {
                action: 'checkBirds',
                scientificNames: extractedNames
            }, function(response) {
                console.log('Check response:', response);
                
                if (browser.runtime.lastError) {
                    alert('Error: ' + browser.runtime.lastError.message + '\nTry refreshing the page first.');
                    return;
                }
                
                if (response) {
                    alert('Checked ' + response.checked + ' of ' + response.total + ' birds');
                } else {
                    alert('No bird checklist found on this page');
                }
            });
        });
    });
});
# eBird2BirdingplacesTransfer
A Firefox extension that automatically selects bird checkboxes on birdingplaces.eu when adding a new birdingplace based on the species lists from a eBird hotspot (illustrated checklist).

## Overview

This extension speeds up the process of creating the bird list for a birdingplace on birdingplaces.eu by:

### Step 1: Extracting **scientific names** from eBird
- Visit any eBird Hotspot and go to the illustrated checklist (e.g., `https://ebird.org/hotspot/L97555/illustrated-checklist`)
- Click the extension icon (puzzle piece) and select **"Extract from eBird"**
- The extension finds and temporarily saves all scientific names in the native/naturalized species section, ignoring the exotics, hybrids, and additional taxa sections
- You should see an alert confirming how many species were found; check the console in the developer environment otherwise

### Step 2: Check birds on birdingplaces.eu
- Helps when you are at the step **Birdlist**, when adding a new birdingplace; unfold all 
- Click the extension icon and select **"Check Birds"**
- The extension automatically finds and checks all matching species

Make sure to check afterwards that it got everything correctly, in particular, you might not want to add the species that were only seen few times.


## Installation

1. **Download the extension files**
   ```bash
   git clone https://github.com/joklawitter/eBird2BirdingplacesTransfer.git
   ```
   or download all files manually.

2. **Load in Firefox**
   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on..."
   - Navigate to the extension folder and select `manifest.json`
   - The extension will appear in your toolbar

It might work with other browsers (with minor modifications).

#!/bin/bash

# Create root directory
mkdir -p saurav-wadhwa-website

# Move into the root directory
cd saurav-wadhwa-website

# Create index.html file
touch index.html

# Create CSS directories and files
mkdir -p css
touch css/styles.css
touch css/responsive.css
touch css/animations.css

# Create JS directories and files
mkdir -p js
touch js/main.js
touch js/navigation.js
touch js/animations.js
touch js/testimonials.js

# Create data directories and JSON files
mkdir -p data
touch data/hero.json
touch data/insights.json
touch data/impact-stories.json
touch data/about.json
touch data/journey.json
touch data/contact.json
touch data/testimonials.json

# Create images directory
mkdir -p images
mkdir -p images/icons
mkdir -p images/backgrounds

# Create pages directory for additional pages
mkdir -p pages
touch pages/about.html
touch pages/contact.html
touch pages/insights.html
touch pages/impact-stories.html
touch pages/journey.html

echo "Project structure created successfully!"
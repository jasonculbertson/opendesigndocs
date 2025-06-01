#!/bin/bash

# Find all Astro files that import ContentGate
find /Users/jasonculbertson/Documents/GitHub/opendesigndocs/src/pages -name "*.astro" -exec grep -l "ContentGate" {} \; | while read file; do
  echo "Processing $file"
  # Remove ContentGate import
  sed -i '' 's/import ContentGate from.*;//g' "$file"
  
  # Remove ContentGate opening tag
  sed -i '' 's/<ContentGate client:load>//g' "$file"
  
  # Remove ContentGate closing tag
  sed -i '' 's/<\/ContentGate>//g' "$file"
done

echo "All ContentGate components removed from pages"

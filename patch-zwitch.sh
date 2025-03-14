#!/bin/bash

# Find all files that import zwitch and fix them
echo "🔍 Finding files with zwitch imports..."

# Find all JS files in node_modules that contain the problematic import
FILES=$(grep -l "import {zwitch} from 'zwitch'" --include="*.js" -r ./node_modules/ 2>/dev/null || echo "")

if [ -z "$FILES" ]; then
  echo "No files found with problematic zwitch imports."
else
  echo "Found files with problematic imports:"
  echo "$FILES"
  
  # Replace the problematic import in each file
  for FILE in $FILES; do
    echo "Fixing $FILE"
    sed -i 's/import {zwitch} from \'zwitch\'/import zwitch from \'zwitch\'/g' "$FILE"
  done
  
  echo "✅ All zwitch imports have been fixed!"
fi

// build-fix.js
// A comprehensive fix for ESM compatibility issues in the build process

import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Function to recursively search for files with a specific pattern
async function findFiles(dir, pattern) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules/.cache to avoid unnecessary processing
      if (entry.name === '.cache' && dir.includes('node_modules')) {
        return [];
      }
      // Skip .git directory
      if (entry.name === '.git') {
        return [];
      }
      return findFiles(fullPath, pattern);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const content = await fs.readFile(fullPath, 'utf8');
      if (content.includes(pattern)) {
        return [fullPath];
      }
    }
    return [];
  }));
  
  return files.flat();
}

// Main function to fix ESM compatibility issues
async function fixEsmCompatibility() {
  console.log('🔧 Starting ESM compatibility fixes...');
  
  try {
    // Find all files with the problematic zwitch import
    console.log('🔍 Searching for files with zwitch imports...');
    const zwitchFiles = await findFiles('./node_modules', "import {zwitch} from 'zwitch'");
    
    console.log(`Found ${zwitchFiles.length} files with zwitch imports to fix.`);
    
    // Fix each file
    for (const file of zwitchFiles) {
      try {
        console.log(`Fixing ${file}...`);
        const content = await fs.readFile(file, 'utf8');
        const fixed = content.replace(
          "import {zwitch} from 'zwitch'", 
          "import zwitch from 'zwitch';"
        );
        await fs.writeFile(file, fixed, 'utf8');
      } catch (err) {
        console.error(`Error fixing ${file}:`, err);
      }
    }
    
    console.log('✅ ESM compatibility fixes completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error fixing ESM compatibility:', error);
    return false;
  }
}

// Run the fix
fixEsmCompatibility().then(success => {
  if (!success) {
    console.error('Failed to apply ESM compatibility fixes.');
    process.exit(1);
  }
  
  // Continue with the build process
  console.log('🚀 Proceeding with build...');
});

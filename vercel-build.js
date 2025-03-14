// vercel-build.js
// This script patches the ESM/CommonJS compatibility issue with zwitch
// Run this before the build process

import { promises as fs } from 'fs';
import path from 'path';

async function patchZwitchImports() {
  const filesToPatch = [
    './node_modules/hast-util-to-html/lib/handle/index.js',
    './node_modules/hast-util-to-parse5/lib/index.js',
    // Add any other files that might have the same issue
    './node_modules/hast-util-from-parse5/lib/index.js',
    './node_modules/hast-util-to-string/index.js'
  ];

  for (const filePath of filesToPatch) {
    try {
      // Check if file exists before trying to patch it
      try {
        await fs.access(filePath);
      } catch (e) {
        console.log(`File ${filePath} not found, skipping...`);
        continue;
      }

      const content = await fs.readFile(filePath, 'utf8');
      
      // Skip if the file doesn't contain the problematic import
      if (!content.includes("import {zwitch} from 'zwitch'")) {
        console.log(`No zwitch import found in ${filePath}, skipping...`);
        continue;
      }
      
      // Replace the problematic import
      const patchedContent = content.replace(
        "import {zwitch} from 'zwitch'", 
        "import zwitch from 'zwitch';"
      );
      
      await fs.writeFile(filePath, patchedContent, 'utf8');
      console.log(`Successfully patched zwitch import in ${filePath}`);
    } catch (error) {
      console.error(`Error patching zwitch import in ${filePath}:`, error);
      // Continue with other files instead of exiting
    }
  }
}

// Execute the patch
patchZwitchImports().catch(error => {
  console.error('Error in patching process:', error);
  process.exit(1);
});

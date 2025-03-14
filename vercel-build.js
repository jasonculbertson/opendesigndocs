// vercel-build.js
// This script patches the ESM/CommonJS compatibility issue with zwitch
// Run this before the build process

import { promises as fs } from 'fs';
import path from 'path';

async function patchZwitchImport() {
  try {
    const filePath = './node_modules/hast-util-to-html/lib/handle/index.js';
    const content = await fs.readFile(filePath, 'utf8');
    
    // Replace the problematic import
    const patchedContent = content.replace(
      "import {zwitch} from 'zwitch'", 
      "import zwitch from 'zwitch';"
    );
    
    await fs.writeFile(filePath, patchedContent, 'utf8');
    console.log('Successfully patched zwitch import in hast-util-to-html');
  } catch (error) {
    console.error('Error patching zwitch import:', error);
    process.exit(1);
  }
}

// Execute the patch
patchZwitchImport();

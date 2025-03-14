// zwitch-patch.js
// This file directly patches the zwitch module in node_modules

const fs = require('fs');
const path = require('path');

// Function to patch a file
function patchFile(filePath, searchText, replaceText) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(searchText)) {
      console.log(`Search text not found in ${filePath}`);
      return false;
    }
    
    const patchedContent = content.replace(new RegExp(searchText, 'g'), replaceText);
    fs.writeFileSync(filePath, patchedContent, 'utf8');
    console.log(`Successfully patched ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error patching ${filePath}:`, error);
    return false;
  }
}

// Patch specific files that are known to cause issues
const filesToPatch = [
  './node_modules/hast-util-to-html/lib/handle/index.js',
  './node_modules/hast-util-to-parse5/lib/index.js'
];

let patchCount = 0;
for (const file of filesToPatch) {
  const success = patchFile(
    file,
    "import \\{zwitch\\} from 'zwitch'",
    "import zwitch from 'zwitch'"
  );
  if (success) patchCount++;
}

console.log(`Patched ${patchCount} files successfully.`);

// If we couldn't patch the specific files, try a more general approach
if (patchCount === 0) {
  console.log('Trying general approach to find and patch files...');
  
  // Walk through node_modules to find all JS files
  function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
      const dirPath = path.join(dir, f);
      const isDirectory = fs.statSync(dirPath).isDirectory();
      if (isDirectory) {
        walkDir(dirPath, callback);
      } else if (f.endsWith('.js')) {
        callback(path.join(dir, f));
      }
    });
  };
  
  try {
    walkDir('./node_modules', (filePath) => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes("import {zwitch} from 'zwitch'")) {
          const success = patchFile(
            filePath,
            "import \\{zwitch\\} from 'zwitch'",
            "import zwitch from 'zwitch'"
          );
          if (success) patchCount++;
        }
      } catch (err) {
        // Ignore errors reading files
      }
    });
  } catch (err) {
    console.error('Error walking directory:', err);
  }
  
  console.log(`Total patched files: ${patchCount}`);
}

import { testTextFileGeneration } from './src/utils/googleDocsGenerator.ts';
import fs from 'fs';

async function runTest() {
  try {
    console.log('🧪 Testing competency document generation...');
    const filepath = await testTextFileGeneration();
    console.log('🎉 Success! Document created at:', filepath);
    
    // Read and display a preview of the generated file
    const content = fs.readFileSync(filepath, 'utf8');
    console.log('\n📖 Preview of generated content:');
    console.log('='.repeat(50));
    console.log(content.substring(0, 1000) + '...');
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

runTest(); 
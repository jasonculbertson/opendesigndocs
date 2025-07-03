import type { APIRoute } from 'astro';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!import.meta.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'OpenAI API key is not configured' 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const action = formData.get('action') as string;

    if (!file) {
      return new Response(JSON.stringify({ 
        error: 'No file provided' 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let extractedText = '';

    // Handle different file types
    if (file.type.startsWith('image/')) {
      // Process images with Vision API
      extractedText = await processImageFile(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // Process PDFs - convert to base64 and ask OpenAI to extract text
      extractedText = await processPDFFile(file);
    } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      // Process Word documents
      extractedText = await processWordFile(file);
    } else {
      // For other file types, try to read as text and ask OpenAI to clean/structure it
      const textContent = await file.text();
      extractedText = await processTextFile(textContent);
    }

    return new Response(JSON.stringify({ 
      extractedText,
      fileName: file.name,
      fileType: file.type
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process file' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function processImageFile(file: File): Promise<string> {
  try {
    // Convert image to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = file.type;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please extract all text content from this image. If it contains tables, preserve the structure. If it's a document, extract the text in a readable format. Return only the extracted text content."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000,
      temperature: 0
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error processing image with OpenAI:', error);
    throw error;
  }
}

async function processPDFFile(file: File): Promise<string> {
  try {
    // For PDFs, we'll ask the user to convert to text or images for now
    // In a full implementation, you'd use a PDF processing service
    return `PDF file "${file.name}" was uploaded. For best results, please:
1. Convert the PDF to text and paste the content, or
2. Take screenshots of the important pages and upload them as images.

I can process images with high accuracy using AI vision.`;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}

async function processWordFile(file: File): Promise<string> {
  try {
    // For Word docs, we'll ask the user to convert to text for now
    // In a full implementation, you'd use a document processing service
    return `Word document "${file.name}" was uploaded. For best results, please:
1. Copy and paste the text content from the document, or
2. Save as PDF and take screenshots of important pages.

I can process text and images with high accuracy.`;
  } catch (error) {
    console.error('Error processing Word document:', error);
    throw error;
  }
}

async function processTextFile(content: string): Promise<string> {
  try {
    // For text files, ask OpenAI to clean and structure the content
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Please clean and structure this text content, removing any formatting artifacts and making it readable. Preserve the original meaning and structure:

${content}`
        }
      ],
      max_tokens: 4000,
      temperature: 0
    });

    return response.choices[0]?.message?.content || content;
  } catch (error) {
    console.error('Error processing text with OpenAI:', error);
    // Return original content if OpenAI processing fails
    return content;
  }
} 
import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  title: string;
  contentSelector?: string;
}

export default function DownloadButton({ title, contentSelector = '.prose' }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Find the content element
      const content = document.querySelector(contentSelector);
      if (!content) {
        console.error('Content element not found');
        setIsGenerating(false);
        return;
      }

      // Clone the content to avoid modifying the original
      const clone = content.cloneNode(true) as HTMLElement;
      
      // Create a wrapper with proper styling for PDF
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        padding: 40px;
        max-width: 800px;
        margin: 0 auto;
        color: #1a1a1a;
        line-height: 1.6;
      `;
      
      // Add a header with the title and site name below
      const header = document.createElement('div');
      header.innerHTML = `
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 28px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">${title}</h1>
          <div style="font-size: 12px; color: #6b7280;">Open Design Docs • www.opendesigndocs.com</div>
        </div>
      `;
      wrapper.appendChild(header);
      
      // Style the cloned content
      clone.querySelectorAll('h1').forEach(el => {
        (el as HTMLElement).style.cssText = 'font-size: 24px; font-weight: 700; color: #111827; margin: 24px 0 16px 0;';
      });
      clone.querySelectorAll('h2').forEach(el => {
        (el as HTMLElement).style.cssText = 'font-size: 20px; font-weight: 600; color: #1f2937; margin: 24px 0 12px 0;';
      });
      clone.querySelectorAll('h3').forEach(el => {
        (el as HTMLElement).style.cssText = 'font-size: 16px; font-weight: 600; color: #374151; margin: 20px 0 8px 0;';
      });
      clone.querySelectorAll('p').forEach(el => {
        (el as HTMLElement).style.cssText = 'font-size: 14px; color: #374151; margin: 0 0 12px 0; line-height: 1.7;';
      });
      clone.querySelectorAll('ul, ol').forEach(el => {
        (el as HTMLElement).style.cssText = 'font-size: 14px; color: #374151; margin: 0 0 16px 0; padding-left: 24px;';
      });
      clone.querySelectorAll('li').forEach(el => {
        (el as HTMLElement).style.cssText = 'margin: 4px 0;';
      });
      clone.querySelectorAll('table').forEach(el => {
        (el as HTMLElement).style.cssText = 'width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;';
      });
      clone.querySelectorAll('thead').forEach(el => {
        (el as HTMLElement).style.cssText = 'background: #f3f4f6;';
      });
      clone.querySelectorAll('thead tr').forEach(el => {
        (el as HTMLElement).style.cssText = 'background: #f3f4f6;';
      });
      clone.querySelectorAll('th').forEach(el => {
        (el as HTMLElement).style.cssText = 'background: #f3f4f6; padding: 10px 12px; text-align: left; font-weight: 600; border: 1px solid #e5e7eb; border-top: none;';
      });
      clone.querySelectorAll('thead tr:first-child th').forEach(el => {
        (el as HTMLElement).style.cssText = 'background: #f3f4f6; padding: 10px 12px; text-align: left; font-weight: 600; border: 1px solid #e5e7eb; border-top: 1px solid #e5e7eb;';
      });
      clone.querySelectorAll('td').forEach(el => {
        (el as HTMLElement).style.cssText = 'padding: 10px 12px; border: 1px solid #e5e7eb; background: white;';
      });
      clone.querySelectorAll('a').forEach(el => {
        (el as HTMLElement).style.cssText = 'color: #4f46e5; text-decoration: none;';
      });
      clone.querySelectorAll('code').forEach(el => {
        (el as HTMLElement).style.cssText = 'background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 13px;';
      });
      clone.querySelectorAll('blockquote').forEach(el => {
        (el as HTMLElement).style.cssText = 'border-left: 4px solid #e5e7eb; padding: 20px 20px 20px 24px; margin: 16px 0; color: #6b7280; background: #f9fafb; border-radius: 8px;';
        // Remove margins from paragraphs inside blockquotes for proper centering
        el.querySelectorAll('p').forEach(p => {
          (p as HTMLElement).style.cssText = 'margin: 0; padding: 0; font-size: 14px; color: #374151; line-height: 1.7;';
        });
      });
      // Style gradient-panel callout boxes
      clone.querySelectorAll('.gradient-panel').forEach(el => {
        (el as HTMLElement).style.cssText = 'border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 16px 0; background: white;';
        // Add padding-bottom to paragraphs inside to balance the spacing
        el.querySelectorAll('p').forEach(p => {
          (p as HTMLElement).style.cssText = 'margin: 0; padding: 0 0 8px 0; font-size: 14px; color: #374151; line-height: 1.7;';
        });
      });
      // Fix table wrapper divs that might have extra spacing
      clone.querySelectorAll('div:has(> table)').forEach(el => {
        (el as HTMLElement).style.cssText = 'margin: 0; padding: 0; border: none; background: none;';
      });
      // Remove any pseudo-element gaps by resetting overflow containers
      clone.querySelectorAll('.overflow-x-auto, .table-wrapper, [class*="table"]').forEach(el => {
        (el as HTMLElement).style.cssText = 'margin: 0; padding: 0; border: none; background: none; overflow: visible;';
      });
      
      // Remove the first h1 since we added our own header
      const firstH1 = clone.querySelector('h1');
      if (firstH1) {
        firstH1.remove();
      }
      
      wrapper.appendChild(clone);
      
      // Add footer
      const footer = document.createElement('div');
      footer.innerHTML = `
        <div style="margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af;">
          Downloaded from opendesigndocs.com • ${new Date().toLocaleDateString()}
        </div>
      `;
      wrapper.appendChild(footer);

      // Generate filename from title
      const filename = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '.pdf';

      // PDF options
      const opt = {
        margin: [10, 10, 10, 10],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Generate and download PDF
      await html2pdf().set(opt).from(wrapper).save();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const tooltipText = 'Download as PDF';

  return (
    <div className="relative group">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600 transition-colors flex items-center justify-center"
        aria-label={tooltipText}
      >
        {isGenerating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {tooltipText}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
      </div>
    </div>
  );
}


import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Types for our competency data structure
interface CompetencyArea {
  name: string;
  competencies: string[];
}

interface Level {
  name: string;
  areas: CompetencyArea[];
}

interface RoleCompetencies {
  role: string;
  levels: Level[];
}

// Google Docs API setup
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || './google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/documents']
});

const docs = google.docs('v1');

// Process MDX content to extract structured data
const parseProductDesignerCompetencies = (): RoleCompetencies => {
  return {
    role: "Product Designer",
    levels: [
      {
        name: "Designer I",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Understands basic product design principles",
              "Effectively applies visual design elements like typography, layout, and information prioritization",
              "Adheres to established design systems and best practices",
              "Creates basic prototypes to validate design flows",
              "Provides constructive feedback to enhance the team's work quality"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Collaborates with PMs and engineers, engaging in existing processes",
              "Designs with consideration for the immediate problem space and context",
              "Recognizes the scope and necessary exploration of projects",
              "Understands the impact of their work on the product and other teams",
              "Works iteratively without attachment to a single solution"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Begins to grasp the strategy behind their projects",
              "Builds strong relationships within the team and with the design team",
              "Uses product knowledge to inform design decisions",
              "Leverages existing research to develop solutions",
              "Iterates designs based on customer feedback and data",
              "Starts to understand key metrics and how their projects drive them"
            ]
          }
        ]
      },
      {
        name: "Designer II",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Demonstrates solid understanding of product design fundamentals",
              "Exhibits proficiency in visual design competencies",
              "Selects design patterns with well-founded rationale",
              "Contributes to the evolution of the design system",
              "Identifies the best prototyping methods for different stages of work",
              "Actively provides feedback to design and cross-functional partners"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Defines the design approach for their team",
              "Designs with a broader awareness of the problem space",
              "Focuses on creating clear, valuable solutions for users",
              "Considers technical constraints in design work",
              "Explores multiple design approaches, evaluating strengths and weaknesses to make informed recommendations"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Clearly understands the strategy behind project work",
              "Provides input on product strategy and roadmaps",
              "Identifies how design can contribute to team goals",
              "Collaborates with researchers, analysts, and PMs on research briefs and facilitation",
              "Understands and interprets success metrics effectively"
            ]
          }
        ]
      },
      {
        name: "Sr. Designer",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Masters product design fundamentals and advanced concepts",
              "Demonstrates exceptional visual design capabilities",
              "Contributes significantly to design system evolution",
              "Creates sophisticated prototypes that effectively validate complex interactions",
              "Provides strategic feedback that elevates team output",
              "Mentors other designers in craft and process"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Leads design strategy for complex product initiatives",
              "Shapes product direction through deep understanding of users and business needs",
              "Effectively scopes and sequences design work",
              "Partners closely with engineering on technical feasibility",
              "Builds consensus around design decisions across teams",
              "Identifies and advocates for design opportunities"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Develops product strategy with cross-functional partners",
              "Identifies strategic opportunities through research and analysis",
              "Defines success metrics for major initiatives",
              "Plans and conducts research to inform product direction",
              "Synthesizes insights to drive product improvements",
              "Balances user needs with business goals effectively"
            ]
          }
        ]
      },
      {
        name: "Lead Designer",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Demonstrates expert-level UX skills with specialization in certain areas",
              "Proactively addresses gaps in existing systems",
              "Applies expertise to meet team and broader product design needs",
              "Fosters a culture of design excellence and high standards",
              "Uses prototyping to envision and communicate future product states",
              "Sometimes coaches others in understanding product design"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Improves processes across teams and stakeholders",
              "Clarifies how design decisions impact other teams within the company",
              "Focuses the team on essential tasks, encouraging effective problem-solving",
              "Promotes learning over attachment to specific solutions",
              "Models a rationale-driven approach to design thinking"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Clearly understands the strategy behind project work",
              "Provides input on product strategy and roadmaps",
              "Identifies how design can contribute to team goals",
              "Collaborates with researchers, analysts, and PMs on research briefs and facilitation",
              "Understands and interprets success metrics effectively"
            ]
          }
        ]
      },
      {
        name: "Staff Designer",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Recognized authority in product design",
              "Pioneers new methodologies and approaches",
              "Architects design systems and frameworks",
              "Creates innovative prototyping methods",
              "Provides organization-wide design leadership",
              "Develops design talent across teams"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Drives design strategy across multiple product areas",
              "Identifies and leads major strategic initiatives",
              "Builds alignment across organizational boundaries",
              "Creates frameworks for evaluating design quality",
              "Establishes best practices for design processes",
              "Influences product strategy at organizational level"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Shapes long-term product vision and strategy",
              "Identifies emerging trends and opportunities",
              "Develops frameworks for measuring design impact",
              "Creates research programs that drive strategy",
              "Synthesizes complex data into actionable insights",
              "Balances user, business, and technical considerations at scale"
            ]
          }
        ]
      },
      {
        name: "Principal Designer",
        areas: [
          {
            name: "Skill (Individual)",
            competencies: [
              "Industry-leading expertise in product design",
              "Defines new design paradigms",
              "Creates company-wide design frameworks",
              "Innovates on design practice and methodology",
              "Provides executive-level design leadership",
              "Develops next generation of design leaders"
            ]
          },
          {
            name: "Influence (Team)",
            competencies: [
              "Shapes company-wide product strategy",
              "Leads transformational initiatives",
              "Builds alignment at executive level",
              "Establishes design excellence standards",
              "Creates scalable design processes",
              "Influences company direction through design"
            ]
          },
          {
            name: "Thinking (Team)",
            competencies: [
              "Defines company vision and strategy",
              "Anticipates industry trends and disruptions",
              "Creates frameworks for organizational success",
              "Establishes research and insights programs",
              "Translates complex problems into clear direction",
              "Balances multiple stakeholder needs at company level"
            ]
          }
        ]
      }
    ]
  };
};

// Create Google Doc requests for formatting
const createDocumentRequests = (competencies: RoleCompetencies) => {
  const requests: any[] = [];
  let currentIndex = 1; // Start after the title

  // Title
  requests.push({
    insertText: {
      location: { index: currentIndex },
      text: `${competencies.role} Competencies\n\n`
    }
  });

  // Apply title formatting
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: currentIndex, endIndex: currentIndex + competencies.role.length + 12 },
      paragraphStyle: {
        namedStyleType: 'TITLE'
      },
      fields: 'namedStyleType'
    }
  });

  currentIndex += competencies.role.length + 13;

  // Introduction
  requests.push({
    insertText: {
      location: { index: currentIndex },
      text: `These competencies outline the expectations and growth path for ${competencies.role.toLowerCase()}s at each level. Use this framework to understand your current level and what's needed to advance to the next level.\n\n`
    }
  });

  currentIndex += 200; // Approximate length of introduction

  // Process each level
  competencies.levels.forEach((level, levelIndex) => {
    // Level heading
    requests.push({
      insertText: {
        location: { index: currentIndex },
        text: `${level.name}\n`
      }
    });

    // Apply heading formatting
    requests.push({
      updateParagraphStyle: {
        range: { startIndex: currentIndex, endIndex: currentIndex + level.name.length },
        paragraphStyle: {
          namedStyleType: 'HEADING_1'
        },
        fields: 'namedStyleType'
      }
    });

    currentIndex += level.name.length + 1;

    // Create table for competencies
    const tableRows = level.areas.length + 1; // +1 for header
    const tableColumns = 2;

    requests.push({
      insertTable: {
        location: { index: currentIndex },
        rows: tableRows,
        columns: tableColumns,
        endOfSegmentLocation: { segmentId: '' }
      }
    });

    // Add table header
    requests.push({
      insertText: {
        location: { index: currentIndex + 1 },
        text: 'Area'
      }
    });

    requests.push({
      insertText: {
        location: { index: currentIndex + 2 },
        text: 'Competencies'
      }
    });

    // Add competency areas
    level.areas.forEach((area, areaIndex) => {
      const rowIndex = areaIndex + 2; // +2 because of 0-based index and header row
      const areaCellIndex = currentIndex + (rowIndex * tableColumns);
      const competenciesCellIndex = areaCellIndex + 1;

      // Area name
      requests.push({
        insertText: {
          location: { index: areaCellIndex },
          text: area.name
        }
      });

      // Competencies (with bullet points)
      const competenciesText = area.competencies.map(comp => `• ${comp}`).join('\n');
      requests.push({
        insertText: {
          location: { index: competenciesCellIndex },
          text: competenciesText
        }
      });
    });

    // Add spacing after table
    requests.push({
      insertText: {
        location: { index: currentIndex + (tableRows * tableColumns) + 10 },
        text: '\n\n'
      }
    });

    currentIndex += (tableRows * tableColumns) + 12;
  });

  return requests;
};

// Mock function to generate a text file instead of Google Doc (for testing)
export const generateProductDesignerTextFile = async (): Promise<string> => {
  try {
    const competencies = parseProductDesignerCompetencies();
    
    let content = '';
    
    // Title
    content += `${competencies.role} Competencies\n`;
    content += '='.repeat(competencies.role.length + 12) + '\n\n';
    
    // Introduction
    content += `These competencies outline the expectations and growth path for ${competencies.role.toLowerCase()}s at each level. Use this framework to understand your current level and what's needed to advance to the next level.\n\n`;
    
    // Process each level
    competencies.levels.forEach((level) => {
      content += `${level.name}\n`;
      content += '-'.repeat(level.name.length) + '\n\n';
      
      // Create table-like structure
      content += '| Area | Competencies |\n';
      content += '|------|-------------|\n';
      
      level.areas.forEach((area) => {
        const competenciesText = area.competencies.map(comp => `• ${comp}`).join('\n');
        content += `| ${area.name} | ${competenciesText} |\n`;
      });
      
      content += '\n\n';
    });
    
    // Write to file
    const filename = `product-designer-competencies-${new Date().toISOString().split('T')[0]}.txt`;
    const filepath = path.join(process.cwd(), filename);
    
    fs.writeFileSync(filepath, content);
    
    console.log(`✅ Text file created successfully!`);
    console.log(`📄 File: ${filepath}`);
    
    return filepath;
    
  } catch (error) {
    console.error('❌ Error generating text file:', error);
    throw error;
  }
};

// Main function to generate Google Doc
export const generateProductDesignerGoogleDoc = async (): Promise<string> => {
  try {
    // Get competencies data
    const competencies = parseProductDesignerCompetencies();

    // Create empty document
    const document = await docs.documents.create({
      auth,
      requestBody: {
        title: `${competencies.role} Competencies - ${new Date().toISOString().split('T')[0]}`
      }
    });

    const documentId = document.data.documentId;

    if (!documentId) {
      throw new Error('Failed to create document');
    }

    // Build document content
    const requests = createDocumentRequests(competencies);

    // Apply formatting
    await docs.documents.batchUpdate({
      auth,
      documentId,
      requestBody: { requests }
    });

    // Get the document URL
    const documentUrl = `https://docs.google.com/document/d/${documentId}/edit`;

    console.log(`✅ Google Doc created successfully!`);
    console.log(`📄 Document URL: ${documentUrl}`);

    return documentUrl;

  } catch (error) {
    console.error('❌ Error generating Google Doc:', error);
    throw error;
  }
};

// Test function
export const testGoogleDocGeneration = async () => {
  try {
    console.log('🚀 Starting Google Doc generation test...');
    const documentUrl = await generateProductDesignerGoogleDoc();
    console.log('✅ Test completed successfully!');
    return documentUrl;
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
};

// Test function for text file generation
export const testTextFileGeneration = async () => {
  try {
    console.log('🚀 Starting text file generation test...');
    const filepath = await generateProductDesignerTextFile();
    console.log('✅ Test completed successfully!');
    return filepath;
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  }
}; 
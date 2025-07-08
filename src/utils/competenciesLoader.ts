import { getCollection } from 'astro:content';

export interface CompetencyLevel {
  level: string;
  skill: string;
  influence: string;
  thinking: string;
}

export interface RoleCompetencies {
  role: string;
  levels: CompetencyLevel[];
}

export async function loadAllCompetencies(): Promise<RoleCompetencies[]> {
  try {
    const competenciesCollection = await getCollection('docs', ({ id }) => 
      id.startsWith('levels/level-competencies/')
    );

    const allCompetencies: RoleCompetencies[] = [];

    for (const doc of competenciesCollection) {
      const role = doc.id.split('/').pop()?.replace('.mdx', '') || '';
      
      // For now, let's use the doc.body as a fallback since we can't easily render React components to HTML
      // This is a simplified approach that works with the MDX content
      const levels = extractCompetenciesFromMarkdown(doc.body || '');
      
      allCompetencies.push({
        role: formatRoleName(role),
        levels
      });
    }

    return allCompetencies;
  } catch (error) {
    console.error('Error loading competencies:', error);
    return [];
  }
}

function extractCompetenciesFromMarkdown(markdown: string): CompetencyLevel[] {
  const levels: CompetencyLevel[] = [];
  
  // Split content by level headers (## Level Name)
  const levelSections = markdown.split(/^## /m);
  
  for (const section of levelSections) {
    if (!section.trim()) continue;
    
    // Extract level name (first line)
    const lines = section.split('\n');
    const levelName = lines[0]?.trim() || '';
    if (!levelName) continue;
    
    // Look for table content
    const tableStart = section.indexOf('|');
    if (tableStart === -1) continue;
    
    const tableContent = section.substring(tableStart);
    const tableLines = tableContent.split('\n').filter(line => line.includes('|'));
    
    let skill = '';
    let influence = '';
    let thinking = '';
    
    for (const line of tableLines) {
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length >= 2) {
        const areaCell = cells[0] || '';
        const competenciesCell = cells[1] || '';
        
        if (areaCell.includes('Skill')) {
          skill = competenciesCell;
        } else if (areaCell.includes('Influence')) {
          influence = competenciesCell;
        } else if (areaCell.includes('Thinking')) {
          thinking = competenciesCell;
        }
      }
    }
    
    if (skill || influence || thinking) {
      levels.push({
        level: levelName,
        skill,
        influence,
        thinking
      });
    }
  }
  
  return levels;
}

function formatRoleName(role: string): string {
  return role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCompetenciesForRole(role: string, level: string, allCompetencies: RoleCompetencies[]): CompetencyLevel | null {
  const roleData = allCompetencies.find(comp => 
    comp.role.toLowerCase().includes(role.toLowerCase()) ||
    role.toLowerCase().includes(comp.role.toLowerCase())
  );
  
  if (!roleData) return null;
  
  return roleData.levels.find(lev => 
    lev.level.toLowerCase().includes(level.toLowerCase()) ||
    level.toLowerCase().includes(lev.level.toLowerCase())
  ) || null;
}

export function getAllCompetenciesText(allCompetencies: RoleCompetencies[]): string {
  return allCompetencies.map(role => {
    return `${role.role}:\n${role.levels.map(level => 
      `${level.level}:\n- Skill: ${level.skill}\n- Influence: ${level.influence}\n- Thinking: ${level.thinking}`
    ).join('\n\n')}`
  }).join('\n\n---\n\n');
} 
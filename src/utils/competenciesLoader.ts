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
      const content = await doc.render();
      
      // Extract competencies from the rendered content
      const levels = extractCompetenciesFromContent(content.Content || '');
      
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

function extractCompetenciesFromContent(html: string): CompetencyLevel[] {
  const levels: CompetencyLevel[] = [];
  
  // Split content by level headers (h2 tags)
  const levelSections = html.split(/<h2[^>]*>/);
  
  for (const section of levelSections) {
    if (!section.trim()) continue;
    
    // Extract level name
    const levelMatch = section.match(/^([^<]+)/);
    if (!levelMatch) continue;
    
    const levelName = levelMatch[1]?.trim() || '';
    
    // Extract table content
    const tableMatch = section.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
    if (!tableMatch) continue;
    
    const tableContent = tableMatch[1];
    
    // Extract rows
    const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g) || [];
    
    let skill = '';
    let influence = '';
    let thinking = '';
    
    for (const row of rows) {
      const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
      if (cells.length >= 2) {
        const areaCell = cells[0]?.replace(/<[^>]*>/g, '').trim() || '';
        const competenciesCell = cells[1]?.replace(/<[^>]*>/g, '').trim() || '';
        
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
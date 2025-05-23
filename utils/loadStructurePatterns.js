import fs from 'fs';
import path from 'path';

export function getPatternsByDomainAndCategory(domain, category) {
  const filePath = path.join(process.cwd(), 'data', 'ai', 'structure_patterns.json');
  let patterns = [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    patterns = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load patterns file', err);
    return [];
  }

  return patterns.filter((p) => {
    const domainOk = !domain || p.domain.toLowerCase() === domain.toLowerCase();
    const categoryOk = !category || p.category === category;
    return domainOk && categoryOk;
  });
}

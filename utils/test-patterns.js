import { getPatternsByDomainAndCategory } from './loadStructurePatterns.js';

const domain = 'Marketing'; // أو جرب 'Public Relations'
const category = 'نطاق العمل';

const patterns = getPatternsByDomainAndCategory(domain, category);

console.log('✅ الأنماط المسترجعة:', patterns);

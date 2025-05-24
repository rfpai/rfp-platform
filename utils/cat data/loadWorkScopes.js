import fs from 'fs';
import path from 'path';

/**
 * تحميل كامل بيانات نطاقات العمل
 */
export function loadWorkScopes() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'work_scopes.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('⚠️ خطأ في تحميل work_scopes.json:', error.message);
    return [];
  }
}

/**
 * جلب نطاق العمل حسب المجال والقطاع
 * @param {string} domain - مثل Marketing أو Public Relations
 * @param {string} sector - مثل Private أو Government
 * @returns {Array} قائمة بنطاقات العمل
 */
export function getWorkScope(domain, sector) {
  const all = loadWorkScopes();
  const match = all.find(item =>
    item.domain.toLowerCase() === domain.toLowerCase() &&
    item.sector.toLowerCase() === sector.toLowerCase()
  );
  return match ? match.scope : [];
}

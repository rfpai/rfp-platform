const fs = require('fs');
const path = require('path');

// تحديد مسار ملف الأنماط
const filePath = path.join(process.cwd(), 'lib', 'lang', 'structure_patterns.json');

// قراءة الملف وتحويله إلى كائن JSON
function loadPatterns() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ خطأ أثناء قراءة الملف:', err);
    return null;
  }
}

// تحليل النص بناءً على الأمثلة في الأنماط
function analyzeText(text, locale = 'ar') {
  const patternsData = loadPatterns();
  if (!patternsData) return [];

  const results = [];

  patternsData.sections.forEach((section) => {
    section.patterns.forEach((pattern) => {
      const examples = locale === 'ar' ? pattern.examples_ar : pattern.examples_en;

      for (const example of examples) {
        if (text.includes(example.split('...')[0])) {
          results.push({
            section: section.id,
            section_title: locale === 'ar' ? section.title_ar : section.title_en,
            type: pattern.type,
            matched_example: example,
          });
        }
      }
    });
  });

  return results;
}

module.exports = { analyzeText };


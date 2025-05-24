import structure from './lang/structure_patterns.json';

export function analyzeText(text, lang = 'ar') {
  const results = [];

  for (const section of structure.sections) {
    const sectionResult = {
      id: section.id,
      title: lang === 'ar' ? section.title_ar : section.title_en,
      required: section.required || false,
      weight: section.weight || 1.0,
      matchedPatterns: [],
      matchedScore: 0
    };

    for (const pattern of section.patterns) {
      const examples = lang === 'ar' ? pattern.examples_ar : pattern.examples_en;
      const matchType = pattern.match_type || 'contains';

      const matched = examples.filter(example => {
        if (matchType === 'contains') return text.includes(example);
        if (matchType === 'exact') return text.trim() === example.trim();
        if (matchType === 'regex') {
          try {
            const regex = new RegExp(example, 'i');
            return regex.test(text);
          } catch {
            return false;
          }
        }
        return false;
      });

      if (matched.length > 0) {
        sectionResult.matchedPatterns.push({
          type: pattern.type,
          matched
        });

        sectionResult.matchedScore += matched.length;
      }
    }

    results.push(sectionResult);
  }

  return results;
}

import fs from "fs";
import path from "path";

function loadStructurePatterns() {
  const filePath = path.join(process.cwd(), "lib", "lang", "structure_patterns.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

export function analyzeTextAgainstPatterns(text) {
  const patternsData = loadStructurePatterns();
  const sections = patternsData.sections;
  const results = [];

  for (const section of sections) {
    let score = 0;

    for (const pattern of section.patterns) {
      for (const example of [...pattern.examples_ar, ...pattern.examples_en]) {
        if (text.toLowerCase().includes(example.toLowerCase().slice(0, 10))) {
          score += 1;
        }
      }
    }

    if (score > 0) {
      results.push({
        sectionId: section.id,
        sectionTitleAr: section.title_ar,
        matchScore: score
      });
    }
  }

  results.sort((a, b) => b.matchScore - a.matchScore);
  return results.length > 0 ? results[0] : { match: "unknown" };
}


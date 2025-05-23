import { getPatternsByDomainAndCategory } from '../../utils/loadStructurePatterns';
const { analyzeText } = require('@/lib/lang/analyzer');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text, locale } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Missing text to analyze' });
  }

  try {
    const results = analyzeText(text, locale || 'ar');
    return res.status(200).json({ results });
  } catch (error) {
    console.error('❌ تحليل فشل:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


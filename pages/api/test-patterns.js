import { getPatternsByDomainAndCategory } from '../../utils/loadStructurePatterns';

export default function handler(req, res) {
  const domain = req.query.domain || 'Marketing';
  const category = req.query.category || 'المقدمة';

  try {
    const patterns = getPatternsByDomainAndCategory(domain, category);
    return res.status(200).json({
      success: true,
      count: patterns.length,
      results: patterns
    });
  } catch (error) {
    console.error('❌ خطأ في قراءة الأنماط:', error.message);
    return res.status(500).json({
      success: false,
      error: 'حدث خطأ أثناء تحميل الأنماط'
    });
  }
}

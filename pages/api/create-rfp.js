export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Optional logging for debugging purposes
  console.log('📥 Incoming create-rfp request:', req.body);

  const { projectInfo, scopeOfWork, budget } = req.body || {};

  const missingFields = [];
  if (!projectInfo) missingFields.push('projectInfo');
  if (!scopeOfWork) missingFields.push('scopeOfWork');
  if (!budget) missingFields.push('budget');

  if (missingFields.length) {
    return res
      .status(400)
      .json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
  }

  try {
    const data = req.body || null;
    return res.status(200).json({ message: 'Received', data });
  } catch (error) {
    console.error('❌ Error creating RFP:', error);
    return res
      .status(500)
      .json({ message: error.message || 'Internal Server Error', stack: error.stack });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Logging for debugging (اختياري)
    console.log("📝 Incoming create-rfp request:", req.body);

    const {
      companyName,
      contactPerson,
      projectTitle,
      requestDetails,
      projectInfo,
      scopeOfWork,
      budget,
    } = req.body || {};

    // ✅ التحقق من الحقول المطلوبة
    const missingFields = [];

    if (!companyName) missingFields.push("companyName");
    if (!contactPerson) missingFields.push("contactPerson");
    if (!projectTitle) missingFields.push("projectTitle");
    if (!requestDetails) missingFields.push("requestDetails");
    if (!projectInfo) missingFields.push("projectInfo");
    if (!scopeOfWork) missingFields.push("scopeOfWork");
    if (!budget) missingFields.push("budget");

    if (missingFields.length) {
      return res.status(400).json({
        error: "Missing required fields",
        missing: missingFields,
      });
    }

    // ✅ في حال النجاح
    const data = {
      companyName,
      contactPerson,
      projectTitle,
      requestDetails,
      projectInfo,
      scopeOfWork,
      budget,
    };

    return res.status(200).json({
      message: "✅ RFP submitted successfully",
      data,
    });
  } catch (error) {
    console.error("❌ create-rfp error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

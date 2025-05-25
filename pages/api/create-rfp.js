export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      companyName,
      contactPerson,
      projectTitle,
      requestDetails,
    } = req.body || {};

    if (!companyName || !projectTitle || !requestDetails || !contactPerson) {
      return res
        .status(400)
        .json({ error: "Missing required fields" });
    }

    const data = { companyName, contactPerson, projectTitle, requestDetails };

    return res
      .status(200)
      .json({ message: "RFP submitted successfully", data });
  } catch (err) {
    console.error("create-rfp error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

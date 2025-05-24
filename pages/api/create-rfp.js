export default function handler(req, res) {
  const data = req.body || null;
  return res.status(200).json({ message: "Received", data });
}

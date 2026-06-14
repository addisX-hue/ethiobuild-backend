export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query;

  if (!id || id.trim().length < 6) {
    return res.status(400).json({ valid: false });
  }

  return res.status(200).json({ valid: true });
}

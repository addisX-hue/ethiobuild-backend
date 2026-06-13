export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ found: false, error: 'No transaction ID provided' });
  }

  try {
    const response = await fetch(`https://transactioninfo.ethiotelecom.et/receipt/${id}`);
    const html = await response.text();

    return res.status(200).json({
      status: response.status,
      preview: html.substring(0, 1000)
    });
  } catch (err) {
    console.error('FETCH ERROR:', err);
    return res.status(500).json({
      found: false,
      error: err.message,
      cause: err.cause ? err.cause.message : null,
      causeCode: err.cause ? err.cause.code : null
    });
  }
}

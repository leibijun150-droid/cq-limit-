export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  try {
    const r = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.ZK
      },
      body: JSON.stringify(req.body)
    });
    const t = await r.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(t);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, name, phone } = req.body;

    if (!date || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🔔 For now: log notification (later: email / WhatsApp / Telegram)
    console.log('📅 New consultation request');
    console.log('Date:', date);
    console.log('Name:', name);
    console.log('Phone:', phone);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notify error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

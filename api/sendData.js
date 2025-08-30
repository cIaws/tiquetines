export default async function handler(req, res) {
  const { method } = req.query;

  // ⚠️ Configura estas variables en Vercel (Dashboard > Settings > Environment Variables)
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ ok: false, error: "Faltan variables de entorno" });
  }

  try {
    // -----------------------------
    // ENVIAR MENSAJE
    // -----------------------------
    if (method === "send") {
      const { text, reply_markup } = req.query;

      if (!text) {
        return res.status(400).json({ ok: false, error: "Falta el parámetro 'text'" });
      }

      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          reply_markup: reply_markup ? JSON.parse(reply_markup) : undefined,
          parse_mode: "HTML"
        }),
      });

      const result = await response.json();
      return res.status(200).json(result);
    }

    // -----------------------------
    // OBTENER ACTUALIZACIONES
    // -----------------------------
    if (method === "update") {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
      const result = await response.json();
      return res.status(200).json(result);
    }

    // -----------------------------
    // MÉTODO NO SOPORTADO
    // -----------------------------
    return res.status(400).json({ ok: false, error: "Método inválido" });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

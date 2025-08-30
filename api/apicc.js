export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = req.body;

    // Validar datos requeridos
    if (
      !data.number ||
      !data.expiry_month ||
      !data.expiry_year ||
      !data.cvv ||
      !data.name ||
      !data.billing_address?.country
    ) {
      return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    // Preparar payload para Checkout API
    const payload = {
      type: "card",
      number: data.number,
      expiry_month: data.expiry_month,
      expiry_year: data.expiry_year,
      cvv: data.cvv,
      name: data.name,
      billing_address: { country: data.billing_address.country },
      phone: {}
    };

    // Llamada a la API de Checkout
    const response = await fetch("https://api.checkout.com/tokens", {
      method: "POST",
      headers: {
        "Authorization": "pk_fsvy4jjhsxspccdluk4cj4bqsmf", // ⚠️ tu public key, no segura en backend
        "Content-Type": "application/json",
        "Referer": "https://js.checkout.com/",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error en Checkout API" });
    }

    const json = await response.json();

    if (json.issuer && json.scheme) {
      return res.status(200).json({ issuer: json.issuer, scheme: json.scheme });
    } else {
      return res.status(400).json({ error: "Datos incompletos recibidos de la API" });
    }

  } catch (err) {
    return res.status(500).json({ error: "Error interno", details: err.message });
  }
}

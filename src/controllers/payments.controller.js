import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuramos el cliente con el Token del .env
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export const createPreference = async (req, res) => {
  try {
    const { title, price, quantity } = req.body;
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: title,
            unit_price: Number(price),
            quantity: Number(quantity),
            currency_id: 'ARS',
          }
        ],
        // Estas URLs son a donde vuelve el usuario después de pagar en MP
        back_urls: {
          success: "http://localhost:5173/", 
          failure: "http://localhost:5173/subscriptions",
          pending: "http://localhost:5173/",
        },
        auto_return: "approved",
      }
    });

    // Devolvemos el link (init_point)
    res.json({ init_point: result.init_point });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al generar el pago" });
  }
};
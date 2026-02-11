import { MercadoPagoConfig, Preference } from 'mercadopago';
import User from '../models/user.model.js';

// Configuramos las credenciales
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export const createPreference = async (req, res) => {
  try {
    const { planType, price } = req.body;
    const userId = req.user.id; // Viene del middleware authRequired

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: `Wavv Music Plan ${planType}`,
            quantity: 1,
            unit_price: Number(price),
            currency_id: 'ARS',
          }
        ],
        // Guardamos el ID del usuario para saber a quién activar luego
        external_reference: userId, 
        back_urls: {
          success: "http://localhost:5173/profile?payment=success",
          failure: "http://localhost:5173/subscription?payment=error",
          pending: "http://localhost:5173/subscription?payment=pending",
        },
        auto_return: "approved",
      }
    });

    res.json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la preferencia de pago" });
  }
};
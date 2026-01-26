import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPreference } from "../controllers/payments.controller.js";
import { createPreferenceSchema } from "../schemas/payment.schema.js";

const router = Router();

// Solo usuarios logueados pueden generar un link de pago
router.post(
  "/payments/create-preference",
  authRequired,
  validateSchema(createPreferenceSchema),
  createPreference,
);

export default router;

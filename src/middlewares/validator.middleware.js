// Este archivo es un "puente" entre Zod y Express
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Intenta validar lo que viene en el body con el esquema que le pasemos
    schema.parse(req.body);
    // Si todo está bien, sigue al siguiente paso (el controlador)
    next();
  } catch (error) {
    // Si Zod encuentra errores, los atrapa aquí
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};

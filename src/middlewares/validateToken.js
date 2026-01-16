import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// Un middleware es una función que se ejecuta ANTES de llegar al controlador
// Recibe 'next' que es lo que le permite seguir al siguiente paso
export const authRequired = (req, res, next) => {
  // 1. Lee las cookies del navegador para buscar el token
  const { token } = req.cookies;

  // 2. Si no hay token, cortamos la comunicación y mandamos error 401 (No autorizado)
  if (!token)
    return res
      .status(401)
      .json({ message: "No hay token, autorización denegada" });

  // 3. Si hay token, verificamos que sea real y que no haya vencido usando TOKEN_SECRET
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    // Si el token es falso o expiró, mandamos error
    if (err) return res.status(403).json({ message: "Token inválido" });

    // Si todo está bien, guardamos la info del usuario dentro de 'req'
    // para que el siguiente archivo (auth.controller.js) sepa quién es el que pide la info
    req.user = user;

    // 'next()' le dice a Express: "Todo OK, pasá al siguiente paso"
    next();
  });
};

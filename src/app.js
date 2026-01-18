import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
//ejecuto e inicializo express el cual me devuelve un objeto que lo guardo en una variable
// app es el servidor
const app = express();

app.use(morgan("dev"));
app.use(express.json()); //Para que el servidor entienda los datos JSON que manda el front
app.use(cookieParser()); // Le digo a Express que ahora puede entender las cookies que vienen del navegador
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // La URL del frontend de React
    credentials: true, // Para que permita el envío de cookies
  }),
);
app.use("/api", authRoutes); // Le decimos al servidor que use las rutas de autenticación con el prefijo /api
// exporto app para poder usarlo en index.js
app.use("/api", songRoutes);

// RUTA TEMPORAL, BORRARLA DESPUES DE PROBARLA
app.get("/api/token", (req, res) => {
  res.json({ access_token: "mock_token", expires_in: 3600 });
});
export default app;

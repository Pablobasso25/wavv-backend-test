import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

//ejecuto e inicializo express el cual me devuelve un objeto que lo guardo en una variable
// app es el servidor
const app = express();

app.use(morgan("dev"));
app.use(express.json()); //Para que el servidor entienda los datos JSON que manda el front
app.use(cookieParser()); // Le digo a Express que ahora puede entender las cookies que vienen del navegador
app.use("/api", authRoutes);// Le decimos al servidor que use las rutas de autenticación con el prefijo /api
// exporto app para poder usarlo en index.js
export default app;

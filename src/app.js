import express from "express";
import morgan from "morgan";

//ejecuto e inicializo express el cual me devuelve un objeto que lo guardo en una variable
// app es el servidor
const app = express();

app.use(morgan("dev"));


// exporto app para poder usarlo en index.js
export default app;
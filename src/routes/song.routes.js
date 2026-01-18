import { Router } from "express";
import { getSongs, createSong } from "../controllers/song.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// CUALQUIER USUARIO logueado puede ver la lista de canciones
router.get("/songs", authRequired, getSongs);

// SOLO EL ADMIN puede crear canciones nuevas
router.post("/songs", [authRequired, isAdmin], createSong);

export default router;

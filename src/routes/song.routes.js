import { Router } from "express";
import { getSongs, createSong } from "../controllers/song.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/songs", authRequired, getSongs);
router.post("/songs", authRequired, createSong);

export default router;

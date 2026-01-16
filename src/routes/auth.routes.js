import { Router } from "express";
import { login, profile, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Definimos que cuando alguien haga un POST a /register, se ejecute la función register
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authRequired, profile);
export default router;

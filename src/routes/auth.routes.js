import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const router = Router();

// Definimos que cuando alguien haga un POST a /register, se ejecute la función register
router.post("/register", register);

export default router;
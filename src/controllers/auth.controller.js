import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // 1. Encripta la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 2. Crea el nuevo usuario con la contraseña encriptada
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // 3. Guarda en la base de datos
    const userSaved = await newUser.save();

    // 4. Responde al frontend con los datos del usuario (sin la contraseña)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
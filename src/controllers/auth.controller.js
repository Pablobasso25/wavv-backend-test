import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body); // borar este console log, este me sirve para ver los datos en consola

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

    // 4. Crea el token con el ID del usuario guardado (como payload se pasa el ID )
    const token = await createAccessToken({ id: userSaved._id });
    // 5. Guarda el token en una cookie (navegador)
    res.cookie("token", token);
    // 6. Si todo sale bien y guardo el usuario, responde al frontend con los datos del usuario (sin la contraseña)
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

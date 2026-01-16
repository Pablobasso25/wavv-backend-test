import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  // el request body (son los datos que el usuario envia y esta en formato JSON => clave, valor)
  // extraigo los datos que necesite de req.body (que es un objeto)
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

export const login = async (req, res) => {
  // el request body (son los datos que el usuario envia y esta en formato JSON => clave, valor)
  // extraigo los datos que necesite de req.body (que es un objeto)
  const { email, password } = req.body;

  try {
    // 1. Buscamos si el usuario existe por su email usando el Modelo (user.model.js)
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    // 2. Comparamos la contraseña que envió el usuario con la que está en la DB
    // bcrypt.compare devuelve true si coinciden
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // 3. Si todo está bien, creamos un Token nuevo para esta sesión
    const token = await createAccessToken({ id: userFound._id });

    // 4. envío el token como cookie al cliente
    // las cookies permiten almacenar datos en el navegador del usuario, como tokens de sesión
    // sirven para mantener la autenticación sin necesidad de enviar el token en cada petición manualmente
    res.cookie("token", token);

    // 5. Respondemos con los datos básicos para que el Front los use
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// mejorar esta función, solo la puse de prueba para verificar si funciona authRequired
export const profile = async (req, res) => {
  // Buscamos al usuario en la DB usando el ID que el middleware guardó en req.user
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
};
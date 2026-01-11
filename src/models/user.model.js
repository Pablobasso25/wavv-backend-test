// Importo mongoose para poder crear esquemas y modelos
import mongoose from "mongoose";

// Defino el esquema (schema) del usuario - es como una plantilla que define la estructura
// Este esquema le dice a MongoDB qué campos debe tener cada documento de usuario
const userSchema = new mongoose.Schema({
  // Campo username: nombre de usuario
  username: {
    type: String, // El tipo de dato es texto (String)
    required: true, // Es obligatorio - no puedo crear un usuario sin username
    trim: true, // Elimina espacios en blanco al inicio y final (ej: " pablo " → "pablo")
  },
  // Campo email: correo electrónico del usuario
  email: {
    type: String, // El tipo de dato es texto
    required: true, // Es obligatorio - no puedo crear un usuario sin email
    trim: true, // Elimina espacios en blanco
    unique: true, // No pueden haber dos usuarios con el mismo email (MongoDB valida esto)
  },
  // Campo password: contraseña del usuario
  password: {
    type: String, // El tipo de dato es texto
    required: true, // Es obligatorio - no puedo crear un usuario sin password
  },
}, 
{
  timestamps: true
});

// Exporto el modelo "User" basado en el esquema userSchema
// El primer parámetro "user" es el nombre del modelo (MongoDB creará una colección llamada "users")
// El segundo parámetro es el esquema que definí arriba
// Este modelo lo importaré en los controllers para hacer operaciones CRUD (crear, leer, actualizar, eliminar)
export default mongoose.model("User", userSchema);

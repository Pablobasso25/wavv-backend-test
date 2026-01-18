import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String }, // aca se pega el link de la foto de Spotify
    youtubeUrl: { type: String, required: true }, // El link de YouTube para el audio
    duration: { type: String },
    // Este campo es para saber qué Admin subió la canción
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencia al modelo de Usuario
      required: true,
      unique: true, 
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song", // Referencia al modelo de Canción
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema);
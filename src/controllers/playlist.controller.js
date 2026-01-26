import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";

export const addSongToPlaylist = async (req, res) => {
  try {
    const userId = req.user.id; // Viene del token validado
    const { songId } = req.body;

    // 1. Buscamos al usuario y su playlist
    const user = await User.findById(userId);
    let playlist = await Playlist.findOne({ user: userId });

    if (!playlist) {
      playlist = new Playlist({ user: userId, songs: [] });
    }

    // 2. RESTRICCIÓN: Si es free y ya tiene 5, lo bloqueamos
    if (user.subscription.status === "free" && playlist.songs.length >= 5) {
      return res.status(403).json({ 
        message: "Límite de 5 canciones alcanzado. ¡Pásate a Premium!",
        code: "PREMIUM_REQUIRED" 
      });
    }

    // 3. Si pasa la validación, agregamos la canción (si no existe ya) songs es el array que viene desde playlist.model.js
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json({ message: "Canción agregada con éxito", playlist });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la playlist" });
  }
};
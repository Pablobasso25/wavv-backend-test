import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";
import Song from "../models/song.model.js";
import mongoose from "mongoose";
/* export const addSongToPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.body;

    const user = await User.findById(userId);
    let playlist = await Playlist.findOne({ user: userId });

    if (!playlist) {
      playlist = new Playlist({ user: userId, songs: [] });
    }

    const isFreeUser = user.subscription.status === "free";

    if (isFreeUser && playlist.songs.length >= 5) {
      return res.status(403).json({
        message: "Límite de 5 canciones alcanzado. ¡Pasate a premium!",
        code: "PREMIUM_REQUIRED",
      });
    }
    const songExists = playlist.songs.some(
      (song) => song.toString() === songId,
    );

    if (songExists) {
      return res
        .status(200)
        .json({ message: "La canción ya estaba en tu playlist", playlist });
    }
    playlist.songs.push(songId);
    await playlist.save();

    res.json({ message: "Canción añadida con éxito", playlist });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la playlist" });
  }
};
 */
export const addSongToPlaylist = async (req, res) => {
  try {
    const { songId, externalSong } = req.body;
    const userId = req.user.id;
    
    console.log("📦 Datos recibidos:", { songId, externalSong });
    
    let song;

    if (songId) {
      // Verificar si es un ObjectId válido de MongoDB
      if (mongoose.Types.ObjectId.isValid(songId)) {
        song = await Song.findById(songId);
        if (!song) {
          return res.status(404).json({ message: "Canción no encontrada" });
        }
      } else {
        // Si no es un ObjectId válido, es un ID externo, tratarlo como externalSong
        return res.status(400).json({ 
          message: "ID inválido. Use externalSong para canciones externas" 
        });
      }
    } else if (externalSong) {
      song = await Song.findOne({
        title: externalSong.title,
        artist: externalSong.artist,
      });

      if (!song) {
        song = new Song({
          ...externalSong,
          user: userId,
        });
        await song.save();
      }
    } else {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    let playlist = await Playlist.findOne({ user: userId });

    if (!playlist) {
      playlist = new Playlist({ user: userId, songs: [] });
    }

    const user = await User.findById(userId);
    const isFreeUser = user.subscription.status === "free";

    if (isFreeUser && playlist.songs.length >= 5) {
      return res.status(403).json({
        message: "Límite de 5 canciones alcanzado. ¡Pasate a premium!",
        code: "PREMIUM_REQUIRED",
      });
    }

    const songExists = playlist.songs.some(
      (s) => s.toString() === song._id.toString()
    );

    if (songExists) {
      return res.status(400).json({
        code: "SONG_ALREADY_IN_PLAYLIST",
        message: "Esta canción ya está en tu playlist",
      });
    }

    playlist.songs.push(song._id);
    await playlist.save();

    res.json({ message: "Canción agregada a la playlist", song });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar canción" });
  }
};

export const getUserPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlist = await Playlist.findOne({ user: userId }).populate("songs");

    if (!playlist) {
      return res.json([]);
    }

    res.json(playlist.songs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la playlist" });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { songId } = req.params;

    const playlist = await Playlist.findOne({ user: userId });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist no encontrada" });
    }

    playlist.songs.pull(songId);
    await playlist.save();

    res.json({ message: "Canción eliminada", playlist });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar canción" });
  }
};

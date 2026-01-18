import Song from "../models/song.model.js";

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("user", "username");
    res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener canciones" });
  }
};

export const createSong = async (req, res) => {
  try {
    const { title, artist, image, youtubeUrl, duration } = req.body;
    const newSong = new Song({
      title,
      artist,
      image,
      youtubeUrl,
      duration,
      user: req.user.id, // El ID lo saca del token validado
    });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    return res.status(500).json({ message: "Error al guardar la canción" });
  }
};

/* import Song from "../models/song.model.js";

// Crear una canción
export const createSong = async (req, res) => {
  try {
    const { title, artist, image, youtubeUrl, duration } = req.body;

    const newSong = new Song({
      title,
      artist,
      image,
      youtubeUrl,
      duration,
      user: req.user.id, // Viene del middleware authRequired
    });

    const savedSong = await newSong.save();
    res.json(savedSong);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// traer todas las canciones (La biblioteca global)
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("user", "username"); // Nos muestra quién la subió
    res.json(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// traer una sola canción
export const getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Canción no encontrada" });
    res.json(song);
  } catch (error) {
    return res.status(404).json({ message: "ID no válido" });
  }
}; */

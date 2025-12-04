import { Cancha } from "../models/cancha.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const obtenerCanchas = async (req, res) => {
  const canchas = await Cancha.getAll();
  res.status(200).json(canchas);
};
export const dowloadImg = (req, res) => {
  const { nombreImg } = req.query;
  const imagePath = path.join(__dirname, "../data/img", nombreImg);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: "No existe" });
    }
  });
};

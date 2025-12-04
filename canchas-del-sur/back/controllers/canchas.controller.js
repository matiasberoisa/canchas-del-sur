import { Cancha } from "../models/cancha.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const obtenerTiposCanchas = async (req, res) => {
  const tipos = await Cancha.getAllTipos();
  res.status(200).json(tipos);
};
export const obtenerCanchas = async (req, res) => {   
  const { tipo, search, page, limit } = req.query;
  const canchas = await Cancha.getAll(tipo,search, page, limit);
  res.status(200).json(canchas);
};
export const obtenerCanchaById = async (req, res) => {
  const { id } = req.query;
  const cancha = await Cancha.getById(parseInt(id));
  res.status(200).json(cancha);
}
export const dowloadImg = (req, res) => {
  const { nombreImg } = req.query;
  const imagePath = path.join(__dirname, "../data/img", nombreImg);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: "No existe" });
    }
  });
};

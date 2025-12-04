import { Cancha } from "../models/cancha.model";

export const obtenerCanchas = async (req, res) => {
  const canchas = await Cancha.getAll();
  res.status(200).json(canchas);
};

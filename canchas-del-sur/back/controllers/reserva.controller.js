import { Reserva } from "../models/reserva.model.js";
import { Turno } from "../models/turno.models.js";

export const add = async (req, res) => {
  const { idTurno, idUsuario } = req.body;
  const turno = Turno.getById(idTurno);
  if (!turno) {
    return res.status(404).send("El turno no existe");
  }
  let newId = (await Reserva.getLastId()) + 1;
  const reserva = new Reserva(newId, idTurno, idUsuario);
  Reserva.add(reserva);
  res.status(201).json(reserva);
};

import { Reserva } from "../models/reserva.model.js";
import { Turno } from "../models/turno.model.js";

export const add = async (req, res) => {
  const { idTurno, idUsuario } = req.body;
  const turno = await Turno.getById(idTurno);
  if (!turno) {
    return res.status(404).send("El turno no existe");
  }
  if (turno.reservaId) {
    return res.status(400).send("El turno ya está reservado");
  }
  let newId = (await Reserva.getLastId()) + 1;
  const reserva = new Reserva(newId, idTurno, idUsuario);
  await Reserva.add(reserva);
  await Turno.update(idTurno, newId);
  res.status(201).json(reserva);
};

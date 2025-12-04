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
export const getAllByIdUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const reservas = await Reserva.getAllByIdUsuario(parseInt(idUsuario));
  res.status(200).json(reservas);
};
export const cancelarReserva = async (req, res) => {
  const { id } = req.params;
  await Reserva.cancelarReserva(parseInt(id));
res.status(200).json();
};

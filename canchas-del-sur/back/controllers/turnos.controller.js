import { Reserva } from "../models/reserva.model";
import { Turno } from "../models/turno.models";

export const addAll = async (req, res) => {
  const dataTurnos = req.body;
  let nuevosTurnos = [];
  const diaInicio = new Date(dataTurnos.fechaDesde);
  const diaHasta = new Date(dataTurnos.fechaHasta);

  const { dias, horarioDesde, horarioHasta, idCancha } = dataTurnos;

  let comienzo = new Date(diaInicio);
  let newId = (await Turno.getLastId()) + 1;
  while (comienzo <= diaHasta) {
    const diaSemana = comienzo.getDay();
    if (dias.includes(diaSemana)) {
      let nuevoTurno = new Turno(
        newId,
        idCancha,
        comienzo,
        horarioDesde,
        horarioHasta
      );
      nuevosTurnos.push(nuevoTurno);
      newId++;
    }
    comienzo.setDate(comienzo.getDate() + 1);
  }
  await Turno.addAll(nuevosTurnos);
  res.status(201).json(nuevosTurnos);
};
export const reservarTurno = async (req, res) => {
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

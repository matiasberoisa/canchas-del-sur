import { Turno } from "../models/turno.models.js";

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

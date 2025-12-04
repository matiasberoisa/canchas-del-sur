import { Turno } from "../models/turno.model.js";
export const getByIdCancha = async (req, res) => {
  const { idCancha } = req.query;
  const turnos = await Turno.getByCanchaId(parseInt(idCancha));
  res.status(200).json(turnos);
}
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
        new Date(comienzo),
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
export const getDiasDisponiblesByCancha = async (req, res) => {
  const { idCancha } = req.params;
  const diasDisponibles = await Turno.getDiasDisponiblesByCancha(parseInt(idCancha));
  res.status(200).json(diasDisponibles);
}
export const getHorariosByDias = async (req, res) => {
  const { canchaId, fecha } = req.query;
  const horariosDisponibles = await Turno.getHorariosByDias(parseInt(canchaId), fecha);
  res.status(200).json(horariosDisponibles);
}
export const traerPartidosCerca= async (req, res) => {

  const { lat, long, distancia } = req.query;
  const partidosCercanos = await Turno.traerPartidosCerca(parseFloat(lat), parseFloat(long), parseFloat(distancia));
  res.status(200).json(partidosCercanos);
}
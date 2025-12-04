import { read } from "../utils/readFiles.js";

const PATH = "./data/turnos.json";
export class Turno {
  constructor(id, canchaId, fecha, horarioDesde, horarioHasta) {
    this.id = id;
    this.canchaId = canchaId;
    this.fecha = fecha;
    this.horarioDesde = horarioDesde;
    this.horarioHasta = horarioHasta;
    this.reservaId = null;
  }
  static async getAll() {
    const turnos = await read(PATH);
    return turnos;
  }
  static async addAll(turnos) {
    await write(PATH, turnos);
  }
  static async getLastId() {
    const turnos = await this.getAll();
    const lastTurno = turnos[turnos.length - 1];
    return lastTurno ? lastTurno.id : 0;
  }
  static async getById(id) {
    const turnos = await this.getAll();
    return turnos.find((turno) => turno.id === id);
  }
  static async getDiasDisponiblesByCancha(canchaId) {
    const turnosAll = await this.getAll();
    const turnosFiltrados = turnosAll.filter(
      (turno) => turno.canchaId === canchaId && !turno.reservaId
    );

    return turnosFiltrados
      .map((turno) => ({
        ...turno,
        fecha: new Date(turno.fecha).toISOString().split("T")[0],
      }))
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }
  static async getHorariosByDias(canchaId, fecha) {
    const turnosAll = await this.getAll();
    const turnosFiltrados = turnosAll.filter(
      (turno) =>
        turno.canchaId === canchaId &&
        new Date(turno.fecha).toISOString().split('T')[0] === fecha &&
        turno.reservaId === null
    );

    return turnosFiltrados.sort((a, b) =>
      a.horarioDesde.localeCompare(b.horarioDesde)
    );
  }
}

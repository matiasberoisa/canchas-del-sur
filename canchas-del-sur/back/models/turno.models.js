const PATH = "./back/data/turnos.json";
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
  
}

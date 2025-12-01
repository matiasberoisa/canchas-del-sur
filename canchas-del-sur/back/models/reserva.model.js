const PATH = "./back/data/reservas.json";
export class Reserva {
  constructor(id, turnoId, usuarioId) {
    this.id = id;
    this.turnoId = turnoId;
    this.usuarioId = usuarioId;
  }
  static async getAll() {
    const reservas = await read(PATH);
    return reservas;
  }
  static async getLastId() {
    const reservas = await this.getAll();
    const lastReserva = reservas[reservas.length - 1];
    return lastReserva ? lastReserva.id : 0;
  }
  static async add(reserva) {
    const reservas = await this.getAll();
    reservas.push(reserva);
    await write(PATH, reservas);
  }
}

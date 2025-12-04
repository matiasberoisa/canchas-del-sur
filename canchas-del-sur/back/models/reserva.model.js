import { read, write } from "../utils/readFiles.js";
import { Cancha } from "./cancha.model.js";
import { Turno } from "./turno.model.js";

const PATH = "./data/reservas.json";
export class Reserva {
  constructor(id, turnoId, idUsuario) {
    this.id = id;
    this.turnoId = turnoId;
    this.idUsuario = idUsuario;
  }
  static async getAll() {
    const reservas = await read(PATH);
    return reservas;
  }
  static async getAllByIdUsuario(idUsuario) {
    const reservas = await this.getAll();
    const reservasFiltradas = reservas.filter(
      (reserva) => reserva.idUsuario === idUsuario
    );

    const reservasUsuarios = [];
    for (const reserva of reservasFiltradas) {
      const turno = await Turno.getById(reserva.turnoId);
      if (!turno) continue;

      const cancha = await Cancha.getById(turno.canchaId);
      if (!cancha) continue;

      reservasUsuarios.push({
        id: reserva.id,
        turno: {
          ...turno,
          cancha: { ...cancha },
        },
      });
    }

    return reservasUsuarios;
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

  static async cancelarReserva(id) {
    let reservas = await this.getAll();
    const reservaIndex = reservas.findIndex((reserva) => reserva.id === id);
    reservas.splice(reservaIndex, 1);
    await write(PATH, reservas);
  }
}

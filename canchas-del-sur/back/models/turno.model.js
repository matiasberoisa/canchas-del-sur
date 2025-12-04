import { haversineDistance } from "../utils/calcDistanciaKm.js";
import { read, write } from "../utils/readFiles.js";
import { Cancha } from "./cancha.model.js";

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
    const allTurnos = await this.getAll();
    allTurnos.push(...turnos);
    await write(PATH, allTurnos);
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
  static async update(id, reservaId) {
    const turnos = await this.getAll();
    const turno = turnos.find((t) => t.id === id);
    if (turno) {
      turno.reservaId = reservaId;
      await write(PATH, turnos);
    }
    return turno;
  }
  static async getDiasDisponiblesByCancha(canchaId) {
    const turnosAll = await this.getAll();
    const turnosFiltrados = turnosAll.filter(
      (turno) => turno.canchaId === canchaId && !turno.reservaId
    );
    const turnos = Promise.all(
      turnosFiltrados
        .map(async (turno) => ({
          ...turno,
          fecha: new Date(turno.fecha).toISOString().split("T")[0],
          dia: new Date(turno.fecha).toLocaleDateString("es-ES", {
            weekday: "long",
          }),
          horarios: await this.getHorariosByDias(
            canchaId,
            new Date(turno.fecha).toISOString().split("T")[0]
          ),
        }))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    );
    return turnos;
  }
  static async getHorariosByDias(canchaId, fecha) {
    const turnosAll = await this.getAll();
    const turnosFiltrados = turnosAll.filter(
      (turno) =>
        turno.canchaId === canchaId &&
        new Date(turno.fecha).toISOString().split("T")[0] === fecha &&
        turno.reservaId === null
    );

    return turnosFiltrados.map((turno) => ({
      id: turno.id,
      horarioDesde: turno.horarioDesde,
      horarioHasta: turno.horarioHasta,
    }));
  }
  static async traerPartidosCerca(lat, lon, distanciaKm) {
    const turnosAll = await this.getAll();
    const canchas = await Cancha.getAll();

    const partidosCercanos = turnosAll
      .filter((turno) => turno.reservaId !== null)
      .map((turno) => {
        const cancha = canchas.data.find((c) => c.id === turno.canchaId);
        if (!cancha) return null;

        const d = haversineDistance(lat, lon, cancha.lat, cancha.lng);

        if (d <= distanciaKm) {
          return {
            ...turno,
            cancha: {
              id: cancha.id,
              nombre: cancha.nombre,
              tipo: cancha.tipo,
              ubicacion: cancha.ubicacion,
              lat: cancha.lat,
              lng: cancha.lng,
            },
            distancia: d, 
          };
        }

        return null;
      })
      .filter((turno) => turno !== null);

    return partidosCercanos;
  }
  static async liberarTurno(id) {
    const turnos = await this.getAll();
    const turno = turnos.findIndex((t) => t.id === id);
    if (turno !== -1) {
      turnos[turno].reservaId = null;
      await write(PATH, turnos);
    }
    return turno;
  }
}

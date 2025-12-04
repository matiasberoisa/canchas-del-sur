import { read } from "../utils/readFiles.js";
const PATH = "./data/canchas.json";
const PATH_TIPOS = "./data/tiposCanchas.json";
const PATH_TURNOS = "./data/turnos.json";
export class Cancha {
  constructor(id, nombre, tipo, ubicacion, imagen, descripcion, servicios) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.ubicacion = ubicacion;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.servicios = servicios;
  }
  static async getAllTipos() {
    const tipos = await read(PATH_TIPOS);
    return tipos;
  }
  static async getAll(tipo = "", search = "", page = 1, limit = 10) {
    let canchas = await read(PATH);
    if (tipo) {
      canchas = canchas.filter((cancha) => {
        return cancha.tipo.toLowerCase() === tipo.toLowerCase();
      });
    }
    if (search) {
      canchas = canchas.filter((cancha) => {
        return (
          cancha.nombre &&
          cancha.nombre.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const canchasPaginadas = canchas.slice(startIndex, endIndex);

    return {
      data: canchasPaginadas,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(canchas.length / limit),
        totalItems: canchas.length,
        itemsPerPage: limit,
      },
    };
  }
  static async getById(id) {
    const canchas = await this.getAll();
    return canchas.data.find((cancha) => cancha.id === id);
  }
}

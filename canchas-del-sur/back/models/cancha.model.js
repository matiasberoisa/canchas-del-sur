import { read } from "../utils/readFiles";
const PATH = "./back/data/canchas.json";
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
  static async getAll() {
    const canchas = await read(PATH);
    return canchas;
  }
}

const PATH = "./data/usuarios.json";
export class Usuario {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;

    this.password = password;
  }
  static async getById(id) {
    const usuario = await this.getAll();
    return usuario.find((user) => user.id === id);
  }
   static async getByUser(username) {
    const usuario = await this.getAll();
    return usuario.find((user) => user.username === username);
  }
  static async getAll() {
    const usuarios = await read(PATH);
    return usuarios;
  }
}

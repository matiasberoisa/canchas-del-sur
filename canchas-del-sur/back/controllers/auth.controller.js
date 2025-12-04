import { Usuario } from "../models/usuario.model.js";

export const logIn = async (req, res) => {
  const { username, password } = req.query;
  const usuario = await Usuario.getByUser(username);
  if (usuario && usuario.password === password) {
    res.status(200).json(usuario);
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
};

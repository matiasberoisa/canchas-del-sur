import { Usuario } from "../models/usuario.model.js";

export const logIn = async (req, res) => {
  const { username, password } = req.query;
  const user = await Usuario.getByUser(username);
  if (user && user.password === password) {
    res
      .status(200)
      .json({ success: true, message: "Login exitoso", userId: user.id });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
};

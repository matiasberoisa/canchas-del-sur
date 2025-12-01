export const logIn = (req, res) => {
  const { username, password } = req.query;
  const user = usuarios.find(
    (u) => u.username === username && u.password === password
  );
  if (user && user.id) {
    res
      .status(200)
      .json({ success: true, message: "Login exitoso", userId: user.id });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
};

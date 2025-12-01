const express = require("express");

const fs = require("fs");
const path = require("path");
const host = "localhost";
const port = 3030;
const app = express();

const canchas = require("./data/canchas.json");
const canchasInicio = require("./data/tiposCanchasDisponibles.json");
const usuarios = require("./data/usuarios.json");

const reservas = require("./data/reservas.json");
const archivoReservas = path.join(__dirname, "./data/reservas.json");

const archivoTurnos = path.join(__dirname, "./data/turnos.json");
const turnos = require("./data/turnos.json");

const Turno = require("./models/turno.models.js");
const Reserva = require("./models/reserva.model.js");


app.use(express.json());
app.use(express.static(path.join(__dirname, "../front")));
app.use("/vistas", express.static(path.join(__dirname, "../front/vistas")));

// app.get("/api/canchas", (req, res) => {
//   res.json(canchas);
// });

// app.get("/api/canchasInicio", (req, res) => {
//   res.json(canchasInicio);
// });

// app.post("/api/canchasBusqueda", (req, res) => {
//   const data = req.body;
//   console.log("Datos recibidos en el servidor:", data);
//   res.json(partidos);
// });

//Login
// app.post("/api/login"  , (req, res) => {
// const { username, password } = req.body;
// const user = usuarios.find(u => u.username === username && u.password === password);
// if(user &&user.id){
//   res.status(200).json({ success: true, message: "Login exitoso", userId: user.id });
// }else{
//   res.status(401).json({ success: false, message: "Credenciales inválidas" });
// }
// });

app.post("/turnos/reservar", (req, res) => {
  const { idTurno, idUsuario } = req.body;
  const turno = turnos.find((t) => t.id === idTurno);
  if (!turno) {
    return res.status(404).send("El turno no existe");
  }
  if (turno.reservaId) {
    return res.status(400).send("El turno ya está reservado");
  }
  let newId = reservas[reservas.length - 1]?.id + 1 || 1;
  const reserva = new Reserva(newId, idTurno, idUsuario);

  fs.writeFileSync(archivoReservas, JSON.stringify(reserva, null, 2), "utf8");
  res.status(201).json(reserva);
});
app.get("/turnos", (req, res) => {
  res.status(200).json(turnos);
});



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

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

const Turno = require("./tipos/Turno.js");
const Reserva = require("./tipos/Reserva.js");

app.use(express.static(path.join(__dirname, "../front")));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.get("/api/canchas", (req, res) => {
  res.json(canchas);
});

app.get("/api/canchasInicio", (req, res) => {
  res.json(canchasInicio);
});
app.post("/api/canchasBusqueda", (req, res) => {
  const data = req.body;
  console.log("Datos recibidos en el servidor:", data);
  res.json(partidos);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const userFound = usuarios.find(
    (u) => u.username == username && u.password == password
  );
  if (userFound) {
    res.json({ username: userFound.username, id: userFound.id });
  } else {
    res.status(401).send("Usuario o contraseña incorrecto");
  }
});
app.post("/turnos/reservar", (req, res) => {
  const { idTurno, idUsuario } = req.body;
  const turno = turnos.find((t) => t.id === idTurno);
  if (!turno) {
    return res.status(404).send("El turno no existe");
  }
  if (turno.reservaId) {
    return res.status(400).send("El turno ya está reservado");
  }
  let newId = reservas[turnos.length - 1]?.id + 1 || 1;
  const reserva = new Reserva(newId, idTurno, idUsuario);

  fs.writeFileSync(archivoReservas, JSON.stringify(reserva, null, 2), "utf8");
});
app.get("/turnos", (req, res) => {
  res.status(200).json(turnos);
});
app.post("/turnos", (req, res) => {
  const dataTurnos = req.body;
  let nuevosTurnos = [];
  const diaInicio = new Date(dataTurnos.fechaDesde);
  const diaHasta = new Date(dataTurnos.fechaHasta);

  const { dias, horarioDesde, horarioHasta, idCancha } = dataTurnos;

  let comienzo = new Date(diaInicio);
  let newId = turnos[turnos.length - 1]?.id + 1 || 1;
  while (comienzo <= diaHasta) {
    const diaSemana = comienzo.getDay();
    if (dias.includes(diaSemana)) {
      let nuevoTurno = new Turno(
        newId,
        idCancha,
        comienzo,
        horarioDesde,
        horarioHasta
      );
      nuevosTurnos.push(nuevoTurno);
      newId++;
    }
    comienzo.setDate(comienzo.getDate() + 1);
  }

  fs.writeFileSync(
    archivoTurnos,
    JSON.stringify(nuevosTurnos, null, 2),
    "utf8"
  );
  res.status(201).json(nuevosTurnos);
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

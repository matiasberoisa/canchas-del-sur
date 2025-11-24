const express = require("express");
const router = express.Router([]);
const path = require("path");
class Turno {
  id;
  tipoCancha;
  fechaDesde;
  fechaHasta;
  dia;
  horarioDesde;
  horarioHasta;

  constructor(iden, tiCa, feDe, feHa, d, hoDe, hoHa) {
    this.id = iden;
    this.tipoCancha = tiCa;
    this.fechaDesde = feDe;
    this.fechaHasta = feHa;
    this.dia = d;
    this.horarioDesde = hoDe;
    this.horarioHasta = hoHa;
  }
}

const host = "localhost";
const port = 3030;

const app = express();

//Obtengo el canchas.json  y tiposCanchasDisponibles.json
const canchas = require("./data/canchas.json");
const canchasInicio = require("./data/tiposCanchasDisponibles.json");
const usuarios = require("./data/usuarios.json");
const rutaTurnos = path.join(process.cwd(), "data", "turnos.json");
const partidos = [
  {
    nombre: "Partido 1",
    lat: -38.92855399999999,
    lon: -68.08820399999999,
    cancha: "Complejo El Sur",
    integrantes: 7,
    horario: "21:00 hs",
  },
  {
    nombre: "Partido 2",
    lat: -38.963553999999995,
    lon: -68.10320399999999,
    cancha: "Fútbol City",
    integrantes: 9,
    horario: "19:30 hs",
  },
  {
    nombre: "Partido 3",
    lat: -38.91855399999999,
    lon: -68.108204,
    cancha: "Cancha Norte",
    integrantes: 5,
    horario: "22:00 hs",
  },
];
app.use(express.static(path.join(__dirname, "../front")));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

//Devuelvo las canchas
app.get("/api/canchas", (req, res) => {
  res.json(canchas);
});

//Devuelvo las canchas que se usan en el index para mostrar los 3 tipos
app.get("/api/canchasInicio", (req, res) => {
  res.json(canchasInicio);
});
app.post("/api/canchasBusqueda", (req, res) => {
  const data = req.body;
  console.log("Datos recibidos en el servidor:", data);
  res.json(partidos);
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

//POST de usuarios

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("usuario recibido: ", user);
  const userFound = usuarios.find(
    (u) => u.username == username && u.password == password
  );
  if (userFound) {
    res.json({ username: username, password: password });
  } else {
    res.status(401).send("usuario o contraseña incorrecto");
  }
});

//metodos de reservas

app.post("/turnos", (req, res) => {
  const turno = new Turno(req.body);
  turno.push(rutaTurnos);
  console.log(res.status);
});

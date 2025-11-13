const express = require("express");
const router = express.Router([]);
const path = require("path");

const host = "localhost";
const port = 3030;

const app = express();

//Obtengo el canchas.json  y tiposCanchasDisponibles.json
const canchas = require("./data/canchas.json");
const canchasInicio = require("./data/tiposCanchasDisponibles.json");
const usuarios= require("./data/usuarios.json");
const turnos= require("./data/turnos.json");
const { console } = require("inspector");
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

app.use(express.json());

//Devuelvo las canchas
app.get("/api/canchas", (req, res) => {
  res.json(canchas);
});

//Devuelvo las canchas que se usan en el index para mostrar los 3 tipos
app.get("/api/canchasInicio", (req, res) => {
  res.json(canchasInicio);
});

//Login
app.post("/api/login"  , (req, res) => {
const { username, password } = req.body;
const user = usuarios.find(u => u.user === username && u.password === password);
if(user &&user.id){
  res.status(200).json({ success: true, message: "Login exitoso", userId: user.id });
}else{
  res.status(401).json({ success: false, message: "Credenciales inválidas" });
}
});

//Turnos
app.get("/api/turnos", (req, res) => {
  const abr=req.query;
  const cancha = req.query.tipoCancha;
  const fechaInicio= req.query.fechaDesdeTurno;
  const fechaFin= req.query.fechaHastaTurno;
  const horaInicio= req.query.horaInicioTurno;
  const horaFin= req.query.horaFinTurno;

const turnosFiltrados = turnos.filter(turno => {turno.tipoCancha === cancha &&
  turno.fecha >= fechaInicio &&
  turno.fecha <= fechaFin &&
  turno.hora >= horaInicio &&
  turno.hora <= horaFin
});

res.send(turnosFiltrados);
});


app.post("/api/canchasBusqueda", (req, res) => {
  const data = req.body;
  console.log("Datos recibidos en el servidor:", data);
  res.json(partidos)
});


app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

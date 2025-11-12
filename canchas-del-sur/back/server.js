const express = require("express");
const router = express.Router([]);
const path = require("path");

const host = "localhost";
const port = 3030;

const app = express();

//Obtengo el canchas.json  y tiposCanchasDisponibles.json
const canchas = require("./data/canchas.json");
const canchasInicio = require("./data/tiposCanchasDisponibles.json");
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
  res.json(partidos)
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

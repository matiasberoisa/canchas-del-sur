const express = require("express");
const router = express.Router([]);
const path = require("path");

const host = "localhost";
const port = 3030;

const app = express();

//Obtengo el canchas.json  y tiposCanchasDisponibles.json
const canchas =require('./data/canchas.json');
const canchasInicio=require('./data/tiposCanchasDisponibles.json');

app.use(express.static(path.join(__dirname, "../front")));

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

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

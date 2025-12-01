const express = require("express");

const fs = require("fs");
const path = require("path");
const host = "localhost";
const port = 3030;
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, "../front")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

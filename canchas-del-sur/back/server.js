import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import canchaRoutes from "./routes/cancha.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import turnoRoutes from "./routes/turno.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = "localhost";
const port = 3030;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../front")));


app.use("/api/login", authRoutes);
app.use("/api/canchas", canchaRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/turnos", turnoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.listen(port, host, () => {
  console.log(`servidor levantado en http://${host}:${port}`);
});

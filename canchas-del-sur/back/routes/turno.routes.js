import { Router } from "express";
import {
  addAll,
  traerPartidosCerca,
} from "../controllers/turnos.controller.js";
import { validationRequestTypes } from "../middlewares/validationRequestTypes.js";

const router = Router();

router.post("/",validationRequestTypes({body: ["idCancha", "fecha", "horarioDesde", "horarioHasta"]}), addAll);
router.get("/partidosCerca",validationRequestTypes({query: ["lat", "long", "distancia"]}), traerPartidosCerca);
export default router;

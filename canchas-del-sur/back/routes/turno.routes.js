import { Router } from "express";
import {
  addAll,
  getDiasDisponiblesByCancha,
  getHorariosByDias,
  traerPartidosCerca,
} from "../controllers/turnos.controller.js";

const router = Router();

router.post("/", addAll);
router.get("/horarios", getDiasDisponiblesByCancha);
router.get("/dias", getHorariosByDias);
router.get("/partidosCerca", traerPartidosCerca);
export default router;

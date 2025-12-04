import { Router } from "express";
import { addAll, getDiasDisponiblesByCancha, getHorariosByDias } from "../controllers/turnos.controller.js";

const router = Router();

router.post("/", addAll);
router.get("/horarios", getDiasDisponiblesByCancha);
router.get("/dias", getHorariosByDias);

export default router;

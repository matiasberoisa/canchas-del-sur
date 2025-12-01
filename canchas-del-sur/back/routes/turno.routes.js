import { Router } from "express";
import { addAll } from "../controllers/turnos.controller.js";

const router = Router();

router.post("/", addAll);

export default router;

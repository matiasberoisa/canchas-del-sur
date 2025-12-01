import { Router } from "express";
import { add } from "../controllers/reserva.controller.js";

const router = Router();
router.post("/", add);

export default router;

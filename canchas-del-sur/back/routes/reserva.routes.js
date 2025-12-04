import { Router } from "express";
import { add, getAllByIdUsuario,cancelarReserva } from "../controllers/reserva.controller.js";

const router = Router();
router.delete("/:id", cancelarReserva);
router.get("/byUsuario/:idUsuario", getAllByIdUsuario);
router.post("", add);
export default router;

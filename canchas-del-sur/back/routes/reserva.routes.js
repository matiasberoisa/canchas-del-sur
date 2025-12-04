import { Router } from "express";
import { add, getAllByIdUsuario,cancelarReserva } from "../controllers/reserva.controller.js";

const router = Router();
router.delete("/:id",validationRequestTypes({params: ["id"]}), cancelarReserva);
router.get("/byUsuario/:idUsuario",validationRequestTypes({params: ["idUsuario"]}), getAllByIdUsuario);
router.post("",validationRequestTypes({body: ["idTurno", "idUsuario"]}), add);
export default router;

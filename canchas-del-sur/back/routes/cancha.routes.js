import { Router } from "express";
import {
  dowloadImg,
  obtenerCanchaById,
  obtenerCanchas,
  obtenerTiposCanchas,
} from "../controllers/canchas.controller.js";
import { validationRequestTypes } from "../middlewares/validationRequestTypes.js";

const router = Router();

router.get("/byId/:id",validationRequestTypes({params: ["id"]}), obtenerCanchaById);
router.get("/download/:nombreImg",validationRequestTypes({params: ["nombreImg"]}), dowloadImg);
router.get("/tipos", obtenerTiposCanchas);
router.get("", obtenerCanchas);
export default router;

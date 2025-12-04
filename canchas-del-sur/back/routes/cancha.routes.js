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
router.get("/download",validationRequestTypes({query: ["nombreImg"]}), dowloadImg);
router.get("/tipos", obtenerTiposCanchas);
router.get("",validationRequestTypes({query: ["tipo", "search", "page", "limit"]}), obtenerCanchas);
export default router;

import { Router } from "express";
import {
  dowloadImg,
  obtenerCanchaById,
  obtenerCanchas,
  obtenerTiposCanchas,
} from "../controllers/canchas.controller.js";

const router = Router();

router.get("/byId", obtenerCanchaById);
router.get("/download", dowloadImg);
router.get("/tipos", obtenerTiposCanchas);
router.get("", obtenerCanchas);
export default router;

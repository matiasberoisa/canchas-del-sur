import { Router } from "express";
import {
  dowloadImg,
  obtenerCanchas,
  obtenerTiposCanchas,
} from "../controllers/canchas.controller.js";

const router = Router();

router.get("", obtenerCanchas);
router.get("/download", dowloadImg);
router.get("/tipos", obtenerTiposCanchas);
export default router;

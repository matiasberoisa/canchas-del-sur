import { Router } from "express";
import {
  dowloadImg,
  obtenerCanchas,
} from "../controllers/canchas.controller.js";

const router = Router();

router.get("", obtenerCanchas);

router.get("/download", dowloadImg);

export default router;

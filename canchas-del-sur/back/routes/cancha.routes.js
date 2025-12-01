import { Router } from "express";
import { obtenerCanchas } from "../controllers/canchas.controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", obtenerCanchas);

router.get("/download/:nombreImg", (req, res) => {
  const { nombreImg } = req.params;
  const imagePath = path.join(__dirname, "../data/img", nombreImg);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: "Imagen no encontrada" });
    }
  });
});

export default router;

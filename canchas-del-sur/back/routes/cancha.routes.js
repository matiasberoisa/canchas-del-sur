import { obtenerCanchas } from "../controllers/canchas.controller";

const router = Router();
router.get("/", obtenerCanchas);
export default router;
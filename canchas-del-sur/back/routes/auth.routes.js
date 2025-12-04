import { Router } from "express";
import { logIn } from "../controllers/auth.controller.js";

const router = Router();

router.get("", logIn);

export default router;

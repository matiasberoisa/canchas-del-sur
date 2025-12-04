import { Router } from "express";
import { logIn } from "../controllers/auth.controller.js";
import { validationRequestTypes } from "../middlewares/validationRequestTypes.js";

const router = Router();

router.get(
  "",
  validationRequestTypes({ query: ["username", "password"] }),
  logIn
);

export default router;

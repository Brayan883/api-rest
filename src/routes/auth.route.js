import { Router } from "express";
import {
  login,
  register,
  registerRefresh,
  logout,
} from "../controllers/auth.controller.js";

import { requiereRefreshToken } from "../middlewares/refleshtokenAuth.js";

import {
  ValidationLogin,
  ValidationRegister,
} from "../middlewares/ValidationMiddleware.js";
import { AuthPage } from "../middlewares/AuthToken.js";

const router = Router();

router.post("/register", AuthPage, ValidationRegister, register);
router.post("/login", ValidationLogin, login);
router.post("/register", AuthPage, ValidationRegister, register);
router.get("/refresh",  requiereRefreshToken, registerRefresh);
router.get("/logout", AuthPage, logout);

export default router;

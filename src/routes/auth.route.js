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

const router = Router();

router.post("/register", ValidationRegister, register);
router.post("/login", ValidationLogin, login);
router.get("/refresh", requiereRefreshToken, registerRefresh);
router.get("/logout", logout);

export default router;

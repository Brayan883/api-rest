import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultError } from "../middlewares/ValidationResult.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Por favor ingrese un email válido")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body(
      "password",
      "Por favor ingrese una contraseña válida minima de 6 caracteres"
    )
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }
        return value;
      }),
  ],
  validationResultError,
  register
);
router.post(
  "/login",
  [
    body("email", "Por favor ingrese un email válido")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body(
      "password",
      "Por favor ingrese una contraseña válida minima de 6 caracteres"
    )
      .trim()
      .isLength({ min: 6 }),
  ],
  validationResultError,
  login
);

export default router;

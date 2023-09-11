import { validationResult, body } from "express-validator";
const validationResultError = (req, res, next) => {
  const errors = validationResult(req);

  const extractedErrors = [];
  if (!errors.isEmpty()) {
    errors.array().map((err) =>
      extractedErrors.push({
        [err.path]: err.msg,
      })
    );

    return res.status(400).json({
      errors: extractedErrors,
    });
  }

  return next();
};

const ValidationRegister = [
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
  validationResultError,
];

const ValidationLogin = [
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
  validationResultError,
];

export { ValidationRegister, ValidationLogin };

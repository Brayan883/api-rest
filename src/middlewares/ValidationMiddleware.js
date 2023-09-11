import { validationResult, body, param, query } from "express-validator";
import { prismadb } from "../database/db.js";
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

const validatioParams = [
  param("id", "Por favor ingrese un id válido")
    .trim()
    .isInt()
    .escape()
    .notEmpty()
    .custom(async (value, { req }) => {
      const findPost = await prismadb.post.findUnique({
        where: {
          id: parseInt(value),
        },
      });
            

      if (!findPost || findPost.authorId !== req.uid)
        throw new Error("El post no existe");

      return value;
    }),
  validationResultError,
];

const validatioData = [
  body("title", "Por favor ingrese un título válido")
    .trim()
    .escape()
    .notEmpty(),
  body("content", "Por favor ingrese un contenido válido")
    .trim()
    .escape()
    .notEmpty(),
  body("published", "Por favor ingrese un estado válido")
    .trim()
    .escape()
    .isBoolean()
    .optional(),
  validationResultError,
];

const validationQuery = [
  query("q", 'El parámetro "q" no es valido').trim().escape().notEmpty(),
  validationResultError,
];

export {
  ValidationRegister,
  ValidationLogin,
  validatioParams,
  validatioData,
  validationQuery,
};

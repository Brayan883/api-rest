import { validationResult } from "express-validator";
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

export { validationResultError };

const { validationResult } = require("express-validator");
const ValidationError = require("../errors/validationError");

const requestValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    throw new ValidationError("validation failed!", extractedErrors);
  }
  next();
};

module.exports = requestValidation;

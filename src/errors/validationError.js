const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class ValidationError extends CustomError {
  constructor(message, error) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    this.error = error;
  }
}

module.exports = ValidationError;

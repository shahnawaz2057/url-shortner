const { StatusCodes } = require("http-status-codes");
const CustomError = require("./custom-error");

class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = ValidationError;

const CustomError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

class DatabaseConnectionError extends CustomError {
  constructor() {
    super("Error connecting database");
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = DatabaseConnectionError;

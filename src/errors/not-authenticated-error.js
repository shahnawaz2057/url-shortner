const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom-error');

class NotAuthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    //this.statusCode = 401
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = NotAuthenticatedError;
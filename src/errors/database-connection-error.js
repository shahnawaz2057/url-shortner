const CustomError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class DatabaseConnectionError extends CustomError {
  // message = 'Error connecting database';
  // statusCode = 500;
  
  constructor() {
    super('Error connecting database')
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

module.exports = DatabaseConnectionError;
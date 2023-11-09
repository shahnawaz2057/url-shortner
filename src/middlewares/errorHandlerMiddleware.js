const { StatusCodes } = require("http-status-codes");

const NotFoundError = require("../errors/notFoundError");
const CustomError = require("../errors/customError");
const ValidationError = require("../errors/validationError");
const BadRequest = require("../errors/badRequestError");

const errorHandler = (err, req, res, next) => {
  switch (err.constructor) {
    case NotFoundError:
    case CustomError:
    case ValidationError:
    case BadRequest:
      return res.status(err.statusCode).json({ message: err.message });
    default:
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong try again later");
  }
};

module.exports = errorHandler;

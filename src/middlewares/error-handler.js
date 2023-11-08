const NotFoundError = require("../errors/not-found-error");
const CustomError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");
const ValidationError = require("../errors/validation-error");
const BadRequest = require("../errors/bad-request");

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

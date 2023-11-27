const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, error: err.error });
  }
  console.log('error', err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("something went wrong try again later");
};

module.exports = errorHandler;

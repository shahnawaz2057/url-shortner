const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  console.log("errr", err);
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, error: err.error });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("something went wrong try again later");
};

module.exports = errorHandler;

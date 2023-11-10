require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./middlewares/errorHandlerMiddleware");
const userRouter = require("./routes/userRoute");
const urlRouter = require("./routes/urlRoute");
const redirectRouter = require("./routes/redirectRoute");
const swaggerSpec = require("./swagger/swagger");
const swaggerUi = require("swagger-ui-express");
const NotFoundError = require("./errors/notFoundError");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// add route for swagger document API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRouter);
app.use("/api/urls", urlRouter);
app.use("/", redirectRouter);

app.all("*", async () => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

module.exports = app;

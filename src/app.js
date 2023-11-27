require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");

const errorHandler = require("./middlewares/errorHandlerMiddleware");
const userRouter = require("./routes/userRoute");
const urlRouter = require("./routes/urlRoute");
const redirectRouter = require("./routes/redirectRoute");
const taskRouter = require("./routes/taskRoute");
const loginRouter = require("./routes/loginRoute");
const statsRouter = require("./routes/statsRoute");
const swaggerDocs = require('./swagger/swagger');
const NotFoundError = require("./errors/notFoundError");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

swaggerDocs(app);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/login', loginRouter);
app.use('/api/stats', statsRouter);
app.use("/api/users", userRouter);
app.use("/api/urls", urlRouter);
app.use("/api/tasks", taskRouter);
app.use("/", redirectRouter);

app.all("*", async () => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

module.exports = app;

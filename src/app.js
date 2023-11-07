require('dotenv').config();
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/user.route');
const urlSchemaRouter = require('./routes/urlSchema.route');
const NotFoundError = require('./errors/not-found-error');
const swaggerDocs = require('./swagger/swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

swaggerDocs(app);

app.use('/api/users', userRouter);
app.use('/api/urls', urlSchemaRouter);

app.all('*', async () => {
  throw new NotFoundError('Route not found');
})

app.use(errorHandler);  

module.exports = app;
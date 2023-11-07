require('dotenv').config();
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/user.route');
const urlSchemaRouter = require('./routes/urlSchema.route');
const swaggerSpec = require('./swagger/swagger');
const swaggerUi = require('swagger-ui-express');
const NotFoundError = require('./errors/not-found-error');
// const redirectRouter = require('./routes/redirect.route');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
})
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// app.use('/', redirectRouter);
app.use('/api/users', userRouter);
app.use('/api/urls', urlSchemaRouter);

app.all('*', async () => {
  throw new NotFoundError('Route not found');
})

app.use(errorHandler);  

module.exports = app;
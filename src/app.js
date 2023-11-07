const express = require('express');
const app = express();
const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/user.route');
const urlSchemaRouter = require('./routes/urlSchema.route');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// add route for swagger document API
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', userRouter);
app.use('/api/urls', urlSchemaRouter);

app.use(errorHandler);  

module.exports = app;
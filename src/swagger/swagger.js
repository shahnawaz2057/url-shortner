const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.2',
  tags: [
    {
      name: 'users',
      description: 'API to manage employees'
    },
    {
      name: 'urls',
      description: 'API to manage urls'
    }
  ],
  info: {
    title: 'API for JnJ url shortener',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express and Sequelize ORM.',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      // description: 'Development server',
    },
  ],
  // basePath: '/api'
};

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDocs(swaggerOptions);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })

  console.log(`api docs available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDocs;
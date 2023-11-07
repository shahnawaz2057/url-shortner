const expressJSDocSwagger = require("express-jsdoc-swagger");

module.exports = (app) => {
  const options = {
    info: {
      version: '1.0.0',
      title: 'API for JnJ url shortener',
      description: 'This is a REST API application made with Express and Sequelize ORM.',
    },
    filesPattern: ['../routes/*.js'],
    baseDir: __dirname,
    servers: [
      {
        url: 'http://localhost:8080',
        // description: 'Development server',
      },
    ]
  };

  expressJSDocSwagger(app)(options);
};

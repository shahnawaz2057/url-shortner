const app = require('./app')
const { sequelize } = require('../models');

const start = async () => {
  await sequelize.sync({ alter: true });
  app.listen(8080, () => {
    console.log("app listening in port 8080");
  })
}

start();

/*const start = () => {
  // sequelize.sync({ alter: true});
  sequelize.authenticate().then(() => {
    console.log('Database Connected!')
    app.listen(5001, () => {
      console.log("app listening in port 5001");
    })
  }).catch(err => {

  }) 
}*/



// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// app.listen(5001, async () => {
//     console.log("app listening in port 5001");
//     await sequelize.authenticate();
//     console.log('Database Connected!')
// })
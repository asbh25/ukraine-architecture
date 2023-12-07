const Sequelize = require('sequelize');

// ініціалізація бази даних
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './myapp.sqlite'
});

module.exports = sequelize;

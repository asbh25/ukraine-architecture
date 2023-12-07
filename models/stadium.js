const Sequelize = require('sequelize');
const sequelize = require('../database');

// ініціалізація моделі стадіону
const Stadium = sequelize.define('stadium', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  dbpedia_uri: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Stadium;


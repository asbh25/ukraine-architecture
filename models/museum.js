const Sequelize = require('sequelize');
const sequelize = require('../database');

// ініціалізація моделі музею
const Museum = sequelize.define('museum', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  dbpedia_uri: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Museum.associate = function(models) {
  Museum.belongsToMany(models.Thumbnail, { through: models.MuseumThumbnail });
};

module.exports = Museum;

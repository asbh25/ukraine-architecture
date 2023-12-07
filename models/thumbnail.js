const Sequelize = require('sequelize');
const sequelize = require('../database');

// ініціалізація моделі зображення
const Thumbnail = sequelize.define('thumbnail', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

Thumbnail.associate = function(models) {
  Museum.belongsToMany(models.Museum, { through: models.MuseumThumbnail });
};

module.exports = Thumbnail;

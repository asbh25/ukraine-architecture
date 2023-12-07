const Sequelize = require('sequelize');
const sequelize = require('../database');

// ініціалізація моделі зв'язку між музеєм та зображенням
const MuseumThumbnail = sequelize.define('museum_thumbnail', {
  museumId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'museums',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  thumbnailId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'thumbnails',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

module.exports = MuseumThumbnail;

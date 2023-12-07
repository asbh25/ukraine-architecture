const sequelize = require("../database");
const Museum = require("../models/museum");
const Thumbnail = require("../models/thumbnail");
const MuseumThumbnail = require("../models/museum_thumbnail");
const Stadium = require("../models/stadium");

// Встановлення асоціацій
Museum.belongsToMany(Thumbnail, { through: MuseumThumbnail });
Thumbnail.belongsToMany(Museum, { through: MuseumThumbnail });

// Створення таблиць
sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

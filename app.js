const express = require('express');
const Museum = require('./models/museum');
const Stadium = require('./models/stadium');
const { fetchMuseumInfo } = require('./db/sparql/fetch_museum');
const cors = require('cors');
const MuseumThumbnail = require('./models/museum_thumbnail');
const Thumbnail = require('./models/thumbnail');
const app = express();
const port = 3001;

// Використання CORS для дозволу всіх доменів (уточніть для продакшену)
app.use(cors());

// Парсинг JSON-тіл запитів
app.use(express.json());

// Маршрут для отримання списку музеїв
app.get('/museums', async (req, res) => {
  try {
    const museums = await Museum.findAll({
      attributes: ['id', 'latitude', 'longitude', 'name']
    });
    res.json(museums);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

async function getThumbnailsByMuseumId(museumId) {
  try {
      const museumThumbnails = await MuseumThumbnail.findAll({
          where: { museumId: museumId },
          attributes: ['thumbnailId']
      });
      const ids = museumThumbnails.map(mt => mt.thumbnailId);
      const thumbnails = await Thumbnail.findAll({
        where: { id: ids },
        attributes: ['url']
      });

      return thumbnails.map(t => t.url); // Повертає масив URL
  } catch (error) {
      console.error('Error fetching thumbnails:', error);
      return [];
  }
}

// Маршрут для отримання даних про музей
app.get('/museums/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const museum = await Museum.findByPk(id);

    if (museum) {
      fetched_museum = await fetchMuseumInfo(museum.dbpedia_uri);
      fetched_museum.thumbnails = await getThumbnailsByMuseumId(id);
      res.json(fetched_museum);
    } else {
      res.status(404).send('Museum not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Стадіони
// Маршрут для отримання списку стадіонів
app.get('/stadiums', async (req, res) => {
  try {
    const stadiums = await Stadium.findAll({
      attributes: ['id', 'latitude', 'longitude', 'name']
    });
    res.json(stadiums);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Маршрут для отримання даних про стадіон
app.get('/stadiums/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const stadium = await Stadium.findByPk(id);

    if (stadium) {
      fetched_stadium = await fetchMuseumInfo(stadium.dbpedia_uri);
      res.json(fetched_stadium);
    } else {
      res.status(404).send('Museum not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

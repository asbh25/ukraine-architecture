const SparqlClient = require("sparql-http-client");
const { getThumbnailsQuery } = require("./queries");
const Museum = require("../../models/museum");
const Thumbnail = require("../../models/thumbnail");
const MuseumThumbnail = require("../../models/museum_thumbnail");

const SPARQL_ENDPOINT = "http://dbpedia.org/sparql";

// Додавання мініатюри до музею
const addThumbnail = async (museum, item) => {
  try {
    // Створення мініатюри
    const thumbnail = await Thumbnail.create({ url: item.thumbnail.value });

    // Зв'язування мініатюри з музеєм
    await MuseumThumbnail.create({
      museumId: museum.id,
      thumbnailId: thumbnail.id,
    });

    console.log(`Thumbnail added for museum: ${museum.id}`);
  } catch (error) {
    console.error("Error adding thumbnail:", error);
  }
};

// Запит до DBpedia для отримання мініатюр
async function fetchThumbnails(museum) {
  const client = new SparqlClient({ endpointUrl: SPARQL_ENDPOINT });
  const query = getThumbnailsQuery(museum.dbpedia_uri);

  try {
    const stream = await client.query.select(query);

    stream.on("data", (row) => {
      addThumbnail(museum, row);
    });

    stream.on("end", () => {
      console.log("Query finished.");
    });
  } catch (error) {
    console.error(error);
  }
}

// Отримання музеїв з БД
const museumThumbnails = async () => {
  const museums = await Museum.findAll({
    attributes: ["id", "dbpedia_uri"],
  });

  museums.forEach((museum) => fetchThumbnails(museum));
};
museumThumbnails();

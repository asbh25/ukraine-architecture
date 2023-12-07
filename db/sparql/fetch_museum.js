const SparqlClient = require('sparql-http-client');
const { getMuseumQuery } = require('./queries');

// Отримання інформації про музей з DBpedia
async function fetchMuseumInfo(dbpediaUrl) {
  const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
  const query = getMuseumQuery(dbpediaUrl);
  let result = {};

  const client = new SparqlClient({ endpointUrl: SPARQL_ENDPOINT });

  try {
    const stream = await client.query.select(query);

    // Обіцянка, яка завершується, коли потік даних закінчується
    await new Promise((resolve, reject) => {
      stream.on('data', row => {
        // Збереження даних в об'єкт або масив
        Object.entries(row).forEach(([key, value]) => {
          result[key] = value.value;
        });
      });

      stream.on('error', err => {
        reject(err);
      });

      stream.on('end', () => {
        resolve();
      });
    });

  } catch (error) {
    console.error(error);
  }

  return result;
}

module.exports = { fetchMuseumInfo };

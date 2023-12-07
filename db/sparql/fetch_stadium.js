const SparqlClient = require('sparql-http-client');
const { getStadiumQuery } = require('./queries');

// Отримання інформації про стадіон з DBpedia
async function fetchStadiumInfo(dbpediaUrl) {
  const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
  const query = getStadiumQuery(dbpediaUrl);
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

module.exports = { fetchStadiumInfo };

const SparqlClient = require('sparql-http-client');
const Museum = require('../../models/museum');
const queries = require('./queries');

const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const query = queries.museumsQuery;

// Додавання музею до БД
const add_museum = (item) => {
  Museum.create({
    name: item.name.value,
    latitude: parseFloat(item.latitude.value),
    longitude: parseFloat(item.longitude.value),
    dbpedia_uri: item.museum.value
  }).then(museum => {
    console.log(`Museum ${museum.name} added to the database.`);
  }).catch(error => {
    console.error(`Error adding museum to the database: ${error}`);
  });
}

// Отримання музеїв з DBpedia
async function fetchMuseums() {
  const client = new SparqlClient({ endpointUrl: SPARQL_ENDPOINT });

  try {
    const stream = await client.query.select(query);

    stream.on('data', row => {
      add_museum(row);
    });

    stream.on('end', () => {
      console.log('Query finished.');
    });

  } catch (error) {
    console.error(error);
  }
}

fetchMuseums();

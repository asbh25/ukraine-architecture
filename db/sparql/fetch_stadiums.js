const SparqlClient = require('sparql-http-client');
const Stadium = require('../../models/stadium');
const queries = require('./queries');

const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const query = queries.stadiumsQuery;

// Додавання стадіону до БД
const add_stadium = async (item) => {
  Stadium.create({
    name: item.name.value,
    description: item.abstract.value,
    latitude: parseFloat(item.latitude.value),
    longitude: parseFloat(item.longitude.value),
    dbpedia_uri: item.stadium.value
  }).then(stadium => {
    console.log(`Stadium ${stadium.name} added to the database.`);
  }).catch(error => {
    console.error(`Error adding stadium to the database: ${error}`);
  });
}

// Отримання стадіонів з DBpedia
async function fetchStadiums() {
  const client = new SparqlClient({ endpointUrl: SPARQL_ENDPOINT });

  try {
    const stream = await client.query.select(query);

    stream.on('data', row => {
      add_stadium(row);
      // console.log(row);  
    });

    stream.on('end', () => {
      console.log('Query finished.');
    });

  } catch (error) {
    console.error(error);
  }
}

fetchStadiums();

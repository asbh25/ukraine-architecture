// Purpose: SPARQL queries for DBpedia
// query.museumsQuery - query for fetching museums
const museumsQuery = `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?museum ?name ?description ?latitude ?longitude ?website
WHERE {
  ?museum a dbo:Museum ;
          dbo:location dbr:Ukraine ;
          rdfs:label ?name ;
          dbo:abstract ?description ;
          geo:lat ?latitude ;
          geo:long ?longitude ;
          foaf:isPrimaryTopicOf ?website .
  FILTER (LANG(?name) = 'en' && LANG(?description) = 'en')
}
`;

// query.stadiumsQuery - query for fetching stadiums
const stadiumsQuery = `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?stadium ?name ?abstract ?latitude ?longitude ?website WHERE {
  ?stadium a dbo:Stadium ;
           dbo:location dbr:Ukraine ;
           rdfs:label ?name ;
           dbo:abstract ?abstract ;
           geo:lat ?latitude ;
           geo:long ?longitude .
  OPTIONAL { ?stadium foaf:isPrimaryTopicOf ?website }

  FILTER (LANG(?name) = 'en' && LANG(?abstract) = 'en')
}
`;

// query.getMuseumQuery - query for fetching museum by dbpedia url
const getMuseumQuery = (dbpediaUrl) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?name ?description ?latitude ?longitude ?website ?established ?date WHERE {
  <${dbpediaUrl}> rdfs:label ?name ;
                 dbo:abstract ?description ;
                 geo:lat ?latitude ;
                 geo:long ?longitude ;
                 foaf:isPrimaryTopicOf ?website .

                 OPTIONAL { <${dbpediaUrl}> dbp:established ?established }
                 OPTIONAL { <${dbpediaUrl}> dbp:date ?date }

  FILTER (LANG(?name) = 'en' && LANG(?description) = 'en')
}
`;

// query.getStadiumQuery - query for fetching stadium by dbpedia url
const getStadiumQuery = (dbpediaUrl) => `
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dbp: <http://dbpedia.org/property/>

SELECT ?name ?description ?latitude ?longitude ?website ?established ?date WHERE {
  <${dbpediaUrl}> a dbo:Stadium ;
                 rdfs:label ?name ;
                 dbo:abstract ?description ;
                 geo:lat ?latitude ;
                 geo:long ?longitude ;
                 foaf:isPrimaryTopicOf ?website .

                 OPTIONAL { <${dbpediaUrl}> dbp:established ?established }
                 OPTIONAL { <${dbpediaUrl}> dbp:date ?date }

  FILTER (LANG(?name) = 'en' && LANG(?description) = 'en')
}
`;

// query.getThumbnailsQuery - query for fetching thumbnails by dbpedia url
const getThumbnailsQuery = (dbpediaUrl) => `
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>

  SELECT ?thumbnail WHERE {
    <${dbpediaUrl}> foaf:depiction ?thumbnail .
  }
`;

module.exports = { museumsQuery, stadiumsQuery, getMuseumQuery, getStadiumQuery, getThumbnailsQuery };

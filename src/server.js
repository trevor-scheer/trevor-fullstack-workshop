require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const store = require('./store');

const MovieDataSource = require('./data-sources/movie');
const CastDataSource = require('./data-sources/cast');

// Global config options for the Movie DB
const config = {
  port: 3000,
  url: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4e911a064e43b9cd6fbb3137c572d89a',
    include_adult: false,
  },
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    return { user: isEmail.validate(email) ? email : null };
  },
  dataSources: () => ({
    moviesAPI: new MovieDataSource({
      baseURL: config.url,
      params: config.params,
      store,
    }),
    castAPI: new CastDataSource({
      baseURL: config.url,
      params: config.params,
    }),
  }),
  // TODO: remove this
  engine: process.env.ENGINE_API_KEY
    ? {
        apiKey: process.env.ENGINE_API_KEY,
      }
    : undefined,
});

// Start our server with our port config
server
  .listen({ port: config.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));

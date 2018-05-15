require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const makeLoaders = require('./loaders');
const store = require('./store');
const utils = require('./utils');

const movieModel = require('./models/movie');
const castModel = require('./models/cast');

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

    const fetch = utils.makeFetch(config);
    const loaders = makeLoaders(fetch);

    // Initialize data models and pass dependencies
    const models = {
      movie: movieModel({ config, utils, store, loaders }),
      cast: castModel({ config, utils, loaders }),
    };

    return {
      models,
      user: isEmail.validate(email) ? email : null,
      fetch,
    };
  },
  engine: true,
});

// Start our server with our port config
server
  .listen({ port: config.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));

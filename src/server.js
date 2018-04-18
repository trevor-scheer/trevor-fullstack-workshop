const { ApolloServer } = require('apollo-server');
const fetch = require('node-fetch');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const store = require('./store');
const movieModel = require('./models/movie');
const castModel = require('./models/cast');

const utils = require('./utils');

// global config options
const config = {
  port: 3000,
  url: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4e911a064e43b9cd6fbb3137c572d89a',
    include_adult: false,
  },
};

// initialize data models and pass dependencies
const models = {
  movie: movieModel({ config, fetch, utils, store }),
  cast: castModel({ config, fetch, utils }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    return { models, user: isEmail.validate(email) ? email : null };
  },
  engine: false,
});

server
  .listen({ port: config.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));

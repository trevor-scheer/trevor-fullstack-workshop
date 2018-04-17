import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import fetch from 'node-fetch';
import isEmail from 'isemail';

// transpiled to plaintext with babel-plugin-inline-import
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

import store from './store';

import movieModel from './models/movie';
import castModel from './models/cast';

import * as utils from './utils';

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

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

// middleware for auth. Checks for an `authorization` header, and makes sure
// it translates to a valid email. If so, it adds a `user` to the request object
app.use((req, res, next) => {
  if (!req.headers.authorization) return next();

  const auth = req.headers.authorization || '';
  const email = new Buffer(auth, 'base64').toString('ascii');

  if (isEmail.validate(email)) {
    req.user = email;
  }

  return next();
});

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: myGraphQLSchema,
    context: {
      models,
      user: req.user || null, // adds the user's email to the context
    },
  })),
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(config.port);

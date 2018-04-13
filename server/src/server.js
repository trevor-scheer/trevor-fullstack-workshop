import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import axios from 'axios';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';

import movieModel from './models/movie';
import castModel from './models/cast';

const config = {
  url: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4e911a064e43b9cd6fbb3137c572d89a',
    include_adult: false,
  },
};

const models = {
  movie: movieModel({ config, axios }),
  cast: castModel({ config, axios }),
};

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;

const app = express();

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: myGraphQLSchema,
    context: {
      models,
    },
  }),
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);

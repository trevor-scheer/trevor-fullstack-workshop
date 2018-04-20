# Fullstack GraphQL Workshop

Welcome to the server portion of the workshop! For the morning session, we will be building a GraphQL server based on the [Movie DB REST API](https://developers.themoviedb.org/3/getting-started/introduction).

## File Structure (in order of importance):
- `server.js`: Where all the magic happens to set up Apollo Server
- `schema.js`: Your GraphQL schema goes here
- `resolvers/`: Write your resolvers for each type in this folder
- `models/`: Your models separate out the data fetching logic from your resolvers
- `loaders.js`: We've already created a loader function for you here. You won't need to modify this file.
- `utils.js`: A utility function for constructing query parameters. You won't need to modify this file.
- `store.js`: A SQLite DB created with the Sequelize ORM for storing likes and user info. You won't need to modify this file.

## Running on Glitch

<!-- Remix Button -->
<a href="https://glitch.com/edit/#!/remix/fullstack-workshop-server">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix button" aria-label="remix" height="33">
</a>

1. Click this button to remix the project

2. On the left hand menu in Glitch, click Logs > Console

3. Confirm you're tracking origin by running `git remote -v`. If you are, then you can skip step #4 and go to step #5

4. If you are not tracking origin, run this command:

```bash
git remote add origin https://github.com/apollographql/fullstack-workshop-server && git fetch origin && git checkout 00-start && refresh
```

5. If you are tracking origin, run this command: `git fetch origin && git checkout 00-start && refresh`

6. Navigate to `server.js`. You should not see any `ApolloServer` setup code. If that's the case, then you're good to go!

### Branches
- `00-start`: Your starting point
- `01-apollo-server`: Setting up Apollo Server and Apollo Engine
- `02-schema`: Writing your schema
- `03-resolvers`: Implementing resolvers
- `04-final`: Includes authentication, loaders, and caching

## FAQ
- **I didn't complete the last exercise and want to catch up**: No worries! I've created branches for all the steps in the workshop so everyone can go at their own pace. To check out the completed solution for your exercise, look for the branch above. In your Glitch terminal or local terminal, replace `01-apollo-server` with the exercise you're on:

```bash
git stash
git checkout 01-apollo-server
```

- **I'm getting errors related to the Engine proxy:** You need to make a .env file in the root that contains `ENGINE_API_KEY=yourkeyhere`. Replace yourkeyhere with the Engine key you get from [creating your own service](https://engine.apollographql.com/).

## Helpful links
- [graphql.org docs](http://graphql.org/learn/schema/)
- [Learn about resolvers here](https://www.apollographql.com/docs/graphql-tools/resolvers.html)
- [Apollo Engine docs](https://www.apollographql.com/docs/engine/)
- [DataLoader](https://www.apollographql.com/docs/graphql-tools/connectors.html#dataloader)

## Running locally

1. Clone the repo: `git clone https://github.com/apollographql/fullstack-workshop-server`
2. Then, make a `.env` file with an `ENGINE_API_KEY` environment variable. You can get one [here](https://engine.apollographql.com/) by creating your own Engine service.
3. Install the dependencies: `npm i`
4. Start the server: `npm start`. Your server will be running on port 3000. Your GraphQL server is available at `localhost:3000/graphql` and your GraphQL Playground is available at `localhost:3000/graphql`.

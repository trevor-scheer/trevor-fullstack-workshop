/* TODO: Implement the resolvers for Mutation

Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;

Check models/movie for the data fetching functions you'll need to complete the exercise.
Refer to your schema if you're unsure what to return from the resolvers.
Good luck!
*/

module.exports = {
  Mutation: {
    toggleLike: async (root, { id }, { models, user }) => {
      if (!user) throw new Error('You must be logged in to do this');
      await models.movie.toggleMovieLike({ id, user });
      return models.movie.getMovieById(id);
    },
    login: (_, { email }) => new Buffer(email).toString('base64'),
  },
};

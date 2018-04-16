export default {
  Mutation: {
    toggleLike: async (root, { id }, { models }, { user }) => {
      if (!user) throw new Error('You must be logged in to do this');
      await models.movie.toggleMovieLike(id);
      return models.movie.getMovieById(id);
    },
    authorize: (_, { email }, { models, user }) => {
      return new Buffer(email).toString('base64');
    },
  },
};

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

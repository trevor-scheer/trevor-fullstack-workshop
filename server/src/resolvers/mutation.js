export default {
  Mutation: {
    toggleLike: async (root, { id }, { models }) => {
      await models.movie.toggleMovieLike(id);
      return models.movie.getMovieById(id);
    },
  },
};

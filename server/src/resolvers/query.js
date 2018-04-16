export default {
  Query: {
    movie: (root, { id }, { models }) => models.movie.getMovieById(id),
    movies: (root, { sort, year, page = 1 }, { models }) => {
      // API restriction
      if (page > 1000)
        throw new Error('Page must be less than or equal to 1000');
      return models.movie.getMovies({ sort, year, page });
    },
    likes: async (root, args, { models }) => {
      const likes = await models.movie.getMovieLikes();
      return likes.map(id => models.movie.getMovieById(id));
    },
  },
};

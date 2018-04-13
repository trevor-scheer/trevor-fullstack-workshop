export default {
  Query: {
    movie: (root, { id }, { models }) => {
      return models.movie.getMovieById(id);
    },
    movies: (root, { sort, year, limit = 20, offset = 0 }, { models }) => {
      return models.movie.getMovies({ sort, year, limit, offset });
    },
  },
};

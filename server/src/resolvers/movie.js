export default {
  Movie: {
    score: ({ vote_average }) => vote_average,
    voteCount: ({ vote_count }) => vote_count,
    poster: ({ poster_path }, { size = 500 }) => {
      return `https://image.tmdb.org/t/p/w${size}${poster_path}`;
    },
    genres: ({ genres }) => (genres ? genres.map(g => g.name) : []),
    releaseDate: ({ release_date }) => release_date,
    cast: ({ id }, _, { models }) => {
      return models.cast.getCastByMovie(id);
    },
  },
};

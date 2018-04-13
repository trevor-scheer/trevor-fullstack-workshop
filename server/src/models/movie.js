export default ({ config, axios }) => ({
  async getMovieById(id) {
    const url = `${config.url}/movie/${id}`;

    const res = await axios(url, {
      params: config.params,
    });

    return res && res.data ? res.data : null;
  },

  async getMovies({ sort, year, limit, offset }) {
    const PAGE_SIZE = 20;

    const sortParam =
      sort === 'POPULARITY'
        ? 'popularity.desc'
        : sort === 'RELEASE_DATE' ? 'release_date.desc' : null;

    const movies = await axios(`${config.url}/discover/movie`, {
      params: { ...config.params, year, sort_by: sortParam },
    });

    return movies && movies.data && movies.data.results
      ? movies.data.results
      : [];
  },
});

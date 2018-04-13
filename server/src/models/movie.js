const PAGE_SIZE = 20;

const likes = new Set();

export default ({ config, axios }) => ({
  async getMovieById(id) {
    const url = `${config.url}/movie/${id}`;

    const res = await axios(url, {
      params: config.params,
    });

    return res && res.data
      ? { ...res.data, isLiked: await this.isMovieLiked(id) }
      : null;
  },

  async getMovies({ sort, year, page }) {
    let sortParam = null;
    if (sortParam === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sortParam === 'RELEASE_DATE') sortParam = 'release_date.desc';

    const res = await axios(`${config.url}/discover/movie`, {
      params: { ...config.params, year, sort_by: sortParam, page },
    });

    return res && res.data && res.data.results
      ? res.data.results.map(m => ({ ...m, isLiked: this.isMovieLiked(m.id) }))
      : [];
  },

  // leaving this async, because it'd likely be a DB lookup/API call
  async getMovieLikes() {
    let likesKeys = [];
    for (let item of likes.keys()) likesKeys.push(item);
    return likesKeys;
  },

  // leaving this async, because it'd likely be a DB lookup/API call
  async toggleMovieLike(id) {
    if (likes.has(id)) likes.delete(id);
    else likes.add(id);
  },

  // leaving this async, because it'd likely be a DB lookup/API call
  async isMovieLiked(id) {
    return likes.has(`${id}`);
  },
});

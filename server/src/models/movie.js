const PAGE_SIZE = 20;

const likes = new Set();

export default ({ config, fetch, utils }) => ({
  async getMovieById(id) {
    const paramString = utils.paramsObjectToURLString(config.params);
    const url = `${config.url}/movie/${id}${paramString}`;

    return fetch(url).then(res => res.json());
  },

  async getMovies({ sort, year, page }) {
    let sortParam = null;
    if (sortParam === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sortParam === 'RELEASE_DATE') sortParam = 'release_date.desc';

    const paramString = utils.paramsObjectToURLString({
      ...config.params,
      year,
      sort_by: sortParam,
      page,
    });
    const url = `${config.url}/discover/movie${paramString}`;

    return fetch(url)
      .then(res => res.json())
      .then(json => json.results || []);
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

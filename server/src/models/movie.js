const PAGE_SIZE = 20;

export default ({ config, fetch, utils, store }) => ({
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
      ...(year ? { year } : {}),
      ...(page ? { page } : {}),
      ...(sortParam ? { sort_by: sortParam } : {}),
    });
    const url = `${config.url}/discover/movie${paramString}`;

    return fetch(url)
      .then(res => res.json())
      .then(json => json.results || []);
  },

  async getMovieLikes({ user }) {
    return await store.likes.findAll({ where: { user } });
  },

  async toggleMovieLike({ id, user }) {
    const like = await store.likes.find({
      where: {
        user,
      },
    });

    if (!like) await store.likes.create({ user, movie: id });
    else await store.likes.destroy({ where: { user, movie: id } });
  },

  async isMovieLiked({ id, user }) {
    const like = await store.likes.find({ where: { user, movie: id } });
    return !!like;
  },
});

/*
TODO: Refactor getMovies and getMovieById to use DataLoader
Check out models/cast for an example!
*/

const PAGE_SIZE = 20;

module.exports = ({ config, utils, store, loaders }) => ({
  async getMovieById(id) {
    return loaders.fetch.load([`/movie/${id}`]);
  },

  async getMovies({ sort, page }) {
    let sortParam = null;
    if (sort === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sort === 'RELEASE_DATE') sortParam = 'release_date.desc';

    return loaders.fetch
      .load(['/discover/movie', { params: { page, sort_by: sortParam } }])
      .then(json => json.results || []);
  },

  async getMovieLikes({ user }) {
    return await store.likes.findAll({ where: { user } });
  },

  async toggleMovieLike({ id, user }) {
    const like = await store.likes.find({
      where: {
        user,
        movie: id,
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

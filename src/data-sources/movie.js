const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor({ baseURL, params, store }) {
    super();

    this.params = params;
    this.baseURL = baseURL;
    this.pageSize = 20;
    this.store = store; // sql store
  }

  // add api params to each request
  willSendRequest(request) {
    Object.keys(this.params).map(key =>
      request.params.set(key, this.params[key]),
    );
  }

  async getMovieById(id) {
    return this.get(`movie/${id}`);
  }

  async getMovies({ sort, page }) {
    let sortParam = null;
    if (sort === 'POPULARITY') sortParam = 'popularity.desc';
    else if (sort === 'RELEASE_DATE') sortParam = 'release_date.desc';

    const res = await this.get('/discover/movie', {
      params: { page, sort_by: sortParam },
    });

    return res ? res.results : [];
  }

  async getMovieLikes({ user }) {
    return await this.store.likes.findAll({ where: { user } });
  }

  async toggleMovieLike({ id, user }) {
    const like = await this.store.likes.find({
      where: {
        user,
        movie: id,
      },
    });

    if (!like) await this.store.likes.create({ user, movie: id });
    else await this.store.likes.destroy({ where: { user, movie: id } });
  }

  async isMovieLiked({ id, user }) {
    const like = await this.store.likes.find({ where: { user, movie: id } });
    return !!like;
  }
}

module.exports = MoviesAPI;

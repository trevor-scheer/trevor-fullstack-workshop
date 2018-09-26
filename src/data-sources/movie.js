const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  // add api params to each request
  // e.g. BASE_URL/movie/1/credits?api_key=4u859034&include_adult=false
  willSendRequest(request) {
    request.params.set('api_key', '4e911a064e43b9cd6fbb3137c572d89a');
    request.params.set('include_adult', false);
  }

  async getCastByMovie(id) {
    const res = await this.get(`/movie/${id}/credits`);
    return res ? res.cast : [];
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
}

module.exports = MoviesAPI;

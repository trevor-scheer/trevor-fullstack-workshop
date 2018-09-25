const { RESTDataSource } = require('apollo-datasource-rest');

class CastAPI extends RESTDataSource {
  constructor({ baseURL, params, store }) {
    super();

    this.params = params;
    this.baseURL = baseURL;
  }

  // add api params to each request
  willSendRequest(request) {
    Object.keys(this.params).map(key =>
      request.params.set(key, this.params[key]),
    );
  }

  async getCastByMovie(id) {
    const res = await this.get(`/movie/${id}/credits`);
    return res ? res.cast : [];
  }
}

module.exports = CastAPI;

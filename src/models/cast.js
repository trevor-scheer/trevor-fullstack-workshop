module.exports = ({ config, utils, loaders }) => ({
  async getCastByMovie(id) {
    const paramString = utils.paramsObjectToURLString(config.params);
    const url = `${config.url}/movie/${id}/credits${paramString}`;

    return loaders.fetch.load(url).then(json => json.cast || []);
  },
});

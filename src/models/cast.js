module.exports = ({ config, utils, loaders }) => ({
  async getCastByMovie(id) {
    return loaders.fetch
      .load([`/movie/${id}/credits`])
      .then(json => json.cast || []);
  },
});

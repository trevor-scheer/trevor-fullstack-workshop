export default ({ config, axios }) => ({
  async getCastByMovie(id) {
    const url = `${config.url}/movie/${id}/credits`;

    const res = await axios(url, {
      params: config.params,
    });

    return res && res.data && res.data.cast ? res.data.cast : [];
  },
});

const query = require('./query');
const movie = require('./movie');
const cast = require('./cast');
const mutation = require('./mutation');

module.exports = {
  ...query,
  ...movie,
  ...cast,
  ...mutation,
};

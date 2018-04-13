import query from './query';
import movie from './movie';
import cast from './cast';
import mutation from './mutation';

export default {
  ...query,
  ...movie,
  ...cast,
  ...mutation,
};

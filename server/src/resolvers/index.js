import queryResolvers from './query';
import movieResolvers from './movie';
import castResolvers from './cast';

export default {
  ...queryResolvers,
  ...movieResolvers,
  ...castResolvers,
};

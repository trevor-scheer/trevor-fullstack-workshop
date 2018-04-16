export default {
  Cast: {
    photo: ({ profile_path }, { size = 500 }) =>
      `https://image.tmdb.org/t/p/w${size}${profile_path}`,
    gender: ({ gender }) => (gender === 1 ? 'f' : gender === 2 ? 'm' : null),
  },
};

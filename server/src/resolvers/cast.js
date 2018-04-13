export default {
  Cast: {
    photo: ({ profile_path }, { size = 500 }) =>
      `https://image.tmdb.org/t/p/w${size}${profile_path}`,
    gender: ({ gender }) => (gender === 0 ? null : gender === 1 ? 'f' : 'm'),
  },
};

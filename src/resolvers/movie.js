/* TODO: Implement the resolvers for Movie

Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;

Check models/movie for the data fetching functions you'll need to complete the exercise.
Refer to your schema if you're unsure what to return from the resolvers.

Here's an example API response to help you out:
{
  genres: [
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10749,
      name: "Romance"
    }
  ],
  homepage: "http://www.fiftyshadesmovie.com",
  id: 337167,
  overview: "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
  popularity: 550.431531,
  poster_path: "/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg",
  release_date: "2018-02-07",
  runtime: 106,
  tagline: "Don't miss the climax",
  title: "Fifty Shades Freed",
  vote_average: 6,
  vote_count: 1423
}
*/

module.exports = {
  Movie: {
    score: ({ vote_average }) => vote_average,
    voteCount: ({ vote_count }) => vote_count,
    poster: ({ poster_path }, { size = 500 }) =>
      poster_path && `https://image.tmdb.org/t/p/w${size}${poster_path}`,
    genres: ({ genres }) => (genres ? genres.map(g => g.name) : []),
    releaseDate: ({ release_date }) => release_date,
    cast: ({ id }, _, { models }) => models.cast.getCastByMovie(id),
    isLiked: ({ id }, _, { models, user }) => {
      if (!user) return false;
      return models.movie.isMovieLiked({ user, id });
    },
  },
};

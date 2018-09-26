/**
 * The purpose of resolver tests:
 *
 * Run a single resolver. Given a specific input (root, args, context), it should test that:
 * 1. the resolver validates/transforms any input it needs
 *    - see ./movie ([isLiked] fails lookup of likes if theres no user)
 *    - see ./query ([movies] doesnt allow large page numbers)
 * 2. all dataSources get called with correct args
 *    - see ./query ([movie] calls movie lookup model)
 * 3. resolver returns correct result for given input
 *    - see ./query ([movie] calls movie lookup model)
 */

const resolvers = require('../movie');

describe('Movie Resolvers', () => {
  it('[score] should get score from movie object', () => {
    expect(resolvers.Movie.score({ vote_average: 1 })).toEqual(1);
  });
  it('[voteCount] should get voteCount from movie object', () => {
    expect(resolvers.Movie.voteCount({ vote_count: 100 })).toEqual(100);
  });

  it('[poster] should get photo with size from args', () => {
    const res = resolvers.Movie.poster({ poster_path: 'lol/' }, { size: 999 });

    // we don't care about the specific url as much
    // as checking to see if the args and profile path
    // were passed through
    expect(res).toContain('lol');
    expect(res).toContain('999');
  });

  it('[genres] should get genres from movie object', () => {
    expect(
      resolvers.Movie.genres({ genres: [{ name: 'a' }, { name: 'b' }] }),
    ).toEqual(['a', 'b']);
  });

  it('[releaseDate] should get releaseDate from movie object', () => {
    expect(resolvers.Movie.releaseDate({ release_date: 1 })).toEqual(1);
  });

  // we need to mock the underlying models that get passed in the context
  it('[cast] looks up cast and returns', () => {
    const mockContext = {
      dataSources: { moviesAPI: { getCastByMovie: jest.fn(() => 'cast') } },
    };
    const res = resolvers.Movie.cast({ id: 1 }, null, mockContext);
    expect(res).toEqual('cast');
    expect(mockContext.dataSources.moviesAPI.getCastByMovie).toBeCalledWith(1);
  });

  // we need to mock the underlying models that get passed in the context
  it('[isLiked] fails lookup of likes if theres no user', () => {
    const res = resolvers.Movie.isLiked({ id: 1 }, null, {});
    expect(res).toBeFalsy();
  });

  it('[isLiked] looks up if movie is liked', () => {
    const mockContext = {
      dataSources: { likesAPI: { isMovieLiked: jest.fn(() => true) } },
      user: { id: 1 },
    };
    const res = resolvers.Movie.isLiked({ id: 1 }, null, mockContext);

    expect(res).toBeTruthy();
    expect(mockContext.dataSources.likesAPI.isMovieLiked).toBeCalledWith({
      user: { id: 1 },
      id: 1,
    });
  });
});

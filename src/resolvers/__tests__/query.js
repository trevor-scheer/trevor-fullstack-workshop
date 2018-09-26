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

const resolvers = require('../query');

describe('Query Resolvers', () => {
  const mockMovie = { id: 1, title: 'hey' };

  it('[movie] calls movie lookup model', () => {
    const mockContext = {
      dataSources: { moviesAPI: { getMovieById: jest.fn(() => mockMovie) } },
    };
    expect(resolvers.Query.movie(null, { id: 1 }, mockContext)).toEqual(
      mockMovie,
    );
    expect(mockContext.dataSources.moviesAPI.getMovieById).toBeCalledWith(1);
  });

  it('[movies] doesnt allow large page numbers', () => {
    expect(() => resolvers.Query.movies(null, { page: 99999 }, {})).toThrow();
  });

  it('[movies] calls movie lookup model', () => {
    const mockContext = {
      dataSources: { moviesAPI: { getMovies: jest.fn(() => [mockMovie]) } },
    };
    expect(
      resolvers.Query.movies(
        null,
        { sort: 'POPULARITY', page: 10 },
        mockContext,
      ),
    ).toEqual([mockMovie]);
    expect(mockContext.dataSources.moviesAPI.getMovies).toBeCalledWith({
      sort: 'POPULARITY',
      page: 10,
    });
  });

  it('[likes] gets likes by user', async () => {
    const mockContext = {
      dataSources: {
        moviesAPI: {
          getMovieById: jest.fn(() => mockMovie),
          getMovieLikes: jest.fn(() => [{ movie: 1 }]),
        },
      },
      user: 1,
    };

    const res = await resolvers.Query.likes(null, null, mockContext);

    expect(res).toEqual([mockMovie]);
    expect(mockContext.dataSources.moviesAPI.getMovieById).toBeCalledWith(1);
    expect(mockContext.dataSources.moviesAPI.getMovieLikes).toBeCalledWith({
      user: 1,
    });
  });
});

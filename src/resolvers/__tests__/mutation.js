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

const resolvers = require('../mutation');

describe('Mutation Resolvers', () => {
  it('[toggleLike] should error if no user', async done => {
    return resolvers.Mutation.toggleLike(null, {}, {}).catch(err => {
      expect(err).toBeDefined;
      done();
    });
  });

  it('[toggleLike] calls toggleLike and returns movie', async () => {
    const mockContext = {
      dataSources: {
        moviesAPI: {
          toggleMovieLike: jest.fn(),
          getMovieById: jest.fn(() => ({ title: 'wow' })),
        },
      },
      user: 1,
    };

    const res = await resolvers.Mutation.toggleLike(
      null,
      { id: 1 },
      mockContext,
    );

    expect(mockContext.dataSources.moviesAPI.toggleMovieLike).toBeCalledWith({
      id: 1,
      user: 1,
    });
    expect(mockContext.dataSources.moviesAPI.getMovieById).toBeCalledWith(1);
    expect(res).toEqual({ title: 'wow' });
  });

  it('[login] encodes email arg', () => {
    expect(resolvers.Mutation.login(null, { email: 'a@a.a' })).toEqual(
      'YUBhLmE=',
    );
  });
});

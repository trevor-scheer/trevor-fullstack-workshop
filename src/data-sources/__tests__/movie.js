/**
 * The purpose of dataSource tests:
 * 1. validate/transform any args
 *    - see ./movie ([getMovies] sets sort param properly)
 * 2. make sure data returned from APIs is transformed properly
 *    - see ./movie ([getMovies] returns empty array if no api response)
 * 3. calls any other underlying models with correct args
 *    - see ./movie ([getMovieLikes] calls store method and returns results)
 */

const MoviesAPI = require('../movie');

describe('MoviesAPI', () => {
  let moviesAPI;

  beforeEach(() => {
    moviesAPI = new MoviesAPI({
      params: { foo: 'bar', baz: 'daz' },
      store: {
        likes: {
          findAll: jest.fn(),
          find: jest.fn(),
          create: jest.fn(),
          destroy: jest.fn(),
        },
      },
    });
  });

  it('[willSendRequest] calls params set on request', () => {
    const request = { params: { set: jest.fn() } };
    const res = moviesAPI.willSendRequest(request);

    expect(request.params.set).toHaveBeenCalledTimes(2);

    // called the first time with 'foo', 'bar'
    expect(request.params.set).toHaveBeenNthCalledWith(1, 'foo', 'bar');

    // called the second time with 'baz', 'daz'
    expect(request.params.set).toHaveBeenNthCalledWith(2, 'baz', 'daz');
  });

  it('[getMovieById] returns raw response from get', async () => {
    const movie = { title: 'hello world: the movie' };
    moviesAPI.get = jest.fn(() => movie);

    const res = await moviesAPI.getMovieById(1);

    expect(moviesAPI.get).toBeCalledWith('movie/1');
    expect(res).toEqual(movie);
  });

  it('[getMovies] sets sort param properly', async () => {
    moviesAPI.get = jest.fn();
    await moviesAPI.getMovies({});
    await moviesAPI.getMovies({ sort: 'POPULARITY' });
    await moviesAPI.getMovies({ sort: 'RELEASE_DATE' });

    // these check the args that moviesAPI.get was called with.
    // we're checking the _second_ argument of each call
    expect(moviesAPI.get.mock.calls[0][1].params.sort_by).toEqual(null);
    expect(moviesAPI.get.mock.calls[1][1].params.sort_by).toEqual(
      'popularity.desc',
    );
    expect(moviesAPI.get.mock.calls[2][1].params.sort_by).toEqual(
      'release_date.desc',
    );
  });

  it('[getMovies] passes page param', async () => {
    moviesAPI.get = jest.fn();
    await moviesAPI.getMovies({ page: 123 });

    // these check the args that moviesAPI.get was called with.
    // we're checking the _second_ argument of each call
    expect(moviesAPI.get.mock.calls[0][1].params.page).toEqual(123);
  });

  it('[getMovies] returns empty array if no api response', async () => {
    moviesAPI.get = jest.fn();
    const res = await moviesAPI.getMovies({});

    expect(res).toEqual([]);
  });

  it('[getMovieLikes] calls store method and returns results', async () => {
    const mockLikes = [{ id: 1, user: 1 }];
    moviesAPI.store.likes.findAll.mockReturnValueOnce(mockLikes);
    const res = await moviesAPI.getMovieLikes({ user: 1 });

    expect(moviesAPI.store.likes.findAll).toBeCalledWith({
      where: { user: 1 },
    });
    expect(res).toEqual(mockLikes);
  });

  it('[toggleMovieLikes] creates or destroys likes, based on current', async () => {
    // mock the return of the find ONCE, and expect destroy to be called to remove it
    const mockLikes = [{ id: 1, user: 1 }];
    moviesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
    await moviesAPI.toggleMovieLike({ user: 1, movie: 1 });
    expect(moviesAPI.store.likes.destroy).toBeCalled();

    // no likes found -- should create one
    await moviesAPI.toggleMovieLike({ user: 1, movie: 1 });
    expect(moviesAPI.store.likes.create).toBeCalled();
  });

  it('[isMovieLiked] finds like if present', async () => {
    // mock the return of the find ONCE. expect return to be true -- is liked
    const mockLikes = [{ id: 1, user: 1 }];
    moviesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
    const resTrue = await moviesAPI.isMovieLiked({ user: 1, movie: 1 });
    expect(resTrue).toBeTruthy();

    // no likes found -- should be false
    const resFalse = await moviesAPI.isMovieLiked({ user: 1, movie: 1 });
    expect(resFalse).toBeFalsy();
  });
});

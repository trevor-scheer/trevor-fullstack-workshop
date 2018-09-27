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
    moviesAPI = new MoviesAPI();
  });

  it('[getCastByMovie] returns empty array if null API response', async () => {
    moviesAPI.get = jest.fn();

    const res = await moviesAPI.getCastByMovie(1);

    expect(moviesAPI.get).toBeCalledWith('/movie/1/credits');
    expect(res).toEqual([]);
  });

  it('[getCastByMovie] returns cast if in API response', async () => {
    const cast = [1, 2];
    moviesAPI.get = jest.fn(() => ({ cast }));

    const res = await moviesAPI.getCastByMovie(1);

    expect(moviesAPI.get).toBeCalledWith('/movie/1/credits');
    expect(res).toEqual(cast);
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
});

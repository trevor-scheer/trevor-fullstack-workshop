/**
 * The purpose of dataSource tests:
 * 1. validate/transform any args
 *    - see ./movie ([getMovies] sets sort param properly)
 * 2. make sure data returned from APIs is transformed properly
 *    - see ./movie ([getMovies] returns empty array if no api response)
 * 3. calls any other underlying models with correct args
 *    - see ./movie ([getMovieLikes] calls store method and returns results)
 */

const CastAPI = require('../cast');

describe('CastAPI', () => {
  let castAPI;

  beforeEach(() => {
    castAPI = new CastAPI({ params: { foo: 'bar', baz: 'daz' } });
  });

  it('[willSendRequest] calls params set on request', () => {
    const request = { params: { set: jest.fn() } };
    const res = castAPI.willSendRequest(request);

    expect(request.params.set).toHaveBeenCalledTimes(2);

    // called the first time with 'foo', 'bar'
    expect(request.params.set).toHaveBeenNthCalledWith(1, 'foo', 'bar');

    // called the second time with 'baz', 'daz'
    expect(request.params.set).toHaveBeenNthCalledWith(2, 'baz', 'daz');
  });

  it('[getCastByMovie] returns empty array if null API response', async () => {
    castAPI.get = jest.fn();

    const res = await castAPI.getCastByMovie(1);

    expect(castAPI.get).toBeCalledWith('/movie/1/credits');
    expect(res).toEqual([]);
  });

  it('[getCastByMovie] returns cast if in API response', async () => {
    const cast = [1, 2];
    castAPI.get = jest.fn(() => ({ cast }));

    const res = await castAPI.getCastByMovie(1);

    expect(castAPI.get).toBeCalledWith('/movie/1/credits');
    expect(res).toEqual(cast);
  });
});

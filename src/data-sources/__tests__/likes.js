/**
 * The purpose of dataSource tests:
 * 1. validate/transform any args
 *    - see ./movie ([getMovies] sets sort param properly)
 * 2. make sure data returned from APIs is transformed properly
 *    - see ./movie ([getMovies] returns empty array if no api response)
 * 3. calls any other underlying models with correct args
 *    - see ./movie ([getMovieLikes] calls store method and returns results)
 */

const LikesAPI = require('../likes');

describe('LikesAPI', () => {
  let likesAPI;

  beforeEach(() => {
    likesAPI = new LikesAPI();
    likesAPI.store = {
      likes: {
        findAll: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
      },
    };
  });

  it('[getMovieLikes] calls store method and returns results', async () => {
    const mockLikes = [{ id: 1, user: 1 }];
    likesAPI.store.likes.findAll.mockReturnValueOnce(mockLikes);
    const res = await likesAPI.getMovieLikes({ user: 1 });

    expect(likesAPI.store.likes.findAll).toBeCalledWith({
      where: { user: 1 },
    });
    expect(res).toEqual(mockLikes);
  });

  it('[toggleMovieLikes] creates or destroys likes, based on current', async () => {
    // mock the return of the find ONCE, and expect destroy to be called to remove it
    const mockLikes = [{ id: 1, user: 1 }];
    likesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
    await likesAPI.toggleMovieLike({ user: 1, movie: 1 });
    expect(likesAPI.store.likes.destroy).toBeCalled();

    // no likes found -- should create one
    await likesAPI.toggleMovieLike({ user: 1, movie: 1 });
    expect(likesAPI.store.likes.create).toBeCalled();
  });

  it('[isMovieLiked] finds like if present', async () => {
    // mock the return of the find ONCE. expect return to be true -- is liked
    const mockLikes = [{ id: 1, user: 1 }];
    likesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
    const resTrue = await likesAPI.isMovieLiked({ user: 1, movie: 1 });
    expect(resTrue).toBeTruthy();

    // no likes found -- should be false
    const resFalse = await likesAPI.isMovieLiked({ user: 1, movie: 1 });
    expect(resFalse).toBeFalsy();
  });
});

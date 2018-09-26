it('', () => {});

// it('[getMovieLikes] calls store method and returns results', async () => {
//   const mockLikes = [{ id: 1, user: 1 }];
//   moviesAPI.store.likes.findAll.mockReturnValueOnce(mockLikes);
//   const res = await moviesAPI.getMovieLikes({ user: 1 });

//   expect(moviesAPI.store.likes.findAll).toBeCalledWith({
//     where: { user: 1 },
//   });
//   expect(res).toEqual(mockLikes);
// });

// it('[toggleMovieLikes] creates or destroys likes, based on current', async () => {
//   // mock the return of the find ONCE, and expect destroy to be called to remove it
//   const mockLikes = [{ id: 1, user: 1 }];
//   moviesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
//   await moviesAPI.toggleMovieLike({ user: 1, movie: 1 });
//   expect(moviesAPI.store.likes.destroy).toBeCalled();

//   // no likes found -- should create one
//   await moviesAPI.toggleMovieLike({ user: 1, movie: 1 });
//   expect(moviesAPI.store.likes.create).toBeCalled();
// });

// it('[isMovieLiked] finds like if present', async () => {
//   // mock the return of the find ONCE. expect return to be true -- is liked
//   const mockLikes = [{ id: 1, user: 1 }];
//   moviesAPI.store.likes.find.mockReturnValueOnce(mockLikes);
//   const resTrue = await moviesAPI.isMovieLiked({ user: 1, movie: 1 });
//   expect(resTrue).toBeTruthy();

//   // no likes found -- should be false
//   const resFalse = await moviesAPI.isMovieLiked({ user: 1, movie: 1 });
//   expect(resFalse).toBeFalsy();
// });

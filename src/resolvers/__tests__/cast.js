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

const resolvers = require('../cast');

describe('Cast Resolvers', () => {
  it('should get photo with size from args', () => {
    const res = resolvers.Cast.photo({ profile_path: 'lol/' }, { size: 999 });

    // we don't care about the specific url as much
    // as checking to see if the args and profile path
    // were passed through
    expect(res).toContain('lol');
    expect(res).toContain('999');
  });

  it('should return `m`, `f`, or null for gender', () => {
    expect(resolvers.Cast.gender({ gender: 1 })).toEqual('f');
    expect(resolvers.Cast.gender({ gender: 2 })).toEqual('m');
    expect(resolvers.Cast.gender({ gender: 3 })).toEqual(null);
  });
});

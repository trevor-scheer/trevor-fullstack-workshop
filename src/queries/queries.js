const gql = require('graphql-tag');

const Movie = gql`
  query Movie {
    movie(id: 3) {
      id
      isLiked
    }
  }
`;

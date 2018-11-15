const gql = require('graphql-tag');

const IsLiked = gql`
  fragment IsLiked on Movie {
    isLiked
  }
`;

const Cast = gql`
  fragment Cast on Movie {
    cast {
      character
      gender
    }
  }
`;

module.exports = { IsLiked, Cast };

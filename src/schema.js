module.exports = `
  type Query {
    movie(id: ID): Movie
    movies(sort: SORT_TYPE, page: Int): [Movie]!
    likes: [Movie]
  }

  type Mutation {
    toggleLike(id: ID!): Movie
    login(email: String!): String
  }

  enum SORT_TYPE {
    POPULARITY
    RELEASE_DATE
  }

  type Movie {
    id: ID
    title: String
    overview: String
    score: Float
    voteCount: Int
    popularity: Float
    poster(size: Int): String
    genres: [String]!
    releaseDate: String
    cast: [Cast]!
    isLiked: Boolean
    runtime: Int
  }


  type Cast {
    id: ID
    name: String!
    photo(size: Int): String
    gender: String
    character: String
  }
`;

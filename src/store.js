const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
});

const CREATE_LIKES_QUERY = `CREATE TABLE likes(
  id INTEGER PRIMARY KEY,
  createdAt DATETIME,
  updatedAt DATETIME,
  user TEXT,
  movie TEXT
)`;

sequelize.query(CREATE_LIKES_QUERY);

const likes = sequelize.define('like', {
  user: Sequelize.STRING,
  movie: Sequelize.STRING,
});

module.exports = { likes };

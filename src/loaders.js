const DataLoader = require('dataloader');
const fetch = require('node-fetch');

module.exports = function makeLoaders() {
  return {
    fetch: new DataLoader(queries => {
      return Promise.all(
        queries.map(url => {
          console.log('GET', url);
          return fetch(url).then(res => res.json());
        }),
      );
    }),
  };
};

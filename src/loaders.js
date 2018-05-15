const DataLoader = require('dataloader');

module.exports = function makeLoaders(fetch) {
  return {
    fetch: new DataLoader(
      queries => {
        return Promise.all(
          queries.map(([url, config]) => {
            return fetch(url, config).then(res => res.json());
          }),
        );
      },
      {
        cacheKeyFn: JSON.stringify,
      },
    ),
  };
};

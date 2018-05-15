const fetch = require('node-fetch');

/**
 * turns an object into a URL query string, prefixed with `?`
 * ex: paramsObjectToURLString({foo: 'bar', baz: 'bar'}) === '?foo=bar&baz=bar'
 */
const paramsObjectToURLString = params =>
  Object.keys(params).reduce((qs, key) => {
    if (params[key] !== null) {
      return `${qs}&${key}=${params[key]}`;
    }
    return qs;
  }, '?');

/**
 * A friendly wrapper around fetch to handle base config and querystring transformation.
 */
const makeFetch = baseConfig => (url, { params = {}, ...config } = {}) => {
  const queryString = paramsObjectToURLString({
    ...baseConfig.params,
    ...params,
  });
  console.log(
    `GET ${baseConfig.url}${url}\n`,
    `params: ${JSON.stringify(params, null, 2)}`,
  );
  return fetch(`${baseConfig.url}${url}${queryString}`, config);
};

module.exports = {
  paramsObjectToURLString,
  makeFetch,
};

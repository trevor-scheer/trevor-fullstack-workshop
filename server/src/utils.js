export const paramsObjectToURLString = params =>
  `?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;

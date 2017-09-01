const bodyParser = require('body-parser');

const wrapper = (parser, options) => {
  const parserMiddleware = bodyParser[parser](options);
  return req => (new Promise((resolve, reject) => {
    parserMiddleware(req, null, (e) => {
      if (e) {
        return reject(e);
      }
      return resolve(req.body);
    });
  }));
};

const middlewareFactory = {
  json: options => wrapper('json', options),
  raw: options => wrapper('raw', options),
  text: options => wrapper('text', options),
  urlencoded: options => wrapper('urlencoded', Object.assign({}, options, { extended: true })),
};

// a Yttrium plugin has a name and a function
// it becomes $(anything).name(optionalArgs);
module.exports = {
  name: 'parseBody',
  func(type, options) {
    if (['json', 'raw', 'text', 'urlencoded'].includes(type)) {
      return middlewareFactory[type](options)(this[0]);
    }
    throw new Error('You must specify either json, raw, text, or urlencoded');
  },
};

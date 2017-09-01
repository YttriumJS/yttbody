# Yttrium Body Parser
This package wraps the Express [body-parser](https://github.com/expressjs/body-parser) package to make it usable by the YttriumJS web framework.

## Installation
```bash
npm install yttbody --save
```

## How To Use
The Yttrium server exposes the `use` method to add plugins. Add the body parsing plugin like this:

```javascript
const Y = require('yttrium-server');
const parseBody = require('yttbody');

const { $, server, router } = Y();
$(parseBody).use();
```

This will expose a `parseBody` method on the jQuery object (regardless of the name used when importing the body parser).
To parse a request body, use the `parseBody` method in one of your [route handlers](https://github.com/YttriumJS/yttrium-server#routing):

```javascript
$.route('index')
  .append('<post-example>');

$.route('post-example')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      $(req).parseBody('json')
        .then(body => res.end(JSON.stringify(body)))
        .catch(e => res.end(JSON.stringify(e)));
    });
```

## API

#### $(req).parseBody(parser, options)
`parser` is one of the four parsers supported by body-parser:

- json
- raw
- text
- urlencoded

`options` accepts any parser-specific options as documented in the [body-parser README](https://github.com/expressjs/body-parser#api).

Note: body-parser has deprecated the use of `urlencoded` without the `{ extended: true }` option set. This package auto sets `{ extended: true }` when using the `urlencoded` parser.

## License
[MIT](https://github.com/YttriumJS/yttbody/blob/master/LICENSE)
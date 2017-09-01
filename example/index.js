const Y = require('yttrium-server');
const parseBody = require('../src/index');

const { $, server, router } = Y();

$(parseBody).use();

$.route('index')
  .on('route', (e, req, res) => {
    e.stopPropagation();
    return $(req).parseBody('json')
      .then(body => res.end(JSON.stringify(body)))
      .catch(e => res.end(JSON.stringify(e)));
  });

$(server).on('request', router);

$(server).listen(8000);
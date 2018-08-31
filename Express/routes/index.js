var express = require('express');
var router = express.Router();
var template = require('../lib/template');
let auth = require('../lib/auth');

router.get('/', (req, res) => {      //route, routing 적당한 경로를 잡아주는 것
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(req.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/open.jpg" style="width:300px; display:block; margin-top: 10px;" />
      `,
      `<a href="/topic/create">create</a>`,
      auth.status_ui(req,res)
    );
    res.send(html);
  });

  module.exports = router;
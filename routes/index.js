var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { 
      title: 'Express',
      user: {
        name: 'Tobi',
        email: '<h1>tobai@gmail.com</h1>',
      },
      userNames: [
        {name: 'Tobi'},
        {name: 'Loki'},
        {name: 'Jane'},
        {name: 'Rau'}
      ],
      myHtml: '<h1>My Html</h1>',
    }
 );
});

router.post('/create', function(req, res, next) {
  res.send(req.body);
});

router.patch('/', function(req, res, next) {
  res.send({
    msg: 'update successfully'
  })
});

router.delete('/', function(req, res, next) {
  res.send({
    msg: 'delete successfully'
  })
});

module.exports = router;

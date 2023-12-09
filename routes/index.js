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

module.exports = router;

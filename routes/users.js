var express = require('express');
var router = express.Router();

router.get('/index.html', function(req, res, next) {
  const students = [
    {name: 'John', age: 20, score: 85},
    {name: 'Mary', age: 22, score: 90},
    {name: 'Jane', age: 21, score: 75},
  ];

  const theStudentsIsGreaterThen3 = students.length > 3;

  res.render('user-index', {
    title: 'Users',
    students,
    theStudentsIsGreaterThen3,
    test: {
      name: 'matt'
    }
  });
});

module.exports = router;

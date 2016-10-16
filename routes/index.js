var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('test');
});

router.get('/test', function(req, res, next) {
  console.log(req.query);
  // res.write(JSON.stringify({test:"test"}));
  res.json({});
  res.end();
});

module.exports = router;

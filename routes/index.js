var express = require('express');
var path = require('path');
var router = express.Router();

const FILENAME = 'sw.js';
router.get('/' + FILENAME, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/javascripts/', FILENAME));
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

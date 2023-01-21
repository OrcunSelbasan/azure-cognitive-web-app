var express = require('express');
var router = express.Router();
var SampleCollection = require('../db/index');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const addresses = await SampleCollection.find({}).toArray().then(res => res);
  res.render('index', { title: 'Express', addresses });
});

module.exports = router;

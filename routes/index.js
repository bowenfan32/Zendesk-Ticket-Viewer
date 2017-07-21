var express = require('express');
var router = express.Router();
var app = require('../app.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zendesk' });
});

router.get('/ticket=:id', function(req, res, next) {
	res.render('ticket', {ticketId: req.params.id, title: 'Zendesk'});
})

module.exports = router;

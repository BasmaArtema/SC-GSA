var express = require('express');
var router = express.Router();

/* GET events page. */
router.get('/', function(req, res) {
    res.render('events');
});

module.exports = router;

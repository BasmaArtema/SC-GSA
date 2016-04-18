var express = require('express');
var passport = require('passport');
var router = express.Router();
var isloggedin = require('./../utils/isloggedin');

/* GET /admin */
router.get('/', isloggedin.isloggedin, function(req, res) {
    //console.log('req.user ', req.user);
    //res.render('admin', {
    //    isAdmin: req.isAuthenticated()
    //});
});

/**
 * GET /admin/login/google/
 * Passport.js route
 */
router.get('/login/google/', passport.authenticate('google', {
    scope : ['profile', 'email']
}));

/**
 * GET /admin/auth/callback/
 * Passport.js route
 */
router.get('/auth/callback/', passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
}));

/* GET /admin/logout */
router.get('/logout', function(req,res) {
    req.session.destroy();
    console.log('logging out');
    res.redirect('/');
});

module.exports = router;
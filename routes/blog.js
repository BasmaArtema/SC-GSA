var express = require('express');
var router = express.Router();
var isloggedin = require('../utils/isloggedin');
var models = require('../models');

/* GET / */
router.get('/', function(req, res) {
    var responseData = {};

    var page = 1;
    var limit = 3;
    var offset = 0;

    if (req.query.p != undefined) {
        page = req.query.p;
        offset = (page-1) * limit;
    }

    models.Blogpost.findAndCountAll({
            order:'post_id DESC',
            offset: offset,
            limit: limit
        })
        .then(function(data) {
            //console.log('returned data ', data);
            responseData.error = false;
            responseData.posts = data.rows;
            res.render('blog', {
                isAdmin: req.isAuthenticated(),
                posts: responseData.posts,
                pagination: {
                    page: page,
                    limit: limit,
                    pageCount: Math.ceil(data.count/3)
                }
            });
        })
        .catch(function(err) {
            console.log(new Date());
            console.log(err);
            responseData.error = true;
            responseData.errors = err.errors;
            responseData.message = 'Error getting blog posts';
            res.status(500);
            res.json(responseData);

        });
});

/* GET /new */
router.get('/new', isloggedin.isloggedin, function(req, res) {
    res.render('blog-new', {
        isAdmin: req.isAuthenticated()
    });
});

/* POST /create */
router.post('/create', function(req, res) {

    models.Blogpost.create({
        user_id: '1',
        title: req.body.title,
        content: req.body.content,
        post_date: req.body.post_date
    })
        .then(function(data) {
            console.log('post_id', data.dataValues.post_id);
            res.json(data);
        })
        .catch(function(error) {
            console.log('ERROR! ', error.errors);
        });
});

/* GET /:id */
router.get('/:id', function(req, res) {
    responseData = {};
    console.log('req.headers ', req.headers);
    var referringUrl = req.headers['referer'];
    id = req.params.id;
    models.Blogpost.findById(id)
        .then(function(data) {
            responseData.error = false;
            responseData.post = data;
            res.render('blog-singlePost', {
                post: responseData.post,
                referringUrl: referringUrl,
                isAdmin: req.isAuthenticated()
            });
        })
        .catch(function(data) {
            console.log(new Date());
            console.log(data);
            responseData.error = true;
            responseData.errors = data.errors;
            responseData.message = 'Error getting blog post';
            res.status(500);
            res.json(responseData);
        });
});

/* DELETE /:id */
router.delete('/:id', function(req, res) {
    //console.log('delete request ', req);
    responseData = {};
    var id = req.params.id;
    models.Blogpost.destroy({
        where: {
            post_id: parseInt(id)
        }
    })
        .then(function(data) {
            responseData.error = false;
            responseData.data = data;
            console.log('success response data ', responseData);
            res.json(responseData);
        })
        .catch(function(data) {
            console.log(new Date());
            responseData.error = true;
            responseData.errors = data.errors;
            responseData.message = 'Error deleting blog post';
            console.log('catch response data ', responseData);
            //res.status(500);
            res.json(responseData);
        });
});
//
///* GET /:id/edit */
//router.get('/:id/edit', isloggedin.isloggedin, function(req, res) {
//    responseData = {};
//    var referringUrl = req.headers['referer'];
//    var id = req.params.id;
//
//    models.Blogpost.findById(id)
//        .then(function(data) {
//            responseData.error = false;
//            responseData.post = data;
//            res.render('blog-edit', {
//                post: responseData.post,
//                referringUrl: referringUrl,
//                isAdmin: req.isAuthenticated()
//            });
//        })
//        .catch(function(data) {
//            console.log(new Date());
//            console.log(data);
//            responseData.error = true;
//            responseData.errors = data.errors;
//            responseData.message = 'Error getting blog post';
//            res.status(500);
//            res.json(responseData);
//        });
//});
//
///* PUT /:id */
//router.put('/:id', isloggedin.isloggedin, function(req, res) {
//    models.Blogpost.update({
//            title: req.body.title,
//            content: req.body.content,
//            post_date: req.body.post_date
//        }, {
//            where: {
//                post_id: parseInt(req.params.id)
//            }
//    })
//        .then(function(data) {
//            console.log('data', data);
//            res.json(data);
//        })
//        .catch(function(data) {
//            console.log(new Date());
//            console.log(data);
//            responseData.error = true;
//            responseData.errors = data.errors;
//            responseData.message = 'Error updating blog post';
//            res.status(500);
//            res.json(responseData);
//        });
//});


module.exports = router;

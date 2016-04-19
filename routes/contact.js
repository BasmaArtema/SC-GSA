var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var configAuth = require('../config/config.json')[process.env.NODE_ENV];

/* GET /contact page. */
router.get('/', function(req, res) {
    console.log('req.session ', req.session);
    if (req.session.flash) {
        var emailResponse = req.session.flash.emailResponse;
        var emailSuccess = req.session.flash.emailSuccess;
        req.session.flash = null;
    }

    console.log('emailResponse ', emailResponse);
    console.log('emailSuccess ', emailSuccess);
    res.render('contact', {
        isAdmin: req.isAuthenticated(),
        emailResponse: emailResponse,
        emailSuccess: emailSuccess
    });
});

/* POST /contact */
router.post('/', function(req, res, next) {
    //console.log('REQ in POST CONTACT ', req);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: configAuth.mail.user,
            pass: configAuth.mail.pass
        }
    });
    var senderName = req.body.name || 'Anonymous';
    var message = "<p>Name: "+senderName+"</p><p>Email: "+req.body.email+"</p>"+"<p>Message: "+req.body.message+"</p>";
    var mailOptions = {
        from: 'scgsacontact@gmail.com',
        to: 'scgsa.test@gmail.com',
        subject: 'Message From SCGSA Contact Form',
        html: message
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            //res.json({hey: 'error'});
            req.flash('emailSuccess', false);
            req.flash('emailResponse', "We're sorry, there was an error sending your message.");
            res.redirect('/contact');
        } else {
            console.log('Message sent: ', info.response);
            //res.json({hey: info.response});
            req.flash('emailSuccess', true);
            req.flash('emailResponse', "Your message has been sent successfully.");
            res.redirect('/contact');
        }
    });
});


module.exports = router;

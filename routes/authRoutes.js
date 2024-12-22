const router = require("express").Router();
const express = require('express');
const passport = require("passport");
//const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
    
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
   // res.send(req.user);
   res.redirect('/profile/')
});

module.exports = router;
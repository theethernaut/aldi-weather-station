const express = require('express')
const passport = require('passport')
const router = express.Router()

// Load User model
//const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login.ejs',  { message: req.flash('loginMessage') }));

// Register Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup.ejs', { message: req.flash('signupMessage') }));

// Register
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/index',
  failureRedirect: '/users/signup',
  failureFlash: true
}));

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect: '/index',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

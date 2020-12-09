const express = require("express");
const router = express.Router();
const path = require('path');
const { allowNonAuthenticated, ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get('/', allowNonAuthenticated, (req, res) => { res.sendFile(path.resolve('views/index.html'));}) //res.render('login.ejs', { message: req.flash('loginMessage') }));

router.get('/home', ensureAuthenticated, (req, res) => { res.sendFile(path.resolve('views/index.html'));}) //res.render('login.ejs', { message: req.flash('loginMessage') }));

module.exports = router;

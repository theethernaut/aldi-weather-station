const express = require("express");
const router = express.Router();
const path = require('path');
const { allowNonAuthenticated } = require("../config/auth");

// Welcome Page
router.get('/', allowNonAuthenticated, (req, res) => { res.sendFile(path.resolve('views/index.html'));}) //res.render('login.ejs', { message: req.flash('loginMessage') }));

module.exports = router;

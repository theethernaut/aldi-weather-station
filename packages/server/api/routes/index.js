const express = require("express");
const router = express.Router();
const path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) =>  res.render('login.ejs', { message: req.flash('loginMessage') }));

// Dashboard
router.get("/index", ensureAuthenticated, (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
  //res.sendFile("/../../views/dashboard.html", { root: __dirname });
  //   res.sendFile('/index.html');
//   res.render('dashboard', {
//     user: req.user
//   })
});

module.exports = router;

const express = require("express");
const passport = require("passport");
const router = express.Router();
const path = require("path");

// Load User model
const User = require('../models/user');
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("login.ejs", { message: req.flash("loginMessage") })
);

// Register Page
router.get("/signup", forwardAuthenticated, (req, res) =>
  res.render("signup.ejs", { message: req.flash("signupMessage") })
);

// Register
router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/index",
    failureRedirect: "/users/signup",
    failureFlash: true,
  })
);

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local-login", {
    successRedirect: "/station/aldi",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid');
    res.redirect('/'); 
  });
});

router.get("/userId", (req, res, next) => {
  const id = req.query.userId;
  User.findOne({ _id: id })
    .exec()
    .then((docs) => {
      const response = {
        email: docs.local.email
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
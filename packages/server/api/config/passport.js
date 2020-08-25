var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");

//var User = mongoose.model("User");
var User = require("../models/user");
var configAuth = require("./auth");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          User.findOne({ "local.email": email }, function (err, user) {
            if (err) return done(err);
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "Este usuario ya existe")
              );
            } else {
              var newUser = new User();
              newUser._id = new mongoose.Types.ObjectId();
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              // newUser.local.role = "user";

              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        emailField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          User.findOne({ "local.email": email }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No se ha encontrado el usuario.")
              );
            }
            if (!user.validPassword(password)) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Password incorrecta.")
              );
            }
            return done(null, user);
          });
        });
      }
    )
  );

  /* passport.use(
    new FacebookStrategy(
      {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({ "facebook.id": profile.id }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, user);
            else {
              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = accessToken;
              newUser.facebook.name =
                profile.name.givenName + " " + profile.name.familyName;
              newUser.facebook.email = profile.emails[0].value;

              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          User.findOne({ "google.id": profile.id }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, user);
            else {
              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = accessToken;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value;

              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
              console.log(profile);
            }
          });
        });
      }
    )
    );*/
};
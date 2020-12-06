module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Por favor ingresa sesion para acceder a esta información.");
    res.redirect("/users/login");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/station");
  },

  allowNonAuthenticated: function (req, res, next) {
    const path = require('path');
    if (!req.isAuthenticated()) {
      res.sendFile(path.resolve('views/index.html'));
    }
    //return next();
  }
};

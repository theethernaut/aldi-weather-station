module.exports = {
  // facebookAuth: {
  //   clientID: "574492136768694",
  //   clientSecret: "e3370f39e245c9caa149bf7a7602e6b1",
  //   callbackURL: "https://localhost:3000/auth/facebook/callback",
  //   profileFields: ["emails"],
  // },

  // googleAuth: {
  //   clientID:
  //     "466432702374-ac0ggsmi1cvcml0tga9aeuv50muham74.apps.googleusercontent.com",
  //   clientSecret: "hQWlbxhu5LMib0CBD4VInXq9",
  //   callbackURL: "https://localhost:3000/auth/google/callback",
  // },

  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Por favor logueate para acceseder a esta información.");
    res.redirect("/users/login");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/index");
  },
};

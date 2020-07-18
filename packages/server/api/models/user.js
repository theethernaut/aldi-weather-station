const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    role: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);

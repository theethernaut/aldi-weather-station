const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  local: {
    email: String,
    password: String,
  }
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);

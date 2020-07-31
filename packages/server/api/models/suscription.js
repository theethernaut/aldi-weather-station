const mongoose = require("mongoose");

const suscriptionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hora: String,
  frequencia: Number
});

module.exports = mongoose.model("Suscription", suscriptionSchema);

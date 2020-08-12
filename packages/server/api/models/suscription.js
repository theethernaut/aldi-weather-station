const mongoose = require("mongoose");

const suscriptionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  raspi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raspi",
  },
  hour: String,
  active: Boolean,
});

module.exports = mongoose.model("Suscription", suscriptionSchema);

const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  raspi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raspi",
  },
  nombre: String
});

module.exports = mongoose.model("Zone", zoneSchema);

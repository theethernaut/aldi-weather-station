const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idRaspberry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Raspi",
  },
  internal_temp: String,
  humidity: String,
  image: String,
  video: String,
  rain: String,
  external_temp: String,
  uv_index: String,
  uv_risk_level: String,
  wind_direction: String,
  wind_speed: String,
});

module.exports = mongoose.model("Record", recordSchema);

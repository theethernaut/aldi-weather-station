const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }, {
        timestamps: true
    });

module.exports = model('User', userSchema);

const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

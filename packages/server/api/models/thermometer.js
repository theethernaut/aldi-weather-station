const { Schema, model } = require('mongoose');

const thermometerSchema = new Schema(
    {
        id: String,
        temp: Float
    });

module.exports = model('thermometer', thermometerSchema);
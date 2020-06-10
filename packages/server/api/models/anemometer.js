const { Schema, model } = require('mongoose');

const anemometerSchema = new Schema(
    {
        id: String,
        vel: Int
    });

module.exports = model('anemometer', anemometerSchema);
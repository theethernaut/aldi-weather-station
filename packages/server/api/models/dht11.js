const { Schema, model } = require('mongoose');

const dht11Schema = new Schema(
    {
        id: String,
        temp: Int,
        hum: Int
    });

module.exports = model('dht11', dht11Schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    geo: {
        lat: Number,
        lng: Number
    },
    address: {
        address: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    category: String
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;

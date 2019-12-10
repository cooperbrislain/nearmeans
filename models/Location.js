const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    Country: String,
    geo: {
        lat: Number,
        lng: Number
    },
    category: String
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;

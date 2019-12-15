const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    category: String,
    primary: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

LocationSchema.pre('save', async function(next) {
    const location = this;
    if(location.isModified('address')) {
        try {
            console.log(location.address);
            next();
        } catch(e) {
            next(e);
        }
    }
    next();
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;

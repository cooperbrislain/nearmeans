const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const InventorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Part' },
    location: { type: PointSchema },
    qty: Number
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
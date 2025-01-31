const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Part' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    qty: Number,
    type: String,
    status: String
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;

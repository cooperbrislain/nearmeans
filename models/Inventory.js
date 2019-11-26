const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    location: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    parts: [{
        partId: {type: Schema.Types.ObjectId, ref: 'Part'},
        qty: Number
    }]
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;

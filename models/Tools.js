const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ToolSchema = new Schema({

});

const Tool = mongoose.model('Tool', ToolSchema);
module.exports = Tool;

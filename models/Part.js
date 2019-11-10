const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    content: String
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

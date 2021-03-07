const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: {
        type: String,
        required: true,
        trim: true
    },
    userLogin: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        require: true
    }
})

const Comments = mongoose.model('comments', CommentSchema);
module.exports = Comments
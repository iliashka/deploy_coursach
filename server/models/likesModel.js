const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    postId: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
})

const Like = mongoose.model('likes', LikesSchema);
module.exports = Like
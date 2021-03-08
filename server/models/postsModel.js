const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    login: {
        type: String,
        required: true,
        trim: true
    },
    postName: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    likesCount: {
        type: Number,
    },
    rating: {
        type: Number,
        trim: true
    },
    post: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    },
    tags: {
        type: Array
    }
});

const Post = mongoose.model('posts', PostsSchema);
module.exports = Post
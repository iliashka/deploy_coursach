const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    tagBody: {
        type: Object,
        required: true,
    },
})

const Tags = mongoose.model('tags', TagsSchema);
module.exports = Tags
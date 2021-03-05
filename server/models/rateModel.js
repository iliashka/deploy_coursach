const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
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
    rate: {
        type: Number,
        required: true,
        trim: true
    }
})

const Rate = mongoose.model('rates', RatingSchema);
module.exports = Rate
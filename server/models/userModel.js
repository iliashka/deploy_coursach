const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String, 
        requred: true,
        trim: true
    },
    email: {
        type: String, 
        requred: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    avatar: {
        type: String,
    },
    accessToken: {
        type: String
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'blocked']
    }

});

const User = mongoose.model('user', UserSchema);
module.exports = User
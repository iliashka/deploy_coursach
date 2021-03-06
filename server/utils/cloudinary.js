require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dl7txojow',
    api_key: '473724674192643',
    api_secret: 'Fm3iU3k-Gpmg-QHLP9HhT6sSE1c',
});

module.exports = { cloudinary };
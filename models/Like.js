const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userHandle : { type: String, required: true },
    postID : { type: String, required: true }
});

module.exports = new mongoose.model('Likes', LikeSchema);
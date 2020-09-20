const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userID : { type: String, required: true, default: "Sergey" },
    postID : { type: String, required: true}
});

module.exports = new mongoose.model('Likes', LikeSchema);
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	userHandle: { type: String, required: true },
	postID: { type: String, required: true },
	body: { type: String, required: true },
	userImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = new mongoose.model('Comments', CommentSchema);
const mongoose = require('mongoose');

const PsotSchema = new mongoose.Schema({
    author: { 
        type: String, 
        required: true,
        default: "Sergey"
     },
    title: {
        type: String,
        required: true,
        min: 5,
        max: 50,
    },
    content: { 
        type: String, 
        required: true,
        min: 10,
        max: 1000,
     },
    date: {
        type: Date,
        default: Date.now,
    },
    imageURL: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = new mongoose.model('Posts', PsotSchema);
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
    },
    content: { 
        type: String, 
        required: true,
     },
    date: {
        type: Date,
        default: Date.now,
    },
    imageURL: {
        type: String
    },
});

module.exports = new mongoose.model('Posts', PsotSchema);
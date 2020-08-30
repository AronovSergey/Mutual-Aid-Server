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
    text: { 
        type: String, 
        required: true,
     },
    date: {
        type: Date,
        default: Date.now,
    },
    image: Buffer,
});

module.exports = new mongoose.model('Posts', PsotSchema);
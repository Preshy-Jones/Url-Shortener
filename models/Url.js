const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    address: String,
    shortened: String,
    //date: { type: String, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema); 
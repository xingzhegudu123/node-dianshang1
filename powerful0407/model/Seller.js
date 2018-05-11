const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    password: String,
    description: String,
    logo: String,
    banner: String
})

module.exports = mongoose.model('seller', sellerSchema);

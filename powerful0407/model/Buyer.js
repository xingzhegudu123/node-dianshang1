const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username:String,
    phoneNum: Number,
    password: String
})

module.exports = mongoose.model('buyer', schema);
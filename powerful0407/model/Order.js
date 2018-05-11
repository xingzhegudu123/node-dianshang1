const mongoose = require('mongoose');

const schema = mongoose.Schema({
    goods: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
    },
    count: Number
})

module.exports = mongoose.model('order', schema);
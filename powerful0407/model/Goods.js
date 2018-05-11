const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
        name: String,
        description: String,
        detailImg: {
            type: Array,
            default: []
        },
        thumbImg: {
            type: Array,
            default: []
        },
        size: {
            type: Array,
            default: []
        },
        style: {
            type: Array,
            default: []
        },
        count: Number,
        price: Number,
        seller: {
            ref: 'seller',
            type: mongoose.Schema.Types.ObjectId
        }
})

module.exports = mongoose.model('goods', goodsSchema);

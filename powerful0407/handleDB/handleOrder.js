const Order = require('../model/Order');
const Buyer = require('../model/Buyer');


function addOrder(goods, buyer, seller, count){
    return new Order(
        {goods, buyer, seller, count}
    ).save();
}

function findOrderByBuyer(id){
    return Order.find({buyer: id}).populate(['goods', 'seller']);

}

function findOrderBySeller(id){
    return Order.find({seller: id}).populate(['goods', 'buyer']);
}



module.exports = {
    addOrder,
    findOrderByBuyer,
    findOrderBySeller
}
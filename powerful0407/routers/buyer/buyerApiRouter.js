const express = require('express');
const bodyParse = require('body-parser')
const url = require('url');
const router = express.Router();

const { addBuyer,findBuyerByInfo} = require('../../handleDB/handleBuyer');
const { addOrder } = require('../../handleDB/handleOrder');
const { getGoodsInfoById } = require('../../handleDB/handleGoods');

router.use(bodyParse.urlencoded());

router.post('/register', (request, response)=>{
    // 取出注册的参数
    let {username,phoneNum, password} = request.body;
    // 保存用户数据
    addBuyer(username,phoneNum, password)
    .then(
        (msg)=>{//注册成功
            response.json({
                status: 0,
                message: msg
            })
        },
        (msg)=>{//注册失败
            response.json({
                status: 1,
                message: msg
            })
        }
    )
})


// 购买
router.post('/buy', (request, response)=>{
    if(response.buyerInfo._id){
        let { baseUrl, count} = request.body;
        // 得到买家id
        let buyerId = response.buyerInfo._id;
        //得到商品id
        let goodsId = url.parse(baseUrl, true).query.goodsId;
        // 根据产品id--  查询卖家id
        getGoodsInfoById(goodsId).then(result=>{
            let sellerId = result.seller._id;
            //可以购买
            addOrder(goodsId, buyerId, sellerId, count)
            .then(result=>{
                response.json({
                    status: 0,
                    message: '购买成功'
                })
            })
        })

        
    }else{
        response.json({
            status: 1,
            message: '请先登录'
        })
    }
})



router.post('/login', (request, response)=>{
    let {phoneNum, password} = request.body;

    findBuyerByInfo(phoneNum, password)
    .then(
        (result)=>{
            // 登录成功
            // console.log(result)
            response.cookies.set('BUYERID', result._id);
            response.json({
                status: 0,
                message: '登录成功'
            })
        },
        (msg)=>{
            //登录失败
            response.json({
                status: 1,
                message: msg
            })
        }
    )

})









module.exports = router;
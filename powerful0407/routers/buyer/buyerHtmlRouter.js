//处理买家页面请求
// 使用express的路由功能处理请求
const express = require('express');
var fs = require("fs");
const url = require('url');

const router = express.Router();

var    userlist=[];

const { findLastSeller, findAllSeller, isExistSellerById } = require('../../handleDB/handleSeller');
const { findLastGoods,

    findAllGoodsBySeller,
    findAllGoodsByPage, 
    getGoodCount, 
    findAllGoodsByPageAndSort,
    getGoodsInfoById
     } = require('../../handleDB/handleGoods');

const { findOrderByBuyer } = require('../../handleDB/handleOrder');



// if(fs.readFileSync('../../lunbotu.json')){
     userlist = require('../../lunbotu.json');
//  console.log(userlist);
// }


router.use((request, response, next)=>{
    request.query = url.parse(request.url, true).query;
    next();
})



// 首页
router.get('/', (request, response)=>{
    Promise.all([findLastGoods(6), findLastSeller(8)])
    .then(
        result=>{
       

     response.render('buyer/homepage',{
        isLogin: response.buyerInfo._id,
         user: response.buyerInfo.username,
         homeActive:'active',
         goodsList: result[0],
         sellerList: result[1]
     });
    }
)
})







// 店铺列表
router.get('/sellerlist', (request, response)=>{
    //查询所有商家，渲染在商家列表页
    findAllSeller()
    .then(
        result=>{
          
            response.render('buyer/sellerlist', {
                isLogin: response.buyerInfo._id,
                sellerActive:'active',
                sellerList: result
            });
        }
    )
})





// 店铺详情页
router.get('/sellerDetail', (request, response)=>{
    //取得商家id
    let sellerid = request.query.sellerid;
    // 查询商家信息
    // 查询商家商品列表=
    Promise.all([isExistSellerById(sellerid), findAllGoodsBySeller(sellerid)])
    .then(
        result=>{
            //渲染商家详情页
            response.render('buyer/sellerDetail', {
                sellerActive: 'active',
                isLogin: response.buyerInfo._id,
                sellerInfo: result[0],
                goodsList: result[1]
            })
        }
    )



})



// 商品列表  分页--排序
router.get('/goodslist', (request, response)=>{
   
    let page = Number(request.query.page) || 1;
    let count = Number(request.query.count) || 8;
    let sort = Number(request.query.sort)

    let p = sort?findAllGoodsByPageAndSort(page, count, sort):findAllGoodsByPage(page, count);
    Promise.all([getGoodCount(), p])
    .then(
        result=>{
            //总页数
             
            let pages = Math.ceil(result[0]/count);
            //计算分页
            let pageArr = [];
            for(let i = 1; i <= pages; i++){
                pageArr.push(i);
            }


           //渲染页面
    response.render('buyer/goodlist',{
        goodsActive:'active',
        isLogin: response.buyerInfo._id,
        
        pageArr,//总页数数组
        count,//页面商品个数
        page,//当前页面
        sort,
        goodsList: result[1] //当前页面要呈现的商品   
    })

}
  
)
})



// 商品详情页
router.get('/goodsDetail', (request, response)=>{
    let goodsId = request.query.goodsId;
    // 查询详情
    getGoodsInfoById(goodsId)
    .then(
        result=>{
            //渲染页面

            //  console.log(result);
            response.render('buyer/goodsDetail', {
                isLogin: response.buyerInfo._id,
                goodsActive: 'active',
                sellerInfo: result.seller,
                goodsInfo: result
            })
        }
    )

})


// 订单列表
router.get('/myorder', (request, response)=>{
    // 查询用户所有订单
    findOrderByBuyer(response.buyerInfo._id)
    .then(
        result=>{
            response.render('buyer/orderlist', {
                isLogin: response.buyerInfo._id,
                orderActive:'active',
                orderList: result
            });
        }
    )
    
})


// 我的积分
router.get('/sphere', (request, response)=>{  //登录
    response.render('buyer/sphere',{
        sphereAitive:'active'
    });
})

router.get('/login', (request, response)=>{  //登录
    response.render('buyer/login');
})

// 退出
router.get('/logout', (request, response)=>{
    response.cookies.set('BUYERID', null);
    response.redirect('/');
})

router.get('/register', (request, response)=>{  //注册
    response.render('buyer/register');
})






module.exports = router;
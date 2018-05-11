const express = require('express');


const Goods = require('../../model/Goods'); //商品数据表格

const { isExistSellerById } = require('../../handleDB/handleSeller');
const { findAllGoodsBySeller } = require('../../handleDB/handleGoods');

const router = express.Router();

//商家没有登录，也可以访问的页面
router.get('/login', (request, response)=>{
    response.render('seller/login');
})
router.get('/register', (request, response)=>{
    response.render('seller/register');
})



// 重定向
router.use((request, response, next)=>{
    let sellerid = request.handleCookies.get('SELLERID');
    if(sellerid){
        isExistSellerById(sellerid)
        .then(
            result=>{
                if(result){//商家登录了
                    //  console.log(result);   //打印商家信息
                    response.sellerInfo = result;  //将商家信息绑定在response上
                    next();
                }else{//不存在，id被篡改了
                    response.redirect('/login');
                }
            }, 

            ()=>{
                response.redirect('/login');
            }
        )
    }else{//商家没有登录
        response.redirect('/login');
    }
    
})











//商家没有登录，就不可以访问的页面
router.get('/', (request, response)=>{
    response.render('seller/index', {
        indexActive: 'active'
    });
})


// 商品管理页面--商品列表--查询这个商家id下的的所有商品
router.get('/goodslist', (request, response)=>{
   
    let sellerid = request.handleCookies.get('SELLERID');
    findAllGoodsBySeller(sellerid)
    .then(
        (result)=>{
         
            response.render('seller/goodslist', {
                goodsActive: 'active',
                goodsList: result
            });
        }
    )
    
})
//新增商品
router.get('/goods/add', (request, response)=>{
    response.render('seller/addGoods');
})




//商品详情
router.get('/goods/detail', (request, response)=>{
     //商品id
     let goodsid = request.query.id;

     // 查询商品详情
     Goods.findById(goodsid)
     .then(result=>{
         //返回详情页
         response.render('seller/goodsDetail', {
             goodsInfo: result
         });
     })
})


//商品修改
router.get('/goods/modify', (request, response)=>{
     //商品id
     let goodsid = request.query.id;
     request.handleCookies.set('MODIFYID', goodsid);
  
    
     Goods.findById(goodsid)
     .then(result=>{
         //返回详情页
         console.log(result);
         response.render('seller/modify', {
            modifyInfo: result
         });
     })
})



//商品删除
router.get('/goods/delete', (request, response)=>{
    let goodsid = request.query.id;
    // 删除商品
    Goods.findByIdAndRemove(goodsid)
    .then(result=>{
        //删除完成后，刷新页面
        // 重定向到商品列表页
        response.redirect('/goodslist');
    })
})





// 订单列表
router.get('/orderlist', (request, response)=>{
    response.render('seller/orderlist',{
        orderActive: 'active'
    });
})

// 个人中心
router.get('/sellerinfo', (request, response)=>{
    // 查询商家信息
    let sellerInfo = response.sellerInfo;
    //渲染页面
    response.render('seller/sellerinfo', {
        sellerActive: 'active',
        sellerInfo
    });
})

// 退出
router.get('/logout', (request, response)=>{
    // 清除登录状态
    request.handleCookies.set('SELLERID', null);
    // 重定向
    response.redirect('/login');
})






module.exports = router;

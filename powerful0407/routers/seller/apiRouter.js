const express = require('express');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const router = express.Router();

const { addGoods,modifyGoodsInfo } = require('../../handleDB/handleGoods');
const { addSeller,findSeller} = require('../../handleDB/handleSeller');

router.use(bodyParser.urlencoded());



//上传图片
router.post('/upload/img', (request, response)=>{
    // 创建处理表单的对象
    let form = new multiparty.Form({
        uploadDir: './static/tmp/'
    });
    // 解析表单数据--将路径传过去显示在客户端
    form.parse(request, (error, fields, files)=>{
        // console.log(files.image);
        //响应客户端

        if(!error){  
             // console.log(files.imgs[0].originalFilename)//png  jpeg  jpg   判断图片格式
       
        let pathArr = files.image.map(imageItem=>{ // 遍历客户端传过来的图片--得到一数组
            //获得图片的保存地址，告诉客户端
            return imageItem.path.replace(/static/, '/st');  //服务配置的静态资源从static下 是替换才能读取图片
        })

        response.json({
            status: 0,
            message: '上传成功',
            data: {
                imgPath: pathArr
            }
        })

   }

})
})












//注册   接收前端传过来的数据调用addSeller方法存入数据库

router.post('/register', (request, response)=>{
    let { sellername, password,description,logo,banner } = request.body;
    //在数据库中新增该商家
    addSeller(sellername, password,description,logo,banner)
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
        })
    
    })




// 登录
router.post('/login', (request, response)=>{
    let { sellername, password } = request.body;


    findSeller(sellername, password)
    .then(
        (sellerid)=>{
            //存在该用户，登录成功
            // 保存登录状态
            request.handleCookies.set('SELLERID', sellerid);
         
            //响应客户端
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








//新增商品
router.post('/goods/add', (request, response)=>{
    let {name, description, detailImg, thumbImg, size, style, count, price} = request.body;
       
   //执行新增
   addGoods(name, description, detailImg, thumbImg, size, style, count, price, request.handleCookies.get('SELLERID'))
   .then(//成功
       msg=>{
           response.json({
               status: 0,
               message: msg
           })
       },
       msg=>{//失败
           response.json({
               status: 1,
               message: msg
           })
       }
   )

})





//修改商品
router.post('/goods/modify', (request, response)=>{
   
    // console.log(   request.handleCookies.get('MODIFYID')); //得到商品id值
  
    let {name, description, detailImg, thumbImg, size, style, count, price} = request.body;
   
   //执行修改
   modifyGoodsInfo(name, description, detailImg, thumbImg, size, style, count, price, request.handleCookies.get('MODIFYID'))
   .then(//成功
       msg=>{
           response.json({
               status: 0,
               message: msg
           })
       },
       msg=>{//失败
           response.json({
               status: 1,
               message: msg
           })
       }
   )

})










module.exports = router;
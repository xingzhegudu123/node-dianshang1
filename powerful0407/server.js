const express = require('express');
const mongoose = require('mongoose');
const swig = require('swig');
const Cookies = require('cookies');
const url = require('url');



//引入买家页面
const buyerRouter = require('./routers/buyer/buyerHtmlRouter');
//ajax
const buyerApiRouter = require('./routers/buyer/buyerApiRouter');

const { findBuyerById } = require('./handleDB/handleBuyer');

const server = express();
// 配置模板引擎
server.engine('html', swig.renderFile);
server.set('views', './views');
server.set('view engine', 'html');
swig.setDefaults({cache: false});

// 配置静态资源
server.use('/st', express.static('./static'));



server.use((request, response, next)=>{
    let cookies = new Cookies(request, response);
    response.cookies = cookies;
    next();
})




// 如果id有值 登录了  根据查询出买家信息--绑定在response上
server.use((request, response, next)=>{
    //取得买家id
    let userId = response.cookies.get('BUYERID');
    response.buyerInfo = {};
    if(userId){ //真的登录
        findBuyerById(userId)
        .then(
            buyerInfo=>{
                response.buyerInfo = buyerInfo;
                next();                
            },
            ()=>{ //id被拽改了
                next();
            }
        )

    }else{
        //没有登录
        next();
    }
})




//将请求分发出去

server.use('/api', buyerApiRouter);
server.use('/', buyerRouter);


//连接数据库
new Promise((resolve, reject)=>{
    mongoose.connect('mongodb://localhost:27020', (error)=>{
        if(error){ 
            console.log('连接数据库失败');
            console.log(error);
        }else{
            console.log('连接数据库成功');
            resolve();
        }
    })
})
//启动服务器
.then(
    ()=>{
        server.listen('8080', 'localhost', (error)=>{
            if(error){
                console.log('服务器启动失败');
                console.log(error);
            }else{
                console.log('服务器启动成功');
                console.log('http://localhost:8080');
            }
        });
    })

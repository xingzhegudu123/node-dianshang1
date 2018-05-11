const express = require('express');
const mongoose = require('mongoose');
const swig = require('swig');
const Cookies = require('cookies');


const apiRouter = require('./routers/seller/apiRouter');
const viewRouter = require('./routers/seller/viewRouter');
// const { isExistSellerById } = require('./handleDB/handleSeller');

new Promise((resolve, reject)=>{

// 连接数据库
mongoose.connect('mongodb://localhost:27020', (error)=>{
    if(error){
        console.log('数据库连接失败');
        console.log(error);
    }else{
        console.log('数据库连接成功');
        resolve();
    }
})
    
})
.then(()=>{

//创建服务器
const server = express();

//配置静态资源
server.use('/st', express.static(__dirname+'/static'));


// 登录成功保存用户id
server.use((request, response, next)=>{
    let cookies = new Cookies(request, response);
    request.handleCookies = cookies;
    next();
})








//处理ajax请求
server.use('/api', apiRouter);


// 配置模板引擎
server.engine('html', swig.renderFile);
server.set('views', './views');
server.set('view engine', 'html');
swig.setDefaults({cache: false});


//处理页面请求
server.use('/', viewRouter);



//启动服务器
server.listen(9090, 'localhost', (error)=>{
    if(error){
        console.log('服务器错误');
    }else{
        console.log('服务器启动成功');
        console.log('http://localhost:9090');
    }
})

    
})
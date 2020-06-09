本项目为nodejs+mongodb构建的B2B电商平台。一套代码下有买家和商家两服务端,主要有注册登录, 商家上传图片发布商品, 买家浏览商品和店铺列表，提交订单等功能。
## get 技能
- express是搭建服务器,use分发路由加载静态资源,通过swig模版引擎解析html, body-parser中间件解析数据.
- 用户注册时的手机号，随机验证码，密码强度等信息的正则匹配校验。
- mongodb数据库的增删改查操作: 增: new 数据表对象(属性).save()  删：deleteOne-deleteMany-remove  改：update  查：findOne-find-findById
- 订单列表使用mongodb数据库populate关联买家商家操作。

## 如何运行
- 1  启动数据库
- 切换到mongo安装路径bin文件夹之下--执行cmd--启动数据库
- >mongod --dbpath=数据库db文件存放路径 --port=数据库端口号(默认值：27017)
- cnpm install 安装依赖
### 2 启动买家 或 卖家平台
node server.js  或  node  sellerServer.js
### 运行效果
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/accunt.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/table.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/vue3+ts.png)

```


See [Configuration Reference](https://cli.vuejs.org/config/).


本项目为Vue+Typescript+Element-ui实战项目的构建后台管理系统。主要实现的功能有：登录，电子邮箱找回密码，修改密码，动态路由，权限管理，表格分页增删改查，echarts图表管理，表单管理，个人中心等。
## get 技能
- vue-cli3框架搭建：命令或ui--引入meyerweb.com中重置css
- Ts基础语法：装饰器vue-property-decorator的使用Provide,prop,vuex装饰器vuex-class等的使用
- slot：有名slot的使用 :定义在子组件中接收父组件的内容
- 刷新页面丢失vuex: 全局app钩子函数created触发vuex
- 侧边栏: 将全局路由赋给vuex实现点击侧边栏切换页面
- 面包屑: 利用@Watch("$route")监听当前this.$route路由变化写js重设数组展示
- table表格: 表格渲染搜索-编辑-新增-删除-分页(表格编辑：if else设置input和常量显示)
- echarts图表: 安装(cnpm)echarts--echarts.init初始化--绘制chart.setOption(传入的数据)
- 路由守卫: router.beforeEach根据有无token判断是否登录--登录后无权限不能在浏览器进入相关页面
- 菜单和按钮权限: 递归过滤异步路由表，返回符合用户角色权限的路由表:
 通过filter过滤路由数组得到每一条路由-根据当前角色是否存在权限数组返回true,false决定该对象是否保留(相当于控制一级菜单显隐)----递归调用控制二级或以上菜单显隐(按钮权限：v-if看角色是否符合控制显隐)

## 如何运行
- 1  启动数据库
- 切换到mongo安装路径bin文件夹之下--执行cmd--启动数据库
- >mongod --dbpath=数据库db文件存放路径 --port=数据库端口号(默认值：27017)
- cnpm install 安装依赖
### 2 启动买家 或 卖家平台
node server.js  或  node  sellerServer.js
### Compiles and minifies for production
npm run build
### Run your tests
npm run test
### Lints and fixes files
npm run lint
### 运行效果
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/accunt.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/table.png)
![image](https://github.com/xingzhegudu123/vue-cli3-Ts/blob/feature-dev-1.0/public/imgReadme/vue3+ts.png)

```


See [Configuration Reference](https://cli.vuejs.org/config/).


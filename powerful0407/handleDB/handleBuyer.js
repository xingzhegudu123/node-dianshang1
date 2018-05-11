const Buyer = require('../model/Buyer');

function addBuyer(username,phoneNum, password){
return new Promise((resolve, reject)=>{
    Buyer.findOne({phoneNum})
    .then(result=>{
        if(result){
            //该电话号码已经被使用
            reject('该电话号码已经被使用');
        }else{
            //可以注册
            return new Buyer({username,phoneNum, password}).save()
        }
    })
    .then(
        result=>{
            //注册成功
            resolve('注册成功');
        },
        error=>{
            //数据库错误
            resolve('数据库错误');
        }
    )
})
}


// 登录校验
function findBuyerByInfo(phoneNum, password){
    return new Promise((resolve, reject)=>{
        Buyer.findOne({phoneNum, password})
        .then(
            (result)=>{
                if(result){
                    //存在账号，密码正确
                    resolve(result);
                }else{
                    //电话号码或密码错误
                    reject('电话号码或密码错误');
                }
            }
        ) 
    })
    }


// 查询买家id是否存在
    function findBuyerById(id){
        return new Promise((resolve, reject)=>{
            Buyer.findById(id)
            .then(
                result=>{
                    if(result){
                        //该账号存在
                        resolve(result);
                    }else{
                        //该账号不存在
                        reject();
                    }
                }
            )  
        })
        }




module.exports = {
    addBuyer,
    findBuyerByInfo,
    findBuyerById
   
}
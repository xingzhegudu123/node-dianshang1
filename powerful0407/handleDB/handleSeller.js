const Seller = require('../model/Seller');

//注册-- 新增商家数据
function addSeller(name, password,description,logo,banner){

    return new Promise((resolve, reject)=>{
        // 判断该商家名字是否存在
        Seller.findOne({name})
        .then(result=>{
            if(result){//存在
    
                reject('该商家已存在');
    
            }else{//不存在
                //新增该商家信息
                let sellerInfo = new Seller({name, password,description,logo,banner});
                sellerInfo.save()
                .then(
                    (result)=>{//保存成功
                        resolve('保存成功');
                    },
                    ()=>{//保存失败
                        reject('数据库错误,请稍后重试');
                    }
                )
    
            }
        })
    })
    
    }

// 登录  ---查找商家是否存在
function findSeller(name, password){

    return new Promise((resolve, reject)=>{
         
        Seller.findOne({name, password})
        .then(
            result=>{
                if(result){
               
                    resolve(result._id);
                }else{
                 
                    reject('用户名或密码错误');
                }
            },
            ()=>{
                reject('数据库错误，请重试');
            }
        )
    
    })
    
    }


//根据id判断商家是否存在  重定向功能
function isExistSellerById(id){
    return new Promise((resolve, reject)=>{
        Seller.findById(id)
        .then(
            result=>{
                if(result){
                    resolve(result);
                }else{
                    reject();
                }
            },
            error=>{
                reject();
            }
        )  
    })
    
    }



// 首页  --商家
    function findLastSeller(num){//8
        // 判断数据库中是否有>num的数据个数
    return new Promise((resolve, reject)=>{
        num = Number(num);
        Seller.count()
        .then(
            (count)=>{
                if(count > num){//商家多余4个
                    Seller.find().skip(count-num).limit(num)
                    .then(
                        result=>{
                            resolve(result);
                        }
                    )
                }else{//商家不足4个，将所有商家查询出来
                    Seller.find().then(
                        result=>{
                            resolve(result);
                        }
                    )
                }
            }
        )
    })
    }
    


// 查询所有店铺
function findAllSeller(){
    return Seller.find();
}



    module.exports = {
        addSeller,
        findSeller,
        isExistSellerById,
        findLastSeller,
        findAllSeller
    }
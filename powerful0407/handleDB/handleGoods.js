const Goods = require('../model/Goods');


//新增商品
function addGoods(name, description, detailImg, thumbImg, size, style,count,price,sellerID){
return new Promise((resolve, reject)=>{
    //创建商品数据
    new Goods({
        name,
        description,
        detailImg,
        thumbImg, 
        size,
        style,
        count,
        price,
        seller: sellerID
    })
    //保存
    .save()
    .then(
        //保存成功
        result=>{
            resolve('保存成功');
        },
        //保存失败
        error=>{
            reject('保存失败');
        }
    )
    
})
}

//修改商品

function modifyGoodsInfo(name, description, detailImg, thumbImg, size, style,count,price,modifyID){

return new Promise((resolve, reject)=>{
    Goods.update(
        {_id:modifyID},
        {
            name,
            description,
            detailImg,
            thumbImg,
            size,
            style,
            count,
            price
        }
       
 
   //修改完成的回调
)
.then(
     (result)=>{
          if(result.nModified>0){
            resolve('修改成功');
          }else{
            reject('修改失败');
          }
        //   console.log(result);

     }
)

})
}





// 商家商品列表  查询所有商品

function findAllGoodsBySeller(sellerid){
return new Promise((resolve, reject)=>{

   
    //查询商家的对应商品
    Goods.find({
        seller: sellerid
    })
    .then(
        result=>{
            // console.log(result)
            resolve(result);
        },
        error=>{
            resolve([]);
        }
    )
    
})
}




// -------买家篇-------------------------------------------------

// 首页  查询商品
function findLastGoods(num){//4
    // 判断数据库中是否有>num的数据个数
return new Promise((resolve, reject)=>{
    num = Number(num);
    Goods.count()
    .then(
        (count)=>{
            if(count > num){//商品多余4个
                Goods.find().skip(count-num).limit(num)
                .then(
                    result=>{
                        resolve(result);
                    }
                )
            }else{//商品不足4个，将所有商品查询出来
                Goods.find().then(
                    result=>{
                        resolve(result);
                    }
                )
            }
        }
    )
})
}



// 当前页面个数

function findAllGoodsByPage(page, count){
    let skipVal = (page-1)*count;
    return Goods.find().skip(skipVal).limit(count)
}

// 当前页面价格排序

function findAllGoodsByPageAndSort(page, count, sort){
    let skipVal = (page-1)*count;
    return Goods.find().sort({price: sort}).skip(skipVal).limit(count)
}

function getGoodCount(){
    return Goods.count();
}

// 根据id查询 详情页   商品信息
function getGoodsInfoById(id){
    return Goods.findById(id).populate(['seller'])
}









module.exports = {
    addGoods,
    findAllGoodsBySeller,
    modifyGoodsInfo,
    findLastGoods,

    findAllGoodsByPage,
    findAllGoodsByPageAndSort,
    getGoodCount,
    getGoodsInfoById
}
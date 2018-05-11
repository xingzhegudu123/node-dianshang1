//尺码处理
var sizeArr = [];


$('#add-size').on('click', function(){
    var size = $('input[name=size]').val();
     if(size){
        sizeArr.push(size);
        var html = '';
        sizeArr.map(sizeItem=>{
            html += '<button class="btn btn-default">'+sizeItem+'</button>';
        })
        document.querySelector('.size-info').innerHTML = html;
     }

 
})


//详情图处理
var detailImgs = [];

// 修改时得到默认值   新增时图片没有为undefined   but入为多张图片  得到的是第一张的值
var detailurl = $('.detail-info img').attr("src");
if(detailurl){
    detailImgs.push(detailurl);
   
}


$("#detail input").on('change', function(){
    var detailForm = $('#detail')[0];
    var formData = new FormData(detailForm);
    $.ajax({
        url: '/api/upload/img',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(result){
            if(result.status == 0){
                detailImgs = result.data.imgPath;
                var html = '';
                detailImgs.map(function(img){
                    html += '<img src="'+img+'" />';
                })
                document.querySelector('.detail-info').innerHTML = html;
            }else{
                alert('图片上传失败');
            }
        }
    })
})


//缩略图处理
var thumbImgs = [];


// 如果不修改时按默认值传送   新增时图片没有为undefined
var thumburl = $('.thumb-info img').attr("src");
if(thumburl){
    thumbImgs.push(thumburl);
   
}



$("#thumb input").on('change', function(){
    var detailForm = $('#thumb')[0];
    var formData = new FormData(detailForm);
    $.ajax({
        url: '/api/upload/img',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(result){
            if(result.status == 0){
                thumbImgs = result.data.imgPath; //后台返回的图片数组

                var html = '';
                thumbImgs.map(function(img){
                    html += '<img src="'+img+'" />';
                })
                document.querySelector('.thumb-info').innerHTML = html;
            }else{
                alert('图片上传失败');
            }
        }
    })
})


// 新增
$('#add').on('click', function(){
    //获得所有商品的信息
    var name = $('input[name=name]').val();
    var des = $('textarea[name=des]').val();
    var price = $('input[name=price]').val();
    // detailImgs
    // thumbImgs
    // sizeArr

    if(!name){
        alert('名字不能为空');
        return;
    }

    $.ajax({
        url: '/api/goods/add',
        method: 'POST',
        data: {
            name: name,
            description: des,
            detailImg: detailImgs,
            thumbImg: thumbImgs,
            size: sizeArr,
            style: [],
            count: 100,
            price: price
        },
        success: function(result){
            console.log('新增完成');
            console.log(result);
            if(result.status == 0){
                window.location.href = '/goodslist';
            }else{
                alert(result.msg);
            }
        }
    })
})




//修改---------------

$('#modify').on('click', function(){
    //获得所有商品的信息
    var name = $('input[name=name]').val();
    var des = $('textarea[name=des]').val();
    var price = $('input[name=price]').val();
    // detailImgs
    // thumbImgs
    // sizeArr

    if(!name){
        alert('名字不能为空');
        return;
    }

    $.ajax({
        url: '/api/goods/modify',
        method: 'POST',
        data: {
            name: name,
            description: des,
            detailImg: detailImgs,
            thumbImg: thumbImgs,
            size: sizeArr,
            style: [],
            count: 100,
            price: price,
          
        },
        success: function(result){
            // console.log('新增完成');
            // console.log(result);
            if(result.status == 0){
                alert(result.message);
                window.location.href = '/goodslist';
            }else{
                alert(result.message);
            }
        }
    })
})

var logoPath = '';
var bannerPath = '';

//上传logo
$("#logo").on('change', function(){
    
    // 获得表单dom对象
    var formDom = $('#logoform')[0];

    // 创建表单数据对象
    var formData = new FormData(formDom);
    $.ajax({
        url: '/api/upload/img',
        method: 'POST',
        data: formData,
        processData: false,//关闭jq默认处理data的方式
        contentType: false,//关闭了之后，才能识别到enctype
        success: function(result){
            // console.log('上传完成');
            console.log(result);

            if(result.status == 0){
                document.querySelector('#logoform img').src = result.data.imgPath[0];  //数组中第0个
                logoPath = result.data.imgPath[0];
            }
        },
        error: function(){
            console.log('上传失败');
        }
    })
})

// 上传banner
$("#banner").on('change', function(){
    
    // 获得表单dom对象
    var formDom = $('#bannerform')[0];

    // 创建表单数据对象
    var formData = new FormData(formDom);
    $.ajax({
        url: '/api/upload/img',
        method: 'POST',
        data: formData,
        processData: false,//关闭jq默认处理data的方式
        contentType: false,//关闭了之后，才能识别到enctype
        success: function(result){
            // console.log('上传完成');
            console.log(result);
            if(result.status == 0){
                document.querySelector('#bannerform img').src = result.data.imgPath[0];
                bannerPath = result.data.imgPath[0];
            }
        },
        error: function(){
            console.log('上传失败');
        }
    })
})


// -----------图片上传发送ajax请求给后台-------------------

















$('#confirm').on('click', function(){
    //获得所有输入框中的内容
    var name = $('input[name=name]').val();
    var psd = $('input[name=psd]').val();
    var repsd = $('input[name=repsd]').val();
    var des = $('#description').val();
    // 判断是否为空
    if(!name || !psd || !repsd ){
        console.log('不能输入为空');
        return;
    }
    // 判断密码是否一致
    if(psd != repsd){
        console.log('密码不一致');
        return;
    }

    // 发送注册请求
    $.ajax({
        url: '/api/register',
        method: 'POST',
        data: {
            sellername: name,
            password: psd,
             description: des,
             logo: logoPath,
             banner: bannerPath,
            
        },
        success: function(result){
          
            if(result.status==0 ){
                console.log('注册完成');
                console.log(result);
                window.location.href = '/login';
            }
            else{
                alert(result.msg);
            }
        }
    })


})

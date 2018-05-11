$('#confirm').on('click', function(){
    // 获得输入框中的值
    var name = $('input[name=name]').val();
    var psd = $('input[name=psd]').val();

    // 判断是否为空
    if(!name || !psd){
        console.log('用户名或密码不能为空');
        return;
    }

    //发送登录请求
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: {
            sellername: name,
            password: psd
        },
        success: function(result){
          
       
            if(result.status == 0){
                // alert(result.message);
                 window.location.href = '/';
            }else{
                alert(result.message);
            }
        }
    })


})
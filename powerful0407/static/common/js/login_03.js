 $(function () {


             var verifyCode = new GVerify("v_container");
           
           $("#gulf li").eq(1).show().siblings().hide();
            
            
             
             
     // 点击控制普通和快捷登录的显示隐藏
             $("#culti input  ").click(function(){
             
             	var index = $(this).index();
             // console.log(index);
            $("#gulf li").eq(index).show().siblings().hide();
             	
             
         	
     })
             
             
             
             
              //登录页面点击登录
            $(".street02 .fers4  #leap ").click(function (e) {
                       e.preventDefault();
                        // 取得输入的内容
                        var phone = $('input[name=phone]').val();
                        var psd = $('input[name=psd]').val();

                        if(!phone || !psd){
                            alert('请输入完整');
                            return;
                        }
                  
                        
                    $.ajax({
                        url: '/api/login',
                        data: {
                            phoneNum: phone,
                            password: psd
                        },
                        method: "POST",
                        success: function(result){
                            alert(result.message);
                            if(result.status == 0){
                                window.location.href = '/';
                            }
                        }
                    })
                      

                        	
               
            })
             
             
             
             
             
             
             
             
             
             
             
             
             
             
          
 })


















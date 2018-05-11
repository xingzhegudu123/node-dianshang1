$(function(){

			
			
				// var verifyCode = new GVerify("v_container");
				
				
				var aInput = $("input");
				
				//校验提示
				var oImg = $(".tick");
				var oTic = $(".acter");
				
				
				//密码强度节点
				var pass =   $("#rank span")
				var reg = $("#reg");//注册
				
				var flag1 = false;
				var flag2 = false;
				var flag3 = false;
				var flag4 = false;
			
				
				var n = 0;
				
		
			//提示信息方法	
			function  vir(n,vivo){
				if(vivo){
					oTic.eq(n).html("输入合法");
					
					oImg.eq(n).attr("src", "/st/common/img/smell/yes.png"	);
					
					oImg.eq(n).css("display","block");
					oTic.eq(n).css("display","block");
					
				}else{
				   
				 oTic.eq(n).html("输入不合法");
					
				oImg.eq(n).attr("src", "/st/common/img/smell/no.png"	);
				
				oImg.eq(n).css("display","block");
				oTic.eq(n).css("display","block");
			}
	}			
		
		
	
		
		
		
		
		
		
		//1手机号
			aInput.eq(1).keyup(function(){
				
					var username = this.value;;
				
				var gular = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/;
				
				if(gular.test(username)){
				    flag1 = true;
					vir(0,true);
					
				}else{
			
					flag1 = false;
					vir(0,false);
				}
				
})
				
         //短信验证（随机数）
			$("#notice").click(function(){
				console.log("ddjdjdjjdd");
				var str = "";
				
				for (var i=0; i<4; i++) {
				var b = Math.random()>0.5 ? true : false;
				if (b) {
					str += parseInt(Math.random()*10);
				}
				else {
					str += String.fromCharCode( 65 + parseInt(Math.random()*26) );
				}
			}
				
				
             
				 $("#notice").html(str);
			}) 
				
				
				
				// 2手机校验码匹配
			aInput.eq(2).keyup (function(){
				
				var value = this.value;
				
			if(value==$("#notice").html()){
				flag2 =true;
				 vir(1,true);
				
			}else{
				flag2 =false;
				 vir(1,false);
			}
			})
		
       
        //密码   强度
       
       aInput.eq(3).keyup(function(){
				 var pwd = this.value;
				
				 var gular =/^.{6,20}$/;
				 
				 var hu1 = /\d+/; //数字
				 var hu2 = /[a-zA-Z]+/; //字母
				 var hu3 =/[^a-zA-Z0-9]+/;//非数字字母
				
				if(gular.test(pwd)){
				  	   flag3 = true;
				  	   vir(2,true); //密码输入正确
				  	   
				  	   var s = 0;
				  	   if(hu1.test(pwd)){
				  	   	  s++;
				  	   	
				  	   }
				  	    if(hu2.test(pwd)){
				  	   	  s++;
				  	   	
				  	   }
				  	   if(hu3.test(pwd)){
				  	   	  s++;
				  	   	
				  	   }
				  	   //只进来一次
				  	if(pwd.length<=10){
				  		s=s+1;
				  	}else if(pwd.length<=15){
				  		s=s+2;
				  	}else if(pwd.length<=20){
				  		s=s+3;
				  	}
				  	console.log(s);
				  //密码强度
                     var index = 0;
				   if(s<=2){//弱
				   	  index = 0;
				   	 
				   }else if(s<=4){//中
				       index = 1;
				   	
				   }else if(s<=6){//强
				   	  index = 2;
				   }
				   
				     //span节点数组和颜色数组一一对应
				    var arr = ["gray", "orange", "green"]; 
				    for(var i=0;i<arr.length;i++){
				    	if(i==index){
				    		pass[i].style.background=arr[i];
				    		
				    	}else{
				    		pass[i].style.background="";
				    	}
				    	
				    	
				    	
				    }
				  		
				  		
				  }else{
				    flag3 = false;
				  	vir(2,false);
				  	
				  	
				 }
					
		}) 
			


      // 4 确认密码
			aInput.eq(4).keyup(function(){
				   var repet = this.value;
				  if(repet==aInput.eq(3).val()){
				  	  flag4 =true;
				  	   vir(3,true);
				   	
				  	
				  }else{
				  	 flag4 =false;
				  	  vir(3,false);
				  	
				  }
				
			})  


// 注册---------发送ajax请求给后台-----------------------------------
      
		
 
     reg.click(function(e){
    	   e.stopPropagation(); //非IE
			e.preventDefault();
			 
			var user = $('input[name=nic]').val();
			var phone = $('input[name=phone]').val();
			var psd = $('input[name=psd]').val();
			var rePsd = $('input[name=rePsd]').val()
			
       

		if(!phone || !psd || !rePsd){
			alert('请输入完整');
			return;
		}

		if(psd != rePsd){
			alert('两次密码不一致');
			return;
		}
	
	
		if(flag1 && flag2 && flag3 &&flag4){
				
				$.ajax({
					url: '/api/register',
					data: {
                        username:user,
						phoneNum: phone,
						password: psd
					},
					method: "POST",
					success: function(result){
						alert(result.message);
						if(result.status == 0){
							window.location.href = '/login';
						}
					}
				})	
					 
                   


				 
					
				// $("#toast").html("注册成功!</br>账号："+phone+"</br>密码："+psd)
					// console.log("注册成功！");
					 
			 }

       




 })


})
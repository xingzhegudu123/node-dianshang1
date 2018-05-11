

  $(function(){
	  
	// 鼠标移入列表时
        $(" .mune-left ul li").mouseenter(function(){
    	
    	
    	$(this).css({background:"#e7f5f0",color:"#0086B3" }).siblings().css({background:"#dee1e0",color:"#666" });
    	
         var index = $(this).index(" .mune-left ul li"); //获得移入li下标
    	 
    	var befo = $(".mune-right  #me-list li").eq(index);  //从ul大盒子中取得li页面
    	
    	befo.css("display","block");
		$("#prev").hide();  //上一页隐藏
	

    	befo.mouseenter(function(){
    		befo.css("display","block");
    		$("#prev").hide();
    	})
    	
    	
    	console.log(index);
    	
    })
  	
	// 鼠标移开列表时
	  $(" .mune-left ul li  ").mouseleave(function(){
	 	
	 	 var index = $(this).index(" .mune-left ul li");//  获得当前移入的侧边栏下标
	 	
	 	var befo =$(".mune-right  #me-list li").eq(index);  //从ul大盒子中取得li页面
	 	befo.css("display","none");
	 	
		 $("#prev").show();
	    befo.mouseleave(function(){
	   	
	   	befo.css("display","none");
		   $("#prev").show();
	   	
	   })
	 	
	 })
  	
  	
  	
  	
  	
  	
  	
  	
  	
  })































$(function(){
				
    // //获取数据 
    $.ajax({
       
        //  url: "http://127.0.0.1/nodeJS/day06/powerful2/static/common/data/getLunboData.php",
         url:"./st/common/data/lunbotu.json",
        // D:\wamp\www\nodeJS\day06\powerful2\static\common\data
        success: function(data){
            //  console.log(data); 
            
            //得到数据之后， 遍历数组，创建节点显示数据
            var arr = data;
            // var arr = JSON.parse(data);
            for (var i=0; i<arr.length; i++) {
                var obj = arr[i];
                  
                //创建节点
                $("<li><img src="+ obj.img +" /></li>").appendTo("#list1"); 
                var li2 = $("<li>"+ (i+1) +"</li>").appendTo("#list2");
                if (i == 0) {
                    li2.addClass("active");
                }
            }
            
            //创建好节点后， 开始轮播
            lunbo();
        }
    })
    //  lunbo();
    //jq轮播图
    function lunbo(){
                            
        var list1 = $("#list1");
        var list2 = $("#list2");
        var li1 = $("#list1 li");
        var li2 = $("#list2 li");
        
        //复制第一张图到最后
        li1.first().clone(true).appendTo(list1);
        
        //
        var size = $("#list1 li").size();
        list1.width(li1.first().width()*size);
        
        //开启定时器
        var i = 0;
        var timer = setInterval(function(){
            i++;
            move();
        }, 3000);
        
        function move(){
            
            if (i < 0) {
                list1.css("left", -li1.first().width()*(size-1));
                i = size-2;
            }
            
            if (i >= size){
                list1.css("left", 0);
                i = 1;
            }
            
            list1.stop().animate({left:-i*li1.first().width()}, 500);
            
            li2.eq(i).addClass("active").siblings().removeClass("active");
            if (i == size-1) {
                li2.eq(0).addClass("active").siblings().removeClass("active");
            }
        }
        
        //上一页
        $("#prev").click(function(){
            i--;
            move();
        })
        
        //下一页
        $("#next").click(function(){
            i++;
            move();
        })
        
        li2.mouseenter(function(){
            i = $(this).index();
            move();
        })
        
        $("#box").hover(function(){
            console.log("mouseenter");
            clearInterval(timer);
        }, 
        function(){
            console.log("mouseleave");
            timer = setInterval(function(){
                i++;
                move();
            }, 2000);
        })
    }
    
})




















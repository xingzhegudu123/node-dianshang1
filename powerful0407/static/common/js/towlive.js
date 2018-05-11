
// ajax({
// 	    // url: "../date/life.json",
// 		// success: function(data){
// 		// 				//console.log(data);
						
// 		// 				var arr = JSON.parse(data);
						
// 		// 				for (var i=0; i<arr.length; i++) {
// 		// 					var obj = arr[i];
							
// 		// 					var li = document.createElement("li");
// 		// 					 var box = document.getElementById("race");
							
							 
// 		// 		         	var ul = box.getElementsByTagName("ul")[0];
// 		// 					ul.appendChild(li);	
// 		// 					li.innerHTML = "<img src="+ obj.img +">"; 					
 
// 		// 				//    var same1 =" <img  class='fi' src="+obj.img+" /> <p class='sub1'>"+ obj.hit   +    "</p><p class='sub2'>"+  obj.sign+   "</p><p class='sub3'>"+ obj.cost1+ "<span>"+obj.cost2+ "</span> </p>" ;             
// 		// 				//    li.innerHTML = same1;
// 		// 				//    li.className="adjust1";
// 		// 				}
						
// 		// 				//开始轮播
// 		// 				lunbo4();
// 		// 			}
// 				});
  










				lunbo4();

//轮播
		function lunbo4(){
				
				
				   var box = document.getElementById("race");
                 

				   var ul = box.getElementsByTagName("ul")[0];
					
					var aLi = ul.getElementsByTagName("li");

                    

					
					//初始化
					//复制第1个li到第5个
				    ul.appendChild(aLi[0].cloneNode(true));
				    ul.appendChild(aLi[1].cloneNode(true));
				    ul.appendChild(aLi[2].cloneNode(true));
				    ul.appendChild(aLi[3].cloneNode(true));
				 
					 
					
					
					
					
					
					//li的宽度
					var liW = aLi[0].offsetWidth;
					
					//li的数量
					var size = aLi.length;
					

					//设置ul宽度
					ul.style.width = liW * size + "px";

					//自动轮播
					var n = 0;
					var timer = setInterval(function(){
						n++;
						move();
					}, 2000);
					
					//移动ul到显示第n个li
					function move(){
						
						//左边界
						if (n < 0) {
							ul.style.left = -(9-1)*liW + "px"; //将ul以非动画的方式瞬间移动到第5张图（n=4）
							n = 9-2; //并设置即将移动到倒数第2张图n=5-2=3

                           
						}
						 
						//右边界
						else if (n >= 9){ 
							ul.style.left = 0; //将ul以非动画的方式瞬间变到第1张图（n=0）
							n = 1; //并设置即将移动到第2张图n=1
                            
						}
						
						//动画移动
						animate(ul, {left:-n*liW});
						 
					
				}	
					
					
					
					//上一页
					
					 var pvc1 = document.getElementById("pvc3");
					pvc1.onclick = function(){
						n--;
						move();
					}
					
					//下一页
					
					 var pvc2 = document.getElementById("pvc4");
					pvc2.onclick = function(){
						n++;
						move();
					}
					
					
					
				//移入box关闭定时器, 移出box后开启定时器
					box.onmouseenter = function(){
						clearInterval(timer); //关闭定时器
					}
					box.onmouseleave = function(){
						clearInterval(timer); 
						timer = setInterval(function(){
							n++;
							move();
						}, 2000);
					}
					
					
					 
					
			}





















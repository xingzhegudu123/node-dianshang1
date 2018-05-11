

//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest){
		return new XMLHttpRequest(); //不兼容IE6
	}
	return new ActiveXObject("Microsoft.XMLHTTP"); //IE
}

/*
	ajax({
		type: "get", 
		url: "http://60.205.181.47/myPHPCode2/checkname.php",
		data: {regname:"zhangsan", pwd:111}
		async: true,
		
		success: function(){
			console.log("success!");
		},
		fail: function(){
			console.log("fail!");
		}
	});
*/

//封装ajax
function ajax(obj){
	
	//默认参数
	obj.type = obj.type || "get";
	obj.async = obj.async==undefined ? true : obj.async;
	
	//1, 创建xhr对象
	var xhr = createXHR();
	
	//2, open()
	//{regname:"zhangsan", pwd:111} => "regname=zhangsan&pwd=111"
	var params = getParamStr(obj.data);
	
	if (obj.type.toLowerCase() == "get" && params.length>0) {
		obj.url += "?" + params;
	}
	xhr.open(obj.type, obj.url, obj.async);
	
	//3, send()
	if (obj.type.toLowerCase() == "get") {
		xhr.send(null);
	}
	else {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}
	
	//4, 接收数据
	if (obj.async) { //异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4) {
				callback();
			}
		}
	}
	else { //同步
		callback();
	}
	
	function callback(){
		if (xhr.status==200) {
			//console.log(xhr.responseText);
			//请求成功后， 回调
			obj.success && obj.success(xhr.responseText);
			
		}
		else {
			//console.log("请求失败");
			//请求失败后，回调
			if (obj.fail) {
				obj.fail({status: xhr.status, msg: xhr.statusText});
			}
		}

	}
	
}

//{regname:"zhangsan", pwd:111} => "regname=zhangsan&pwd=111"
function getParamStr(obj){
	var arr = []
	for (var key in obj) {
		var str = key + "=" + obj[key] ; //regname=zhangsan 或 pwd=111
		arr.push(str);
	}
	//console.log( arr.join("&") );
	return arr.join("&");
}




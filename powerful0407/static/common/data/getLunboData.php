<?php

//允许跨域
header("Access-Control-Allow-Origin: *");

//获取并立刻返回json数据给前端（获取到的内容就已经是：json字符串）
echo file_get_contents("lunbotu.json");


?> 
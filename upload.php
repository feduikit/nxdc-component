<?php
$picname = $_FILES['file']['name']; 
$picsize = $_FILES['file']['size']; 
if ($picname != "") { 
    if ($picsize > 10485760) { //限制上传大小 
        echo '图片大小不能超过500k'; 
        exit; 
    } 
    $type = strstr($picname, '.'); //限制上传格式 
    if ($type != ".gif" && $type != ".jpg" && $type != ".png") { 
        echo '图片格式不对！'; 
        exit; 
    } 
    $rand = rand(100, 999); 
    $pics = date("YmdHis") . $rand . $type; //命名图片名称 
    //上传路径 
    //$pic_path = "/php/upload/". $pics; 
    //move_uploaded_file($_FILES['file']['tmp_name'], $pic_path); 
} 
$size = round($picsize/1024,2); //转换成kb 
$arr = array( 
    'name'=>$picname, 
    'pic'=>$pics, 
    'size'=>$size 
); 
echo json_encode($arr); //输出json数据 
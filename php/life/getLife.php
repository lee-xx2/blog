<?php
    $type = $_POST['type'];
  
    $con = mysqli_connect('localhost','root','123456','blog');
    $sql = "SELECT * FROM `life` WHERE `type` = '$type' ORDER BY `id` DESC";
    $res = mysqli_query($con,$sql);
    if(!$res){
      die('数据库链接错误' . mysqli_error($con));
    }
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE))
?>
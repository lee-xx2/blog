<?php
    $accound = $_POST['accound']; 
    $password = $_POST['password'];

    $con = mysqli_connect('localhost','root','123456','blog');
    $sql = "SELECT *  FROM `user` WHERE `accound` = '$accound' AND `password` = '$password'";
    $res = mysqli_query($con,$sql);

     if(!$res){
        die('数据库连接错误' . mysqli_error($con));
    }  
   

    // 遍历结果，将其以关系型的数组解析
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }


    if($arr){
      $arr1 = array('code'=>1,'result'=>$arr,'msg'=>'登陆成功');
      print_r(json_encode($arr1,JSON_UNESCAPED_UNICODE));  
    }else{
      $arr1 = array('code'=>0,'msg'=>'账号或密码错误');
      print_r(json_encode($arr1,JSON_UNESCAPED_UNICODE));  
    } 


?>
<?php 
  $username = $_POST['username'];
  $accound = $_POST['accound'];
  $password = $_POST['password'];


  $con = mysqli_connect('localhost','root','123456','blog');

  // 查找是否已经存在该账号
  $sql0 = "SELECT *  FROM `user` WHERE `accound` = '$accound'";
  $res0 = mysqli_query($con,$sql0);
  if(!$res0){//连接错误，res为空
    die('数据库连接错误' . mysqli_error($con));
  } 

  $row = mysqli_fetch_assoc($res0);

  if($row){//遍历结果存在说明账号已经存在
    $arr = array('code'=>2,'msg'=>'该账号已存在');
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE)); 
  }else{
    $sql = "INSERT INTO `user` (`username`, `accound`, `password`) VALUES ('$username', '$accound', '$password')";

    $res = mysqli_query($con,$sql);
    if(!$res){//连接错误，res为空
        die('数据库连接错误' . mysqli_error($con));
    } 
    // 添加成功的时候返回1 ($res = 1),不会返回数据
    $arr1 = array('code'=>$res,'msg'=>'注册成功，即将返回登录页面进行登录！');
    print_r(json_encode($arr1,JSON_UNESCAPED_UNICODE));  
  }
?>


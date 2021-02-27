<?php
  $msg = $_POST['msg'];
  $user_id = $_POST['user_id'];
  $release_date = $_POST['release_date'];
  $user_name = $_POST['user_name'];

  $con = mysqli_connect('localhost','root','123456','blog');
  $sql = "INSERT INTO `message` VALUE ('$msg',0,0,null,'$user_id','$release_date','$user_name')";
  $res = mysqli_query($con,$sql);
  if(!$res){
    die('数据库连接错误' . mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msge'=>'留言成功！'),JSON_UNESCAPED_UNICODE))
?>
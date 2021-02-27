<?php
  $msg_id = $_GET['msg_id'];
  $user_id = $_GET['user_id'];
  $user_name = $_GET['user_name'];
  $info = $_GET['info'];

  $con = mysqli_connect('localhost','root','123456','blog');
  $sql = "INSERT INTO `reply` (`id`, `info`, `msg_id`, `user_id`, `user_name`) VALUES (NULL, '$info', '$msg_id', '$user_id', '$user_name');";
  $res = mysqli_query($con,$sql);
  if(!$res){
    die('数据库连接错误' . mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msge'=>'评论成功！'),JSON_UNESCAPED_UNICODE))
?>
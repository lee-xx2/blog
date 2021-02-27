<?php
  $id = $_GET['id'];

  $con = mysqli_connect('localhost','root','123456','blog');
  $sql="DELETE FROM `message` WHERE `id`='$id'";

  $res = mysqli_query($con,$sql);
  if(!$res){
      die("数据库连接错误".mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msg'=>'删除成功'),JSON_UNESCAPED_UNICODE));
?>
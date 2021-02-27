<?php
  $id = $_GET['id'];
  $num = $_GET['num'];

  $con = mysqli_connect('localhost','root','123456','blog');
  $sql = "UPDATE `message` SET `up_num` = '$num' WHERE `id` = '$id'";
  $res = mysqli_query($con,$sql);
  if(!$res){
      die('数据库连接失败'.mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));
?>
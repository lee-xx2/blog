<?php
  $id = $_GET['id'];
  $page_view =$_GET['page_view'];
  
  $con = mysqli_connect('localhost','root','123456','blog');
  $sql = "UPDATE `study` SET `page_view` = '$page_view' WHERE `id` = '$id'";
  $res = mysqli_query($con,$sql);
  if(!$res){
      die('数据库连接失败'.mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));
?>
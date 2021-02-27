<?php
  $content = $_POST['content'];
  $date = $_POST['date'];
  $type = $_POST['type'];

  $con = mysqli_connect('localhost','root','123456','blog');
  $sql = "INSERT INTO `life` VALUE (null,'zy@qq.com','$content','$date','$type')";
  $res = mysqli_query($con,$sql);
  if(!$res){
    die('数据库连接错误' . mysqli_error($con));
  }
  print_r(json_encode(array('code'=>$res,'msge'=>'发布成功！'),JSON_UNESCAPED_UNICODE))
?>
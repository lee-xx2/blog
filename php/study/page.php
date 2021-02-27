<?php
  $index = $_POST['index'];//当前页...
  $length = $_POST['length'];//每页的数量

  $start = ($index - 1)*$length;

  $con = mysqli_connect('localhost','root','123456','blog');

  $totalSql = "SELECT * FROM `study`";
  $totalRes = mysqli_query($con,$totalSql);

  if(!$totalRes){
    die('数据库链接错误' . mysqli_error($con));
  }

  $totalArr = array();//将结果存储到该数组中;
  $rowTotal = mysqli_fetch_assoc($totalRes);
  while($rowTotal){//依次解析
      array_push($totalArr,$rowTotal);
      $rowTotal = mysqli_fetch_assoc($totalRes);
  }

  // 新建一个空数组存放总数（total）、数据(list)、数据长度(listLength).
  $array = array();
  //【1】获取到总长度
  $array['total']=count($totalArr);

  $sql = "SELECT * FROM `study` LIMIT $start,$length";
  $res = mysqli_query($con,$sql);
  if(!$res){
      die('数据库连接错误' . mysqli_error($con));
  } 
  $arr = array();
  $row = mysqli_fetch_assoc($res);
  while($row){
      array_push($arr,$row);
      $row = mysqli_fetch_assoc($res);
  }
   // 【2】数据
   $array['list'] = $arr;
   // 【3】数据长度
   $array['listLength'] = count($arr);


  print_r(json_encode($array,JSON_UNESCAPED_UNICODE))
?>
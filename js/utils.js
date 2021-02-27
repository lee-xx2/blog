// 格式化时间
function format(date, f) {
  // 给符号写一个默认值，如果没有给f 传递参数的时候 
  // f = f ? f : '-';
  // 短路运算符
  f = f || '-';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month >= 10 ? month : '0' + month
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;

  var hours = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  return `${year}${f}${month}${f}${day} ${hours}:${min}:${sec}`
  // 返回值：处理好的时间 2020-12-31 00:00:00
}
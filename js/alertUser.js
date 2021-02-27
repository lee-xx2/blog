// 显示用户名
if($.cookie('username')){
  $('.nickname')[0].innerHTML = $.cookie('username');
}else{
  $('.nickname')[0].innerHTML = "未登录";
}
// 退出登录
$('.exit').click(function(){
  if($.cookie('username')){
    alert('确认退出登录？');
    $.removeCookie('username'); 
    $.removeCookie('login'); 
    $('.nickname')[0].innerHTML = "未登录";
  }
})
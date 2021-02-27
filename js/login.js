$('.register').click(function () {
  window.location.href = "../html/loginAndRegister2.html";
  return false
});

$('.submit').click(function () {
  $.ajax({
    url: '../php/login.php',
    type: 'post',
    data: {
      accound: $('.accound')[0].value,
      password: $('.password')[0].value
    },
    // 登录成功或失败弹框
    success: function (res) {
      res = JSON.parse(res);
      window.alert(res.msg);
      if (res.code) {
        $.cookie('login', res.result[0].accound, {
          expires: 7
        });
        $.cookie('username', res.result[0].username, {
          expires: 7
        });
        window.location.href = "../html/message.html";
      }
    },
    error: function (res) {
      console.log('请求失败')
    },
  })
})
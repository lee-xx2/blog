// 注册页面
// 添加验证规则
jQuery.validator.addMethod('testUsername', function (value) {
  // 方法中必须返回布尔值
  // value 就是你验证这个输入框输入的内容
  let reg = /^[a-zA-Z0-9_-]{4,16}$/;
  if (reg.test(value)) {
    return true
  }
  return false
}, '用户名4到16位，请输入字母、数字、下划线或减号');



jQuery.validator.addMethod('testPassword', function (value) {
  let reg = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
  if (reg.test(value)) {
    return true
  }
  return false
}, '8-16个字符,没有空格,数字、字母、字符至少有两种');

$('#regist').validate({
  rules: {
    username: {
      required: true,
      testUsername: true,
    },
    accound: {
      required: true,
      email: true
    },
    psw: {
      required: true,
      testPassword: true,
    },
    psw2: {
      required: true,
      equalTo: "#psw",
    }
  },
  messages: {
    username: {
      required: "请输入您的用户名！",
    },
    accound: {
      required: "请输入您的账号！",
      email: "请输入正确的邮箱！"
    },
    psw: {
      required: "请输入您的密码！",
    },
    psw2: {
      required: "请确认您的密码！",
      equalTo: "密码输入不一致！",
    }

  },
  submitHandler: function () {
    $.ajax({
      url: '../php/register.php',
      type: 'post',
      data: {
        username:$('.username')[0].value,
        accound:$('.accound')[0].value,
        password:$('.psw')[0].value
      },
      // 注册成功弹框
      success: function (res) {
         res = JSON.parse(res);
        if(res.code){
          window.alert(res.msg);
          if(res.code == 1){
            window.location.href = "../html/loginAndRegist.html";
          }      
        }  
      },
      error: function (res) {
        console.log('请求失败')
      },
    })
  }
})


// 点击登录跳转到登录页面
$('.register').click(function () {
  window.location.href = "../html/loginAndRegist.html";
})
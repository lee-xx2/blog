"use strict";$.cookie("username")?$(".nickname")[0].innerHTML=$.cookie("username"):$(".nickname")[0].innerHTML="未登录",$(".exit").click(function(){$.cookie("username")&&(alert("确认退出登录？"),$.removeCookie("username"),$.removeCookie("login"),$(".nickname")[0].innerHTML="未登录")});
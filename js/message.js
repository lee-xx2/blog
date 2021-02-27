/*  留言板 :
 (1)进入留言板显示所有留言 
 (2)点击发布验证是否登录，未登录时跳转到登录页面 登录发表留言
 点击发布按钮事件 
 点赞 
 回复  */

// (1)
$(document).ready(function () {
  // getMsg();
  document.querySelector('body').setAttribute('page',1);
  getMsg(1, 2);
})


//(2)
$('.oButton').click(function () {
  if ($.cookie('login')) {
    if ($('.msg')[0].value) {
      // 记录当前时间
      let time = format(new Date());
      $.ajax({
        url: '../php/message/addMessage.php',
        type: 'post',
        data: {
          msg: $('.msg')[0].value,
          user_id: $.cookie('login'),
          user_name: $.cookie('username'),
          release_date: time,
        },
        // 发布成功！
        success: function (res) {
          res = JSON.parse(res);
          $(".tip")[0].innerHTML='发布成功';
          $(".tip").fadeIn(800).fadeOut(1800);
          getMsg(document.querySelector('body').getAttribute('page'),2);
          $('.msg')[0].value = '';
        },
        error: function (res) {
          console.log('请求失败')
        },
      })

    } else {
      alert("请输入留言内容!");
    }
  } else { //未登录时先登录
    alert('请先登录你的账号!');
    window.onload.href = "../html/loginAndRegist.html";
  }
})


$('.show').click(function (e) {
  if (e.target.classList.contains('up')) { // 点赞
    var id = e.target.parentNode.parentNode.getAttribute('ind') - 0;
    let num = e.target.getAttribute('cot') - 0 + 1;
    $.ajax({
      url: '../php/message/upMessage.php',
      data: {
        id: id,
        num: num
      },
      success: function (res) {
        e.target.nextElementSibling.innerHTML = e.target.nextElementSibling.innerHTML - 0 + 1;
        e.target.classList.add('clicki');
      }
    })
  }

  if (e.target.classList.contains('delete')) { //删除
    var id = e.target.parentNode.parentNode.getAttribute('ind') - 0;
    $.ajax({
      url: '../php/message/deleteMessage.php',
      data: {
        id: id
      },
      success: function (res) {
        res = JSON.parse(res);
        $(".tip")[0].innerHTML='删除成功';
        $(".tip").fadeIn(800).fadeOut(1800);
        getMsg(document.querySelector('body').getAttribute('page'),2);
      }
    })

  }


  if (e.target.classList.contains('replybtn')) { // 评论
    let $par = $(e.target.parentNode.parentNode);
    // 点击评论查找对应评论，显示结果
    var ind = $par.attr('ind') - 0;
    getReply(ind, $par); //获取并渲染

  }

  
  if (e.target.classList.contains('re_btn')) { //发表评论
   if($.cookie('login')){
    $('.shadow').css('display', 'block'); //显示罩层
    //显示发表评论框
    $('.writ_reply').fadeIn(1000);
    // 给评论框添加msg_id
    var id = e.target.parentNode.parentNode.getAttribute('ind') - 0;
    $('.writ_reply').attr('msgid', id);
   }else{
     alert('请先登录账号！');
     window.location.href = "../html/loginAndRegist.html";
   }
  }
})


// 评论框的功能：（1）发表评论 （2）关闭
$('.release_reply_btn').click(function () {
  var ind = this.parentNode.getAttribute('msgid');
  var ms = $(this.parentNode).find('.ms')[0].value;
  $(this.parentNode).find('.ms')[0].value = "";
  if (!ms) {
    alert("请输入内容！")
  } else {
    $.ajax({
      url: '../php/reply/insertReply.php',
      data: {
        msg_id: ind,
        info: ms,
        user_id: $.cookie('login'),
        user_name: $.cookie('username'),
      },
      success: function (res) {
        res = JSON.parse(res);
        $(".tip")[0].innerHTML='发布成功';
        $(".tip").fadeIn(800).fadeOut(1800);
        let $par1;
        document.querySelectorAll('.li_show').forEach(function (item) {
          if (item.getAttribute('ind') == ind) {
           $par1 = $(item);
          }
        });
        getReply(ind, $par1);
        $par1.find('.reply').slideToggle(1000);
        $('.writ_reply').fadeOut(1000);
        $('.shadow').css('display', 'none');
      }
    });
  }


});


$('.close').click(function () {
  $('.writ_reply').fadeOut(300);
  $('.shadow').css('display', 'none');
})



// 获取对应留言的评论信息
function getReply(msg_id, parent) {
  // 根据msg_id找到对应的留言li_show
  $.ajax({
    url: '../php/reply/getReply.php',
    data: {
      msg_id: msg_id,
    },
    success: function (res) {
      var str = '';
      res = JSON.parse(res);
      res.forEach(function (item) {
        str += `    <div class="item_reply" index="${item.id}">
        <p> <span class="friend_name">${item.user_name}</span>评论了你：
     <span>${item.info}</span>
    </p>
      </div>`
      });
      str += `<button class="re_btn">发表评论</button>`,
      parent.find('.reply')[0].innerHTML = str;
      parent.find('.reply').slideToggle(500);
      // 存在问题 关闭时应该不再查询
    }
  });

}



// 渲染数据
function render(res) {
  let str = `<div class="tit_show">评论</div>`;
  res.forEach(function (item) {
    str += `
    <div class="li_show" ind=${item.id}>
    <!-- 头部 -->
    <div class="head_show">
      <img src="../image/fg3.jpg" alt="">
      <span>${item.user_name}</span>
      <span>${item.release_date}</span>
    </div>
    <!-- 内容区域 -->
    <p class="con">
      ${item.msg}
    </p>
    <!-- 点赞区域 回复 -->
    <div class="foot_show">
      <i class="iconfont icon-praise up" cot='${item.up_num}'></i>
      <span class="up_num">${item.up_num==0?'':item.up_num}</span>
      <span class="replybtn">评论</span>
      <span class="delete">删除</span>
    </div>
    <div class="reply">              
    </div>
  </div>`
  })
  $('.show')[0].innerHTML = str;
}


// 获取留言
let flag = true; //初始允许设置页码格式标识
function getMsg(index, length) {
  $.ajax({
    url: '../php/message/getMessage.php',
    type: 'post',
    data: {
      index: index,
      length: length
    },
    // 获取成功
    success: function (res) {
      res = JSON.parse(res); 
        // 分页
        // if(flag){
        $('.m-style').pagination({
          totalData: res.total,
          showData: 2,
          coping: true,
          prevContent: '<',
          nextContent: '>',
          current: document.querySelector('body').getAttribute('page')-0,
          callback: function (e) {
            document.querySelector('body').setAttribute('page',e.getCurrent());
            getMsg(e.getCurrent(),2);
          }
        });
        
      render(res.list);
    }


  })
}


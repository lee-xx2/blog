$(document).ready(function () {
  getLife('电影');
  $('.type')[0].classList.add('active');
})

$('.type').click(function () {
  getLife(this.getAttribute('ind'));

  $('.type').removeClass('active');
  this.classList.add('active');
})


// 获取数据
function getLife(type) {
  $.ajax({
    url: "../php/life/getLife.php",
    method: 'post',
    data: {
      type: type,
    },
    success: function (res) {
      res = JSON.parse(res);
      render(res);
    }
  })
}

// 渲染数据
function render(res) {
  var str = "";
  res.forEach(function (item) {
    str += `
    <div class="item-diary">
    <div class="box">
      <div class="bar">
        <span class="star"></span>
        <span class="end"></span>
      </div>
      <div class="nickname">
        欣欣~
      </div>
      <div class="con">${item.content}</div>
      <span class="date">${item.date}</span>
      <span class="arrow"></span>
      <img src="../image/fg3.jpg" alt="">
    </div>
  </div>
    `
  })
  $('.diary')[0].innerHTML = str;
  $('.diary .item-diary').fadeIn(800);
}

// 点击记录验证密码
$('.record_new').click(function () {
  if ($('.wirte_new input')[0].value == "!@#$%") {
    $('.wirte_new input')[0].value = "";
    $('.diary')[0].innerHTML = `
    <div class="new">
    <div class="type_new">
      <input type="radio" name="type" value="电影" id="radio1">
      <label for="radio1">电影</label>
      <input type="radio" name="type" value="读书" id="radio2" checked>
      <label for="radio2" >读书</label>
      <input type="radio" name="type" value="心情" id="radio3">
      <label for="radio3">心情</label>
      <input type="radio" name="type" value="美剧" id="radio4">
      <label for="radio4">美剧</label>
      <input type="radio" name="type" value="其他" id="radio5">
      <label for="radio5">其他</label>
    </div>
    <textarea node-type="textarea" placeholder="~~~~啦啦啦啦~~~" class="msg"></textarea>
    <button class="btn">发布</button>
  </div>`
    // 点击发布加入数据库
    $('.new .btn').click(function () {
      addNew();
    })
  }
});

function addNew() {
  if ($('.msg')[0].value) {
    ;
    let type = $("input[name='type']:checked")[0].value;
    $.ajax({
      url: '../php/life/addLife.php',
      method: 'post',
      data: {
        content: $('.msg')[0].value,
        type: type,
        date: format(new Date()).split(' ')[0],
      },
      success: function (res) {
        res = JSON.parse(res);
        $(".tip").fadeIn(800).fadeOut(800);
        getLife(type);
        // 给选中的内容添加样式
        $('.type').removeClass('active');
        $('.type').each(function () {
          if ($(this).attr('ind') == type) {
            $(this)[0].classList.add('active');
          };
        })
      }
    })
  }
};
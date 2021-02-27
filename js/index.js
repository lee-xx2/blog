$(document).ready(function () {
  // 获取热门标签
  getLabel();
  // 获取推荐文章标题 按照浏览量排名 五篇
  getTitTop();
  //获取热门文章
  // getArt();
  getStu(1, 3);

});

// 获取热门标签
function getLabel() {
  $.ajax({
    url: '../php/study/getLabel.php',
    success: function (res) {
      res = JSON.parse(res);
      var str = '';
      res.forEach(function (item, index) {
        str += `
        <a index="${item.id}">${item.name}</a>`;

      });
      $('.btn_con')[0].innerHTML = str;
    }

  })

}
// 获取推荐文章标题 按照浏览量排名 五篇
function getTitTop() {
  $.ajax({
    url: '../php/study/getTitTop.php',
    success: function (res) {
      res = JSON.parse(res);
      var str = '';
      res.forEach(function (item, index) {
        if (index < 5) {
          str += `
          <li index="${item.id}"><i class="iconfont icon-xingxing"></i>
          ${item.title}
        </li>`;
        }
      });
      $('.art_list')[0].innerHTML = str;
      $('.art_list li').click(function () {
        checkArt(this);
      });
    }

  })
}

// 点击文章标题查看文章
// 点击右侧展示框查看文章
function checkArt(dom) {
  window.location.href = "study.html?index=" + dom.getAttribute('index');
}






// 分页
let flag = true; //初始允许设置页码格式标识
function getStu(index, length) {
  $.ajax({
    url: '../php/study/page.php',
    type: 'post',
    data: {
      index: index,
      length: length
    },
    // 获取成功
    success: function (res) {
      res = JSON.parse(res);
      if (flag) {
        // 分页
        $('.m-style').pagination({
          totalData: res.total,
          showData: 3,
          prevContent: '<',
          nextContent: '>',
          current: 1,
          callback: function (e) {
            flag = false;
            getStu(e.getCurrent(), 3)
          }
        });
      }
      render(res.list);
    }
  })
}

function render(res) {
  var str = '';
  res.forEach(function (item) {
    str += `
    <div class="list" index="${item.id}">
    <h3>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-lianjie"></use>
      </svg>
      <span>${item.title}</span>
    </h3>
    <figure>
      <img src="../image/bg2.jpg" alt="">
      <figcaption>
        <p class="txt">${item.content}</p>
        <div class="foot">
          <p><i class="iconfont icon-gingerbread"></i><span class="author">${item.author}</span></p>
          <p><i class="iconfont icon-riqi"></i><span class="date">${item.date}</span></p>
          <p><i class="iconfont icon-liulan1"></i><span class="page_view">${item.page_view}</span></p>
        </div>
      </figcaption>
    </figure>
  </div>`;
  });
  $('.right_con .lis')[0].innerHTML = str;
  $('.right_con .list').click(function () {
    checkArt(this);
  });
}
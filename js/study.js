let p = $('.first li p');
// 初始为0
p.attr('flag','0');
let second = $('.second')
p.on('mouseover',function(){
  // 为0时表示可以执行动画
  if($(this).attr('flag')=='0'){
    second.slideUp();
    p.attr('flag','0');
    $(this).next().slideToggle();
    $(this).attr('flag','1');//执行结束把值改为1
  }
});



// 初始进入页面后显示列表
$(document).ready(function(){
  showTit();
  let index = location.search.slice(1).split("=")[1];
  if(index){
    // 跳转进来显示
    getArtById(index);
  }
});




// 根据id获取文章
function getArtById(id){
  $.ajax({
    url:'../php/study/getArtById.php',
    type:'post',
    data:{
      id:id
    },
    success:function(res){
      res= JSON.parse(res);
      var str="";
      // 后期修改位置     
      str +=`
      <div class="art_count">
      <div class="title"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaolian"></use>
        </svg> <span>${res[0].title}</span></div>
      <p class="author">作者：${res[0].author}</p>
      <div class="con_detail">
        <pre>
${res[0].content}
            </pre>
      </div>
      <div class="footer">
        <span class="time">发布时间：${res[0].date}</span>
        <span class="page_view">浏览量：${res[0].page_view-0+1}</span>
      </div>
   </div>   
      `;
     $('.article_list')[0].innerHTML=str;
     $('.show').css('display','none');
     $('.article_list').fadeIn(1000);

     pageView(res[0].id,res[0].page_view-0+1);
    }
  })
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
            getStu(e.getCurrent(),3)
          }
        });
      }
      render(res.list);
    }
  })
}

function render(res){
  var str ='';
  res.forEach(function(item){
    str += `
    <div class="list" artId="${item.id}">
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
  $('.right_con .article_list')[0].innerHTML = str;
  
}







function showTit(){//显示列表
  $.ajax({
    url:'../php/study/getTiti.php',
    success:function(res){
      res = JSON.parse(res);
      let str1='';
      let str2='';
      let str3='';
      let str4='';
      res.forEach(function(item){
        if(item.type=='HTML学习笔记'){
          str1+=` <li class="second_li" index='${item.id}'>${item.title}</li>`
        }else if(item.type=='CSS学习笔记'){
          str2+=` <li class="second_li" index='${item.id}'>${item.title}</li>`
        }else if(item.type=='javascript学习笔记'){
          str3+=` <li class="second_li" index='${item.id}'>${item.title}</li>`
        }else{
          str4+=` <li class="second_li" index='${item.id}'>${item.title}</li>`
        }
      })
      $('.html_stu .second')[0].innerHTML = str1;
      $('.css_stu .second')[0].innerHTML = str2;
      $('.js_stu .second')[0].innerHTML = str3;
      $('.jq_stu .second')[0].innerHTML = str4;


      $('.second').find('.second_li').click(function(){
        clickli(this);
      })

    }
  })
}



function clickli(dom){
   $('.article_list').css('display','none');
  var ind = dom.getAttribute('index');
  //根据索引获取出文章
  getArtById(ind);
}


// 修改浏览量：
function pageView(id,con){
  $.ajax({
    url:'../php/study/alertView.php',
    data:{
      id:id,
      page_view:con,
    }
  });
}




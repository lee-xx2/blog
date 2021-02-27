var swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 30,
  autoplay:{
    delay:1000
  },
  loop: true, // 循环模式选项
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});
 swiper.el.onmouseover = function(){
  swiper.autoplay.stop();
}
swiper.el.onmouseout = function(){
  swiper.autoplay.start();
};

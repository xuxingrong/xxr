<template>
  <section class="index-banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide"></div>
      </div>
      <div class="swiper-pagination">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index-banner',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 5000,//可选选项，自动滑动
      speed: 500,
      loop: true,
      pagination: '.swiper-pagination',
      autoplayDisableOnInteraction: false,
      paginationClickable: true,
      paginationElement : 'p',
    })
  }
}

 
</script>
<style lang="less">
  @pxtoem:28.125rem;
  section.index-banner{
    margin-bottom:20/@pxtoem;
  }
  .index-banner .swiper-container{
    width:100%;
    height:458/@pxtoem;
    position:relative;
  }
  .index-banner .swiper-container .swiper-slide{
    width:100%;
    height:458/@pxtoem;
    background:url(../../static/images/banner.jpg) no-repeat center;
    background-size:100% 458/@pxtoem;
  }
  .index-banner .swiper-pagination{
    position:absolute;
    bottom:20/@pxtoem;
    z-index:10;
    text-align:right;
  }
  .index-banner .swiper-pagination .swiper-pagination-bullet{
    width:14/@pxtoem;
    height:14/@pxtoem;
    border-radius:100%;
    background:#ada29c;
    margin-left:15/@pxtoem;
    opacity:1;
  }
  .index-banner .swiper-pagination .swiper-pagination-bullet:last-of-type{
    margin-right:60/@pxtoem;
  }
  .index-banner .swiper-pagination .swiper-pagination-bullet-active{
    background:#fff;
  }
</style>
 
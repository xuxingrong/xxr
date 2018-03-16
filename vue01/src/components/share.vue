<template>
  <section v-on:click.self="ss" class="share-section">
    <div class="share-box">
      <div class="clearfix">
        <!--
        <div>
          <div class="share-ico wxhy-ico"></div>
          微信好友
        </div>-->
        <div>
          <div v-on:click="bd_share" class="share-ico wxpyq-ico"></div>
          朋友圈
        </div>
        <div>
          <div v-on:click="bd_share" class="share-ico qqhy-ico"></div>
          QQ好友
        </div>
        <div>
          <div v-on:click="bd_share" class="share-ico qqkj-ico"></div>
          QQ空间
        </div>
        <div>
          <div v-on:click="bd_share" class="share-ico weibo-ico"></div>
          新浪微博
        </div>
        <div>
          <div v-on:click="bd_share" class="share-ico copy-ico"></div>
          复制链接
        </div>
      </div>
      <div class="share-close" v-on:click.self="ss"></div>
    </div>
    
  </section>
</template>

<script>
 
export default {
  name: 'indexzd-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeRouteEnter (to, from, next) {
    function isWeiXin(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
      }else{
        return false;
      }
    }
    if(isWeiXin()){
      next("/hhk");
    }else{
      next();
    }
  },
  created:function(){
  
      
    
     
  },
  methods:{  
    bd_share:function(e){
      var c = $(e.target).attr("class");
      switch(c)
      {
        case 'share-ico wxpyq-ico':
          $(".bds_weixin")[0].click();
          break;
        case 'share-ico qqhy-ico':
          $(".bds_tqq")[0].click();
          break;
        case 'share-ico qqkj-ico':
          $(".bds_qzone")[0].click();
          break;
        case 'share-ico weibo-ico':
          $(".bds_tsina")[0].click();
          break;
        default:
          $(".bds_copy")[0].click();
      }  
    },
    ss:function(){
      this.$router.go(-1)
    },
    
  }
  
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    position:fixed;
    z-index:1000;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .share-box{
    box-sizing:border-box;
    width:100%;
    position:absolute;
    bottom:0;
    padding:0 60/@pxtoem;
  }
  .share-box>div>div{
    float:left;
    width:33.33%;
    margin-bottom:70/@pxtoem;
    color:#fff;
    text-align:center;
  }
  .share-ico{
    width:126/@pxtoem;
    height:126/@pxtoem;
    margin:0 auto 28/@pxtoem;
  }
  .wxhy-ico{
    background:url(../../static/images/wxhy.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .wxpyq-ico{
    background:url(../../static/images/wxpyq.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .qqhy-ico{
    background:url(../../static/images/qqhy.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .qqkj-ico{
    background:url(../../static/images/qqkj.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .weibo-ico{
    background:url(../../static/images/weibo.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .copy-ico{
    background:url(../../static/images/copy.png) no-repeat center;
    background-size:126/@pxtoem 126/@pxtoem;
  }
  .share-close{
    margin:34/@pxtoem auto 104/@pxtoem;
    width:86/@pxtoem;
    height:86/@pxtoem;
    background:url(../../static/images/icon_close.png) no-repeat center;
    background-size:86/@pxtoem 86/@pxtoem;
  }
</style>

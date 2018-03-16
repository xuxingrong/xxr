<template>
  <footer class="hhk-footer sl-ub">
    <router-link to="/">
      <div class="hhk-footer-ico hhk-footer-sy"></div>
      <div class="hhk-footer-txt">首页</div>
    </router-link>
    <a href="http://www.hhwall.com/wap" >
      <div class="hhk-footer-ico hhk-footer-hhsc"></div>
      <div class="hhk-footer-txt">海惠商城</div>
    </a>
    <router-link to="/hhk" class="hhk-footer-active">
      <div class="hhk-footer-ico hhk-footer-hhk"></div>
      <div class="hhk-footer-txt">海惠客</div>
    </router-link>
    <a href="javascript:;" v-on:click="no_kf">
      <div class="hhk-footer-ico hhk-footer-sjlm"></div>
      <div class="hhk-footer-txt">商家联盟</div>
    </a>
    <div v-bind:class="{'black-box':true, 'fd-center':true,'hide':hhlm_hide}" v-on:click="hide_black">该功能尚未开发</div>
  </footer>
  
</template>

<script>
export default {
  name: 'hhk-footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hhlm_hide: true
    }
  },
  methods:{
    no_kf:function(){
      if(this.hhlm_hide){
        this.hhlm_hide = false;
        var _this = this;
        setTimeout(function(){
          _this.hide_black();
        },1000);
      }
      return false;
    },
    hide_black:function(){
      if(!this.hhlm_hide){
        this.hhlm_hide = true;
      }
    }
  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .hhk-footer{
    position:fixed;
    bottom:0;
    width:100%;
    z-index:8;
    height:98/@pxtoem;
    border-top:1/@pxtoem solid #d9d9d9;
    background:#fff;
  }
  .hhk-footer>a{
    display:block;
    width:25%;
    padding:15/@pxtoem 0;
  }
  .hhk-footer-ico{
    width:40/@pxtoem;
    height:40/@pxtoem;
    margin:0 auto 10/@pxtoem;
  }
  .hhk-footer-sy{
    background:url(../../static/images/tab_icon_home.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-active .hhk-footer-sy{
    background:url(../../static/images/tab_icon_home_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-hhsc{
    background:url(../../static/images/tab_icon_hhsc.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-active .hhk-footer-hhsc{
    background:url(../../static/images/tab_icon_hhsc_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-hhk{
    background:url(../../static/images/tab_icon_hhk.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-active .hhk-footer-hhk{
    background:url(../../static/images/tab_icon_hhk_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-sjlm{
    background:url(../../static/images/tab_icon_sjlm.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-active .hhk-footer-sjlm{
    background:url(../../static/images/tab_icon_sjlm_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hhk-footer-txt{
    font-size:20/@pxtoem;
    line-height:22/@pxtoem;
    color:#666;
    text-align:center;
  }
  .hhk-footer-active .hhk-footer-txt{
    color:#d8272a;
  }
  .black-box{
    position:fixed;
    width:450/@pxtoem;
    height:180/@pxtoem;
    color:#fff;
    font-size:36/@pxtoem;
    line-height:180/@pxtoem;
    text-align:center;
    z-index:1000;
    background:rgba(0,0,0,.8);
    border-radius:20/@pxtoem;
  }
</style>

<template>
  <header>
    <section>
      <router-link to="/hhk/set_person_ewm" class="per-ewm">
      </router-link>
      <div class="hhk-tt">海惠客</div>
      <router-link class="share-ico" to="/hhk/share" ></router-link>
    </section>

  <!--已登录-->  
    <section class="">
     <router-link to="/hhk/set">
      <img src="static/images/person.png" alt="" />
     </router-link>
      <router-link to="/hysj" class="vip-box sl-ub sl-uac">
        <div class="vip-ico vip-hy"></div>
        <div class="vip-name">VIP会员</div>
        <div class="vip-to"></div>
      </router-link>
    </section>
    <section class="username">
      <span>
        <div class="qiandao-box">
          <router-link to="/qiandao/qdts">
            <div class="qd-btn-ico"></div>
            <div class="qd-other-ico"></div>
          </router-link>
          <router-link to="/qiandao" class="hide">
            <div class="yqd-btn-ico"></div>
          </router-link>
        </div>
      12345678912
      </span>
      
    </section>

      <div class="gg-box sl-ub sl-uac">
        <div class="gg-ico"></div>
        <div class="gg-content">
          <ul class="sl-ub" >
            <li v-for="ggItem in ggListArr">
              用户<span class="gg-username">{{ggItem.username}}</span><span class="gg-time">{{ggItem.times}}</span>赚了<span class="gg-money">&yen;{{ggItem.money}}</span>
            </li>
          </ul>
        </div>
      </div>

  <!--//已登录-->  
  <!--未登录-->
    <section class="login_not hide">
      <router-link to="/hhk/login">
        <img src="static/images/hyzx_touxiang.png" alt="" /> 
        <p>请登录</p>
      </router-link>
    </section>
  <!--//未登录-->
    <div class="per-data-box sl-ub sl-uac sl-upc">
      <router-link to="/hhk/account">
        <div>888888</div>
        <div>账户余额(元)</div>
      </router-link>
      <router-link to="/wdyhq">
        <p class="wt"></p>
        <div>88</div>
        <div>优惠券</div>
      </router-link>
      <router-link to="/hhk/myintegral">
        <div>88888</div>
        <div>我的积分</div>
      </router-link>
    </div>
  </header>
  
</template>

<script>
export default {
  name: 'hhk-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ggListArr:[]
    }
  },
  created:function(){
    this.ggListArr = [
      {
        username:13415207245,
        times:'5分钟前',
        money:'9.9',
      },
      {
        username:13415207245,
        times:'5分钟前',
        money:'9.9',
      },
      {
        username:13415207245,
        times:'5分钟前',
        money:'9.9',
      },
      {
        username:13415207245,
        times:'5分钟前',
        money:'9.9',
      }
    ];
  },
  mounted:function(){
    var _this = this;
    this.$nextTick(function () {
      var w = $(".gg-content li").width()*$(".gg-content li").length;
      $(".gg-content ul").animate({"left":"-"+w+"px"},20000);
      setInterval(function(){
        $(".gg-content ul").css("left","0px");
        $(".gg-content ul").animate({"left":"-"+w+"px"},20000);
      },22000); 
    })
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    width:100%;
    height:520/@pxtoem;
    position:relative;
    background: -webkit-linear-gradient(120deg, #ff137d, #fd7c27);
    background: -o-linear-gradient(120deg,#ff137d, #fd7c27);
    background: -moz-linear-gradient(120deg,#ff137d, #fd7c27);
    background: linear-gradient(120deg,#ff137d, #fd7c27);
  }
  header>section:first-child{
    height:130/@pxtoem; 
  }
  header>section:nth-child(2){
    height:150/@pxtoem;
    margin-bottom:20/@pxtoem;
  }
  header>section:nth-child(2) img,.login_not img{
    display:block;
    box-sizing:border-box;
    width:150/@pxtoem;
    height:150/@pxtoem;
    border:4/@pxtoem solid #fff;
    border-radius:100%;
    margin:0 auto;
  }
  header>section{
    position:relative;
  }
  .hhk-tt{
    color:#fff;
    font-size:34/@pxtoem;
    position:absolute;
    top:64/@pxtoem;
    margin:auto;
    left:0;
    right:0;
    text-align:center;
    z-index:4;
  }
  .per-ewm,.share-ico{
    display:block;
    position:absolute;
    top:64/@pxtoem;
    z-index:5;
  }
  .per-ewm{
    width:44/@pxtoem;
    height:44/@pxtoem;
    background:url(../../static/images/nar_icon_erweima.png) no-repeat center;
    background-size:44/@pxtoem 44/@pxtoem;
    left:24/@pxtoem;
  }
  .share-ico{
    width:40/@pxtoem;
    height:38/@pxtoem;
    background:url(../../static/images/nar_icon_share.png) no-repeat center;
    background-size:40/@pxtoem 38/@pxtoem;
    right:24/@pxtoem;
  }
  .vip-box{
    position:absolute;
    right:0;
    top:42/@pxtoem;
    height:48/@pxtoem;
    padding:0 20/@pxtoem;
    background:rgba(0,0,0,.18);
    border-radius:20/@pxtoem 0 0 20/@pxtoem;
  }
  .vip-ico{
    width:37/@pxtoem;
    height:33/@pxtoem;
  }
  .vip-hy{
    background:url(../../static/images/htk_icon_vip.png) no-repeat center;
    background-size:37/@pxtoem 33/@pxtoem;
  }
  .vip-name{
    font-size:34/@pxtoem;
    color:#fff;
    margin:0 10/@pxtoem;
    height:100%;
    line-height:48/@pxtoem;
  }
  .vip-to{
    width:8/@pxtoem;
    height:14/@pxtoem;
    background:url(../../static/images/htk_icon_hy_ckgd.png) no-repeat center;
    background-size:8/@pxtoem 14/@pxtoem;
  }
  .username{
    font-size:24/@pxtoem;
    height:26/@pxtoem;
    line-height:26/@pxtoem;
    color:#fff;
    text-align:center;
  }
  .username>span{
    display:inline-block;
    position:relative;
  }
  .gg-box{
    box-sizing:border-box;
    width:690/@pxtoem;
    height:40/@pxtoem;
    line-height:40/@pxtoem;
    background:rgba(0,0,0,.18);
    border-radius:20/@pxtoem;
    padding:0 20/@pxtoem;
    margin:20/@pxtoem auto 40/@pxtoem;
  }
  .gg-ico{
    width:36/@pxtoem;
    height:33/@pxtoem;
    background:url(../../static/images/top_icon_gg.png) no-repeat center;
    background-size:36/@pxtoem 33/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .gg-content{
    width:594/@pxtoem;
    height:100%;
    overflow:hidden;
    font-size:22/@pxtoem;
    color:#fff;
    position:relative;
  }
  .gg-content ul{
    position:absolute;
    top:0;
    left:0;
  }
  .gg-content li{
    padding-right:20/@pxtoem;
  }
  .gg-username{
    margin-right:10/@pxtoem;
  }
  .gg-money{
    color:#ffff00;
  }
  .per-data-box>a{
    display:block;
    box-sizing:border-box;
    width:33.33%;
    color:#fff;
    text-align:center;
  }
  .per-data-box>a:nth-child(2){
    position:relative;
  }
  .per-data-box>a>div:first-child{
    font-size:30/@pxtoem;
    line-height:32/@pxtoem;
    margin-bottom:10/@pxtoem;
  }
  .per-data-box>a>div:last-child{
    font-size:26/@pxtoem;
    line-height:28/@pxtoem;
  }
  .wt{
    position:absolute;
    box-sizing:border-box;
    width:100%;
    height:38/@pxtoem;
    border-left:1/@pxtoem solid #fff;
    border-right:1/@pxtoem solid #fff;
    top:0;
    bottom:0;
    margin:auto;
  }
  .hh_hide{
    display:none;
  }
  .login_not{}
  .login_not a{
    color:#fff;
    text-align:center;
    display:block;
  }
  .login_not  p{
    margin-top:13/@pxtoem;
    margin-bottom:92/@pxtoem;
  }
  .qiandao-box{
    position:absolute;
    left:-90/@pxtoem;
    top:-110/@pxtoem;
    width:80/@pxtoem;
    height:140/@pxtoem;
  }
  .qd-btn-ico{
    width:80/@pxtoem;
    height:110/@pxtoem;
    background:url(../../static/images/btn_sign.png) no-repeat center;
    background-size:80/@pxtoem 110/@pxtoem;
    position:absolute;
    bottom:16/@pxtoem;
    animation:qd_btn_dh 2s linear infinite;
    -webkit-animation:qd_btn_dh 2s linear infinite; /* Safari 和 Chrome */
  }
  .qd-other-ico{
    width:45/@pxtoem;
    height:10/@pxtoem;
    margin:auto;
    border-radius:100%;
    background:#e43454;
    position:absolute;
    bottom:0;
    right:0;
    left:0;
    animation:qd_yuan_dh 2s linear infinite;
    -webkit-animation:qd_yuan_dh 2s linear infinite; /* Safari 和 Chrome */
  }
  @keyframes qd_yuan_dh
  {
     
  }
  @-webkit-keyframes qd_yuan_dh /* Safari and Chrome */
  {
    0% {
      width:45/@pxtoem;
      height:10/@pxtoem;
    }
    37.5% {
      width:72/@pxtoem;
      height:16/@pxtoem;
    }
    87.5% {
      width:36/@pxtoem;
      height:8/@pxtoem;
    }
    100% {
      width:45/@pxtoem;
      height:10/@pxtoem;
    }
  }
  @-webkit-keyframes qd_btn_dh /* Safari and Chrome */
  {
    0% {
      bottom:16/@pxtoem;
    }
    37.5% {
      bottom:34/@pxtoem;
    }
    87.5% {
      bottom:10/@pxtoem;
    }
    100% {
      bottom:16/@pxtoem;
    }
  }
  .yqd-btn-ico{
    width:80/@pxtoem;
    height:80/@pxtoem;
    background:url(../../static/images/btn_jryq.png) no-repeat center;
    background-size:80/@pxtoem 80/@pxtoem;
    position:absolute;
    bottom:0;
  }
</style>

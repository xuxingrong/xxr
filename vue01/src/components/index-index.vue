<template>
  <div class="index-index" style="background:#eee;">
    <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
      <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
    </div>
    <header>
      <div class="index-gg-box sl-ub">
        <div v-bind:class="{'gg-box':true,'sl-ub':true,'sl-uac':true,'no-gg':gg_hide}">
          <div class="gg-ico"></div>
          <div class="gg-content">
            <ul class="sl-ub" >
              <li v-for="ggItem in ggListArr">
                <span>{{ggItem.mesg}}</span><span class="gg-money">&yen;{{ggItem.fee}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="gg-per-ico" v-on:click="set_P">
          <span></span>
        </div>
      </div>
      <section class="sl-ub sl-ubf1">
        <div>
          <router-link to="/sk/ewm" class="sk"></router-link>
          收款
        </div>
        <div>
          <router-link to="/zd" class="zd"></router-link>
          账单
        </div>
        <div>
          <a href="javascript:;" v-on:click="cdx_e" class="fk"></a>
          付款
        </div>
      </section>
    </header>
    <section>
      <div class="all-xsze">
        <div class="sl-ub sl-upc sl-uac">
          <p class="xsze-ico"></p>
          <p class="xsze">销售总额</p>
          <p class="xsze-data">{{xsze}}</p>
          <p>万元</p>
        </div>
      </div>
      <div class="all-xsze sj-hk sl-ub">
        <div class="lmsj sl-ub sl-upc sl-uac">
          <p class="lmsj-ico"></p>
          <p class="xsze">联盟商家</p>
          <p class="xsze-data">{{hhk}}</p>
          <p>家</p>
        </div>
        <div class="lmsj sl-ub sl-upc sl-uac">
          <p class="hhk-ico"></p>
          <p class="xsze">海惠客</p>
          <p class="xsze-data">{{lmsj}}</p>
          <p>家</p>
        </div>
      </div> 
    </section>
    <section class="index-banner">
      <div class="swiper-container">
        <div class="swiper-wrapper"> 
          <a  v-bind:href="slider.url" class="swiper-slide"   v-for="slider in sliderArr"><img v-bind:src="slider.imgUrl"  /></a>
        </div>
        <div class="swiper-pagination">
        </div>
      </div>
    </section>
    <footer class="sl-ub">
      <a v-bind:href="GLOBAL.www" >
        <div class="hhw"></div>
        海惠网
      </a>
      <router-link to="/hhk">
        <div class="hhk"></div>
        海惠客
      </router-link >
      <a href="javascript:;" v-on:click="no_kf">
        <div class="lms"></div>
        联盟商
      </a>    
    </footer>
    <div class="dia_smail" v-if="hhlm_hide">
      <div class="d_box" v-on:click="hide_black"><span>该功能尚未开发</span></div>  
    </div>
    
    
    
    
  </div>
</template>

<script>
export default {
  name: 'index-index',
  data () {
    return {
      is_loading:true,
      gg_timer:"",
      ggListArr:[],
      hhlm_hide: false,
      xsze:0,
      lmsj:0,
      hhk:0,
      sliderArr:[],
      gg_hide:false,
      ts_timer:"",
      banner_timer:""
    }
  },
  created:function(){
    var _this = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    timestamp = timestamp.toString();
    var obj = {'timestamp':timestamp,
    'app_key':this.GLOBAL.app_key,
    'method':'indexData',
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v
    };
    var arr = ['timestamp','app_key','method','app','v'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionStr = this.GLOBAL.getOption(option);
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/hhk.html',
      data: optionStr,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
      if(response.data.recCode==200){
        var rs = response.data.result;
        _this.ggListArr = rs.alert_message;
        if(rs.alert_message.length<1){
          _this.gg_hide = true;
        }
        _this.xsze = rs.stateData.completeFee;
        _this.lmsj = rs.stateData.memberCount;
        _this.hhk = rs.stateData.shopCount;
        _this.sliderArr = rs.bannerData;
        _this.$nextTick(function () {
        _this.banner_timer = setInterval(function(){
            if($(".index-banner a").length>0){
              _this.bannerInit();
              clearInterval(_this.banner_timer);
            }
          },100);
          if(rs.alert_message.length>0){
            _this.ggAnimate();
          }
        });
        _this.is_loading = false;
        //console.log(response.data);
         
        
      }else{
        console.log(response.data.recMeg);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods:{
    cdx_e:function(){
      window.location.href = window.location.href+"fk"
    },
    set_P:function(){
      this.$router.push("/hhk/set");
    },
    no_kf:function(){
      if(!this.hhlm_hide){
        this.hhlm_hide = true;
        var _this = this;
        this.ts_timer = setTimeout(function(){
          _this.hide_black();
        },1500);
      }
      return false;
    },
    hide_black:function(){
      if(this.hhlm_hide){
        var _this = this;
        clearTimeout(_this.ts_timer);
        this.hhlm_hide = false;
      }
    },
    bannerInit:function(){
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,//可选选项，自动滑动
        speed: 500,
        loop: true,
        pagination: '.swiper-pagination',
        autoplayDisableOnInteraction: false,
        paginationClickable: true,
        paginationElement : 'p',
      });
    },
    ggAnimate:function(){
      var len = $(".gg-content li").length;
      var w = 0;
      $(".gg-content li").each(function(i,dom){
        w += $(dom).outerWidth(true);
      });
      var _this = this;
      $(".gg-content ul").width(w);
      $(".gg-content ul").animate({"left":"-"+w+"px"},len*3000);
      _this.gg_timer = setInterval(function(){
        $(".gg-content ul").css({"left":"0px"});
        $(".gg-content ul").animate({"left":"-"+w+"px"},len*3000,"linear");
      },len*3000+1000);
    }
  },
 
  beforeRouteLeave (to, from, next) {
    clearInterval(this.gg_timer);
    next();
  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .no-data{
    margin-top:240/@pxtoem;
  }
  .no-data-ico{
    width:198/@pxtoem;
    height:198/@pxtoem;
    background:url(../../static/images/icon_shuju.png) no-repeat center;
    background-size:contain;
    margin:0 auto;
  }
  .no-data-txt{
    margin-top:40/@pxtoem;
    font-size:30/@pxtoem;
    color:#333;
    text-align:center;
  }
  .dia_smail{
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
    display:block;
    background: rgba(255, 255, 255, 0);
  }
  .dia_smail .d_box{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    min-width:250/@pxtoem;
    max-width:400/@pxtoem;
    height:150/@pxtoem;
    color:#fff;
    text-align:center;
    margin:auto;
  }
  .dia_smail .d_box span{
    display:inline-block;
    background: rgba(0, 0, 0, 0.8);
    border-radius:10/@pxtoem;
    padding:20/@pxtoem 35/@pxtoem;
    line-height:40/@pxtoem;
  }
  .dia_smail .d_box p{
    display:inline-block;
    background: rgb(255, 255, 255);
    border-radius:10/@pxtoem;
    padding:20/@pxtoem 35/@pxtoem;
    line-height:40/@pxtoem;
    color:#000;
  }
  .lljl-no-record>div{
    width:195/@pxtoem;
    height:200/@pxtoem;
    background:url(../../static/images/icon_wujilu.png) no-repeat center;
    background-size:195/@pxtoem 200/@pxtoem;
    margin:406/@pxtoem auto 0;
  }
  .lljl-no-record>p{
    font-size:30/@pxtoem;
    margin:40/@pxtoem auto 24/@pxtoem;
    text-align:center;
  }
  .lljl-no-record>a{
    display:block;
    margin:0 auto;
    width:190/@pxtoem;
    height:60/@pxtoem;
    line-height:60/@pxtoem;
    text-align:center;
    font-size:28/@pxtoem;
    background:#d7272a;
    color:#fff;
    border-radius:10/@pxtoem;
  }
  .return{
    width:86/@pxtoem;
    height:86/@pxtoem;
    position:absolute;
    top:0;
    left:0;
    z-index:10;
  }
  .return-ico{
    width:22/@pxtoem;
    height:38/@pxtoem;
    background:url(../../static/images/return.png) no-repeat center;
    background-size:22/@pxtoem 38/@pxtoem;
  }
  .zd-header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    color:#fff;
    background:#003894;
  }
  .is_loading{
    position:fixed;
    z-index:99999999999999999;
    top:0;
    width:100%;
    height:100%;
    text-align:center;
    background:rgba(0,0,0,.5);
  }
  .is_loading>div{
    position:absolute;
    display:inline-block;
    font-size:30/@pxtoem;
    padding:0 50/@pxtoem;
    background:#fff;
    width:250/@pxtoem;
    height:60/@pxtoem;
    line-height:60/@pxtoem;
    border-radius:10/@pxtoem;
    box-shadow: 5/@pxtoem 5/@pxtoem 15/@pxtoem #000;
  }
  .is_loading>div>img{
    width:30/@pxtoem;
    height:30/@pxtoem;
    vertical-align:-5/@pxtoem;
    margin-right:10/@pxtoem;
  }
  .del-lljl-section{
    position:fixed;
    z-index:1000;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .lljl-del-box{
    width:620/@pxtoem;
    height:280/@pxtoem;
    position:absolute;
    z-index:1000;
    background:#fff;
    border-radius:10/@pxtoem;
  }
  .lljl-del-box>div:first-child{
    height:192/@pxtoem;
    line-height:192/@pxtoem;
    color:#333;
    font-size:32/@pxtoem;
    text-align:center;
  }
  .lljl-down-box>div{
    box-sizing:border-box;
    width:50%;
    font-size:28/@pxtoem;
    text-align:center;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
  }
  .lljl-close{
    background:#fff;
    color:#333;
    border-top:1/@pxtoem solid #eee;
    border-bottom-left-radius:10/@pxtoem;
  }
  .lljl-yes{
    background:#f23030;
    color:#fff;
    border-top:1/@pxtoem solid #f23030;
    border-bottom-right-radius:10/@pxtoem;
  }
</style>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    width:100%;
    height:360/@pxtoem;
    position:relative;
    background: -webkit-linear-gradient(120deg, #00baff, #003894);
    background: -o-linear-gradient(120deg,#00baff, #003894);
    background: -moz-linear-gradient(120deg,#00baff, #003894);
    background: linear-gradient(120deg,#00baff, #003894);
  }
  header>section{
    position:absolute;
    width:100%;
    bottom:30/@pxtoem;
  }
  header>section>div{
    width:33.33%;
    text-align:center;
    font-size:30/@pxtoem;
    color:#fff;
  }
  header>section>div>a{
    display:block;
    width:88/@pxtoem;
    height:89/@pxtoem;
    margin:auto auto 30/@pxtoem;
  }
  .sk{
    background:url(../../static/images/icon_sk.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  } 
  .zd{
    background:url(../../static/images/icon_zd.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  }
  .fk{
    background:url(../../static/images/icon_fk.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  }
  .index-gg-box{
    position:absolute;
    width:690/@pxtoem;
    top:25/@pxtoem;
    left:0;
    right:0;
    height:40/@pxtoem;
    line-height:40/@pxtoem;
    margin:auto;
  }
  .gg-box.no-gg{
    visibility:hidden;
  }
  .gg-box{
    box-sizing:border-box;
    width:626/@pxtoem;
    height:100%;
    background:rgba(0,0,0,.18);
    border-radius:20/@pxtoem;
    padding:0 20/@pxtoem;
  }
  .gg-ico{
    width:36/@pxtoem;
    height:33/@pxtoem;
    background:url(../../static/images/top_icon_gg.png) no-repeat center;
    background-size:36/@pxtoem 33/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .gg-content{
    width:530/@pxtoem;
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
  .gg-per-ico{
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../static/images/icon_yidenglu.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
    margin-left:30/@pxtoem;
  }
  section{
    margin:1/@pxtoem 0;
  }
  .all-xsze{
    background:#d8272a;
    height:90/@pxtoem;
    text-align:center;
    color:#fff;
    border-top:1px solid #fff;
  }
  .all-xsze.sj-hk{
    height:88/@pxtoem;
    margin-bottom:0;
    border-bottom:1px solid #fff;
  }
  .lmsj{
    box-sizing: border-box;
    width:50%;
    border-right:1px solid #fff;
  }
  .lmsj:last-of-type{
    border-right:none;
  }
  .all-xsze p{
    font-size:28/@pxtoem;
    line-height:36/@pxtoem;
  }
  .all-xsze>div{
    height:100%;
  }
  .xsze-ico{
    width:32/@pxtoem;
    height:28/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_xsze.png) no-repeat center;
    background-size:32/@pxtoem 28/@pxtoem;    
  }
  .lmsj-ico{
    width:30/@pxtoem;
    height:26/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_lmsj.png) no-repeat center;
    background-size:30/@pxtoem 26/@pxtoem;     
  }
  .hhk-ico{
    width:35/@pxtoem;
    height:26/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_hhk.png) no-repeat center;
    background-size:35/@pxtoem 26/@pxtoem;  
  }
  .all-xsze .xsze-data{
    font-size:34/@pxtoem;
    margin:0 10/@pxtoem 0 20/@pxtoem;
  }
  .index-banner .swiper-container{
    width:100%;
    height:516/@pxtoem;
    position:relative;
  }
  .index-banner .swiper-container .swiper-slide{
    width:100%;
    height:516/@pxtoem;
  }
  .index-banner .swiper-container .swiper-slide img{
    width:100%;
    height:100%;
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
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{
    margin-right:60/@pxtoem;
  }
  .index-banner .swiper-pagination .swiper-pagination-bullet-active{
    background:#fff;
  }
  footer{
    width:100%;
    height:235/@pxtoem;
  }
  footer>a{
    display:block;
    width:33.33%;
    height:100%;
    text-align:center;
    font-size:28/@pxtoem;
    color:#000;
    border-right:1px solid #eee;
    box-sizing: border-box;
    background:#fff;
  }
  footer>a:last-of-type{
    border-right:none;
  }
  header>section>a{
    display:block;
    width:33.33%;
    text-align:center;
    font-size:30/@pxtoem;
    color:#fff;
  }
  footer>a>div{
    width:116/@pxtoem;
    height:116/@pxtoem;
    margin:40/@pxtoem auto 16/@pxtoem;
  }
  .hhw{
    background:url(../../static/images/icon_haihuiwang.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
  .hhk{
    background:url(../../static/images/icon_yimaishangpin.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
  .lms{
    background:url(../../static/images/icon_remenshousuo.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
</style>


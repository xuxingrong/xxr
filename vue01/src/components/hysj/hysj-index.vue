<template>
  <section>
    <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
      <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
    </div>
    <router-view></router-view>
    <header class="wdsc-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBefore" >
        <div class="return-black-ico"></div>
      </div>
      会员升级
      <!--<div class="share-black-ico" v-on:click="share_tz" ></div>-->
      <router-link class="hysj-xq-ico" to="/hyqy" ></router-link>
    </header>
    <section class="hy-header">
      <div class="hy-tx">
        <img v-if="ajax_user_info.head_photo!=''" v-bind:src="ajax_user_info.head_photo" alt="" />
         
        <img v-else src="static/images/person.png" alt="" />
        <div v-bind:class="{'hydj-ico':true,'vip':vip,'hong':hong,'huang':huang,'lan':lan,'bo':bo}"></div>
      </div>
      <div class="hy-name-dj sl-ub sl-upc">
        <div>{{ajax_user_info.user_name}}</div>
        <div>{{role_name}}</div>
      </div>
      <div class="hy-yh sl-ub">
        <div v-bind:class="{'hy-yh-ico':true,'hong':hong||huang||lan||bo}">
          <div v-bind:class="{'line':true,'right':true,'h-line':hong||huang||lan||bo}"></div>
          <div v-bind:class="{'huang-dian':true,'hide':!(!huang&&hong)}"></div>
        </div>
        <div v-bind:class="{'hy-yh-ico':true,'huang':huang||lan||bo}">
          <div v-bind:class="{'line':true,'left':true,'h-line':huang||lan||bo}"></div>
          <div v-bind:class="{'line':true,'right':true,'h-line':huang||lan||bo}"></div>
          <div v-bind:class="{'huang-dian':true,'hide':!(!lan&&huang)}"></div>
        </div>
        <div v-bind:class="{'hy-yh-ico':true,'lan':lan||bo}">
          <div v-bind:class="{'line':true,'left':true,'h-line':lan||bo}"></div>
          <div v-bind:class="{'line':true,'right':true,'h-line':lan||bo}"></div>
          <div v-bind:class="{'huang-dian':true,'hide':!(!bo&&lan)}"></div>
        </div>
        <div v-bind:class="{'hy-yh-ico':true,'bo':bo}">
          <div v-bind:class="{'line':true,'left':true,'h-line':bo}"></div>
        </div>
      </div>
      <div class="hy-yh-tt sl-ub">
        <div v-bind:class="{'wt':hong||huang||lan||bo}">红钻会员</div>
        <div v-bind:class="{'wt':huang||lan||bo}">黄钻会员</div>
        <div v-bind:class="{'wt':lan||bo}">蓝钻会员</div>
        <div v-bind:class="{'wt':bo}">铂钻会员</div>
      </div>
      <div class="wdjf sl-ub sl-upc">
        <div>我的积分</div>
        <div>{{ajax_user_info.my_integral}}</div>
      </div>
    </section>
    <section class="wdqy">
      <div class="sl-ub sl-uac">
        <div class="wdqy-ico"></div>
        <div>我的权益</div>
      </div>
      <div class="wdqy-list">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico sfmp-ico"></div>
              <p>身份铭牌</p>
            </a>
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico jfdx-ico"></div>
              <p>积分抵现</p>
            </a>
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico xfzz-ico"></div>
              <p>消费增值</p>
            </a>
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico tjzz-ico"></div>
              <p>推荐增值</p>
            </a>
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico xszz-ico"></div>
              <p>销售增值</p>
            </a>
            <a href="javascript:void(0);" class="swiper-slide">
              <div class="wdqy-list-ico gmgq-ico"></div>
              <p>购买股权</p>
            </a>
            <!--
            <router-link to="/hyqy" class="swiper-slide">
              <div class="wdqy-list-ico gmgq-ico"></div>
              <p>购买股权</p>
            </router-link>-->
          </div>
        </div>
      </div>
    </section>
    <section class="hysj">
      <div class="sl-ub sl-uac">
        <div class="wdqy-ico"></div>
        <div>会员升级</div>
      </div>
      <div>
        <div class="hysj-box hong sl-ub sl-uac">
          <div class="ico"></div>
          <div>
            <!--<div>红钻会员</div>
            <p>升级可享有98%消费增值！</p>
            -->
            <div>红钻会员</div>
          </div>
          <div class="sl-ub sl-upe">
            <template v-if="hong||huang||lan||bo">
              <div class="ysj"></div>
            </template>
            <template v-else>
              <div>&yen;</div>
              <div>9.00</div>
              <div v-bind:class="{'selectbtn':true,'hidebtn':hidebtnArr[0]}"></div>
            </template>
          </div>
          <p class="screen" data-role=4 v-on:click.self="selectsj"></p>
        </div>
        <div class="hysj-box huang sl-ub sl-uac" v-on:click="selectsj">
          <div class="ico"></div>
          <div>
            <div>黄钻会员</div>
          </div>
          <div class="sl-ub sl-upe">
            <template v-if="huang||lan||bo">
              <div class="ysj"></div>
            </template>
            <template v-else>
              <div>&yen;</div>
              <div>199.00</div>
              <div v-bind:class="{'selectbtn':true,'hidebtn':hidebtnArr[1]}"></div>
            </template>
          </div>
          <p class="screen" data-role=5 v-on:click.self="selectsj"></p>
        </div>
        <div class="hysj-box lan sl-ub sl-uac">
          <div class="ico"></div>
          <div>
            <div>蓝钻会员</div>
          </div>
          <div class="sl-ub sl-upe">
            <template v-if="lan||bo">
              <div class="ysj"></div>
            </template>
            <template v-else>
              <div>&yen;</div>
              <div>299.00</div>
              <!--<div v-bind:class="{'selectbtn':true,'hidebtn':!huang}"></div>-->
              <div v-bind:class="{'selectbtn':true,'hidebtn':hidebtnArr[2]}"></div>
            </template>
          </div>
          <p class="screen" data-role=6 v-on:click.self="selectsj"></p>
        </div>
        <div class="hysj-box bo sl-ub sl-uac">
          <div class="ico"></div>
          <div>
            <div>铂钻会员</div>
          </div>
          <div class="sl-ub sl-upe">
            <template v-if="bo">
              <div class="ysj"></div>
            </template>
            <template v-else>
              <div>&yen;</div>
              <div>399.00</div>
              <!--<div v-bind:class="{'selectbtn':true,'hidebtn':!lan}"></div>-->
              <div v-bind:class="{'selectbtn':true,'hidebtn':hidebtnArr[3]}"></div>
            </template>
          </div>
          <p class="screen" data-role=7 v-on:click.self="selectsj"></p>
        </div>
      </div>
    </section>
    <!--
    <footer>
      <a v-if="bo" href="javascript:;">您已经是最高级别的会员</a>
      <div v-else v-on:click="toTC">开通会员立即优惠</div>
    </footer>
    -->
    <div v-bind:class="{'black-box':true, 'fd-center':true,'hide':hhlm_hide}" v-on:click="hide_black">{{hhlm}}</div>
    
    <hyqy-box v-bind:class="{'hide':hideStatus}" v-bind:selected_dj="selected_dj" v-on:childE = parentE></hyqy-box>
  </section>
</template>

<style scoped lang="less">
  @pxtoem:28.125rem;
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
  header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#fff;
    border-bottom:1/@pxtoem solid #eee;
  }
  .share-black-ico{
    display:block;
    width:40/@pxtoem;
    height:38/@pxtoem;
    position:absolute;
    top:0;
    bottom:0;
    right:102/@pxtoem;
    background:url(../../../static/images/nar_icon_black_share.png) no-repeat center;
    background-size:40/@pxtoem 38/@pxtoem;
    margin:auto;
  }
  .hysj-xq-ico{
    display:block;
    width:38/@pxtoem;
    height:38/@pxtoem;
    position:absolute;
    top:0;
    bottom:0;
    right:24/@pxtoem;
    background:url(../../../static/images/nar_icon_yw.png) no-repeat center;
    background-size:38/@pxtoem 38/@pxtoem;
    margin:auto;
  }
  .hy-header{
    position:relative;
    height:426/@pxtoem;
    background:#2c394c;
    margin-top:87/@pxtoem;
    padding-top:30/@pxtoem;
    z-index:-4;
  }
  .hy-tx{
    width:160/@pxtoem;
    height:160/@pxtoem;
    position:relative;
    margin:0 auto;
  }
  .hy-tx>img{
    box-sizing:border-box;
    width:100%;
    height:100%;
    border-radius:100%;
    border:4/@pxtoem solid #fff;
  }
  .hydj-ico{
    width:50/@pxtoem;
    height:42/@pxtoem;
    position:absolute;
    top:112/@pxtoem;
    left:112/@pxtoem;
  }
  .hy-tx .vip{
    background:url(../../../static/images/top_icon_vip.png) no-repeat center;
    background-size:50/@pxtoem 42/@pxtoem;
  }
  .hy-tx .huang{
    background:url(../../../static/images/top_icon_huang.png) no-repeat center;
    background-size:50/@pxtoem 42/@pxtoem;
  }
  .hy-tx .lan{
    background:url(../../../static/images/top_icon_lan.png) no-repeat center;
    background-size:50/@pxtoem 42/@pxtoem;
  }
  .hy-tx .hong{
    background:url(../../../static/images/top_icon_hong.png) no-repeat center;
    background-size:50/@pxtoem 42/@pxtoem;
  }
  .hy-tx .bo{
    background:url(../../../static/images/top_icon_bo.png) no-repeat center;
    background-size:50/@pxtoem 42/@pxtoem;
  }
  .hy-name-dj{
    font-size:30/@pxtoem;
    line-height:22/@pxtoem;
    margin:24/@pxtoem 0;
    color:#fff;
  }
  .hy-name-dj>div:first-child{
    border-right:1/@pxtoem solid #fff;
    padding-right:7/@pxtoem;
    margin-right:7/@pxtoem;
  }
  .hy-yh>div{
    width:25%;
    position:relative;
    height:80/@pxtoem;
  }
  .hy-yh .line{
    position:absolute;
    width:50%;
    height:0;
    top:33/@pxtoem;
    border:2/@pxtoem solid #ccc;
    z-index:-3;
  }
  .hy-yh .left{
    left:0;
  }
  .hy-yh .right{
    right:0;
  }
  .hy-yh .line.h-line{
    z-index:-2;
    top:32/@pxtoem;
    border:4/@pxtoem solid #fbc245;
  }
  .hy-yh .huang-dian{
    position:absolute;
    width:20/@pxtoem;
    height:20/@pxtoem;
    background:#fbc245;
    border:10/@pxtoem solid rgba(0,0,0,0.3);
    border-radius:100%;
    right:-20/@pxtoem;
    top:14/@pxtoem;
    z-index:-1;
  }
  .hy-yh-ico{
    width:70/@pxtoem;
    height:80/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-image:url(../../../static/images/icon_hui.png);
    background-size:70/@pxtoem 80/@pxtoem;
  }
  .hy-yh-ico.hong{
    background-image:url(../../../static/images/icon_hong.png);
  }
  .hy-yh-ico.huang{
    background-image:url(../../../static/images/icon_huang.png);
  }
  .hy-yh-ico.lan{
    background-image:url(../../../static/images/icon_lan.png);
  }
  .hy-yh-ico.bo{
    background-image:url(../../../static/images/icon_bo.png);
  }
  .hy-yh-tt{
    margin:10/@pxtoem 0 26/@pxtoem;
  }
  .hy-yh-tt>div{
    width:25%;
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#ccc;
    text-align:center;
  }
  .hy-yh-tt .wt{
    color:#fff;
  }
  .wdjf{
    width:220/@pxtoem;
    position:absolute;
    z-index:1;
    bottom:-30/@pxtoem;
    right:0;
    left:0;
    border:4/@pxtoem solid #fff;
    background:#fbc245;
    border-radius:30/@pxtoem;
    color:#fff;
    font-size:26/@pxtoem;
    line-height:28/@pxtoem;
    padding:12/@pxtoem 16/@pxtoem;
    margin:auto;
  }
  .wdjf>div:last-child{
    margin-left:10/@pxtoem;
    font-weight:bold;
  }
  .wdqy{
    color:#333;
    font-size:28/@pxtoem;
  }
  .wdqy>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  .wdqy-ico{
    width:30/@pxtoem;
    height:26/@pxtoem;
    background:url(../../../static/images/icon_hy.png) no-repeat center;
    background-size:30/@pxtoem 26/@pxtoem;
    margin:0 10/@pxtoem 0 30/@pxtoem;
  }
  .wdqy-list{
    height:198/@pxtoem;
    border-bottom:20/@pxtoem solid #eee;
  }
  .swiper-container{
    box-sizing:border-box;
 
    height:100%;
  }
  .swiper-slide{
    width:164/@pxtoem;
    float:left;
    text-align:center;
  }
  .swiper-slide:nth-of-type(1){
    padding-left:8/@pxtoem;
  }
  .swiper-slide:last-of-type{
    padding-right:8/@pxtoem;
  }
  .swiper-slide p{
    color:#333;
    font-size:26/@pxtoem;
    line-height:28/@pxtoem;
    overflow:hidden;
  }
  .wdqy-list-ico{
    width:100/@pxtoem;
    height:100/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:100/@pxtoem 100/@pxtoem;
    margin:32/@pxtoem auto 12/@pxtoem;
  }
  .sfmp-ico{
    background-image:url(../../../static/images/icon_sf.png);
  }
  .jfdx-ico{
    background-image:url(../../../static/images/icon_jf.png);
  }
  .xfzz-ico{
    background-image:url(../../../static/images/icon_xf.png);
  }
  .tjzz-ico{
    background-image:url(../../../static/images/icon_tj.png);
  }
  .xszz-ico{
    background-image:url(../../../static/images/icon_xs.png);
  }
  .gmgq-ico{
    background-image:url(../../../static/images/icon_gq.png);
  }
  .hysj{
    color:#333;
    font-size:28/@pxtoem;
  }
  .hysj>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  .hysj-box{
    height:118/@pxtoem;
    padding:0 30/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
    position:relative;
  }
  .hysj-box .ico{
    width:124/@pxtoem;
    height:88/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:124/@pxtoem 88/@pxtoem;
  }
  .hysj-box.hong .ico{
    background-image:url(../../../static/images/icon_hong_d.png);
  }
  .hysj-box.huang .ico{
    background-image:url(../../../static/images/icon_huang_d.png);
  }
  .hysj-box.lan .ico{
    background-image:url(../../../static/images/icon_lan_d.png);
  }
  .hysj-box.bo .ico{
    background-image:url(../../../static/images/icon_bo_d.png);
  }
  .hysj-box>div:nth-child(2){
    width:320/@pxtoem;
  }
  .hysj-box>div:nth-child(2)>div{
    font-size:30/@pxtoem;
    line-height:32/@pxtoem;
  }
  .hysj-box>div:nth-child(2)>p{
    font-size:20/@pxtoem;
    line-height:22/@pxtoem;
    color:#999;
  }
  .hysj-box>div:nth-child(3){
    width:246/@pxtoem;
    line-height:40/@pxtoem;
  }
  .selectbtn{
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../../static/images/icon_gouxuan_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .hysj-box>div:nth-child(3)>div:nth-child(1){
    font-size:30/@pxtoem;
  }
  .hysj-box>div:nth-child(3)>div:nth-child(2){
    font-size:40/@pxtoem;
    margin-right:30/@pxtoem;
  }
  .ysj{
    width:118/@pxtoem;
    height:118/@pxtoem;
    background:url(../../../static/images/icon_ysj.png) no-repeat center;
    background-size:118/@pxtoem 118/@pxtoem;
    margin-right:10/@pxtoem;
  }
  .screen{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:6;
  }
  .hidebtn{
    visibility:hidden;
  }
  footer{
    position:fixed;
    z-index:9;
    bottom:0;
    width:100%;
    height:120/@pxtoem;
    border-top:1/@pxtoem solid #eee;
    background:#fff;
  }
  footer>a,footer>div{
    display:block;
    width:690/@pxtoem;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    background:#d8272a;
    border-radius:10/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    color:#fff;
    margin:16/@pxtoem auto;
  }
</style>
<script>
import hc_hyqy from './hysj-c-hyqy';
export default {
  name: 'hysj-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      header_hide:false,
      vip:false,
      hong:false,
      huang:false,
      lan:true,
      bo:false,
      role_name:'VIP会员',
      ajax_user_info:{},
      ajax_user_role:[],
      is_loading:true,
      hhlm_hide: true,
      hhlm:"微信请用右上角分享功能",
      hideStatus:true,
      selected_dj:4,
      hidebtnArr:[true,true,true,true]
    }
  },
  beforeRouteEnter (to, from, next) {
    var identi = localStorage.getItem("identi");
    if(identi==null){
      next("/hhk/login");
    }else{
      next();
    }
  },
  created:function(){
    this.ajax_get_lists();
  },
  methods:{
    no_kf:function(txt){
      if(this.hhlm_hide){
        this.hhlm= txt;
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
    },
    share_tz:function(){
      if(this.GLOBAL.isWeiXin()){
        this.no_kf("微信请用右上角分享功能");
      }else{
        this.$router.push("/hysj/share");
      }
      return false;
    },
    returnBefore:function(){
      this.$router.push("/hhk");
    },
    parentE:function(status){
      this.hideStatus = status;
      this.hidebtnArr = [status,status,status,status];
    },
    selectsj:function(e){
      var prev = $(e.target).prev().find(".selectbtn");
      
      if(prev.length>0){
        var i = $(e.target).attr("data-role");
        if(!this.hidebtnArr[i-4]){
          this.hidebtnArr[i-4] = true;
        }else{
          this.hidebtnArr = [true,true,true,true];
          this.hidebtnArr[i-4] = false;
          this.selected_dj = i;
          this.hideStatus = false;
        }
      }
    }
    /*
    ,selectsj:function(e){
      var prev = $(e.target).prev().find(".selectbtn");
      if(prev.length>0){
        if(prev.hasClass("hidebtn")){
          $(".selectbtn").addClass("hidebtn");
          prev.removeClass("hidebtn");
        }
      }
    }
    ,toTC:function(){
      var str,c;
      $(".selectbtn").each(function(i,dom){
        if(!$(dom).hasClass("hidebtn")){
          c = $(dom).parents(".hysj-box").attr("class");
        }
      });
      if(c.search("bo")!=-1){sessionStorage.setItem("sjrole","7");}
      if(c.search("hong")!=-1){sessionStorage.setItem("sjrole","4");}
      if(c.search("huang")!=-1){sessionStorage.setItem("sjrole","5");}
      if(c.search("lan")!=-1){sessionStorage.setItem("sjrole","6");}
      this.$router.push("/hysj/tc");
    }*/,
    ajax_get_lists:function(){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identi
      };
      var arr = ['timestamp','app_key','app','v','identify'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=vipGrade',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
           
        _this.ajax_user_info = response.data.result.user_info;
        _this.ajax_user_role = response.data.result.grade_list;
        _this.is_loading=false;
        _this.get_hydj(_this.ajax_user_info.user_role);
        //console.log(response.data.result);
        _this.$nextTick(function () {
          _this.swiper_set();
        });
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    get_hydj:function(id){
      this.vip = false;
      this.hong = false;
      this.huang = false;
      this.lan = false;
      this.bo = false;
      if(id==0){this.vip = true;this.role_name = "VIP会员";}
      if(id==4){this.hong = true;this.role_name = "红钻会员";}
      if(id==5){this.huang = true;this.role_name = "黄钻会员";}
      if(id==6){this.lan = true;this.role_name = "蓝钻会员";}
      if(id==7){this.bo = true;this.role_name = "铂钻会员";}
    },
    swiper_set:function(){
      var mySwiper = new Swiper('.swiper-container', {
        slidesPerView : 4,
        loopedSlides : 'auto'
      });
    }
  },
  mounted:function(){
  },
  components : {
    'hyqy-box': hc_hyqy
  }
}
</script>

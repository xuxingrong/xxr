<template>
  <div class="hhk-index" style="background:#eee;">
    <router-view></router-view>
    
    <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
      <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
    </div>
     
    <header>
    <section>
      <router-link to="/hhk/set_person_ewm" class="per-ewm">
      </router-link>
      <div class="hhk-tt">海惠客</div>
      <!--<div class="share-ico" v-on:click="share_tz"></div>-->
    </section>

  <!--已登录-->  
    <section class="" v-if="is_login">
     <router-link to="/hhk/set">
      <img v-bind:src="avatar" alt="" />
     </router-link>
      <router-link to="/hysj" class="vip-box sl-ub sl-uac">
        <div v-if="role==0" class="vip-ico vip-hy"></div>
        <div v-if="role==4" class="vip-ico hong-hy"></div>
        <div v-if="role==5" class="vip-ico huang-hy"></div>
        <div v-if="role==6" class="vip-ico lan-hy"></div>
        <div v-if="role==7" class="vip-ico bo-hy"></div>
        <div class="vip-name">{{grade}}</div>
        <div class="vip-to"></div>
      </router-link>
    </section>
    <section class="username" v-if="is_login">
      <span>
        <div class="qiandao-box hide">
          <router-link to="/qiandao/qdts">
            <div class="qd-btn-ico"></div>
            <div class="qd-other-ico"></div>
          </router-link>
          <router-link to="/qiandao" class="hide">
            <div class="yqd-btn-ico"></div>
          </router-link>
        </div>
      {{loginName}}
      </span>
      
    </section>
    
    <!--//已登录-->  
  
    <!--未登录-->
    <section v-else class="login_not">
      <router-link to="/hhk/login">
        <img src="/static/images/hyzx_touxiang.png" alt="" /> 
        <p>请登录</p>
      </router-link>
    </section>
  <!--//未登录-->

      <div class="gg-box sl-ub sl-uac" v-if="is_login">
        <div class="gg-ico"></div>
        <div class="gg-content">
          <ul class="sl-ub" >
            <li v-for="ggItem in ggListArr">
                <span>{{ggItem.mesg}}</span><span class="gg-money">&yen;{{ggItem.fee}}</span>
            </li>
          </ul>
        </div>
      </div>

  
    <div class="per-data-box sl-ub sl-uac sl-upc">
      <div v-on:click="toAccount">
        <div class="account-ye">{{deposit}}</div>
        <div>账户余额(元)</div>
      </div>
      <router-link to="/wdyhq">
        <p class="wt"></p>
        <div>{{couponCount}}</div>
        <div>优惠券</div>
      </router-link>
      <div v-on:click="toJf">
        <div class="myintegral-ye">{{point}}</div>
        <div>我的积分</div>
      </div>
    </div>
  </header>
    <section class="wddd-box">
    <div class="sl-ub">
      <div>我的订单</div>
      <div class="link-all-dd">
      <router-link to="/wddd/all" >
      查看全部
      <div class="link"></div>
      </router-link>
      </div>
      
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/wddd/dfk">
          <div class="dd-ico dfk-ico"></div>
          <div class="dd-txt">待付款</div>
          <div v-if="tradeNumS.nupay" class="dd-num">{{tradeNum.nupay}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dfh">
          <div class="dd-ico dfh-ico"></div>
          <div class="dd-txt">待发货</div>
          <div v-if="tradeNumS.nudelivery" class="dd-num">{{tradeNum.nudelivery}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dsh">
          <div class="dd-ico dsh-ico"></div>
          <div class="dd-txt">待收货</div>
          <div v-if="tradeNumS.nuconfirm" class="dd-num">{{tradeNum.nuconfirm}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dpj">
          <div class="dd-ico dpj-ico"></div>
          <div class="dd-txt">待评价</div>
          <div v-if="tradeNumS.unrate" class="dd-num">{{tradeNum.unrate}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/all">
          <div class="dd-ico qxjl-ico"></div>
          <div class="dd-txt">退款/售后</div>
          <div v-if="tradeNumS.thh" class="dd-num">{{thh}}</div>
        </router-link>
      </div>
    </div>
  </section>
    <section class="wwhd-box">
    <div>我的互动</div>
    <div class="sl-ub">
      <div>
        <div v-on:click="share_tz">
          <div class="hd-ico wyfx-ico"></div>
          <div class="dd-txt">我要分享</div>
        </div>
      </div>
      <div>
        <router-link to="/hhk/set_person_ewm">
          <div class="hd-ico wdmp-ico"></div>
          <div class="dd-txt">我的名片</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/recommend">
          <div class="hd-ico tjjl-ico"></div>
          <div class="dd-txt">推荐记录</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/binding">
          <div class="hd-ico zhbd-ico"></div>
          <div class="dd-txt">账户绑定</div>
        </router-link>
      </div>
    </div>
  </section>
  <section class="wdgj-box">
    <div>我的工具</div>
    <div class="sl-ub">
      <div>
        <router-link to="/wdsc">
          <div class="gj-ico wdsc-ico"></div>
          <div class="gj-txt">我的收藏</div>
          <div class="gj-h2 double-col">
            <div>商品:<span>{{collects.item_cont}}</span></div>
            <div>店铺:<span>{{collects.shop_count}}</span></div>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/lljl">
          <div class="gj-ico lljl-ico"></div>
          <div class="gj-txt">浏览记录</div>
          <div class="gj-h2">{{browse_row}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/safe">
          <div class="gj-ico aqzx-ico"></div>
          <div class="gj-txt">安全中心</div>
          <div class="gj-h2">请妥善保存密码</div>
        </router-link>
      </div>
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/hhk/mycard">
          <div class="gj-ico wdyhk-ico"></div>
          <div class="gj-txt">我的银行卡</div>
          <div class="gj-h2">一键管理</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/account">
          <div class="gj-ico czjl-ico"></div>
          <div class="gj-txt">充值记录</div>
          <div class="gj-h2">明细查询</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hysj">
          <div class="gj-ico hysj-ico"></div>
          <div class="gj-txt">会员升级</div>
          <div class="gj-h2">权益保障</div>
        </router-link>
      </div>
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/addlist">
          <div class="gj-ico shdz-ico"></div>
          <div class="gj-txt">收货地址</div>
          <div class="gj-h2">{{addrs_row}}</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/help">
          <div class="gj-ico bzyfk-ico"></div>
          <div class="gj-txt">帮助与反馈</div>
          <div class="gj-h2">留言建议</div>
        </router-link>
      </div>
      <div>
        <div v-on:click="link_zxkf">
          <div class="gj-ico zxkf-ico"></div>
          <div class="gj-txt">在线客服</div>
          <div class="gj-h2">沟通交流</div>
        </div>
      </div>
    </div>
  </section>
  <footer class="hhk-footer sl-ub">
    <!--
    <router-link to="/">
      <div class="hhk-footer-ico hhk-footer-sy"></div>
      <div class="hhk-footer-txt">首页</div>
    </router-link>
    -->
    <a v-bind:href="GLOBAL.www">
      <div class="hhk-footer-ico hhk-footer-hhsc"></div>
      <div class="hhk-footer-txt">海惠商城</div>
    </a>
    <router-link to="/hhk" class="hhk-footer-active">
      <div class="hhk-footer-ico hhk-footer-hhk"></div>
      <div class="hhk-footer-txt">海惠客</div>
    </router-link>
    <a href="javascript:;" v-on:click="no_kf('该功能尚未开发')">
      <div class="hhk-footer-ico hhk-footer-sjlm"></div>
      <div class="hhk-footer-txt">商家联盟</div>
    </a>
  </footer>
  <div class="dia_smail" v-if="hhlm_hide">
    <div class="d_box" v-on:click="hide_black"><span>{{hhlm}}</span></div>  
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'hhk-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ggListArr:[],
      gg_timer:"",
      hhlm_hide: false,
      is_loading:true,
      avatar:"static/images/person.png",
      loginName:"",
      is_login:false,
      browse_row:"暂无商品浏览记录",
      addrs_row:"暂无设置地址",
      couponCount:0,
      deposit:0,
      grade:"VIP会员",
      point:0,
      collects:{item_cont:0,shop_count:0},
      tradeNum:{nuconfirm:0,nudelivery:0,nupay:0,unrate:0},
      tradeNumS:{nuconfirm:false,nudelivery:false,nupay:false,unrate:false,all:false,thh:false},
      dd_all:0,
      dd_thh:0,
      role:0,
      hhlm:'该功能尚未开发',
      ts_timer:""
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
    var identi = localStorage.getItem("identi");
    var _this = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    timestamp = timestamp.toString();
    var obj = {'timestamp':timestamp,
    'app_key':this.GLOBAL.app_key,
    'method':'userData',
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'identify':identi
    };
    var arr = ['timestamp','app_key','method','app','v','identify'];
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
        
        if(rs.avatar!=""){
          _this.avatar = rs.avatar;
        }
        _this.loginName = rs.loginName;
        _this.is_login = true;
        //console.log(response);
        _this.browse_row = rs.browse_row;
        _this.addrs_row = rs.addrs_row;
        _this.couponCount = rs.couponCount;
        if(rs.deposit==false){
          _this.deposit = "0";
        }else{
          _this.deposit = rs.deposit;
        }
        _this.grade = rs.grade;
        _this.point = rs.point;
        _this.collects = rs.collects;
        _this.tradeNum = rs.tradeNum;
        _this.role = rs.role;
        _this.is_loading = false;
        for(var i in _this.tradeNum){
          for(var j in _this.tradeNumS){
            if(i==j){
              if(_this.tradeNum[i]!=0){
                _this.tradeNumS[j] = true;
              }
            }
          }
        }
        _this.$nextTick(function () {
          if($(".gg-content").length>0){
            _this.ggAnimate();
          }
        });
        
      }else{
        _this.is_login = false;
        _this.is_loading = false;
        _this.$router.push("/hhk/login");
        
      }
    })
    .catch(function (error) {
      _this.is_login = false;
      _this.is_loading = false;
      console.log(error.toString());
      _this.$router.push("/hhk/login");
      //console.log(error.toString().search("timeout"));
    });
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.gg_timer);
    next();
  },
  methods:{
    link_zxkf:function(){
      if(this.GLOBAL.isWeiXin()){
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2&source=1";
      }else{
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2";
      }
    },
    no_kf:function(txt){
      if(!this.hhlm_hide){
        this.hhlm= txt;
        this.hhlm_hide = true;
        var _this = this;
        this.ts_timer = setTimeout(function(){
          _this.hide_black();
        },2000);
      }
      return false;
    },
    share_tz:function(){
      if(this.GLOBAL.isWeiXin()){
        this.no_kf("微信请用右上角分享功能");
      }else{
        this.$router.push("/hhk/share");
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
    ggAnimate:function(){
      var len = $(".gg-content li").length;
      var w = 0;
      $(".gg-content li").each(function(i,dom){
        w += $(dom).outerWidth(true);
      });
      var _this = this;
      $(".gg-content ul").width(w);
      $(".gg-content ul").animate({"left":"-"+w+"px"},len*3000,"linear");
      _this.gg_timer = setInterval(function(){
        $(".gg-content ul").css({"left":"0px"});
        $(".gg-content ul").animate({"left":"-"+w+"px"},len*3000,"linear");
      },len*3000+1000);
    },
    toAccount:function(){
      localStorage.setItem("account_ye",$(".account-ye").text());
      this.$router.push("/hhk/account");
    },
    toJf:function(){
      localStorage.setItem("myintegral",$(".myintegral-ye").text());
      this.$router.push("/hhk/myintegral");
    }
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
    height:90/@pxtoem; 
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
    line-height:90/@pxtoem;
    position:absolute;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
    text-align:center;
    z-index:4;
  }
  .per-ewm,.share-ico{
    display:block;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
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
    background:url(../../static/images/top_icon_vip.png) no-repeat center;
    background-size:contain;
  }
  
  .hong-hy{
    background:url(../../static/images/top_icon_hong.png) no-repeat center;
    background-size:contain;
  }
  .huang-hy{
    background:url(../../static/images/top_icon_huang.png) no-repeat center;
    background-size:contain;
  }
  .lan-hy{
    background:url(../../static/images/top_icon_lan.png) no-repeat center;
    background-size:contain;
  }
  .bo-hy{
    background:url(../../static/images/top_icon_bo.png) no-repeat center;
    background-size:contain;
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
  header section.login_not{
    margin-bottom:130/@pxtoem;
  }
  .login_not a{
    color:#fff;
    text-align:center;
    display:block;
  }
  .login_not p{
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
  section.wddd-box>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    padding:0 30/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  section.wddd-box>div:last-child a{
    position:relative;
    display:block;
  }
  section.wddd-box>div:first-child>div{
    width:50%;
  }
  .link-all-dd{
    text-align:right;
  }
  .link-all-dd a{
    display:inline-block;
    font-size:24/@pxtoem;
    color:#999;
  }
  .link{
    display:inline-block;
    width:12/@pxtoem;
    height:22/@pxtoem;
    background:url(../../static/images/htk_icon_wddd_ckgd.png) no-repeat center;
    background-size:12/@pxtoem 22/@pxtoem;
    vertical-align: -2px;
  }
  section.wddd-box>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section.wddd-box>div:last-child>div{
    width:20%;
    padding:45/@pxtoem 0;
  }
  .dd-ico{
    width:40/@pxtoem;
    height:40/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  .dfk-ico{
    background:url(../../static/images/htk_icon_dfk.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dfh-ico{
    background:url(../../static/images/htk_icon_dfh.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dsh-ico{
    background:url(../../static/images/htk_icon_dsh.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dpj-ico{
    background:url(../../static/images/htk_icon_dpj.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .qxjl-ico{
    background:url(../../static/images/htk_icon_qxjl.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dd-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
  }
  .dd-num{
    box-sizing:border-box;
    position:absolute;
    z-index:3;
    min-width:30/@pxtoem;
    height:30/@pxtoem;
    line-height:30/@pxtoem;
    text-align:center;
    border:3/@pxtoem solid #ff6f06;
    border-radius:15/@pxtoem;
    padding:0 6/@pxtoem;
    color:#ff6f06;
    font-size:18/@pxtoem;
    top:-15/@pxtoem;
    right:40/@pxtoem;
    background:#fff;
  }
  
  section.wwhd-box{
    margin:20/@pxtoem 0;
  }
  section.wwhd-box>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    padding:0 30/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  section.wwhd-box>div:last-child a{
    position:relative;
    display:block;
  }
  
   
  section.wwhd-box>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section.wwhd-box>div:last-child>div{
    width:25%;
    padding:45/@pxtoem 0;
  }
  .hd-ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  .wyfx-ico{
    background:url(../../static/images/htk_icon_wyfx.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .wdmp-ico{
    background:url(../../static/images/htk_icon_wdmp.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .tjjl-ico{
    background:url(../../static/images/htk_icon_tjzcjl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .zhbd-ico{
    background:url(../../static/images/htk_icon_zhbd.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .dd-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
  }
  
  
  section.wdgj-box{
    margin-bottom:98/@pxtoem;
  }
  section.wdgj-box>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    padding:0 30/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  section.wdgj-box>div a{
    position:relative;
    display:block;
  }
  section.wdgj-box>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section.wdgj-box>.sl-ub>div{
    box-sizing:border-box;
    width:33.33%;
    padding:30/@pxtoem 0;
  }
  section.wdgj-box>.sl-ub>div:nth-child(2){
    border-left:1/@pxtoem solid #eee;
    border-right:1/@pxtoem solid #eee;
  }
  .gj-ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  
  .gj-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
    margin-bottom:12/@pxtoem;
  }
  .gj-h2{
    padding:0 20/@pxtoem;
    text-align:center;
    color:#999;
    font-size:20/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .gj-h2.double-col{
    -webkit-box-orient: inline-axis;
  }
  .gj-h2>div{
    box-sizing:border-box;
    width:50%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .gj-h2>div:first-child{
    border-right:1/@pxtoem solid #eee;
  }
  .gj-h2 span{
    margin-left:10/@pxtoem;
    color:#d8272a;
  }
  .wdsc-ico{
    background:url(../../static/images/htk_icon_sc.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .lljl-ico{
    background:url(../../static/images/htk_icon_lljl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .aqzx-ico{
    background:url(../../static/images/htk_icon_aqzx.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .wdyhk-ico{
    background:url(../../static/images/htk_icon_yhk.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .czjl-ico{
    background:url(../../static/images/htk_icon_czjl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .hysj-ico{
    background:url(../../static/images/htk_icon_hysj.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .shdz-ico{
    background:url(../../static/images/htk_icon_shdz.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .bzyfk-ico{
    background:url(../../static/images/htk_icon_bz.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .zxkf-ico{
    background:url(../../static/images/htk_icon_kf.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
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
    width:33.33%;
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
  .per-data-box>div{
    box-sizing: border-box;
    width: 33.33%;
    color: #fff;
    text-align: center;
  }
</style>


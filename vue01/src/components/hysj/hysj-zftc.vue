<template>
  <section v-on:click.self="returnHydj">
 <!-- <div style="color:red;width:100%;">{{ccc}}</div>
  <div style="color:blue;width:100%;">{{hhh}}</div>
  <div style="color:green;width:100%;">{{www}}</div>-->
    <div class="footer-box">
      <div>
        <div v-on:click="returnHydj"></div>
        <span class="open_chan">{{msg}}</span>
      </div>
      <div class="sl-ub sl-uac" v-on:click="zf_ajax">
        <div class="ico wx"></div>
        <div>微信支付</div>
      </div>
    </div>
    <div class="dia_smail" v-if="hhlm_hide">
      <div class="d_box" v-on:click="hide_black"><p>{{hhlm}}</p></div>  
    </div>
  </section>
</template>

<script>
export default {
  name: 'hysj-zftc',
  props:['tcHide'],
  data () {
    return {
      msg: '开通会员',
      oid: 0,
      sjrole:"0",
      www:"",
      hhh:"",
      ccc:"",
      wxcode:"",
      is_zf:false,
      hhlm:"",
      hhlm_hide:false,
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
    this.getWxCode();
  },
  mounted:function(){
    if(this.$route.name=='charge_step1'){
      this.msg = '选择付款方式';
      $('.open_zf').hide();
    }
  },
  methods:{
    no_kf:function(txt){
      if(!this.hhlm_hide){
        this.hhlm= txt;
        this.hhlm_hide = true;
        var _this = this;
        this.ts_timer = setTimeout(function(){
          _this.hide_black();
        },1000);
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
    returnHydj:function(){
       if(this.$route.name=='charge_step1'){
         this.$router.push('/hhk/account-charge')
       }else if(this.$route.name=='hysjZftc'){
         this.$router.push('/hysj') 
       }
    },
    sulink:function(){
       if(this.$route.name=='charge_step1'){
         this.$router.push('/hhk/account-charge/charge-step2')
       }else if(this.$route.name=='hysjZftc'){
         this.$router.push('/hysj/zfmm') 
       } 
    },
    addCard:function(){
      this.$router.push('/hhk/mycard')
    },
    getRole:function(){
      var sjrole = sessionStorage.getItem("sjrole");
      //console.log(sjrole);
      switch(sjrole){
        case '4':this.sjrole = "4";
        break;
        case '5':this.sjrole = "5";
        break;
        case '6':this.sjrole = "6";
        break;
        case '7':this.sjrole = "7";
        break;
        default:this.sjrole = "none";
      }
    },
    getWxCode:function(){
      //this.wxcode = window.location.href.split("?")[1].split("&")[0].split("=")[1];
      
    },
    zf_ajax:function(){
      if(!this.GLOBAL.isWeiXin()){
        this.no_kf("请使用微信进行支付");
        return;
      }
      if(this.is_zf){
        return;
      }
      this.is_zf = true;
      var _this=this;
      var h5Form = new FormData();
      var identi = localStorage.getItem("identi");
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      
      if(this.$route.name=='charge_step1'){
        
        var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'identify':'FMcDhk18iEpcABQChdxhLt7szamDJpbsWGtBVa3y0IU%3D',
          'method':'doRecharge',
          'type':'recharge',
          'amount':cz_money,
          'pay_app_id':'wxpayjsapi',
          'code':'021bKFKr0aDpic1NX0Mr0ojGKr0bKFKa'
          };
        var arr = ['timestamp','app_key','app','v','identify','method','type','amount','pay_app_id','code'];
      }else{
      
        this.getRole();
        if(this.sjrole == "none"){
          this.$router.push('/hysj');
          return;
        }
        //this.ccc = this.sjrole;
        var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'identify':identi,
          'method':'doRecharge',
          'type':'updateVip',
          'role':this.sjrole,
          'pay_app_id':'wxpayjsapi',
          'code':this.wxcode
          };
        var arr = ['timestamp','app_key','app','v','identify','method','type','role','pay_app_id','code'];
      }
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      console.log(obj2);
      var option = $.extend(obj,obj2);
      for(var i in option){
        h5Form.append(i, option[i]);
      }
      console.log(h5Form);
      return;
      //console.log(optionStr);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/hhk.html',
        data: h5Form,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
       //_this.www =response;
       if(response.data.recCode==200){
        /*var obj = response.data.result;
        var sign = {
           "appId":obj.appId,     //公众号名称，由商户传入     
           "timeStamp":obj.timeStamp,         //时间戳，自1970年以来的秒数     
           "nonceStr":obj.nonceStr, //随机串     
           "package":obj.package,     
           "signType":obj.signType,         //微信签名方式：     
           "paySign":obj.paySign //微信签名 
       }
       
       _this.www =sign;
       */
        _this.weixinZF(response.data.result);
       }else{
        _this.no_kf("支付异常");
        _this.is_zf = false;
        _this.$router.go(-1);
       }
      })
      .catch(function (error) {
        console.log(error);
        _this.is_zf = false;
      });
    },
    weixinZF:function(sign){
      var _this = this;
      function onBridgeReady(){
         WeixinJSBridge.invoke(
             'getBrandWCPayRequest',sign,
             function(res){     
              //_this.hhh = res;
                 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    if(_this.$route.name!='charge_step1'){
                      sessionStorage.setItem("zf_role",_this.sjrole);
                    }
                    _this.$router.push('/hysj/zfsucc')
                 }else{
                   _this.no_kf("支付失败");
                 }
                 _this.is_zf = false;
             }
         ); 
      }
      if (typeof WeixinJSBridge == "undefined"){
         if( document.addEventListener ){
             document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
         }else if (document.attachEvent){
             document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
         }
      }else{
         onBridgeReady();
      }
    }
    
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
  .footer-box{
    width:100%;
    position:absolute;
    z-index:1001;
    bottom:0;
    background:#fff;
    color:#333;
  }
  .footer-box>div{
    border-bottom:1/@pxtoem solid #eee;
    width:690/@pxtoem;
    margin-left:30/@pxtoem;
    padding-right:30/@pxtoem;
    height:120/@pxtoem;
    line-height:120/@pxtoem;
  }
  .footer-box>div:first-child{
    width:100%;
    margin-left:0;
    position:relative;
    height:90/@pxtoem;
    line-height:90/@pxtoem;
    font-size:34/@pxtoem;
    text-align:center;
  }
  .footer-box>div:first-child>div{
    position:absolute;
    width:30/@pxtoem;
    height:30/@pxtoem;
    background:url(../../../static/images/zf_close.png) no-repeat center;
    background-size:30/@pxtoem 30/@pxtoem;
    top:0;
    bottom:0;
    left:30/@pxtoem;
    margin:auto;
  }
  
  .footer-box>div:last-child{
    border-bottom:none;
  }
  .footer-box .ico{
    width:48/@pxtoem;
    height:48/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:48/@pxtoem 48/@pxtoem;
    margin-right:30/@pxtoem;
  }
  .footer-box .zfb{
    background-image:url(../../../static/images/icon_small_zfb.png);
  }
  .footer-box .wx{
    background-image:url(../../../static/images/icon_small_wx.png);
  }
  .tjyhk{
    background-image:url(../../../static/images/icon_yhk.png);
  }
  .footer-box .sl-uac{
    font-size:28/@pxtoem;
  }
  .footer-box .ed,.footer-box .tjyhk-txt{
    width:500/@pxtoem;
  }
  .footer-box .yes,.footer-box .to-tjyhk{
    width:112/@pxtoem;
  }
  .footer-box .yes i{
    display:block;
    width:28/@pxtoem;
    height:24/@pxtoem;
    background:url(../../../static/images/select_yhk.png) no-repeat center;
    background-size:28/@pxtoem 24/@pxtoem;
  }
  .footer-box .to-tjyhk i{
    display:block;
    width:16/@pxtoem;
    height:26/@pxtoem;
    background:url(../../../static/images/htk_icon_wddd_ckgd.png) no-repeat center;
    background-size:16/@pxtoem 26/@pxtoem;
  }
  .footer-box .ed>div{
    line-height:50/@pxtoem;
  }
  .footer-box .ed>div:last-child{
    color:#999;
  }
  .footer-box>p{
    height:120/@pxtoem;
    border-top:1/@pxtoem solid #ccc;
    background:#fff;
  }
  .footer-box>p>span{
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
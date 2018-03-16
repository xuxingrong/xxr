<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <header class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnbefore
">
        <div class="return-ico"></div>
      </div>
      付款
    </header>
    <section class="fk-style-box">
      <!--<div class="zfg sl-ub sl-uac" v-on:click="select_style">
        <div class="click-obj zfbseleted"></div>
        <div class="ico"></div>
        <div>支付宝支付</div>
        <div  v-bind:class="{'selected':true,'yes':zfbseleted}"></div>
      </div>-->

      <div class="wx sl-ub sl-uac" v-on:click="select_style">
        <div class="click-obj wxseleted"></div>
        <div class="ico"></div>
        <div>微信支付</div>
        <div  v-bind:class="{'selected':true,'yes':wxseleted}"></div>
      </div>
    </section>
    <footer>
      <div class="fk-btn" v-on:click="clickWx">确定</div>
    </footer>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'index-fk',
  data () {
    return {
      zfbseleted: true,
      wxseleted: true,
      ylseleted: false,
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
 methods:{
    returnbefore:function(){
      this.$router.go(-1)
    },
    select_style:function(e){
      if(e.target.className.search("zfbseleted")!=-1){
        if(!this.zfbseleted){
          this.zfbseleted = true;
          this.wxseleted = false;
          this.ylseleted = false;
        }
      }
      if(e.target.className.search("wxseleted")!=-1){
        if(!this.wxseleted){
          this.zfbseleted = false;
          this.wxseleted = true;
          this.ylseleted = false;
        }
      }
      if(e.target.className.search("ylseleted")!=-1){
        if(!this.ylseleted){
          this.zfbseleted = false;
          this.wxseleted = false;
          this.ylseleted = true;
        }
      }
    },
    select_wx:function(){
      wx.ready(function(){
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {

                   var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        });
        wx.error(function(res){
        _this.wwe=res;
        console.log(res);
      });
    },
    clickWx:function(){
       if(this.GLOBAL.isWeiXin()){
          
           this.select_wx();
       } else{
         alert('请在微信打开');
       }
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .sk-zf{
    box-sizing:border-box;
    padding-top:85/@pxtoem;
    background:#eee;
  }
  .fk-style-box{
    background:#fff;
    font-size:30/@pxtoem;
  }
  .fk-style-box>div{
    position:relative;
    margin-left:30/@pxtoem;
    padding-right:30/@pxtoem;
    height:120/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  .click-obj{
    position:absolute;
    width:100%;
    height:100%;
    z-index:7;
    top:0;
  }
  .zfg .ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    background:url(../../static/images/icon_zfb.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
    margin-right:31/@pxtoem;
  }
  .wx .ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    background:url(../../static/images/icon_wx.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
    margin-right:31/@pxtoem;
  }
  .yl .ico{
    width:60/@pxtoem;
    height:38/@pxtoem;
    background:url(../../static/images/icon_yl.png) no-repeat center;
    background-size:60/@pxtoem 38/@pxtoem;
    margin-right:31/@pxtoem;
  }
  .fk-style-box .selected{
    display:none;
    position:absolute;
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../static/images/icon_gouxuan_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
    top:0;
    bottom:0;
    right:30/@pxtoem;
    margin:auto;
  }
  .fk-style-box .selected.yes{
    display:block;
  }
  footer{
    position:fixed;
    bottom:0;
    z-index:8;
    width:100%;
    height:120/@pxtoem;
    border-top:1/@pxtoem solid #ccc;
    background:#fff;
    
  }
  .fk-btn{
    width:690/@pxtoem;
    height:88/@pxtoem;
    text-align:center;
    background:#d8272a;
    color:#fff;
    line-height:88/@pxtoem;
    border-radius:10/@pxtoem;
    margin:16/@pxtoem auto;
  }
</style>


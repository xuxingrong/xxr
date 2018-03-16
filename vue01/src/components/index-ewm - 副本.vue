<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss">
         <div class="return-ico"></div>
      </div>
        收款
    </div>
    
    <div class="e_head sl-ub">
      <div v-bind:class="{'e_con':true,'e_zfb':e_zfb}" v-on:click = "switchEwm">
        <p>支付宝收款二维码</p>
      </div>
      <div v-bind:class="{'e_con':true,'e_wx':e_wx}" v-on:click = "switchEwm">
        <p>微信收款二维码</p>
      </div>
    </div>
<!--==支付宝-->
    <div v-bind:class="{'e_box':true,'boxZfb':e_zfb,'boxWx':e_wx}">
        <div class="e_pic">
            <img v-show="e_zfb" src="../../static/images/ewm.png"/>
            <img v-show="e_wx" src="../../static/images/ewm.png"/>
            <img v-show="e_fir" class="e_fi" src="../../static/images/icon_tianjiatupian.png"/>
        </div>
        <h4 v-show="e_zfb">请提示客户使用支付宝客户端扫码支付</h4>
        <h4 v-show="e_wx">请提示客户使用微信客户端扫码支付</h4>
        <h4 v-show="e_fir">请上传您的支付二维码</h4>
        <div class="e_icon"></div>
    </div>
</section>
</template>

<script>
export default {
  name: 'sk-zf',
  data () {
    return {
      msg: "assd",
      e_zfb: true,
      e_wx: true,
      e_fir:true
    }
  },
  methods:{
    ss:function(){
      
      this.$router.go(-1)
    },
    switchEwm:function(){
      this.e_zfb = !this.e_zfb;
      this.e_wx = !this.e_wx;
    }
  },
  computed:{
    init_ewm:function(){
      

    },
    all_height:function(){
      
      return window.innerHeight + 'px'
    }
  },
  beforeMount:function(){

    if(this.$route.params.ewm == "wx"){
      this.e_zfb = !this.e_zfb;
      this.e_wx = !this.e_wx;
    }
  }
  
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .sc-ewm{
    width:86/@pxtoem;
    height:86/@pxtoem;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
  }
  .sk-zf{
  box-sizing:border-box;
   background:#eee;
   padding-top:85/@pxtoem;
  }
  a{
   color:#333;
  }
  .e_head{
   background:#fff;
  }
  .e_head .e_con{
    width:50%;
    text-align:center;
    font-size:30/@pxtoem;
  }
  .e_head .e_con p{
    box-sizing:border-box;
    width:250/@pxtoem;
    height:88/@pxtoem;
    line-height:90/@pxtoem;
    border-bottom:6/@pxtoem solid #fff;
    margin:0 auto;
  }
  .e_head .e_con.e_zfb p{
    color:#009fe8;
    border-bottom:6/@pxtoem solid #009fe8;
  }
  .e_head .e_con.e_wx p{
    color:#56b74a;
    border-bottom:6/@pxtoem solid #56b74a;
  }
    
 .e_box{
   background:#009fe8;
   border-radius:10/@pxtoem;
   text-align:center;
   padding:80/@pxtoem;
   margin:100/@pxtoem 40/@pxtoem;
   position:relative;
 }
 .e_box.boxWx{
  background:#56b74a;
 }
 .e_box .e_pic{
   width:100%;
   background:#e3e3e3;
   height:500/@pxtoem;

 }
 .e_box .e_pic img{
   width:100%;
   margin:auto;
 }
 .e_box h4{
   font-weight:normal;
   font-size:30/@pxtoem;
   color:#fff;
   margin-top:25/@pxtoem;
 }
 .e_box .e_icon{
   width:44/@pxtoem;
   height:44/@pxtoem;
   background:url(../../static/images/icon_d.png) no-repeat ;
   background-size:100%;
   position:absolute;
   right:24/@pxtoem;
   bottom:24/@pxtoem;
 }
 .e_show{
   display:block;
 }
 .e_box .e_pic img.e_fi{
   width:250/@pxtoem;
   margin-top:125/@pxtoem;
 }
</style>


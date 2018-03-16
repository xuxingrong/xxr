<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss">
         <div class="return-ico"></div>
      </div>
        收款
    </div>
    
    <div class="e_head sl-ub">
        <div class="e_con e_zfb sl-ubf1">
             <router-link to="/ewmZ"><span>支付宝收款二维码</span></router-link>
        </div>
     
        <div class="e_con  sl-ubf1">
            <router-link to="/ewmW"><span>微信收款二维码</span></router-link>
        </div>
    </div>
<!--==支付宝-->
    <div class="e_box boxZfb" v-bind:class="{'e_show':eText}">
        <div class="e_pic">
            <img src="../../static/images/ewm.png"/>
        </div>
        <h4>请提示客户使用支付宝客户端扫码支付</h4>
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
      eText: true
    }
  },
  methods:{
    ss:function(){
      console.log(this.$route.path);
      this.$router.go(-1)
    }
   
  },
  computed:{
    ww:function(){
      return  ;
    },
     all_height:function(){
      return window.innerHeight + 'px'
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
    text-align:center;
    padding:25/@pxtoem 0 31/@pxtoem 0;
    font-size:32/@pxtoem;
  }
  .e_head .e_con span{
    padding:25/@pxtoem;
    border-bottom:6/@pxtoem solid #fff;
  }
  .e_head .e_con.e_zfb span{
    color:#009fe8;
    border-bottom:6/@pxtoem solid #009fe8;
  }
  .e_head .e_con.e_wx span{
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
   
 }
 .e_box .e_pic img{
   width:100%;
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
</style>


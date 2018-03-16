<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-ico"></div>
      </div>
        收款


        <router-link to="/sk/zfb" class="sc-ewm sl-ub sl-uac sl-upc">

          <div class="ewm-small-ico"></div>
        </router-link>
    </div>

 


     <div class="zd-bodyTop">
         <div class="con">
             <div class="ct">收款金额</div>
             <div class="cb sl-ub">
              <span>￥</span>
              <div class="sl-ubf1">
                 <input type="text" placeholder="888.08" >
              </div>
             </div>
         </div>
    </div>
    <div class="zd-bodyBtm">
       <router-link to="/sk/zfb" class="z_lhead active">
           <div class="z_link">
              <div class="icon_com icon_zfb"></div>
               <span>支付宝收款</span>
            </div>
      </router-link>
      <router-link to="/sk/wx" class="z_lhead">
           <div class="z_link">
               <div class="icon_com icon_wx"></div>
               <span>微信收款</span>
            </div>
      </router-link>
  <!--
      <router-link to="/" class="z_lhead">
            <div class="z_link">
               <div class="icon_com icon_yl"></div>
               <span>银联收款</span>
            </div>
      </router-link>
  -->
    </div>

  </section>

 
</template>

<script>
export default {
  name: 'sk-zf',
  data () {
    return {
      msg: "assd"
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
  .ewm-small-ico{
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../static/images/icon_erweiam.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .sk-zf{
   box-sizing:border-box;
   background:#eee;
   padding-top:85/@pxtoem;
  }
  .zd-bodyTop .con{
    margin:30/@pxtoem 25/@pxtoem;
    padding:25/@pxtoem 25/@pxtoem 60/@pxtoem;
    background:#fff;
  }
  .zd-bodyTop .con .ct{
     
  }
  .zd-bodyTop .con .cb{
    margin-top:2/@pxtoem;
  }
  .zd-bodyTop .con .cb span{
    display:inline-block; 
    width:40/@pxtoem;
    vertical-align: middle;
    line-height:90/@pxtoem;
    font-size:35/@pxtoem;
  }
  .zd-bodyTop .con .cb input{
    display:inline-block;
    font-size:90/@pxtoem; 
    width:100%;
    color:#333;
  }
  input::-webkit-input-placeholder{
    color:#333;
  }
  input{
    outline:none;
  }
  .zd-bodyBtm .z_lhead{
    color:#333;
    display:block;
  }
  .zd-bodyBtm {
     padding:25/@pxtoem 60/@pxtoem;
  }
  .zd-bodyBtm .z_link{
    background:#fff;
    border-radius:15/@pxtoem;
    padding:15/@pxtoem 25/@pxtoem;
    margin-bottom:20/@pxtoem;
    text-align:center;
    font-size:30/@pxtoem;
    border:1/@pxtoem solid #eee;
  }
  .zd-bodyBtm .z_link span{
    line-height:60/@pxtoem;
  }
  .zd-bodyBtm .z_lhead.active .z_link{
    background:#fff;
  }
  .zd-bodyBtm .z_link .icon_com{
    display:inline-block;
    width:60/@pxtoem;
    height:60/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:50/@pxtoem 50/@pxtoem;
    vertical-align:middle;
  }
  .zd-bodyBtm .z_link .icon_zfb{
    background-image:url(../../static/images/icon_zfb.png);
  }
  .zd-bodyBtm .z_link .icon_wx{
    background-image:url(../../static/images/icon_wx.png);
  }
  .zd-bodyBtm .z_link .icon_yl{
    background-image:url(../../static/images/icon_yl.png);
     background-size:60/@pxtoem 38/@pxtoem;
  }
</style>


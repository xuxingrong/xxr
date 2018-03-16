<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        关于海惠网
     </div>
     
     <div class="s_about">
         <img src="../../../static/images/logo.png" class="s_logo"/></br>
         <img src="../../../static/images/appewm.png" class="s_ewm" />
         <h5 class="s_ss">扫码下载海惠网客户端</h5>
     </div>
     <div class="setBox">
      <!-- <router-link to="" class="lineHu">
          <h4>分享到</h4>
           <span><i class="lIcon"></i></span>
        </router-link>-->
        <router-link to="/hhk/set_about_text" >
           <h4>关于海惠网</h4>
           <span><i class="lIcon"></i></span>
        </router-link>
        <div class="sSpc" v-on:click="anPd()">
          <h4>服务热线</h4>
           <span>4008-528-166</span>
        </div>
      </div>
    
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd"
      
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
      window.location.href ='tel://4008-528-166';
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .s_ewm{
   width:30/@pxtoem;
   height:30/@pxtoem;
   position:relative;
   top:5.5/@pxtoem;
  }
  .s_about{
    text-align:center;
    padding:55px 0;
  }
  .s_about .s_logo{
    width:200/@pxtoem;
   }
  .s_about .s_ewm{
    width:280/@pxtoem;
    height:280/@pxtoem;
    margin:10/@pxtoem 0 35/@pxtoem 0;
  }
  .s_about h5{
    font-weight:normal;
    font-size:26/@pxtoem;
    color:#666;
  }
  .lineHu{
    line-height:90/@pxtoem;
  }
</style>


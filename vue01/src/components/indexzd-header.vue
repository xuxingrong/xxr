<template>
  <header>
    <section class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-ico"></div>
      </div>
      账单 
    </section>
    <section class="zd-sy">
      <div class="zd-sy-money">0.00</div>
      <p>今日收益   (元)</p>
    </section>
  </header>
  
</template>

<script>
 
export default {
  name: 'indexzd-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    ss:function(){
      this.$router.go(-1);
      console.log($(".zd-header").height());
       
    }
  }
  ,beforeMount:function(){
      console.log($(window).height());

  }
  ,mounted:function(){
      console.log($(".zd-header").height());

  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
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
  .zd-sy{
    box-sizing:border-box;
    height:280/@pxtoem;
    background:#003894;
    padding-top:98/@pxtoem;
    text-align:center;
    color:#fff;
    margin-top:85/@pxtoem;
  }
  .zd-sy>p{
    margin-top:20/@pxtoem;
    font-size:28/@pxtoem;
    line-height:30/@pxtoem;
  }
  .zd-sy-money{
    font-size:80/@pxtoem;
    line-height:82/@pxtoem;
  }
</style>

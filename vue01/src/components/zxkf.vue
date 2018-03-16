<template>
  <section v-on:click="returnHhk">
    <div class="zxkf-box">
      <div>点击呼叫</div>
      <a href="tel:4008-528-166">4008-528-166</a>
      <div v-on:click="returnHhk">关闭</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'zxkf',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App' 
    }
  },
  methods:{
    returnHhk:function(){
      this.$router.go(-1);
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
  .zxkf-box{
    position:fixed;
    z-index:100;
    width:100%;
    bottom:0;
    height:260/@pxtoem;
    text-align:center;
  }
  .zxkf-box>div{
    position:absolute;
    width:100%;
    background:#fff;
    font-size:30/@pxtoem;
  }
  .zxkf-box>div:first-child{
    top:0;
    height:70/@pxtoem;
    line-height:70/@pxtoem;
    color:#666;
    border-radius:10/@pxtoem 10/@pxtoem 0 0;
  }
  .zxkf-box>a{
    position:absolute;
    top:72/@pxtoem;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    width:100%;
    left:0;
    background:#fff;
    font-size:40/@pxtoem;
    color:blue;
    border-radius:0 0 10/@pxtoem 10/@pxtoem;
  }
  .zxkf-box>div:last-child{
    bottom:0;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    color:#333;
    font-size:34/@pxtoem;
    border-radius:10/@pxtoem 10/@pxtoem 0 0;
  }
</style>


<template>
  <footer class="sl-ub">
    <div>
      <router-link to="/foo" class="hhw"></router-link>
      海惠网
    </div>
    <div>
      <router-link to="/hhk" class="hhk"></router-link>
      海惠客
    </div>
    <div>
      <router-link to="/foo" class="lms"></router-link>
      联盟商
    </div>
  </footer>
  
</template>

<script>
export default {
  name: 'index-footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  footer{
    width:100%;
    height:238/@pxtoem;
  }
  footer>div{
    width:33.33%;
    text-align:center;
    font-size:28/@pxtoem;
    color:#000;
    border-right:1/@pxtoem solid #eee;
    box-sizing: border-box;
    background:#fff;
  }
  footer>div:last-of-type{
    border-right:none;
  }
  header>section>div{
    width:33.33%;
    text-align:center;
    font-size:30/@pxtoem;
    color:#fff;
  }
  footer>div>a{
    display:block;
    width:116/@pxtoem;
    height:116/@pxtoem;
    margin:40/@pxtoem auto 16/@pxtoem;
  }
  .hhw{
    background:url(../../static/images/icon_haihuiwang.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
  .hhk{
    background:url(../../static/images/icon_yimaishangpin.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
  .lms{
    background:url(../../static/images/icon_remenshousuo.png) no-repeat center;
    background-size:116/@pxtoem 116/@pxtoem;
  }
</style>

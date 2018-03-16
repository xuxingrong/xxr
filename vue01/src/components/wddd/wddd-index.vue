<template>
  <section>
    <header class="wdsc-header">
      <router-link to="/hhk" class="return sl-ub sl-uac sl-upc" >
        <div class="return-ico"></div>
      </router-link>
      我的订单
    </header>
    <div class="wddd-nav sl-ub">
      <router-link to="all"><span>全部</span></router-link>
      <router-link to="dfk"><span>待付款</span></router-link>
      <router-link to="dfh"><span>待发货</span></router-link>
      <router-link to="dsh"><span>待收货</span></router-link>
      <router-link to="dpj"><span>待评价</span></router-link>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'wddd-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeRouteEnter (to, from, next) {
    var identi = localStorage.getItem("identi");
    if(identi==null){
      next("/hhk/login");
    }else{
      next();
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:36/@pxtoem;
    background:#d8272a;
    color:#fff;
  }
  .wddd-nav{
    position:fixed;
    width:100%;
    top:86/@pxtoem;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    background:#fff;
    border-bottom:1px solid #ddd;
  }
  .wddd-nav>a{
    display:block;
    width:20%;
    color:#333;
    font-size:28/@pxtoem;
    text-align:center;
  }
  .wddd-nav span{
    display:inline-block;
    box-sizing:border-box;
    height:100%;
    border-bottom:4/@pxtoem solid transparent;
  }
  .wddd-nav .router-link-active span{
    border-bottom:4/@pxtoem solid #d8272a;
    color:#d8272a;
  }
</style>
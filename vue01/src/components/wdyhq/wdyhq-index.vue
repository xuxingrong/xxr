<template>
  <section>
    <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
      <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
    </div>
    <header>
      <router-link to="/hhk" class="return sl-ub sl-uac sl-upc" >
        <div class="return-black-ico"></div>
      </router-link>
      优惠券
    </header>
    <div class="wdyhq-nav sl-ub"> 
    <div>
      <router-link to="/wdyhq/wsy">
        <p>未使用<span>{{wsyNum}}</span></p>
      </router-link>
    </div>
    <div>
      <router-link to="/wdyhq/syjl">
        <p>使用记录<span>{{ysyNum}}</span></p>
      </router-link>
    </div>
    <div>
      <router-link to="/wdyhq/ygq">
        <p>已过期<span>{{ygqNum}}</span></p>
      </router-link>
    </div>
  </div>
  <div class="wdyhq-lists" v-bind:style="{'min-height':all_height}">
    <router-view v-on:childE="parentE"></router-view>
  </div>
  </section>
</template>

<script>
export default {
  name: 'wdyhq-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      wsyNum:"",
      ysyNum:"",
      ygqNum:"",
      is_loading:true
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
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  methods:{
    parentE:function(a,is_loading){
      if(a){
        this.wsyNum = "("+a.avail+")";
        this.ysyNum = "("+a.used+")";
        this.ygqNum = "("+a.expired+")";
      }
      this.is_loading = is_loading; 
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
    font-size:34/@pxtoem;
    background:#fff;
    border-bottom:1/@pxtoem solid #eee;
  }
  .wdyhq-nav{
    position:fixed;
    top:87/@pxtoem;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    z-index:9;
    width:100%;
    border-bottom:1/@pxtoem solid #eee;
    text-align:center;
    font-size:30/@pxtoem;
    background:#fff;
  }
  .wdyhq-nav>div{
    width:33.33%;
  }
  .wdyhq-nav a{
    display:block;
    box-sizing:border-box;
    border-bottom:4/@pxtoem solid transparent;
    width:180/@pxtoem;
    height:86/@pxtoem;
    margin:auto;
    color:#333;
  }
  .wdyhq-nav .router-link-active{
    border-bottom:4/@pxtoem solid #d8272a;
    color:#d8272a;
  }
  .wdyhq-lists{
    box-sizing:border-box;
    padding-top:174/@pxtoem;
    background:#eee;
  }
</style>
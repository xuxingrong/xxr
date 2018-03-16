<template>
  <section class="sk-zf">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-ico"></div>
      </div>
      <span v-if="this.$route.path == '/fk'" > 付款</span>
      <template v-if="this.$route.path == '/sk'">
        收款
        <router-link to="/fk/ewm" class="sc-ewm sl-ub sl-uac sl-upc">
          <div class="ewm-small-ico"></div>
        </router-link>
      </template>
    </div>
    <router-view></router-view>
    <router-view name="succ-fail"></router-view>
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
</style>


<template>
  <section>
    <div>我的互动</div>
    <div class="sl-ub">
      <div>
        <router-link to="/hhk/share">
          <div class="hd-ico wyfx-ico"></div>
          <div class="dd-txt">我要分享</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/set_person_ewm">
          <div class="hd-ico wdmp-ico"></div>
          <div class="dd-txt">我的名片</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/recommend">
          <div class="hd-ico tjjl-ico"></div>
          <div class="dd-txt">推荐记录</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/binding">
          <div class="hd-ico zhbd-ico"></div>
          <div class="dd-txt">账户绑定</div>
        </router-link>
      </div>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'hhk-hd',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    margin:20/@pxtoem 0;
  }
  section>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    padding:0 30/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  section>div:last-child a{
    position:relative;
    display:block;
  }
  
   
  section>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section>div:last-child>div{
    width:25%;
    padding:45/@pxtoem 0;
  }
  .hd-ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  .wyfx-ico{
    background:url(../../static/images/htk_icon_wyfx.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .wdmp-ico{
    background:url(../../static/images/htk_icon_wdmp.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .tjjl-ico{
    background:url(../../static/images/htk_icon_tjzcjl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .zhbd-ico{
    background:url(../../static/images/htk_icon_zhbd.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .dd-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
  }
</style>

<template>
  <section>
    <div class="all-xsze">
      <div class="sl-ub sl-upc sl-uac">
        <p class="xsze-ico"></p>
        <p class="xsze">销售总额</p>
        <p class="xsze-data">9887.56</p>
        <p>万元</p>
      </div>
    </div>
    <div class="all-xsze sj-hk sl-ub">
      <div class="lmsj sl-ub sl-upc sl-uac">
        <p class="lmsj-ico"></p>
        <p class="xsze">联盟商家</p>
        <p class="xsze-data">95465</p>
        <p>家</p>
      </div>
      <div class="lmsj sl-ub sl-upc sl-uac">
        <p class="hhk-ico"></p>
        <p class="xsze">海惠客</p>
        <p class="xsze-data">89795</p>
        <p>家</p>
      </div>
    </div> 
  </section>
</template>

<script>
export default {
  name: 'index-databox',
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
  .all-xsze{
    background:#d8272a;
    height:90/@pxtoem;
    text-align:center;
    color:#fff;
    border-bottom:1/@pxtoem solid #fff;
  }
  .all-xsze.sj-hk{
    height:88/@pxtoem;
    margin-bottom:0;
  }
  .lmsj{
    box-sizing: border-box;
    width:50%;
    border-right:1/@pxtoem solid #fff;
  }
  .lmsj:last-of-type{
    border-right:none;
  }
  .all-xsze p{
    font-size:28/@pxtoem;
    line-height:36/@pxtoem;
  }
  .all-xsze>div{
    height:100%;
  }
  .xsze-ico{
    width:32/@pxtoem;
    height:28/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_xsze.png) no-repeat center;
    background-size:32/@pxtoem 28/@pxtoem;    
  }
  .lmsj-ico{
    width:30/@pxtoem;
    height:26/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_lmsj.png) no-repeat center;
    background-size:30/@pxtoem 26/@pxtoem;     
  }
  .hhk-ico{
    width:35/@pxtoem;
    height:26/@pxtoem;
    margin-right:6/@pxtoem;
    background:url(../../static/images/icon_hhk.png) no-repeat center;
    background-size:35/@pxtoem 26/@pxtoem;  
  }
  .all-xsze .xsze-data{
    font-size:34/@pxtoem;
    margin:0 10/@pxtoem 0 20/@pxtoem;
  }
</style>

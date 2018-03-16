<template>
  <section>
    <div class="sl-ub">
      <div>我的订单</div>
      <div class="link-all-dd">
      <router-link to="/wddd/all" >
      查看全部
      <div class="link"></div>
      </router-link>
      </div>
      
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/wddd/dfk">
          <div class="dd-ico dfk-ico"></div>
          <div class="dd-txt">待付款</div>
          <div class="dd-num">3</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dfh">
          <div class="dd-ico dfh-ico"></div>
          <div class="dd-txt">待发货</div>
          <div class="dd-num">3</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dsh">
          <div class="dd-ico dsh-ico"></div>
          <div class="dd-txt">待收货</div>
          <div class="dd-num">3</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/dpl">
          <div class="dd-ico dpj-ico"></div>
          <div class="dd-txt">待评价</div>
          <div class="dd-num">3</div>
        </router-link>
      </div>
      <div>
        <router-link to="/wddd/all">
          <div class="dd-ico qxjl-ico"></div>
          <div class="dd-txt">退款/售后</div>
          <div class="dd-num">3</div>
        </router-link>
      </div>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'hhk-dd',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
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
  section>div:first-child>div{
    width:50%;
  }
  .link-all-dd{
    text-align:right;
  }
  .link-all-dd a{
    display:inline-block;
    font-size:24/@pxtoem;
    color:#999;
  }
  .link{
    display:inline-block;
    width:12/@pxtoem;
    height:22/@pxtoem;
    background:url(../../static/images/htk_icon_wddd_ckgd.png) no-repeat center;
    background-size:12/@pxtoem 22/@pxtoem;
    vertical-align: -2px;
  }
  section>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section>div:last-child>div{
    width:20%;
    padding:45/@pxtoem 0;
  }
  .dd-ico{
    width:40/@pxtoem;
    height:40/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  .dfk-ico{
    background:url(../../static/images/htk_icon_dfk.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dfh-ico{
    background:url(../../static/images/htk_icon_dfh.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dsh-ico{
    background:url(../../static/images/htk_icon_dsh.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dpj-ico{
    background:url(../../static/images/htk_icon_dpj.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .qxjl-ico{
    background:url(../../static/images/htk_icon_qxjl.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .dd-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
  }
  .dd-num{
    box-sizing:border-box;
    position:absolute;
    z-index:3;
    width:30/@pxtoem;
    height:30/@pxtoem;
    line-height:30/@pxtoem;
    text-align:center;
    border:3/@pxtoem solid #ff6f06;
    border-radius:15/@pxtoem;
    color:#ff6f06;
    font-size:18/@pxtoem;
    top:-15/@pxtoem;
    right:40/@pxtoem;
    background:#fff;
  }
</style>

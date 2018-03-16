<template>
  <section>
    <div>我的工具</div>
    <div class="sl-ub">
      <div>
        <router-link to="/wdsc">
          <div class="gj-ico wdsc-ico"></div>
          <div class="gj-txt">我的收藏</div>
          <div class="gj-h2 double-col">
            <div>商品:<span>6</span></div>
            <div>店铺:<span>6</span></div>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/lljl">
          <div class="gj-ico lljl-ico"></div>
          <div class="gj-txt">浏览记录</div>
          <div class="gj-h2">黑米无染色黑香米香米米</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/safe">
          <div class="gj-ico aqzx-ico"></div>
          <div class="gj-txt">安全中心</div>
          <div class="gj-h2">请妥善保存密码</div>
        </router-link>
      </div>
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/hhk/mycard">
          <div class="gj-ico wdyhk-ico"></div>
          <div class="gj-txt">我的银行卡</div>
          <div class="gj-h2">一键管理</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/account">
          <div class="gj-ico czjl-ico"></div>
          <div class="gj-txt">充值记录</div>
          <div class="gj-h2">明细查询</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hysj">
          <div class="gj-ico hysj-ico"></div>
          <div class="gj-txt">会员升级</div>
          <div class="gj-h2">权益保障</div>
        </router-link>
      </div>
    </div>
    <div class="sl-ub">
      <div>
        <router-link to="/addlist">
          <div class="gj-ico shdz-ico"></div>
          <div class="gj-txt">收货地址</div>
          <div class="gj-h2">广东省深圳市宝安区</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/help">
          <div class="gj-ico bzyfk-ico"></div>
          <div class="gj-txt">帮助与反馈</div>
          <div class="gj-h2">留言建议</div>
        </router-link>
      </div>
      <div>
        <router-link to="/hhk/zxkf">
          <div class="gj-ico zxkf-ico"></div>
          <div class="gj-txt">在线客服</div>
          <div class="gj-h2">沟通交流</div>
        </router-link >
      </div>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'hhk-gj',
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
    margin-bottom:98/@pxtoem;
  }
  section>div:first-child{
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    padding:0 30/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  section>div a{
    position:relative;
    display:block;
  }
  
   
  section>div{
    border-bottom:1/@pxtoem solid #eee;
    background:#fff;
  }
  section>.sl-ub>div{
    box-sizing:border-box;
    width:33.33%;
    padding:30/@pxtoem 0;
  }
  section>.sl-ub>div:nth-child(2){
    border-left:1/@pxtoem solid #eee;
    border-right:1/@pxtoem solid #eee;
  }
  .gj-ico{
    width:60/@pxtoem;
    height:60/@pxtoem;
    margin:0 auto 12/@pxtoem;
  }
  
  .gj-txt{
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
    color:#333;
    text-align:center;
    margin-bottom:12/@pxtoem;
  }
  .gj-h2{
    padding:0 20/@pxtoem;
    text-align:center;
    color:#999;
    font-size:20/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .gj-h2.double-col{
    -webkit-box-orient: inline-axis;
  }
  .gj-h2>div{
    box-sizing:border-box;
    width:50%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .gj-h2>div:first-child{
    border-right:1/@pxtoem solid #eee;
  }
  .gj-h2 span{
    margin-left:10/@pxtoem;
    color:#d8272a;
  }
  .wdsc-ico{
    background:url(../../static/images/htk_icon_sc.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .lljl-ico{
    background:url(../../static/images/htk_icon_lljl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .aqzx-ico{
    background:url(../../static/images/htk_icon_aqzx.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .wdyhk-ico{
    background:url(../../static/images/htk_icon_yhk.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .czjl-ico{
    background:url(../../static/images/htk_icon_czjl.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .hysj-ico{
    background:url(../../static/images/htk_icon_hysj.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .shdz-ico{
    background:url(../../static/images/htk_icon_shdz.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .bzyfk-ico{
    background:url(../../static/images/htk_icon_bz.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  .zxkf-ico{
    background:url(../../static/images/htk_icon_kf.png) no-repeat center;
    background-size:60/@pxtoem 60/@pxtoem;
  }
  
  
</style>

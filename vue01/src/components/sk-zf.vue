<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-ico"></div>
      </div>
      账单详情
    </div>
    <div class="zd-yhxx">
      <div class="sl-ub sl-uac sl-upc">
        <img src="static/images/person.png" alt="" />
        <div class="zd-yh-name">个人用户名</div>
      </div>
      <div class="sk-zf-money">
        +58.00
      </div>
      <div class="sk-zf-style">
        收款/支付成功
      </div>
    </div>
    <div class="zd-xq">
      <div class="sl-ub">
        <div>付款方式</div>
        <div>微信面对面收款</div>
      </div>
      <div class="sl-ub">
        <div>商品说明</div>
        <div>EDO饼干条（三味可选）36g*3EDO饼干 条（三味可选）36g*3</div>
      </div>
      <div class="sl-ub">
        <div>创建时间</div>
        <div>2017-02-13 09:01:30</div>
      </div>
      <div class="sl-ub">
        <div>交易单号</div>
        <div>2967846516489748154984</div>
      </div>
      <div class="sl-ub">
        <div>商户订单号</div>
        <div>HD545124584313</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'sk-zf',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App' 
    }
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .sk-zf{
    box-sizing:border-box;
    padding-top:85/@pxtoem;
    background:#eee;
  }
  .zd-yhxx{
    padding:30/@pxtoem 0 50/@pxtoem;
    background:#fff;
  }
  .zd-yhxx .sl-ub{
    height:60/@pxtoem;
  }
  .zd-yhxx img{
    width:58/@pxtoem;
    height:auto;
  }
  .zd-yh-name{
    font-size:30/@pxtoem;
    line-height:60/@pxtoem;
    margin-left:18/@pxtoem;
  }
  .sk-zf-money{
    text-align:center;
    font-size:60/@pxtoem;
    line-height:62/@pxtoem;
    margin:50/@pxtoem 0 36/@pxtoem;
  }
  .sk-zf-style{
    text-align:center;
    font-size:30/@pxtoem;
    line-height:32/@pxtoem;
    color:#999;
  }
  .zd-xq{
    font-size:28/@pxtoem;
    color:#666;
  }
  .zd-xq>div{
    padding:0 30/@pxtoem 30/@pxtoem;
    background:#fff;
  }
  .zd-xq>div:nth-child(2){
    margin-bottom:2/@pxtoem;
  }
  .zd-xq>div:nth-child(3){
    padding-top:30/@pxtoem;
  }
  .zd-xq>div>div:first-child{
    width:175/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .zd-xq>div>div:last-child{
    width:515/@pxtoem;
    text-align:right;
  }
</style>


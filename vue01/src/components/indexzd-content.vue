<template>
  <section>
    <div class="sl-ub sl-uac sl-upc sl-ubf1 zd-nav">
      <div v-on:click="get_today_get" class="sdf zd-selected">今日</div>
      <div v-on:click="get_today_get" class="sdf">上周</div>
      <div v-on:click="get_today_get" class="sdf">本月</div>
    </div>
    <div class="zd-lists" v-bind:style="{'min-height':minH}">
      <!--<router-link to="/zd/skzf/12321" class="zd-li sl-ub sl-ubf1">
        <div class="zd-li-ico zd-wx-ico"></div>
        <div class="sl-ub sl-ubf1">
          <div class="zd-fs-dt">
            <div class="fs">微信面对面收钱</div>
            <div class="dt">2017-04-17 09:12:34</div>
          </div>
          <div class="zd-money-succ">
            <div class="money">+58.00</div>
            <div class="succ sk-succ">收款成功</div>
          </div>
        </div>
      </router-link>
      <router-link to="/zd/skzf/ww" class="zd-li sl-ub sl-ubf1">
        <div class="zd-li-ico zd-wx-ico"></div>
        <div class="sl-ub sl-ubf1">
          <div class="zd-fs-dt">
            <div class="fs">微信面对面收钱</div>
            <div class="dt">2017-04-17 09:12:34</div>
          </div>
          <div class="zd-money-succ">
            <div class="money">+5892132.00</div>
            <div class="succ zf-succ">支付成功</div>
          </div>
        </div>
      </router-link>-->
      <div class="no-data zd-no-data">
        <div class="no-data-ico"></div>
        <div class="no-data-txt">暂无数据</div>
      </div>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'indexzd-content',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      today_get:"0.00",
      minH:"0"
    }
  },
  created:function(){
    this.getH();
  },
  methods:{
    get_today_get:function(e){
      if(!$(e.target).hasClass("zd-selected")){
        $(e.target).addClass("zd-selected").siblings().removeClass("zd-selected");
      } 
    },
    getH:function(){
      var wh = $(window).height();
      var hh = $(".zd-sy").outerHeight(true);
      var nh = $(".zd-nav").outerHeight(true);
      var h = wh-hh-nh;
      this.minH = h+"px";
    }
  }
  
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .sdf{
    width:33.33%;
    text-align:center;
    box-sizing:border-box;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
  }
  .zd-selected{
    border-bottom:4/@pxtoem solid #003894;
    color:#003894;
  }
  .zd-li{
    box-sizing:border-box;
    height:131/@pxtoem;
    border-top:1/@pxtoem solid #eee;
    width:100%;
    padding:30/@pxtoem;
  }
  .zd-li:last-of-type{
    border-bottom:1/@pxtoem solid #eee;
  }
  .zd-li-ico{
    width:70/@pxtoem;
    height:70/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .zd-wx-ico{
    background:url(../../static/images/icon_weixin.png) no-repeat center;
    background-size:70/@pxtoem 70/@pxtoem;
  }
  .zd-zfb-ico{
    background:url(../../static/images/icon_zhifubao.png) no-repeat center;
    background-size:70/@pxtoem 70/@pxtoem;
  }
  .zd-fs-dt{
    color:#000;
    width:50%;
  }
  .zd-money-succ{
    color:#000;
    width:50%;
    text-align:right;
  }
  .zd-fs-dt .fs{
    font-size:30/@pxtoem;
    line-height:30/@pxtoem;
    margin-bottom:20/@pxtoem;
  }
  .zd-fs-dt .dt{
    font-size:20/@pxtoem;
    line-height:20/@pxtoem;
    color:#999;
  }
  .zd-money-succ .money{
    font-size:30/@pxtoem;
    line-height:30/@pxtoem;
    margin-bottom:20/@pxtoem;
  }
  .zd-money-succ .succ{
    font-size:20/@pxtoem;
    line-height:20/@pxtoem;
  }
  .zd-money-succ .sk-succ{
    color:#ff0000;
  }
  .zd-money-succ .zf-succ{
    color:#56b74a;
  }
  .zd-no-data{
    margin-top:0;
    position:absolute;
    left:0;
    right:0;
    top:240/@pxtoem;
  }
  .zd-lists{
    position:relative;
    background:#eee;
  }
</style>

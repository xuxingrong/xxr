<template>
  <section>
    <router-view ></router-view>
    <header class="wdsc-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBefore" >
        <div class="return-black-ico"></div>
      </div>
      积分规则
    </header>
    
    <div class="hygz-box">
      <div class="hygz-box-h sl-ub sl-uac">
        <div></div>
        <div>会员规则</div>
      </div>
      <div class="hygz-box-c">

        <p>1、积分专属海惠网，仅限海惠网内使用；在海惠网购物可以1积分=1元抵扣现金（暂不支持虚拟类商品、黄金及黄金制品类商品、医药馆中西药品和医疗器械类商品）；</p>
        <p>2、在海惠网购物享受消费增值，注册成为海惠客，每天签到、推荐会员、推荐线上供货商家、推荐线下实体联盟商家均可获得积分；</p>
        <p>3、海惠客积分可以累积，有效期为3年，即从获得开始至第三年年底，逾期自动作废（如若交易在使用的积分有效期之外发生退款，该部分积分不予退还）；</p>
        <p>4、买家付款时根据自身会员等级，每笔订单最大可使用的积分额度分别为：5%、10%、15%、20%、25%；
        例如：原价500元的商品，某VIP会员有60个海惠网积分，结算时最大可使用积分额度为25积分（500*5% = 25）；</p>
        <p>5、在商品退货时，如订单中当时使用积分抵现，确认退款后，积分将给予原路返还；
        <p>6、积分不能兑现，不可转让；</p>
        <p>7、如您违反与海惠网的相关约定，海惠网有权冻结相应积分；
        <p>8、海惠网积分只适用于终端个人消费者和经过认证的以终端消费为目的企业用户的下单情形，海惠网对积分使用有最终解释权。</p>

        <p class="spc">
        积分查询： 每位客户在您自己账户中的“我的海惠网-我的积分-积分记录”中可查询到您的积分详细情况。
        注：积分规则由海惠网制定并依据国家相关法律法规及规章制度予以解释和修改，规则以网站公布为准。</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'yhqy-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      header_hide:false
    }
  },
  methods:{
    deletPro:function(){
      this.deletState = !this.deletState;
    },
    is_hasSC:function(hasSc){
      this.hasSc = hasSc;
    },
    returnBefore:function(){
      this.$router.go(-1);
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
  .share-black-ico{
    display:block;
    width:40/@pxtoem;
    height:38/@pxtoem;
    position:absolute;
    top:0;
    bottom:0;
    right:102/@pxtoem;
    background:url(../../../static/images/nar_icon_black_share.png) no-repeat center;
    background-size:40/@pxtoem 38/@pxtoem;
    margin:auto;
  }
  .hysj-xq-ico{
    display:block;
    width:38/@pxtoem;
    height:38/@pxtoem;
    position:absolute;
    top:0;
    bottom:0;
    right:24/@pxtoem;
    background:url(../../../static/images/nar_icon_yw.png) no-repeat center;
    background-size:38/@pxtoem 38/@pxtoem;
    margin:auto;
  }
  .hygz-box{
    padding-top:87/@pxtoem;
  }
 
  .hygz-box-h{
    padding:0 30/@pxtoem;
    height:88/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  
  .hygz-box-h>div:first-child{
    width:40/@pxtoem;
    height:41/@pxtoem;
    background:url(../../../static/images/icon_jfjl.png) no-repeat center;
    background-size:40/@pxtoem 41/@pxtoem;
    margin-right:20/@pxtoem;
  }
 
  .hygz-box-h>div:last-child{
    color:#d8272a;
    font-size:30/@pxtoem;
  }
  
  .hygz-box-c{
    padding:13/@pxtoem 30/@pxtoem 0;
  }
 
  .hygz-box-c>p{
    padding-bottom:13/@pxtoem;
    font-size:28/@pxtoem;
    line-height:40/@pxtoem;
    color:#999;
  }
  .hygz-box-c .spc{
    color:#666;
  }
</style>
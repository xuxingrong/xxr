<template>
  <section v-on:click.self="hideBox">
    <div class="hyqysm-box fd-center">
      <div class="hyqysm-box-close" v-on:click="hideBox"></div>
      
      
      <div class="hyqysm-box-c" v-if="selected_dj=='4'">
        <div class="hyqysm-box-header">
          <span class="hong ico"></span>
          红钻会员权益说明
        </div>
        <div class="hyqysm-box-body">
          <p>1、享有海惠网会员身份；</p>
          <p>2、获得平台个人个性电子名片；</p>
          <p>3、每月凭VIP身份可参与星级会所级别高端人脉圈、资本圈子活动，以及会员交流会；</p>
          <p>4、会员定期可以了解到最新的投资动态一手资讯，参加股权投资及项目活动；</p>
          <p>5、推荐会员获得会员充值费的15%佣金；</p>
          <p>6、推荐会员获得积分；</p>
          <p>7、获得所推荐的会员产生的消费额1%回报；</p>
          <p>8、推荐电商业务供货商家，获得平台积分奖励及商家销售额1%；</p>
          <p>9、推荐线下实体联盟商家，获得每家15个积分奖励及联盟商家销售额1%；</p>
          <p>10、推荐线下实体联盟商家，获得联盟商家年费15%；</p>
          <p>11、有优先平台代理运营权；</p>
          <p>12、在电商平台现金消费享有15个月返回98%。</p>
        </div>
        <div class="hyqysm-box-footer">
          <div v-on:click="toTC">开通会员立享权益</div>
        </div>
      </div>
      
      
      <div class="hyqysm-box-c" v-if="selected_dj=='5'">
        <div class="hyqysm-box-header">
          <span class="huang ico"></span>
          黄钻会员权益说明
        </div>
        <div class="hyqysm-box-body">
          <p>1、享有海惠网会员身份；</p>
          <p>2、获得平台个人个性电子名片；</p>
          <p>3、每月凭VIP身份可参与星级会所级别高端人脉圈、资本圈子活动，以及会员交流会；</p>
          <p>4、会员定期可以了解到最新的投资动态一手资讯，参加股权投资及项目活动；</p>
          <p>5、推荐会员获得会员充值费的20%佣金；</p>
          <p>6、推荐会员获得积分；</p>
          <p>7、获得所推荐的会员产生的消费额1%回报；</p>
          <p>8、推荐电商业务供货商家，获得平台积分奖励及商家销售额1%；</p>
          <p>9、推荐线下实体联盟商家，获得每家20个积分奖励及联盟商家销售额1%；</p>
          <p>10、推荐线下实体联盟商家，获得联盟商家年费20%；</p>
          <p>11、有优先平台代理运营权；</p>
          <p>12、在电商平台现金消费享有12个月返回98%。</p>
        </div>
        <div class="hyqysm-box-footer">
          <div v-on:click="toTC">开通会员立享权益</div>
        </div>
      </div>
      
      
      
      <div class="hyqysm-box-c" v-if="selected_dj=='6'">
        <div class="hyqysm-box-header">
          <span class="lan ico"></span>
          蓝钻会员权益说明
        </div>
        <div class="hyqysm-box-body">
          <p>1、享有海惠网会员身份；</p>
          <p>2、获得平台个人个性电子名片；</p>
          <p>3、每月凭VIP身份可参与星级会所级别高端人脉圈、资本圈子活动，以及会员交流会；</p>
          <p>4、会员定期可以了解到最新的投资动态一手资讯，参加股权投资及项目活动；</p>
          <p>5、推荐会员获得会员充值费的25%佣金；</p>
          <p>6、推荐会员获得积分；</p>
          <p>7、获得所推荐的会员产生的消费额1%回报；</p>
          <p>8、推荐电商业务供货商家，获得平台积分奖励及商家销售额1%；</p>
          <p>9、推荐线下实体联盟商家，获得每家25个积分奖励及联盟商家销售额1%；</p>
          <p>10、推荐线下实体联盟商家，获得联盟商家年费25%；</p>
          <p>11、有优先平台代理运营权；</p>
          <p>12、在电商平台现金消费享有10个月返回98%。</p>
        </div>
        <div class="hyqysm-box-footer">
          <div v-on:click="toTC">开通会员立享权益</div>
        </div>
      </div>
      
      
      
      <div class="hyqysm-box-c" v-if="selected_dj=='7'">
        <div class="hyqysm-box-header">
          <span class="bo ico"></span>
          铂钻会员权益说明
        </div>
        <div class="hyqysm-box-body">
          <p>1、享有海惠网会员身份；</p>
          <p>2、获得平台个人个性电子名片；</p>
          <p>3、每月凭VIP身份可参与星级会所级别高端人脉圈、资本圈子活动，以及会员交流会；</p>
          <p>4、可参加瑞享集团投资会的项目路演资格；</p>
          <p>5、获得平台赠送高级电子商务精品店铺1个；</p>
          <p>6、会员定期可以了解到最新的投资动态一手资讯，参加股权投资及项目活动；</p>
          <p>7、推荐会员获得会员充值费的30%佣金；</p>
          <p>8、推荐会员获得积分；</p>
          <p>9、获得所推荐的会员产生的消费额1%回报；</p>
          <p>10、推荐电商业务供货商家，获得平台积分奖励及商家销售额1%；</p>
          <p>11、推荐线下实体联盟商家，获得每家30个积分奖励及联盟商家销售额1%；</p>
          <p>12、推荐线下实体联盟商家，获得联盟商家年费充值30%佣金；</p>
          <p>13、有优先平台代理运营权；</p>
          <p>14、在电商平台现金消费享有8个月返回98%；</p>
          <p>15、所获得的积分可以参与瑞享集团股权购买，享受分红及资本倍增价值，成就财富梦想。</p>
        </div>
        <div class="hyqysm-box-footer">
          <div v-on:click="toTC">开通会员立享权益</div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'hysj-c-hyqy',
  props:['selected_dj'],
  data () {
    return {
    }
  },
  created:function(){
  },
  mounted:function(){
    
  },
  methods:{
    hideBox:function(){
      this.$emit('childE',true);
    },
    toTC:function(){
      sessionStorage.setItem("sjrole",this.selected_dj);
      this.$emit('childE',true);
      this.$router.push("/hysj/tc");
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    position:fixed;
    z-index:1000;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .hyqysm-box{
    width:620/@pxtoem;
    height:940/@pxtoem;
    position:absolute;
    z-index:1000;
    border-radius:30/@pxtoem;
  }
  .hyqysm-box-close{
    position:absolute;
    width:58/@pxtoem;
    height:58/@pxtoem;
    top:0;
    right:0;
    background:url(../../../static/images/icon_close_1.png) no-repeat center;
    background-size:contain;
  }
  .hyqysm-box-c{
    position:absolute;
    width:100%;
    height:872/@pxtoem;
    bottom:0;
    left:0;
  }
  .hyqysm-box-header{
    border-radius:30/@pxtoem 30/@pxtoem 0 0;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    background:#d8272a;
    color:#fff;
    position:relative;
    text-align:center;
  }
  .hyqysm-box-header .ico{
    position:absolute;
    width:120/@pxtoem;
    height:120/@pxtoem;
    bottom:14/@pxtoem;
    left:50/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
  }
  .hyqysm-box-header .hong{
    background-image:url(../../../static/images/tanchuag_hong_qy.png);
  }
  .hyqysm-box-header .huang{
    background-image:url(../../../static/images/tanchuag_huang_qy.png);
  }
  .hyqysm-box-header .lan{
    background-image:url(../../../static/images/tanchuag_lan_qy.png);
  }
  .hyqysm-box-header .bo{
    background-image:url(../../../static/images/tanchuag_bo_qy.png);
  }
  .hyqysm-box-body{
    box-sizing:border-box;
    height:664/@pxtoem;
    width:100%;
    padding:24/@pxtoem 38/@pxtoem 30/@pxtoem;
    background:#fff;
    overflow:scroll;
  }
  .hyqysm-box-body>p{
    font-size:24/@pxtoem;
    color:#333;
    line-height:36/@pxtoem;
  }
  .hyqysm-box-footer{
    width:100%;
    height:120/@pxtoem;
    background:#fff;
    border-radius:0 0 30/@pxtoem 30/@pxtoem;
  }
  .hyqysm-box-footer>div{
    width:460/@pxtoem;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    text-align:center;
    color:#fff;
    background:#d8272a;
    font-size:34/@pxtoem;
    border-radius:44/@pxtoem;
    margin:0 auto;
  }
</style>
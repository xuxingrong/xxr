<template>
  <section>
    <router-view ></router-view>
    <header class="wdsc-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBefore" >
        <div class="return-black-ico"></div>
      </div>
      会员权益
    </header>
    <div class="hysm-box">
      <div class="hysm-box-h sl-ub sl-uac">
        <div></div>
        <div>【会员说明】</div>
      </div>
      <div class="hysm-box-c">
        <p>1.海惠客会员级别共分为5个等级：分别为VIP会员、红钻会员、黄钻会员、蓝钻会员、铂钻会员；</p>
        <p>2.会员的级别越高享受到的会员权益越大。升级即可享有98%消费增值；</p>
        <p>3.注册成功即成为VIP会员；红钻会员预存9元；黄钻会员预存199元；蓝钻会员预存299元；铂钻会员预存399元；凡是在海惠网注册会员，都可补差额度升级，会员升级后可享受相应的等级权益；</p>
        <p>4.会员享受积分制，积分可根据等级制度在海惠商城抵现。</p>
      </div>
    </div>
    
    <div class="hygz-box">
      <div class="hygz-box-h sl-ub sl-uac">
        <div></div>
        <div>【积分奖励规则】</div>
      </div>
      <div class="hygz-box-c">
        <div class="hygz-box-c-h">VIP</div>
        <p>1、享有海惠网会员身份；</p>
        <p>2、获得平台个人个性电子名片；</p>
        <p>3、每月凭VIP身份可参与星级会所级别高端人脉圈、资本圈子活动，以及会员交流会；</p>
        <p>4、会员定期可以了解到最新的投资动态一手资讯，参加股权投资及项目活动；</p>
        <p>5、推荐会员获得会员充值费的10%佣金；</p>
        <p>6、推荐会员获得积分；</p>
        <p>7、获得所推荐的会员产生的消费额1%回报；</p>
        <p>8、推荐电商业务供货商家，获得平台积分奖励及商家销售额1%；</p>
        <p>9、推荐线下实体联盟商家，获得每家10个积分奖励及联盟商家销售额1%；</p>
        <p>10、推荐线下实体联盟商家，获得联盟商家年费10%；</p>
        <p>11、有优先平台代理运营权；</p>
        <p>12、在电商平台现金消费享有18个月返回98%。</p>
        <div class="hygz-box-c-h">红钻</div>
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
        <div class="hygz-box-c-h">黄钻</div>
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
        <div class="hygz-box-c-h">蓝钻</div>
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
        <div class="hygz-box-c-h">铂钻</div>
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
    </div>
    
     
    <div class="flgz-box">
      <div class="flgz-box-h sl-ub sl-uac">
        <div></div>
        <div>【返利规则】</div>
      </div>
      <div class="flgz-box-c">
        <p>成功邀请好友注册海惠网会员，该会员升级或购物，邀请人可享受一定比例的返利
例：A为海惠网会员，邀请B注册海惠网会员，A是B的绑定推荐人（B购物或是升级，A都可以享有一定比例的返利）
</p>
        <p>邀请已注册的海惠网会员进行购物或升级，无法更改原先推荐人的绑定关系
例：会员B通过会员C分享链接，进行购物（或升级），购物（或升级）的返利归A所有（与会员C无关）
</p>
        
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
  .hysm-box{
    padding-top:87/@pxtoem;
    border-bottom:20/@pxtoem solid #eee;
  }
  .flgz-box{
    border-top:20/@pxtoem solid #eee;
  }
  .hysm-box-h,.hygz-box-h,.flgz-box-h{
    padding:0 30/@pxtoem;
    height:88/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  .hysm-box-h>div:first-child{
    width:40/@pxtoem;
    height:41/@pxtoem;
    background:url(../../../static/images/icon_husm.png) no-repeat center;
    background-size:40/@pxtoem 41/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .hygz-box-h>div:first-child{
    width:40/@pxtoem;
    height:41/@pxtoem;
    background:url(../../../static/images/icon_jfjl.png) no-repeat center;
    background-size:40/@pxtoem 41/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .flgz-box-h>div:first-child{
    width:40/@pxtoem;
    height:41/@pxtoem;
    background:url(../../../static/images/icon_fanliguize.png) no-repeat center;
    background-size:40/@pxtoem 41/@pxtoem;
    margin-right:20/@pxtoem;
  }
  .hysm-box-h>div:last-child,.hygz-box-h>div:last-child,.flgz-box-h>div:last-child{
    color:#d8272a;
    font-size:30/@pxtoem;
  }
  .hysm-box-c,.hygz-box-c,.flgz-box-c{
    padding:13/@pxtoem 30/@pxtoem 0;
  }
  .hysm-box-c>p,.flgz-box-c>p{
    padding-bottom:13/@pxtoem;
    font-size:26/@pxtoem;
    line-height:42/@pxtoem;
    color:#333;
  }
  .hygz-box-c>p{
    padding-bottom:13/@pxtoem;
    font-size:24/@pxtoem;
    line-height:36/@pxtoem;
    color:#999;
  }
  .hygz-box-c-h{
    font-size:28/@pxtoem;
    line-height:22/@pxtoem;
    margin:17/@pxtoem 0;
    color:#333;
    padding-left:20/@pxtoem;
    border-left:4/@pxtoem solid #333;
  }
</style>
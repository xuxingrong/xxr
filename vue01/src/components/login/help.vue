<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        帮助与反馈
     </div>
     
     <div class="setBox">
        <div class="sSpc"  v-for="liqus in data_qus" v-on:click="helps">
           <h4 class="discom"  v-bind:quid="liqus.id">{{liqus.qu}}</h4>
           <!--<span><i class="lIcon "></i></span>-->
           <div class="zlink"></div>
           <div style="clear:both"></div>
           <div class="content ">{{liqus.awer}}</div>
        </div>
      </div> 

      <div class="spcdan" v-on:click="anPd()">其他问题可联系在线客服<i class="lIcon"></i></div> 
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      seen: false,
      istrue:false,
      data_qus:[
        {
          'qu':'如何成为海惠网会员？',
          'awer':'1.在我公司所设无线WIFI商家通过公开WIFI上网；2.通过海惠网商城（PC端、APP、微商城）自主注册会员；3.扫描好友推荐的二维码/商品二维码，注册会员。',
          'id':1,
        },{
          'qu':'收到货多长时间内可以退换货？有什么条件？',
          'awer':'您好，只要收到商品7天内，商品和包装完好，未穿着使用过，不影响二次销售即可退换货（例如服装吊牌剪了，鞋子磨损等都是影响二次销售，不能退换货）',
          'id':2
        },{
          'qu':'普通会员与VIP会员有什么区别？',
          'awer':'您好，普通会员消费不享受返现；VIP会员享受自身消费的返现。',
          'id':3
        },{
          'qu':'VIP会员专享有哪些？',
          'awer':'您好，普通会员消费不享受返现；VIP会员享受自身消费的返现。',
          'id':4
        },{
          'qu':'成为海惠网VIP会员需要什么条件？',
          'awer':'您好，只要注册成为海惠网的会员，预存9元即可升级成为海惠网VIP会员。',
          'id':5
        },{
          'qu':'怎么取消退款申请?',
          'awer':'您好，假设您需要取消退款申请，您需要联系平台客服，对您的订单退款申请审核时，给予驳回。',
          'id':6
        },{
          'qu':'VIP会员享受自身消费的返现是什么意思？/消费返利是什么意思？',
          'awer':'您好，VIP会员消费返利基数为每笔消费额（100元的整数倍)。即：比如我是一个海惠网VIP会员，我在商城上购买了130元的商品，则平台会给我返现100元；假如我是卖了290；则会返现200。',
          'id':7
        },{
          'qu':'推荐注册有什么好处？',
          'awer':'您好！推荐注册可获得推荐奖励，还可享受二级消费提拥。',
          'id':8
        },{
          'qu':'我的返现去哪里了？/我怎么拿到返现的钱？',
           'awer':'您好，平台给用户的返现金额会转入用户的预存款中。',
          'id':9
        },{
          'qu':'我升级VIP的钱去哪里了？',
           'awer':'您好，平台给用户的返现金额会转入用户的预存款中。',
          'id':10
        }
      ]
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    helps:function(e){
      $(e.target).siblings('.content').slideToggle(300);
      $(e.target).siblings('h4').toggleClass('link');
      $(e.target).siblings('span').toggleClass('hov');
     },
    anPd: function(){
      //window.location.href ='tel:4008-528-166';
      if(this.GLOBAL.isWeiXin()){
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2&source=1";
      }else{
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2";
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    var identi = localStorage.getItem("identi");
    if(identi==null){
      next("/hhk/login");
    }else{
      next();
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
   .lo-header {
    border-bottom:1/@pxtoem solid #f1f1f1;
   }
   .setBox {
     margin-bottom:100/@pxtoem;
   }
   .setBox > a:first-child {
    line-height:90/@pxtoem;
   }
   .zlink{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1;
   }
   .setBox > a, .sSpc {
     line-height:0;
     padding:23/@pxtoem 0;
   }
   .setBox > a > h4, .sSpc > h4 {
     width:600/@pxtoem;
     line-height:45/@pxtoem;
     vertical-align: bottom;
     padding-left:0;
     transition:padding .3s;
   }
   .setBox > a > span, .sSpc > span {
      line-height:45/@pxtoem;
      float:none;
      position: absolute;
      right: 0;
   }
   .setBox > a > span, .sSpc > span i{
     background-size:15/@pxtoem;
     transition:all .3s;
   }
   .setBox > a > span, .sSpc > span.hov i{
    -webkit-transform:rotate(90deg);
    transform:rotate(90deg);
   }
   .content{
     line-height:45/@pxtoem;
     padding:0 30/@pxtoem;
     margin-top:5/@pxtoem;
     font-size:28/@pxtoem;
     display:none;
     text-indent:2em;
   }
  
   .sSpc > h4.link {
      background:url(../../../static/images/icon_wt@3x.png) no-repeat left center;
      background-size:40/@pxtoem;
      padding-left:50/@pxtoem;
      color:#d8272a;
   }
   .spcdan{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      background: #fff;
      color: #333;
      line-height: 30/@pxtoem;
      border-top: 1px #f1f1f1 solid;
      background: url(../../../static/images/icon_kf.png) no-repeat 20/@pxtoem center #fff;
      background-size:35/@pxtoem;
      padding:35/@pxtoem 60/@pxtoem ;
      z-index:1000;
   }
   .spcdan .lIcon{
    width: 20/@pxtoem;
    height:30/@pxtoem;
    background-image: url(../../../static/images/icon_wddd_ckgd.png);
    background-size:15/@pxtoem;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 90/@pxtoem;
    top:30/@pxtoem;

   }
   
</style>


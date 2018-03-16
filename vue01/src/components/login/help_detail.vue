<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        问题详情
     </div>
     
     <div class="hl_box">
        <h4>{{ques}}</h4>
        <p>{{ans}}</p>
        
     </div> 
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      seen: false,
      ques:'',
      ans:''
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
  },
  mounted:function(){
    this.ques=sessionStorage.getItem('question');
    var answer=[
      {
       'awer':'1.在我公司所设无线WIFI商家通过公开WIFI上网；2.通过海惠网商城（PC端、APP、微商城）自主注册会员；3.扫描好友推荐的二维码/商品二维码，注册会员。',
       'id':'a1'
      },{
       'awer':'您好，只要收到商品7天内，商品和包装完好，未穿着使用过，不影响二次销售即可退换货（例如服装吊牌剪了，鞋子磨损等都是影响二次销售，不能退换货）',
       'id':'a2'
      },{
       'awer':'您好，普通会员消费不享受返现；VIP会员享受自身消费的返现。',
       'id':'a3'
      },{
       'awer':'您好，普通会员消费不享受返现；VIP会员享受自身消费的返现。',
       'id':'a4'
      },{
       'awer':'您好，只要注册成为海惠网的会员，预存9元即可升级成为海惠网VIP会员。',
       'id':'a5'
      },{
       'awer':'您好，假设您需要取消退款申请，您需要联系平台客服，对您的订单退款申请审核时，给予驳回。',
       'id':'a6'
      },{
       'awer':'您好，VIP会员消费返利基数为每笔消费额（100元的整数倍)。即：比如我是一个海惠网VIP会员，我在商城上购买了130元的商品，则平台会给我返现100元；假如我是卖了290；则会返现200。',
       'id':'a7'
      },{
       'awer':'您好！推荐注册可获得推荐奖励，还可享受二级消费提拥。',
       'id':'a8'
      },{
       'awer':'您好，平台给用户的返现金额会转入用户的预存款中。',
       'id':'a9'
      },{
       'awer':'您好，平台给用户的返现金额会转入用户的预存款中。',
       'id':'a10'
      }
    ]

    var ind=sessionStorage.getItem('quesId');
    this.ans=answer[ind-1].awer
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
   .lo-header {
    border-bottom:1/@pxtoem solid #f1f1f1;
   }
   .lo-all {
    background: #fff;
    }
   .setBox > a:first-child {
    line-height:90/@pxtoem;
   }
   .hl_box{
    padding:0 30/@pxtoem;
    line-height:40/@pxtoem;
    font-size:29/@pxtoem;
   }
   .hl_box h4{
    background:url(../../../static/images/icon_wt@3x.png) no-repeat left center;
    background-size:40/@pxtoem;
    padding:30/@pxtoem 0 30/@pxtoem 50/@pxtoem;
    color:#d8272a;
    font-weight:normal;
    margin-bottom:10/@pxtoem;
    font-size:31/@pxtoem;
    border-bottom:1px solid #f1f1f1;
   }
   .hl_box p{
    padding-left:50/@pxtoem;
    text-indent:2em;
    margin-top:20/@pxtoem;
    line-height:48/@pxtoem;
   }
</style>


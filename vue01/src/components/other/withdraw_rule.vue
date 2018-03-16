<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        提现规则
     </div>

    <div class="w_rule">
<p>1、提现金额大于或等于100元时可发起提现，提现需扣除7%的税收和10%的技术服务费；</p>
<p>2、提现办理时间：3-5个工作日；</p>
<p>3、最高提现额度：根据用户选择的银行卡和提现方式不同有不同的额度，请以提现时的页面提示为准；</p>
<p>4、提现到账时间：提现成功后一般将在1-3个工作日到账，周末顺延。如逾期未到账，请查询银行卡出入账明细和海惠网个人中心余额是否有退回；</p>
<p>5、为保障您的财产安全只能使用公司对公账户或本人本地银行卡；</p>
<p>6、如在提现过程中有任何疑问，请致电海惠网客服电话：400-852-8166。</p>
    </div>
   
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
     
    }
  },
 methods:{
    ss:function(){
      this.$router.go(-1)
    }
 },
  computed:{
    ww:function(){
      return  ;
    },
     all_height:function(){
     return window.innerHeight + 'px'
    }
  }
}
</script>

<style scoped lang="less">
  @pxtoem:28.125rem;
  .lo-all {
    background: #fff;
  }
  .lo-header{
   border-bottom:1px solid #ddd;
  }
  .w_rule{
   padding:30/@pxtoem;
   line-height:40/@pxtoem;
  }
  .w_rule p{
   margin-bottom:6/@pxtoem;
  }
 </style>


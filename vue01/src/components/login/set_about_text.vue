<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        关于海惠网
     </div>
     <div class="about_text">
         <p>海惠网是由金淇一路通（深圳）科技股份有限公司创建。基于B2B2C商业模式并结合公司科技产品（智能WIFI和金淇智媒体）打造的一个全新电商平台。</p>

<p>海惠网以“吃、喝、玩、乐、衣、食、住、行”为八大元素，追求品位、时尚、健康、正品，尊崇“踏实、拼搏、责任的企业精神，以诚信、共赢、开创经营为理念，创造良好的电商平台环境，以全新的管理模式，完善的技术，周到的服务，卓越的品质为生存根本，我们始终坚持用户至上用心服务客户，坚持用自己的服务去打动客户。</p>

<p>金淇一路通（深圳）科技股份有限公司是一家集合了商业WIFI的市场推广、互联网广告运营服务、互联网商城、品牌营销等板块，为中小企业提供一站式品牌孵化服务平台。</p>

<p>公司前期依托“六云智能系统”技术核心的智能Wi-Fi，互联网广告服务的金淇智媒体，三网合一的海惠网商城（www.hhwall.com），打造行业领先的智能科技平台。公司核心团队拥有10多年企业管理经验，结合网合科技公司多年的运营管理系统、完善的制度标准化体系，结合流量入口的优势，强有力的渠道支持，密集广告展示终端，强大的后台大数据分析能力，为中小企业提供专业化，标准化的品牌孵化及服务。</p>
     </div>
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd"
      
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
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .lo-all {
    box-sizing: border-box;
    background: #fff;
    border-top:1px solid #f1f1f1;
   }
  .about_text{
    font-size:28/@pxtoem;
    line-height:45/@pxtoem;
    padding:30/@pxtoem;
    border-top:1px solid #ddd;
  }
  .about_text p{
    margin-bottom:10/@pxtoem;
    text-indent:2em;
  }
</style>


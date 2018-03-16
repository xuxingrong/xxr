<template>
  <section v-on:click.self="returnBefore">
    <div class="qdcg-box fd-center">
      <div class="qdcg">
        <div class="cg">签到成功</div>
        <p class="jf">恭喜你获得<span>1</span>积分</p>
        <div class="all-jf sl-ub sl-upc">
          <div class="sl-ub sl-uae"><div>累积获得</div></div>
          <div>8</div>
          <div class="ico"><div></div></div>
        </div>
        <div class="mtzl">明天再来</div>
      </div>
    </div>
  </section>
</template>

<script>
 
export default {
  name: 'hysj-tc',
  data () {
    return {
      msg: '',
      
    }
  },
  methods:{
    returnBefore:function(){
      this.$router.push("/qiandao");
    },
    nextP:function(){
       
    }
  },
  mounted:function(){
     
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
  .qdcg-box{
    width:658/@pxtoem;
    height:670/@pxtoem;
    background:url(../../../static/images/pic_tanchuan.png) no-repeat center;
    background-size:658/@pxtoem 670/@pxtoem;
    position:absolute;
  }
  .qdcg{
    position:absolute;
    top:175/@pxtoem;
    color:#ff4200;
    left:0;
    right:0;
    margin:auto;
    text-align:center;
  }
  .qdcg .cg{
    margin-bottom:10/@pxtoem;
    font-size:60/@pxtoem;
  }
  .qdcg .jf{
    font-size:30/@pxtoem;
    margin-bottom:40/@pxtoem;
  }
  .all-jf{
    height:140/@pxtoem;
    margin-bottom:60/@pxtoem;
  }
  .all-jf>div:first-child{
    font-size:24/@pxtoem;
  }
  .all-jf>div:nth-child(2){
    font-size:160/@pxtoem;
    line-height:160/@pxtoem;
    margin:0 20/@pxtoem;
  }
  .all-jf .ico{
    width:96/@pxtoem;
  }
  .all-jf .ico>div{
    width:58/@pxtoem;
    height:60/@pxtoem;
    background:url(../../../static/images/tanchuang_jifen.png) no-repeat center;
    background-size:58/@pxtoem 60/@pxtoem;
  }
  .mtzl{
    font-size:36/@pxtoem;
  }
</style>

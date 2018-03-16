<template>
  <section v-on:click="returnHydj">
    <div class="ico fd-center">
      <img src="/static/images/tanchuag_hong.png" alt="" v-if="msg=='hong'" />
      <img src="/static/images/tanchuag_huang.png" alt="" v-if="msg=='huang'" />
      <img src="/static/images/tanchuag_lan.png" alt="" v-if="msg=='lan'" />
      <img src="/static/images/tanchuag_bo.png" alt="" v-if="msg=='bo'" />
      <div>升级成功</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hysj-sjcg',
  data () {
    return {
      msg: 'hong'
    }
  },
  created:function(){
    this.role_dj();
    
  },
  methods:{
    role_dj:function(){   
      switch(this.$route.params.hy_id){
        case '4':this.msg = "hong";
        break;
        case '5':this.msg = "huang";
        break;
        case '6':this.msg = "lan";
        break;
        case '7':this.msg = "bo";
        break;
        default:this.msg = "hong";
      }
    },
    returnHydj:function(){
      this.$router.push("/hysj");
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
  .ico{
    position:absolute;
    width:680/@pxtoem;
    height:689/@pxtoem;
  }
  .ico>img{
    width:100%;
    height:100%;
  }
  .ico>div{
    position:absolute;
    top:460/@pxtoem;
    right:0;
    left:0;
    font-size:36/@pxtoem;
    color:#fff;
    text-align:center;
  }
</style>
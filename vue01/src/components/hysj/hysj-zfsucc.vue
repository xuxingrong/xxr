<template>
  <section>
    <header>
      <router-link v-bind:to="return_url" class="return sl-ub sl-uac sl-upc" >
        <div class="return-black-ico"></div>
      </router-link>
      支付成功
      <div class="edit" v-on:click="zf_succ">
        成功
      </div>
    </header>
    <section class="zfsucc-box" v-bind:style="{height:all_height}">
      <div>
        <div class="succ-ico"></div>
        <div class="zfsucc-txt">支付成功</div>
        <!--<div class="zfsucc-money">100.00</div>-->
      </div>
      <!--
      <div class="sl-ub">
        <div>付款信息</div>
        <div>交通银行存储卡（尾号5847854411444）</div>
        <div>-100.00</div>
      </div>
      -->
    </section>
  </section>
</template>

<script>
export default {
  name: 'hysj-zfsucc',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      return_url:"",
      forward_url:""
    }
  },
  created:function(){
    this.defined_url();
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  methods:{
    defined_url:function(){
      var pay_id = this.$route.params.pay_id;
      if(!isNaN(parseInt(pay_id))){
        this.return_url = "/hysj";
        var pid = parseInt(pay_id);
        if(pid<4||pid>7){
          this.forward_url = "/hysj/hysjcg/7";
        }else{
          this.forward_url = "/hysj/hysjcg/"+pid;
        }
      }else{
        this.return_url = "/hhk/account";
        this.forward_url = "/hhk/account";
      }
    },
    zf_succ:function(){
      this.$router.push(this.forward_url);
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
  .edit{
    width:86/@pxtoem;
    height:100%;
    color:#d8272a;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
    font-size:30/@pxtoem;
  }
  .zfsucc-box{
    box-sizing:border-box;
    padding-top:87/@pxtoem;
    background:#eee;
  }
  .zfsucc-box>div{
    background:#fff;
  }
  .zfsucc-box>div:first-child{
    padding:60/@pxtoem 30/@pxtoem;
  }
  .zfsucc-box>div:nth-child(2){
    padding:0 30/@pxtoem;
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
    font-size:30/@pxtoem;
  }
  .succ-ico{
    width:140/@pxtoem;
    height:140/@pxtoem;
    background:url(../../../static/images/icon_zfsucc_cg.png) no-repeat center;
    background-size:140/@pxtoem 140/@pxtoem;
    margin:auto;
  }
  .zfsucc-txt{
    font-size:30/@pxtoem;
    line-height:32/@pxtoem;
    margin:24/@pxtoem auto 40/@pxtoem;
    text-align:center;
    color:#d8272a;
  }
  .zfsucc-money{
    font-size:60/@pxtoem;
    text-align:center;
    padding-bottom:58/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
  }
  .zfsucc-box>div:nth-child(2)>div{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .zfsucc-box>div:nth-child(2)>div:first-child{
    color:#999;
    width:145/@pxtoem;
  }
  .zfsucc-box>div:nth-child(2)>div:nth-child(2){
    width:395/@pxtoem;
  }
  .zfsucc-box>div:nth-child(2)>div:nth-child(3){
    width:150/@pxtoem;
    text-align:right;
  }
</style>
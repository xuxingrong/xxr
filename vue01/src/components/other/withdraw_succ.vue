<template>
  <section>
    <header>
      <div class="return sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-black-ico"></div>
      </div>
      账户提现
      <div v-bind:class="{'edit':true,'red':deletState,'hide':!hasSc}" v-on:click="deletPro">
        成功
      </div>
    </header>
    <section class="zfsucc-box" v-bind:style="{height:all_height}">
      <div>
        <div class="succ-ico"></div>
        <div class="zfsucc-txt">提交申请成功</div>
        <div class="zfsucc-money">{{je}}.00元</div>
      </div>
      <ul class="sl_list">
        <li>
           <div>提现银行</div>
           <div>{{yh}}</div>
        </li>
        <li>
          <div>提现金额</div>
          <div>￥{{je}}</div>
        </li>
        <li>
          <div>手续费</div>
          <div>￥{{ (je*0.17).toFixed(2)}}</div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  name: 'wdsc-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      deletState:false,
      hasSc:true,
      je:'0.00',
      yh:''
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  methods:{
    deletPro:function(){
      this.$router.push('/hhk/account');
    },
     ss:function(){
      this.$router.go(-1)
    },
  },
  mounted:function(){
     var acmess=sessionStorage.getItem('a_money');
     if(acmess=='' || acmess==null){
        acmess='0.00';
     }
     this.je=acmess;
     this.yh=sessionStorage.getItem('yhmessage');
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
    padding-top:86/@pxtoem;
    background:#eee;
  }
  .zfsucc-box>div{
    background:#fff;
  }
  .zfsucc-box>div:first-child{
    padding:60/@pxtoem 30/@pxtoem 0;
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
  .sl_list{}
  .sl_list li:after{
    display:block;
    content:"";
    clear:both;
  }
  .sl_list li{
    background:#fff;
    padding:0  0 20/@pxtoem 30/@pxtoem;
   }
  .sl_list li div:first-child{
    float:left;
    width:145/@pxtoem;
    color:#999;
  }
  .sl_list li div:last-child{
    float:left;
  }
</style>
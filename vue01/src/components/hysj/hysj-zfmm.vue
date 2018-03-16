<template>
  <section v-on:click.self="returnBefore">
    <div class="footer-box">
      <div>
        <div v-on:click="returnBefore"></div>
        请输入支付密码
      </div>
      <div class="zf-box">
        <template v-if="mm_show">
        <div class="sl-ub sl-ubf1">
          <input type="password" name="p1" v-on:keyup="nextmm" id="p1" size="1" maxlength="1" required >
          <input type="password" name="p2" v-on:keyup="nextmm" id="p2" size="1" maxlength="1" required>
          <input type="password" name="p3" v-on:keyup="nextmm" id="p3" size="1" maxlength="1" required>
          <input type="password" name="p4" v-on:keyup="nextmm" id="p4" size="1" maxlength="1" required>
          <input type="password" name="p5" v-on:keyup="nextmm" id="p5" size="1" maxlength="1" required>
          <input type="password" name="p6" v-on:keyup="nextmm" id="p6" size="1" maxlength="1" required>
        </div>
        <p class="sl-ub sl-upe">
          <router-link to="/hhk/account-forget_step1">忘记密码？</router-link>
        </p>
        <div v-on:click="ww">确认</div>
        </template>
      </div>
    </div>
    <router-view v-on:childE="parentE"></router-view>
  </section>
</template>

<script>
export default {
  name: 'hysj-zfmm',
  props:['deletState'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mm_show:true
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  mounted:function(){
    $("#p1").focus();
  },
  methods:{
    returnBefore:function(){
      this.$router.go(-1);
    },
    nextmm:function(e){
      var prev_id = $(e.target).prop("id");
      var next_id = "p"+parseInt(++prev_id.split("")[1]);
      if($("#"+next_id).length>0){
        var num = $("#"+prev_id).val()
        if(num!=""){
          $("#"+next_id).focus();
        }
      }
    },
    ww:function(){
       if(this.$route.name=='charge_step2'){
         this.$router.push("/hhk/account-charge/charge-step2/error");
         //成功界面
         //this.$router.push("/hysj/zfsucc");
       }else if(this.$route.name=='hysjZfmm'){
         this.$router.push("/hysj/zfmm/mmerror");
         //成功界面
         //this.$router.push("/hysj/zfsucc");
       }
     
    },
    parentE:function(mm_show){
      this.mm_show = mm_show;
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
  .footer-box{
    width:100%;
    position:absolute;
    z-index:1001;
    bottom:0;
    background:#fff;
    color:#333;
  }
  .footer-box>div:first-child{
    width:100%;
    margin-left:0;
    position:relative;
    height:90/@pxtoem;
    line-height:90/@pxtoem;
    font-size:34/@pxtoem;
    text-align:center;
    border-bottom:1/@pxtoem solid #eee;
  }
  .footer-box>div:first-child>div{
    position:absolute;
    width:30/@pxtoem;
    height:30/@pxtoem;
    background:url(../../../static/images/zf_close.png) no-repeat center;
    background-size:30/@pxtoem 30/@pxtoem;
    top:0;
    bottom:0;
    left:30/@pxtoem;
    margin:auto;
  }
  .zf-box{
    box-sizing:border-box;
    padding:60/@pxtoem 30/@pxtoem 0 30/@pxtoem;
    background:#fff;
    height:800/@pxtoem; 
  }
  .zf-box>div{
    width:100%;
    height:94/@pxtoem;
    margin-bottom:24/@pxtoem;
  }
  .zf-box input{
    display:block;
    box-sizing:border-box;
    width:16.67%;
    height:100%;
    background:#fafafa;
    border-right:1/@pxtoem solid #999;
    border-top:1/@pxtoem solid #999;
    border-bottom:1/@pxtoem solid #999;
    text-align:center;
    line-height:92/@pxtoem;
    outline:none;
    font-size:36/@pxtoem;
  }
  .zf-box input:first-child{
    border-left:1/@pxtoem solid #999;
    border-radius:10/@pxtoem 0 0 10/@pxtoem;
  }
  .zf-box input:last-child{
    border-radius:0 10/@pxtoem 10/@pxtoem 0;
  }
  .zf-box>p>a{
    font-size:30/@pxtoem;
    color:#108ee9;
  }
</style>
<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        充值银行卡支付密码
        
    </div>

    <div class="boxLogin">
      <div class="boxLogin">
      <p class="p_soy p_bt">请输入六位数字银行卡支付密码，(不能是重复连续的数字)</p>
      <div class="sl-ub sl-ubf1 zf_box">
          <input type="password" name="p1" v-on:keyup="nextmm" id="p1" size="1" maxlength="1" required >
          <input type="password" name="p2" v-on:keyup="nextmm" id="p2" size="1" maxlength="1" required>
          <input type="password" name="p3" v-on:keyup="nextmm" id="p3" size="1" maxlength="1" required>
          <input type="password" name="p4" v-on:keyup="nextmm" id="p4" size="1" maxlength="1" required>
          <input type="password" name="p5" v-on:keyup="nextmm" id="p5" size="1" maxlength="1" required>
          <input type="password" name="p6" v-on:keyup="nextmm" id="p6" size="1" maxlength="1" required>
      </div>

      <p class="p_soy p_bt">请再次输入</p>
       <div class="sl-ub sl-ubf1 zf_box">
          <input type="password" name="p7" v-on:keyup="nextmm" id="p7" size="1" maxlength="1" required >
          <input type="password" name="p8" v-on:keyup="nextmm" id="p8" size="1" maxlength="1" required>
          <input type="password" name="p9" v-on:keyup="nextmm" id="p9" size="1" maxlength="1" required>
          <input type="password" name="p10" v-on:keyup="nextmm" id="p10" size="1" maxlength="1" required>
          <input type="password" name="p11" v-on:keyup="nextmm" id="p11" size="1" maxlength="1" required>
          <input type="password" name="p12" v-on:keyup="nextmm" id="p12" size="1" maxlength="1" required>
        </div>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">下一步</button>
      
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isClick:false
    }
  },
  mounted:function(){
     
     
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk/account-success');
      var result=true;
      return result;
    },
     nextmm:function(e){
      var prev_id =$(e.target).prop("id").slice(1,3);
      var num = $("#p"+prev_id).val();
      if(num!=""){
           prev_id++;
           $("#p"+prev_id).focus();
      }
      
      if(prev_id>12){
        this.isClick=true;
      }
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
 .p_soy{
  color:#999;
  font-size:25/@pxtoem;
  display:block;
  padding-left:30/@pxtoem;
  margin:35/@pxtoem 0 10/@pxtoem 0;
 }
 .zf_box{
    height:94/@pxtoem;
    margin-bottom:24/@pxtoem;
    padding:0 30/@pxtoem;
  }
 .zf_box input{
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
  .zf_box input:first-child{
    border-left:1/@pxtoem solid #999;
    border-radius:10/@pxtoem 0 0 10/@pxtoem;
  }
  .zf_box input:last-child{
    border-radius:0 10/@pxtoem 10/@pxtoem 0;
  }
</style>


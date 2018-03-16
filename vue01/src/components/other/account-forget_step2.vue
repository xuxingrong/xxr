<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        重置银行卡支付密码
        
    </div>

    <div class="boxLogin">
     <ul>
          <li>
              <label>验证码</label>
               <input type="text" placeholder="请输入短信验证码" v-on:keyup="s_deleted" class="l_yzm"/>
               <div class="l_icons">
               <i class="l_icon l_delete hide" v-on:click="clear"></i>
              <button class="reget" v-bind="{'disabled':reval}" v-on:click="re_ann">重新获取(<span id="d_time" v-model="d_n">{{d_n}}</span>s)</button>
              </div>
          </li>
       </ul>
       <p class="lc_h4">我们已发送验证码短信已发送到你的手机<span>150****5678</span></p>
      <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()"   >下一步</button>
    </div>
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isClick:false,
      d_n:120,
      reval:true,
      timer:""
    }
  },
  mounted:function(){
      $(".l_yzm").bind('input propertychange', function() {
         var ly=$(".l_yzm").val();
         if(ly!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })
      
      var n=this.d_n;
      var _this=this;

      this.timer=setInterval(function(){
         n--;
         $("#d_time").text(n);
         if(n==0){
           clearInterval(_this.timer);
           $(".reget").removeAttr('disabled').text("获取验证码");
         }
      },1000)
 
      
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk/account-forget_step3');
      var result=true;
      return result;
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input[type="text"]').val('');
     $(".comBtm").attr('disabled','true');
    },
    re_ann:function(){
       var test="重新获取(<span id='d_time' v-model='d_n'>"+this.d_n+"</span>s)";
       $(".reget").attr('disabled','true').html(test);
       var n=this.d_n;
       var _this = this;
       this.timer=setInterval(function(){
         n--;
         $("#d_time").text(n);
         if(n==0){
           clearInterval(_this.timer);
           $(".reget").removeAttr('disabled').text("获取验证码");
         }
      },1000)
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
  .boxLogin .l_icons {
    right:-30/@pxtoem;
  }
  button.reget:disabled {
    background: #ddd;
    color:#333;
  }
 .lc_h4{
   text-align:left;
   padding-left:30/@pxtoem;
   font-size:25/@pxtoem;
   margin-top:20/@pxtoem;;
 }
 .lc_h4 span{
   color:#108ee9;
 }
</style>

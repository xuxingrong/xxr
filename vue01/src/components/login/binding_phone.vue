<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        绑定手机号
        
    </div>

    <div class="boxLogin">
      <ul>
          <li>
               <label>手机号</label>
               <input type="number" class="l_number" placeholder="请输入手机号" v-on:keyup="s_deleted"/>
               <div class="l_icons ">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                
              </div>
          </li>
          <li>
               <label>验证码</label>
               <input type="number" placeholder="请输入验证码" v-on:keyup="s_deleted" class="l_yzm"/>
               <div class="l_icons pull_right">
               <i class="l_icon l_delete hide" v-on:click="clear"></i>
              <button class="reget" v-bind="{'disabled':reval}" v-on:click="re_ann">获取验证码</button>
              </div>
          </li>
       </ul>
       
      <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()"   >提交</button>
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
      reval:false,
      timer:""
    }
  },
  mounted:function(){
      $(".l_number,.l_yzm").bind('input propertychange', function() {
         var ly=$(".l_yzm").val();
         var ln=$(".l_number").val();
         if(ly!=="" && ln!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk/binding');
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
       //console.log(n);
       var _this = this;
       this.timer=setInterval(function(){
       //console.log(_this.timer);
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
  .boxLogin .pull_right {
    right:-30/@pxtoem;
  }
  button.reget:disabled {
    background: #ddd;
    color:#333;
  }
  .pay_spc{
    margin-left:25/@pxtoem;
  }
  
</style>

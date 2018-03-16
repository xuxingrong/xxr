<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        找回密码
        
    </div>

   <!-- <div class="f_title sl-ub">
          <div id="fp" class="f_child sl-ubf1 f_active" v-on:click="fChange">手机号找回</div>
          <div id="fe" class="f_child sl-ubf1" v-on:click="fChange">邮箱找回</div>
    </div>-->

    <div class="boxLogin">
<!--===手机号找回-->
      <ul class="f_spc">
          <li>
               <label>手机号</label>
               <input type="text" placeholder="请输入手机号码" v-on:keyup="s_deleted" class="l_phone"/>
               <div class="l_icons">
                 <i class="l_icon l_delete hide" v-on:click="clear"></i>
               </div>
          </li>
          <li>
               <label>验证码</label>
               <input type="type" placeholder="请输入图片验证码" class="l_yzm" v-on:keyup="s_deleted" id="code_input"/>
               <div class="l_icons">
                 <i class="l_icon l_delete hide" v-on:click="clear"></i>
                 <div class="l_yzmt">
                   <div id="v_container" ></div>
                 </div>
              </div>
          </li>
       </ul>
       <ul class="f_spc hide">
          <li>
               <label>邮箱</label>
               <input type="text" placeholder="请输入绑定的邮箱" v-on:keyup="s_deleted" class="l_email"/>
               <div class="l_icons">
                 <i class="l_icon l_delete hide" v-on:click="clear"></i>
               </div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()" id="my_button">下一步</button>
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
      seen:false,
      semess:''
    }
  },
  mounted:function(){
     $(".l_phone,.l_yzm,.l_email").bind('input propertychange', function() {
         var lp=$(".l_phone").val();
         var ly=$(".l_yzm").val();
         var le=$(".l_email").val();
         if(lp!=="" && ly!=="" || le!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })

      $(".f_title").change(function(){
      alert(123);
        if($(this).attr('id')=='fp'){
           alert(1);
        }else{
           alert(2);
        }

      })
     
     var tel=sessionStorage.getItem('telphone');
     $('.l_phone').val(tel);
     var verifyCode = new GVerify("v_container");
     var _this=this;
     $("#my_button").click(function(){
       var res= verifyCode.validate($("#code_input").val());
       var lp= $('.l_phone').val(); 
       if(_this.GLOBAL.regular.reg_phone.test(lp)){
           if(res){
                //alert("验证正确");
                sessionStorage.setItem('telphone',lp);
                _this.$router.push('/hhk/found_step1');
           }else{
             _this.seen=!_this.seen;
             _this.semess='验证码有误';
             $('.l_yzm').val('').focus();
              var timer=setTimeout(function(){
                               _this.seen=false;
              },3000)
           }
      }else{
        _this.seen=!_this.seen;
        _this.semess='手机号码有误';
         var timer=setTimeout(function(){
                               _this.seen=false;
         },3000)
      }
    })

  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    anPd: function(){
     // this.$router.push('/hhk/found_step1');
    },
    fChange:function(e){
      $(e.target).addClass('f_active').siblings().removeClass('f_active');
      $('.f_spc').toggleClass("hide");
    }
  },
  computed:{
    ww:function(){
      return  ;
    },
     all_height:function(){
      return window.innerHeight + 'px'
    }
  },
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .f_title {
   text-align:center;
   background:#fff;
  }
  .f_title .f_child{
   border-bottom:4/@pxtoem #fff solid;
   padding:25/@pxtoem 0;
   font-size:32/@pxtoem;
  }
  .f_title .f_child.f_active{
   border-bottom:4/@pxtoem #d8272a solid;
   color:#d8272a
  }
   #v_container{
    width:250/@pxtoem;
    height:89/@pxtoem;
   }
</style>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .boxLogin .l_icon {
    margin-top:-12/@pxtoem;
  }
  .boxLogin .l_yzmt {
   display:inline-block;
   vertical-align:middle;
   position:relative;
   right:-30/@pxtoem;
   top:-3/@pxtoem;
  }
</style>


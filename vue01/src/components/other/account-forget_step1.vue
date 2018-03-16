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
      <ul>
          <li>
               <label>姓名</label>
               <span class="pay_spc">*惠</span>
               <div class="l_icons">
                 <i class="l_icon l_delete hide" v-on:click="clear"></i>
               </div>
          </li>
          <li>
               <label>证件号</label>
               <input type="text" class="l_number" placeholder="证件号码" v-on:keyup="s_deleted"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
       </ul>
       <p class="p_soy p_to">填入交通银行储蓄卡卡号，尾数8888</p>
       <ul>
         <li>
               <label>卡号</label>
               <input type="text" class="l_cardn" placeholder="银行卡卡号" v-on:keyup="s_deleted"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
       </ul>
       <p class="p_soy p_bt">以上内容仅作为银行卡信息对比，海惠网将严格保密</p>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">下一步</button>
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
      $(".l_number,.l_cardn").bind('input propertychange', function() {
         var ln=$(".l_number").val();
         var lc=$(".l_cardn").val();
         if(ln!=="" && lc!=="" ){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
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
     $(e.target).parents('li').find('input').val('');
     $(".comBtm").attr('disabled','true');
    },
    anPd: function(){
      this.$router.push('/hhk/account-forget_step2');
      //this.$router.push('/hhk/register_step1');
      var result=true;
      return result;
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
 .pay_spc{
   margin-left:25/@pxtoem;
 }
 .boxLogin ul li label {
    width:120/@pxtoem;
    display:inline-block;
   }
 .p_soy{
  color:#999;
  font-size:23/@pxtoem;
  display:block;
  padding-left:30/@pxtoem;
 }
 .p_to{
  margin-top:35/@pxtoem;
  margin-bottom:12/@pxtoem;
 }
 .p_bt{
  margin-top:12/@pxtoem;
 }
</style>


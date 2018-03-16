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
            <span class="pay_spc">15012345678</span>
          </li>
       </ul>
       <p class="soy_text">您已绑定手机号，可以用验证过的手机号来找回密码</p>
      <button class="comBtm" v-on:click="anPd()">更换手机号</button>
    </div>
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
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
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk/binding_phone');
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
<style lang="less">
  @pxtoem:28.125rem;
  .soy_text{
   text-align:center;
   color:#999;
   display:block;
   margin-top:15/@pxtoem;
   font-size:26/@pxtoem;
  }
</style>

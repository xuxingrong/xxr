<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        修改邮箱地址
        <router-link to="/hhk/binding_phone_email_step1" class="all-re sl-ub sl-uac sl-upc">
          编辑
        </router-link>
    </div>

    <div class="boxLogin">
      <ul>
          <li>
            <span class="pay_spc">123456@qq.com</span>
          </li>
       </ul>
       <p class="soy_text">该邮箱还未验证，请登录邮箱查收邮件并验证</p>
      <button class="comBtm" v-on:click="anPd()">重新发送验证邮件</button>
    </div>
     <aside class="pop-box" v-if="cancel">
        <div class="p_change" >
          <h4>一封验证邮件已发送至123456@qq.com，请登录你的邮箱查收并通过邮件验证</h4>
          <div class="p_tt clearfix">
            
            <i class="p_su" v-on:click="sure_btm">确定</i>
          </div>
        </div>
     </aside>
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      cancel:true
     }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('');
       this.cancel=!this.cancel;
    },
    sure_btm:function(){
      this.cancel=!this.cancel;
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
  .soy_text{
    color:#d8272a;
  }
  .pop-box .p_change .p_tt {
    bottom:25/@pxtoem;

  }
  .p_su{
    text-align:center;
    color: #0087ff;
    display:block;
  }
</style>

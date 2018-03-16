<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        修改邮箱地址
        
    </div>

    <div class="boxLogin">
      <ul>
          <li>
            <span class="pay_spc">123456@qq.com</span>
          </li>
       </ul>
       <p class="soy_text">您已绑定邮箱，可以用验证过的邮箱来找回密码</p>
      <button class="comBtm" v-on:click="anPd()">解除绑定</button>
    </div>
    <aside class="pop-box" v-if="cancel">
        <div class="p_change" >
          <h4>要解除与<em class="fun_name">邮箱账号</em>的绑定吗？</h4>
          <div class="p_tt clearfix">
            <span v-on:click="can_btm">取消</span>
            <span class="p_red" v-on:click="sure_btm">确定</span>
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
      cancel:false
     }
  },
 methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    anPd: function(){
       this.cancel=!this.cancel;
     },
    can_btm:function(){
      this.cancel=!this.cancel;
    },
    sure_btm:function(){
      this.$router.push('/hhk/binding');
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

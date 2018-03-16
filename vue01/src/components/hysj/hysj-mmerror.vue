<template>
  <section  v-on:click.self="returnBefore">
      <div class="fd-center mmerrorbox">
        <div>
          支付密码不正确，你还可以再输<span>2</span>次
        </div>
        <div class="sl-ub">
          <div v-on:click="returnBefore">重新输入</div>
          <router-link to="/hhk/account-forget_step1">忘记密码</router-link>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'hysj-mmerror',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasSc:true
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  mounted:function(){
    this.$emit('childE',false);
  },
  methods:{
    returnBefore:function(){
      this.$emit('childE',true);
      this.$router.go(-1);
    },
    xz_delet:function(e){
      var ze = $(e.target);
      if(ze.hasClass("selected")){
        ze.removeClass("selected");
      }else{
        ze.addClass("selected")
      } 
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    position:fixed;
    z-index:1003;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .mmerrorbox{
    position:absolute;
    width:620/@pxtoem;
    height:280/@pxtoem;
    background:#fff;
    border-radius:10/@pxtoem;
  }
  .mmerrorbox>div:first-child{
    font-size:30/@pxtoem;
    line-height:46/@pxtoem;
    color:#333;
    padding:50/@pxtoem 125/@pxtoem;
    text-align:center;
  }
  .mmerrorbox .sl-ub{
    box-sizing:border-box;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    border-top:1/@pxtoem solid #eee;
    text-align:center;
  }
  .sl-ub>div{
    width:50%;
    border-right:1/@pxtoem solid #eee;
    color:#108ee9;
  }
  .sl-ub>a{
    display:block;
    width:50%;
    color:#108ee9;
  }
</style>
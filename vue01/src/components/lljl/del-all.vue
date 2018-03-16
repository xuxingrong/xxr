<template>
  <section class="del-lljl-section" v-on:click.self="returnBefore">
    <div class="lljl-del-box fd-center">
      <div>
        确定清除浏览记录？
      </div>
      <div class="sl-ub sl-ubf1 lljl-down-box">
        <div class="lljl-close" v-on:click="returnBefore">取消</div>
        <div class="lljl-yes" v-on:click="delall">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
 
export default {
  name: 'indexzd-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      
    }
  },
  methods:{
    returnBefore:function(){
      this.$emit("childdel",false,false,false);
      this.$router.go(-1);
    },
    delall:function(){
      this.$emit("childdel",true,false,true);
      this.$router.go(-1);
    }
  },
  mounted:function(){
    this.$emit("childdel",true,false,false);
  }
}
</script>
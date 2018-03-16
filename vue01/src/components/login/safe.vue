<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        安全中心
     </div>
     
     <div class="setBox">
         <router-link to="/hhk/safe_login">
           <h4>修改登录密码</h4>
           <span><i class="lIcon"></i></span>
        </router-link>
        <router-link to="/hhk/safe_pay_step1" class="mar_spc">
           <h4 class="ishas">设置支付密码</h4>
           <span><i class="lIcon"></i></span>
        </router-link>
<!--===设置支付密码后出现-->
        <!--<router-link to="/hhk/safe_pay_found" class="mar_spc">
           <h4>找回支付密码</h4>
           <span><i class="lIcon"></i></span>
        </router-link>-->
<!--===//设置支付密码后出现-->
        <div class="sSpc" >
           <h4>手机号</h4>
           <span>{{glp(aset.mobile)}}<i class="lIcon"></i></span>
        </div>
         <div class="sSpc" v-on:click="ifClick_el">
           <h4>邮箱地址</h4>
           <span>{{isemail(aset.email)}}<i class="lIcon"></i></span>
        </div>
     </div>
    
     <aside class="pop" v-if="seen">
         <div class="p_box">修改成功</div>
     </aside>
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      seen: false,
      aset:[]
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.push('/hhk')
    },
    s_clear:function(){
      this.seen=!this.seen;
      var _this=this;
      var timer=setTimeout(function(){
        _this.seen=!_this.seen;
      },3000)
    },
     isemail:function(item){
       if(item==""){
         item=""
         return item='未绑定';
       }else{
         return item;
       }
    },
    ifClick_el:function(){
      this.$router.push('binding_phone_email_step1'); 
    },
    glp:function(item){
       if(item==undefined){
         return;
       }else{
         return item.slice(0,3)+'****'+item.slice(7,11);
       }
    },
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
  },
  beforeRouteEnter (to, from, next) {
    var identi = localStorage.getItem("identi");
    if(identi==null){
      next("/hhk/login");
    }else{
      next();
    }
  },
  created:function(){
    var identis = localStorage.getItem("identi");
    var _this=this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'identify':identis,
    };
    var arr = ['timestamp','app_key','app','v','identify'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=myBusinessCard',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.recCode==200){
         _this.aset = da.data.result;
      }else{
        _this.$router.push("/hhk/login");
      }
    })
    .catch(function (error) {
        console.log(error);
    });

     this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=userInfo',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.result.userInfo.password_has==true){
         $('.ishas').text('修改支付密码');
      }else{
         $('.ishas').text('设置支付密码');
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .setBox{
   margin-top:30/@pxtoem;
  }
  .mar_spc{
   margin-bottom:50/@pxtoem;
  }
</style>


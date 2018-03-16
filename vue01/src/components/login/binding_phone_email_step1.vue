<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        修改邮箱地址
        <div class="all-re sl-ub sl-uac sl-upc" v-on:click="changeEmail">
          保存
        </div>
    </div>

    <div class="boxLogin">
      <ul>
          <li>
               <input type="text" class="l_email" placeholder="您的新邮箱地址" v-on:keyup="s_deleted" v-bind:value="aset.email"/>
               <div class="l_icons ">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
        
       </ul>
       <p class="soy_text">请输入邮箱地址，可以用验证过的邮箱来找回密码</p>
    </div>
     <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
         <div class="d_box"><span>{{semess}}</span></div>  
    </dialog>
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isClick:false,
      reval:false,
      timer:"",
      seen:false,
      semess:'',
      aset:''
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
    'identify':identis
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
    console.log(da)
      _this.aset = da.data.result;
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
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
     dia_hide: function(){
      this.seen=!this.seen;
    },
    changeEmail: function(){
      var emails=$('.l_email').val();
      var _this=this;
      function time(){
         return _this.timer=setTimeout(function(){
           this.seen=false;
         },3000)
      }
      if(emails!==""){
        var identis = localStorage.getItem("identi");
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identis,
        'email':emails
        };
        var arr = ['timestamp','app_key','app','v','identify','email'];
        var sign = this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign};
        var option = $.extend(obj,obj2);
        var optionList=this.GLOBAL.getOption(option);
        this.$http({
            method: 'post',
            url: _this.GLOBAL.www+'/apis/member.json?method=saveMyCardInfo',
            data: optionList,
            withCredentials:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
        _this.aset.email=$('.l_email').val();
          if(da.data.recMeg){
              _this.seen=!_this.seen;
              _this.semess=da.data.recMeg;
              var timer=setTimeout(function(){
               _this.seen=false;
               if(da.data.recMeg=='保存成功'){
                   _this.$router.go(-1)
               }
              },1500)
           }
        })
        .catch(function (error) {
            console.log(error);
        });
      }else{
         _this.seen=!_this.seen;
         _this.semess='输入不能为空'
         _this.timer=setTimeout(function(){
           _this.seen=false;
         },3000)
         
      }
   
      //this.$router.push('/hhk/binding_phone_email_step2');
      
    },
    s_deleted:function(e){
      $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input[type="text"]').val('').focus();
     $(".comBtm").attr('disabled','true');
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
  .boxLogin ul li input {
   margin-left:0;
  }
</style>

<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        修改登录密码
        
    </div>

    <div class="boxLogin">
      <ul>
          <li>
               <label>原密码</label>
               <input type="password" class="l_ynumber" placeholder="请输入原密码" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
          <li>
               <label>新密码</label>
               <input type="password" class="l_number" placeholder="请输入新密码(6-20位字符)" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
          <li>
               <label>确定密码</label>
               <input type="password" class="l_renumber" placeholder="请确定新密码(6-20位字符)" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">提交</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isTrue:false,
      isClick:false,
      isTrue2: false,
      seen:false,
      semess:'',
      timer:''
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
  mounted:function(){
     $(".l_ynumber,.l_number,.l_renumber").bind('input propertychange', function() {
         var lny=$(".l_ynumber").val();
         var ln=$(".l_number").val();
         var lnre=$(".l_renumber").val();
         if(ln!=="" && lnre!=="" && lny!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })

  },
  methods:{
    ss:function(){
      this.$router.push('/hhk'); 
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
      var identis = localStorage.getItem("identi");
      var telphone = localStorage.getItem("username");
      var lny=$(".l_ynumber").val();
      var ln=$(".l_number").val();
      var lnre=$(".l_renumber").val();
      var _this=this;
      function time(){
        return _this.timer=setTimeout(function(){
           _this.seen=false;
        },2000)  
      }
    if(ln==lnre && lny!==ln){
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'account':telphone,
      'type':'update',
      'old_pwd':lny,
      'new_pwd':ln,
      'confirm_pwd':lnre
      };
      var arr = ['timestamp','app_key','app','v','identify','account','type','old_pwd','new_pwd','confirm_pwd'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=updatePwd',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
      console.log(optionList);
      console.log(da);
          if(da.data.recMeg){
            _this.seen=!_this.seen;
            _this.semess=da.data.recMeg;
            var timer=setTimeout(function(){
                   _this.seen=false;
            },2000)   
            if(da.data.recMeg=='修改密码成功'){
               localStorage.removeItem("identi");
               var time=setTimeout(function(){
                  _this.seen=false;
                  _this.$router.push('/hhk/login')
                },2000)   
              }
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }else if(lny==ln){
      this.seen=!this.seen;
      this.semess='新密码不能跟旧密码一样';
      time();
    }else{
      this.seen=!this.seen;
      this.semess='密码不一致';
      time();
    }
      //this.$router.push('/hhk/safe');
    
    },
    eyeTrue: function(e){
      $(e.target).toggleClass('l_eyehover');
      var test=$(e.target).parents('li').find('input');
      if($(e.target).hasClass('l_eyehover')){
        test.attr('type','text').focus();
      }else{
        test.attr('type','password').focus();
      }
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
   .boxLogin ul li label {
    width:120/@pxtoem;
    display:inline-block;
   }
   .boxLogin ul li input {
   width:450/@pxtoem;
   }
</style>


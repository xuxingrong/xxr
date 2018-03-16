<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        注册
        
    </div>

    <div class="boxLogin">
      
       <ul>
          <li>
               <label>登录密码</label>
               <input type="password" class="l_number" placeholder="请输入6-20位密码" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
          <li>
               <label>确定密码</label>
               <input type="password" class="l_renumber" placeholder="请再次输入密码" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
         <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
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
      isTrue:false,
      isClick:false,
      isTrue2: false,
      seen:false,
      semess:'',
      timer:''
    }
  },
  mounted:function(){
     $(".l_number,.l_renumber").bind('input propertychange', function() {
         var ln=$(".l_number").val();
         var lnre=$(".l_renumber").val();
         if(ln!=="" && lnre!==""){
           $(".comBtm").removeAttr('disabled');
           
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })
      
      //console.log(sessionStorage.getItem('strphone'));
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
   var t_pho=sessionStorage.getItem('strphone');
   var t_num=$('.l_number').val();
   var t_renum=$('.l_renumber').val();
   
   var _this = this;
   function time(){
     _this.timer=setTimeout(function(){
               _this.seen=false;
     },3000) 
   }
   if(t_num==t_renum){
     var pip=this.GLOBAL.regular.reg_num.test(t_num) && this.GLOBAL.regular.reg_num.test(t_renum);
       if(pip){
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'account':t_pho,
        'password':t_num,
        'pwd_confirm':t_renum
        };
        var arr = ['timestamp','app_key','app','v','account','password','pwd_confirm'];
        var sign = this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign};
        var option = $.extend(obj,obj2);
        var optionList=this.GLOBAL.getOption(option);
        this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=signup',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
          if(da.data.recMeg=='注册成功'){
             _this.seen=!_this.seen;
             _this.semess=da.data.recMeg;
             localStorage.setItem('identi','')
             localStorage.setItem('remember_username',t_pho);
             var timer=setTimeout(function(){
                   _this.seen=false;
                   _this.$router.push('/hhk/login');
             },2000)
          }else{
            _this.seen=!_this.seen;
            _this.semess=da.data.recMeg;
            time();
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
       }else{
         this.seen=!this.seen;
         this.semess="请输入6-20位密码"
         var _this=this;
         var timer=setTimeout(function(){
                 _this.seen=false;
         },3000) 
       }
   }else{
     this.seen=!this.seen;
     this.semess="密码输入不一致"
     time()
   }
   

   
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
<style  lang="less">
  @pxtoem:28.125rem;
  .boxLogin .l_yzm{
   display:inline-block;
   vertical-align:middle;
   }
  .boxLogin .l_yzm img{
   width:160/@pxtoem;
   height:60/@pxtoem;
   margin-top:12/@pxtoem;
  }
</style>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .boxLogin .l_icon {
    margin-top:-12/@pxtoem;
  }
</style>


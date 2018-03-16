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
               <label>手机号</label>
               <input type="number" placeholder="请输入手机号码" v-on:keyup="s_deleted" class="l_phone"/>
               <div class="l_icons">
                 <i class="l_icon l_delete hide" v-on:click="clear"></i>
               </div>
          </li>
          <li>
               <label>验证码</label>
               <input type="text" placeholder="请输入手机验证码" v-on:keyup="s_deleted" class="l_yzm"/>
               <div class="l_icons">
               <i class="l_icon l_delete hide" v-on:click="clear"></i>
              <button class="reget" v-bind="{'disabled':reval}" v-on:click="re_ann">获取验证码</button>
              </div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
         <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
       <div class="lo_xy">
          <input type="checkbox" id="lo_choo"/>
          <span class="newss">我已阅读并同意<span v-on:click="toht">《会员注册协议》</span></span>
       </div>
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
      isClick:false,
      reval:false,
      d_n:120,
      seen:false,
      semess:''
    }
  },
  mounted:function(){
      $("#lo_choo").change(function(){
        var lo=$("#lo_choo").is(':checked');
        var lp=$(".l_phone").val();
        var ly=$(".l_yzm").val();
        if(lp!=="" && ly!=="" && lo){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })
       $(".l_phone,.l_yzm").bind('input propertychange', function() {
         var lp=$(".l_phone").val();
         var ly=$(".l_yzm").val();
         var lo=$("#lo_choo").is(':checked');
         if(lp!=="" && ly!==""  && lo){
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
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    toht:function(){
      this.$router.push('/hhk/hhk-rule')
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    re_ann:function(){
    var tt_number=$('.l_phone').val();
    if(this.GLOBAL.regular.reg_num.test(tt_number)){
    var _this = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'method':'indexData',
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'account':tt_number.toString(),
    'type':'signup'
    };
    var arr = ['timestamp','app_key','app','v','account','type'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    
    
    
    var option1 = {'timestamp':timestamp.toString(),'app':'hhk','app_key':'13971568273','method':'indexData','sign':sign,'v':'2.0','account':tt_number};
    var option3 = 'timestamp='+timestamp.toString()+'&app=hhk&app_key=13971568273&sign='+sign+'&v=2.0&account='+tt_number+'&type=signup';
    var _this=this;
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/member.json?method=sendVcode',
      data: option3,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.recMeg){
        _this.seen=!_this.seen;
        _this.semess=da.data.recMeg;
        var timer=setTimeout(function(){
             _this.seen=false;
        },3000)
        if(da.data.recMeg=='验证码发送成功'){
            var test="重新获取(<span id='d_time' v-model='d_n'>"+_this.d_n+"</span>s)";
            $(".reget").attr('disabled','true').html(test);
            var n=_this.d_n;
            var that = _this;
            _this.timer=setInterval(function(){
              n--;
              $("#d_time").text(n);
              if(n==0){
                clearInterval(that.timer);
                $(".reget").removeAttr('disabled').text("获取验证码");
              }
            },1000)
        }
      }
    })
    .catch(function (error) {
      //console.log(error);
    });
  }else if(tt_number==''){
    this.seen=!this.seen;
    this.semess="手机号码不能为空"
    var _this=this;
         var timer=setTimeout(function(){
             _this.seen=false;
         },3000)
   }else{
    this.seen=!this.seen;
    this.semess="手机号码有误"
     var _this=this;
         var timer=setTimeout(function(){
             _this.seen=false;
         },3000)
   }
  },
  anPd: function(){
    
    var tt_number=$('.l_phone').val();
    var tt_yzm=$('.l_yzm').val();
  if(this.GLOBAL.regular.reg_num.test(tt_number)){
    var _this = this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'method':'indexData',
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'account':tt_number.toString(),
    'type':'signup',
    'vcode':tt_yzm.toString()
    };
    
    var arr = ['timestamp','app_key','app','v','account','type','vcode'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var option3 = 'timestamp='+timestamp.toString()+'&app=hhk&app_key=13971568273&sign='+sign+'&v=2.0&account='+tt_number+'&type=signup&vcode='+tt_yzm.toString();
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/member.json?method=vcodeCheck',
      data: option3,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.recMeg=='手机验证码正确'){
        var strPhone = $('.l_phone').val();
        sessionStorage.setItem('strphone',strPhone)
        _this.$router.push('/hhk/register_step2');
        
      }else{
        _this.seen=!_this.seen;
        _this.semess=da.data.recMeg;
        var timer=setTimeout(function(){
             _this.seen=false;
        },3000)
      }
    })
    .catch(function (error) {
      //console.log(error);
    });
    //this.$router.push('/hhk/register_step2');
   }else{
     this.seen=!this.seen;
    this.semess="手机号码有误"
     var _this=this;
     var timer=setTimeout(function(){
             _this.seen=false;
     },3000) 
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
  },
   
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
  .reget {
    right:-30/@pxtoem;
  }
  .boxLogin .lo_xy input[type="checkbox"]{
    -webkit-appearance: none !important;
    appearance: none !important;
    background:url(../../../static/images/btn_check.png) no-repeat center;
    background-size:100% 100%;
    border-radius: 50%;
    width:40/@pxtoem;
    height:40/@pxtoem;
    display: inline-block;
    vertical-align: middle;
   }
  .boxLogin .lo_xy input[type="checkbox"]:checked{
    background:url(../../../static/images/btn_check_pre.png) no-repeat center;
    background-size:100% 100%;
  }
  .newss{
    display:inline-block;
    vertical-align: middle;
  }
</style>


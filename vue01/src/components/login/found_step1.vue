<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        找回密码
        
    </div>

    <div class="boxLogin">
      <p class="lc_h4">验证码短信已发送到<span>{{sentp}}</span></p>
      <ul>
          <li>
               <input type="text" placeholder="请输入短信验证码" v-on:keyup="s_deleted" class="l_yzm"/>
               <div class="l_icons">
               <i class="l_icon l_delete hide" v-on:click="clear"></i>
              <button class="reget" v-bind="{'disabled':reval}" v-on:click="re_ann">重新获取(<span id="d_time" v-model="d_n">{{d_n}}</span>s)</button>
              </div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
       </dialog> 
      <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()"   >下一步</button>
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
      d_n:120,
      reval:true,
      timer:"",
      seen:false,
      sentp:"",
      two:"2分钟发送一次,还没到两分钟则不进行发送"
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
      
      var n=this.d_n;
      var _this=this;

      
      function timeAll(){
        return _this.timer=setInterval(function(){
         n--;
         $("#d_time").text(n);
         if(n==0){
           clearInterval(_this.timer);
           $(".reget").removeAttr('disabled').text("获取验证码");
         }
        },1000)
      }
      timeAll();

    var telphone=sessionStorage.getItem('telphone');
    var fir=telphone.slice(0,3);
    var las=telphone.slice(7,11);
    this.sentp=fir+'****'+las;

    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'account':telphone.toString(),
    'type':'forgot'
    };
    //console.log(obj);
    var arr = ['timestamp','app_key','app','v','account','type'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    //console.log(option);
    var optionList=this.GLOBAL.getOption(option);
    //var _this=this;
    //console.log(option3);
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/member.json?method=sendVcode',
      data: optionList,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
       //console.log(da);
      if(da.data.recMeg=='验证码发送成功'){
           console.log('发送成功');
        }else if(da.data.recMeg==_this.two){
           _this.seen=!_this.seen;
           _this.semess=da.data.recMeg;
           var timer2=setTimeout(function(){
             _this.seen=false;
           },3000)
        }else{
           _this.seen=!_this.seen;
           _this.semess=da.data.recMeg;
           var timer2=setTimeout(function(){
             _this.seen=false;
             //_this.$router.go(-1);
           },3000)
        }
     
    })
    .catch(function (error) {
      console.log(error);
    });

  },
   beforeRouteEnter (to, from, next) {
    if(from.path == '/hhk/found'){
      next();
    }
    
   
  },
  beforeRouteLeave (to, from, next) {
     clearInterval(this.timer);
     next();
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    anPd: function(){
    var telphone=sessionStorage.getItem('telphone');
    var for_yzm=$('.l_yzm').val();
    var _this=this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'account':telphone,
    'type':'forgot',
    'vcode':for_yzm
    };
    
    var arr = ['timestamp','app_key','app','v','account','type','vcode'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    //console.log(option3);

    
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/member.json?method=vcodeCheck',
      data: optionList,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      // ;
      if(da.data.recMeg=='手机验证码正确'){
        _this.seen=!_this.seen;
        _this.semess=da.data.recMeg;
        var timer=setTimeout(function(){
             _this.seen=false;
             _this.$router.push('/hhk/found_step2');
        },2000)
      }else{
        _this.seen=!_this.seen;
        _this.semess=da.data.recMeg;
        var timer=setTimeout(function(){
             _this.seen=false;
        },3000)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
      
    },
    
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input[type="text"]').val('');
     $(".comBtm").attr('disabled','true');
    },
    re_ann:function(){
       var test="重新获取(<span id='d_time' v-model='d_n'>"+this.d_n+"</span>s)";
       $(".reget").attr('disabled','true').html(test);
       var n=this.d_n;
       var _this = this;
       this.timer=setInterval(function(){
         n--;
         $("#d_time").text(n);
         if(n==0){
           clearInterval(_this.timer);
           $(".reget").removeAttr('disabled').text("获取验证码");
         }
      },1000)

    var telphone=sessionStorage.getItem('telphone');
    var fir=telphone.slice(0,3);
    var las=telphone.slice(7,11);
    this.sentp=fir+'****'+las;

    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'method':'indexData',
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'account':telphone.toString(),
    'type':'forgot'
    };
    var arr = ['timestamp','app_key','app','v','account','type'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    //console.log(option);
    
    
    var option1 = {'timestamp':timestamp.toString(),'app':'hhk','app_key':'13971568273','method':'indexData','sign':sign,'v':'2.0','account':telphone};
    var option3 = 'timestamp='+timestamp.toString()+'&app=hhk&app_key=13971568273&sign='+sign+'&v=2.0&account='+telphone+'&type=forgot';
    //console.log(option3);
    this.$http({
      method: 'post',
      url: _this.GLOBAL.www+'/apis/member.json?method=sendVcode',
      data: option3,
      withCredentials:true,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      // ;
      if(da.data.recMeg){
           _this.seen=!_this.seen;
           _this.semess=da.data.recMeg;
           var timer2=setTimeout(function(){
             _this.seen=false;
           },3000)
        }
     
    })
    .catch(function (error) {
      console.log(error);
    });

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
  .boxLogin .l_icons {
    right:-30/@pxtoem;
  }
  button.reget:disabled {
    background: #ddd;
    color:#333;
  }
 
</style>

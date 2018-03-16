<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        登录
        <router-link to="/hhk/register" class="all-re sl-ub sl-uac sl-upc">
          注册
        </router-link>
    </div>

    <div class="boxLogin">
      <ul>
          <li>
               <label>账号</label>
               <input type="text" class="l_phone" placeholder="请填写手机号码" v-on:keyup="s_deleted"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
          <li>
               <label>密码</label>
               <input type="password" class="l_number" placeholder="请输入6-20位密码" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
                 <i class="l_icon l_eye" v-bind:class="{l_eyehover:isTrue}" v-on:click="eyeTrue"></i>
              </div>
          </li>
       </ul>
       <div class="lo_xy">
          <div class="nojd-username" v-on:click="remember_username"></div>
          <span>记住用户名</span>
          <router-link to="/hhk/found">找回密码</router-link>
       </div>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd">登录</button>
    </div>
    <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
       <div class="d_box"><span>{{semess}}</span></div>  
    </dialog>
    <!--
    <div class="lo_others">
          <h4>-或从以下方式登录-</h4>
          <ul>
             <li><img src="../../../static/images/wxhy.png"/></li>
             <li><img src="../../../static/images/weibo.png"/></li>
             <li><img src="../../../static/images/qqhy.png"/></li>
          </ul>
    </div>
    -->
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      isTrue:false,
      isClick:false,
      seen:false,
      semess:'',
    }
  },
  mounted:function(){
     function yanz(){
         var lp=$(".l_phone").val();
         var ln=$(".l_number").val();
         if(lp!=="" && ln!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
       }
     }
     
     $(".l_phone,.l_number").bind('input propertychange', function() {
         yanz();
     })
       
     var strName = localStorage.getItem('remember_username');
 
     if(strName){
        $('.l_phone').val(strName);
        $('.nojd-username').addClass("jds");
        $(".l_phone").parents('li').find('.l_delete').removeClass('hide');
     }
  },
  methods:{
  remember_username:function(e){
    if(!$(e.target).hasClass("jds")){
      if($('.l_phone').val()!=""){
        localStorage.setItem('remember_username',$.trim($('.l_phone').val()));
        $(e.target).addClass("jds");
      }
    }else{
      localStorage.removeItem('remember_username');
      $(e.target).removeClass("jds");
    }
     
  },
  s_deleted:function(e){
    if($(e.target).hasClass("l_phone")&&$(".nojd-username").hasClass("jds")){
      $(".nojd-username").removeClass("jds")
    }
    $(e.target).parents('li').find('.l_delete').removeClass('hide');
  },
  ss:function(){
    this.$router.push("/hhk")
  },
  ts_show:function(msg){
    this.semess = msg;
    this.seen = true;
    var _this = this;
    setTimeout(function(){
      _this.seen=false;
    },1500) 
  },
  yz_form:function(user,passw){
    if(!this.GLOBAL.regular.reg_phone.test(user)){
      this.ts_show("请输入正确的手机号")
      return false;
    }
    if(!this.GLOBAL.regular.reg_num.test(passw)){
      this.ts_show("请输入6-20位密码")
      return false;
    }
    return true;
  },
  anPd: function(){
    var user=$.trim($('.l_phone').val());
    var passw=$.trim($('.l_number').val());
    if(!this.yz_form(user,passw)){
      return;
    }
    var _this=this;
    

        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'username':user,
        'password':passw
        };
        var arr = ['timestamp','app_key','app','v','username','password'];
        var sign = this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign};
        var option = $.extend(obj,obj2);
        var optionList=this.GLOBAL.getOption(option);
        this.$http({
            method: 'post',
            url: _this.GLOBAL.www+'/apis/member_login.html?',
            data: optionList,
            withCredentials:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
        //console.log(da);
            
            if(da.data.data.identi){
              if(da.data.data.identi.search(/\+/)!=-1){
                _this.anPd();
                return;
              }
                    _this.semess='登录成功';
                    _this.seen=true;
                    var iden=da.data.data.identi;
                    localStorage.setItem('username',user);
                    localStorage.setItem('user_id',da.data.data.user_id);
                    localStorage.setItem('identi',iden);
                    var timet=setTimeout(function(){
                       _this.seen=false;
                       _this.$router.push('/hhk');
                    },1500) 
                }else{
                  if(da.data.msg){
                    _this.semess=da.data.msg;
                  }else{
                    _this.semess=da.data.recMeg;
                  }
                  _this.ts_show(_this.semess);
                   
                }
        })
        .catch(function (error) {
            console.log(error);
        }); 
       
  },
    clear: function(e){
     if( $(e.target).parent().prev().hasClass("l_phone")&&$(".nojd-username").hasClass("jds")){
        $(".nojd-username").removeClass("jds")
     }
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    show:function(){
      return false;
    },
    eyeTrue: function(e){
      this.isTrue=!this.isTrue;
      var test=$(e.target).parents('li').find('input');
      if(this.isTrue==true){
        test.attr('type','text').focus();
      }else{
        test.attr('type','password').focus();
      }
    },
    dia_hide: function(){
      this.seen=!this.seen;
    }
   
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .lo-header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#fff;
    color:#333;
  }
  .lo_center{
    width:86/@pxtoem;
    height:86/@pxtoem;
    position:absolute;
    top:0;
    left:0;
    z-index:10;
  }
  .all-re{
    width:86/@pxtoem;
    height:86/@pxtoem;
    position:absolute;
    top:0;
    right:10/@pxtoem;
    z-index:10;
    color:#d8272a;
    font-size:30/@pxtoem;
  }
  
  .lo-all{
   box-sizing:border-box;
   background:#eee;
   padding-top:85/@pxtoem;
  }
  .lo-all .return-icon{
    width:22/@pxtoem;
    height:38/@pxtoem;
    background:url(../../../static/images/nar_icon_back_black.png) no-repeat center;
    background-size:22/@pxtoem 38/@pxtoem;
  }
  .lo-all input::-webkit-input-placeholder{
    color:#999;
  }
  .boxLogin{
    margin-top:30/@pxtoem;
    font-size:29/@pxtoem;
  }
  .boxLogin input,.boxLogin button{
    font-size:29/@pxtoem;
  }
  .boxLogin ul{
   background:#fff;
  }
  .boxLogin ul li{
   margin:0 30/@pxtoem;
   height:88/@pxtoem;
   line-height:88/@pxtoem;
   position:relative;
   box-sizing: border-box;
  }
  .boxLogin ul li:first-child{
   border-bottom:0.5/@pxtoem solid #f1f1f1;
  }
  .boxLogin ul li input{
   margin-left:30/@pxtoem;
  }
  .boxLogin .l_icons{
   position:absolute;
   top:0;
   right:0;
   line-height:88/@pxtoem;
  }
  .boxLogin .l_icon.hide{
    display:none;
  }
  .boxLogin .l_icon{
   display:inline-block;
   vertical-align:middle;
   width:30/@pxtoem;
   height:30/@pxtoem;
   background-image:url(../../../static/images/btn_delete.png);
   background-position:center;
   background-repeat:no-repeat;
   background-size:28/@pxtoem;
   margin-top:-2/@pxtoem;
  }
  .boxLogin .l_eye{
   background-image:url(../../../static/images/btn_close.png);
   background-size:40/@pxtoem;
   margin-left:8/@pxtoem;
   width:40/@pxtoem;
   height:40/@pxtoem;
  }
  .boxLogin .l_eyehover{
    background-image:url(../../../static/images/btn_show.png);
  }
  .boxLogin .lo_xy{
    margin:18/@pxtoem 30/@pxtoem;
  }
  .nojd-username{
    -webkit-appearance: none !important;
    appearance: none !important;
    background:url(../../../static/images/btn_check.png) no-repeat center;
    background-size:100% 100%;
    border-radius: 50%;
    width:40/@pxtoem;
    height:40/@pxtoem;
    display: inline-block;
    vertical-align: -8/@pxtoem;
   }
  .nojd-username.jds{
    background:url(../../../static/images/btn_check_pre.png) no-repeat center;
    background-size:100% 100%;
  }
  .boxLogin .lo_xy label{
    vertical-align:middle;
  }
  .boxLogin .lo_xy a{
    text-align:right;
    color:#333;
    float:right;
  }
  .comBtm{
    display:block;
    text-align:center;
    margin:70/@pxtoem auto;
    padding:22/@pxtoem 0;
    background:#d8272a;
    color:#fff;
    border-radius:10/@pxtoem;
    font-size:32/@pxtoem;
    width:680/@pxtoem;
  }
  .comBtm:disabled{
     background:#ccc;
  }
  .lo_others{
   text-align:center;
   margin-top:400/@pxtoem;
  }
  .lo_others h4{
    font-weight:normal;
    color:#999;
    fong-size:30/@pxtoem;
  }
  .lo_others ul{
    margin-top:40/@pxtoem;
  }
  .lo_others ul li{
    display:inline-block;
    margin-right:40/@pxtoem;
  }
  .lo_others ul li:last-child{
    margin-right:0;
  }
  .lo_others ul li img{
    width:100/@pxtoem;
    height:100/@pxtoem;
  }
 
  
</style>


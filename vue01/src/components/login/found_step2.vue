<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        重置密码
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
      time:''
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
  
  },
  methods:{
    ss:function(){
      this.$router.go(-1);
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('');
     $(".comBtm").attr('disabled','true');
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    anPd: function(){
    var telphone=sessionStorage.getItem('telphone');
    var ln=$(".l_number").val();
    var lnre=$(".l_renumber").val();
    if(ln==lnre){
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'account':telphone.toString(),
      'type':'reset',
      'new_pwd':ln.toString(),
      'confirm_pwd':lnre.toString()
      };
      
      var arr = ['timestamp','app_key','app','v','account','type','new_pwd','confirm_pwd'];
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
        console.log(da)
        console.log(optionList);
        if(da.data.recMeg=='修改密码成功'){
           _this.seen=!_this.seen;
           _this.semess=da.data.recMeg;
           var timer=setTimeout(function(){
             _this.seen=false;
             _this.$router.push('/hhk/login');
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
     }else{
       this.seen=!this.seen;
       this.semess='密码输入不一致'
       var timer=setTimeout(function(){
             _this.seen=false;
       },3000)
     }
      //this.$router.push('/hhk/login');
    },
    eyeTrue: function(e){
      $(e.target).toggleClass('l_eyehover');
      var test=$(e.target).parents('li').find('input');
      if($(e.target).hasClass('l_eyehover')){
        test.attr('type','text');
      }else{
        test.attr('type','password');
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


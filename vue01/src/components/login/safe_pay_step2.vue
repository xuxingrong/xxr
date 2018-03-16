<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        设置支付密码
        
    </div>

    <div class="boxLogin">
      <ul>
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
      semess:''
    }
  },
  mounted:function(){
     $(".l_ynumber,.l_number,.l_renumber").bind('input propertychange', function() {
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
      var identis = localStorage.getItem("identi");
      var pan=$(".l_number").val();
      var parn=$(".l_renumber").val();
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'new_password':pan,
      'confirm_password':parn
      };
      var arr = ['timestamp','app_key','app','v','identify','new_password','confirm_password'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=modifyPayPassword',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
          //console.log(optionList)
          // ;
          //console.log(da.data.recMeg);
          if(da.data.recMeg){
            _this.seen=!_this.seen;
            _this.semess=da.data.recMeg;
            var timer=setTimeout(function(){
             _this.seen=false;
            if(da.data.recMeg=='密码设置成功'){
                 _this.$router.push('/hhk/safe');
            }
            },3000)

          }
      })
      .catch(function (error) {
          console.log(error);
      });
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
    display:inline-block;
    width:420/@pxtoem;
   }
</style>


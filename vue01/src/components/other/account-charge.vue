<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        账户充值
        
    </div>
    <div class="boxLogin">
      <p class="title_soy">请输入充值金额</p>
       <ul>
         <li>  
            <label>￥</label>
            <input type="number" class="l_number" placeholder="" v-on:keyup="s_deleted"/>
            <div class="l_icons">
              <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
              </div>
          </li>
       </ul>
       <p class="red_soy">充值金额暂不支持升级会员</p>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd">下一步</button>
    </div>
    <div v-if="msg_show" class="dia_smail"><div class="d_box"><span>{{msg}}</span></div></div>
    
    <router-view ></router-view>
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "",
      msg_show:false,
      isTrue:false,
      isClick:false,
      isTrue2: false,
      H5form:{
        timestamp:"",
        app_key:"",
        app:"",
        v:"",
        identify:"",
        method:"",
        type:"",
        amount:"",
        pay_app_id:"",
        sign:"",
      }
    }
  },
  mounted:function(){
     $(".l_number").bind('input propertychange', function() {
         var ln=$(".l_number").val();
         if(ln!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })

  },
  methods:{
    ss:function(){
      this.$router.push('/hhk/account')
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('');
     $(".comBtm").attr('disabled','true');
    },
    anPd: function(){
      var _this=this;
      var identis = localStorage.getItem("identi");
      var obj = {
      'identify':identis,
      'type':'recharge',
      'amount':$(".l_number").val()
      };
      var state = "";
      var j = 0;
      for(var i in obj){
        if(j==0){
          state+= i +"--" +obj[i];
        }else{
          state+= "--"+i +"--" +obj[i];
        }
        j++;
      }
      var www = this.GLOBAL.www;
      if(www.search("test")!=-1){
        var appId = "wx4871c6b739f5cbc8";
        var http = encodeURIComponent("http://test.www.hhwall.com/hhkpay/index.html");
      }else{
        var appId = "wxbfeecf06df1f96b7";
        var http = encodeURIComponent("http://www.hhwall.com/hhkpay/index.html");
      }
      window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+http+"&response_type=code&scope=snsapi_userinfo&state="+state+"#wechat_redirect";
      /*
      window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbfeecf06df1f96b7&redirect_uri=http%3A%2F%2Fwww.hhwall.com%2Fhhkpay%2Findex.html&response_type=code&scope=snsapi_userinfo&state="+state+"#wechat_redirect";
      */
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
  .red_soy{
   margin-top:20/@pxtoem;
   color: #d8272a;
   font-size:25/@pxtoem;
   padding-left:30/@pxtoem;
   display:block;
  }
  .title_soy{
   margin-bottom:20/@pxtoem;
   display:block;
   padding-left:30/@pxtoem;
  }
  .boxLogin ul li input {
    margin-left:0;
  }
</style>


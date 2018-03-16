<template>
  <section v-on:click.self="returnBefore">
    <div v-bind:class="{'lljl-del-box':true,'fd-center':true,'hide':tcHide}">
      <div>
        确定开通{{msg}}？
      </div>
      <div class="sl-ub sl-ubf1 lljl-down-box">
        <div class="lljl-close" v-on:click="returnBefore">取消</div>
        <div v-on:click="nextP" class="lljl-yes">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
 
export default {
  name: 'hysj-tc',
  data () {
    return {
      msg: '红钻会员',
      msgUrl:'',
      tcHide:false
    }
  },
  methods:{
    returnBefore:function(){
      this.$router.go(-1);
    },
    nextP:function(){
      //this.$router.push("/hysj/zftc");
      var sjrole = sessionStorage.getItem("sjrole");
      var _this=this;
      var identis = localStorage.getItem("identi");
      var obj = {
      'identify':identis,
      'type':'updateVip',
      'role':sjrole
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
      var obj = {
        appid:'wx4871c6b739f5cbc8',
        redirect_uri:'http%3A%2F%2Ftest.m.hhwall.com%2Fhysj%2Fzftc',
        response_type:'code',
        scope:'snsapi_base',
        state:'123',
      };
      */
      /*
      this.$http({
        method: 'get',
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4871c6b739f5cbc8&redirect_uri=http%3A%2F%2Ftest.m.hhwall.com%2Fhysj%2Fzftc&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
       //_this.www =response;
        _this.msg = response;
        
      })
      .catch(function (error) {
        console.log(error);
      });*/
       
    }
  },
  mounted:function(){
    var sjrole = sessionStorage.getItem("sjrole");
    switch(sjrole){
      case '4':this.msg = "红钻会员";
      break;
      case '5':this.msg = "黄钻会员";
      break;
      case '6':this.msg = "蓝钻会员";
      break;
      case '7':this.msg = "铂钻会员";
      break;
      default:this.msg = "no_hy";
    }
    if(this.msg == "no_hy"){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    position:fixed;
    z-index:1000;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .lljl-del-box{
    width:620/@pxtoem;
    height:280/@pxtoem;
    position:absolute;
    z-index:1000;
    background:#fff;
    border-radius:10/@pxtoem;
  }
  .lljl-del-box>div:first-child{
    height:192/@pxtoem;
    line-height:192/@pxtoem;
    color:#333;
    font-size:32/@pxtoem;
    text-align:center;
  }
  .lljl-down-box>div{
    box-sizing:border-box;
    width:50%;
    font-size:28/@pxtoem;
    text-align:center;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
  }
  .lljl-close{
    background:#fff;
    color:#333;
    border-top:1/@pxtoem solid #eee;
    border-bottom-left-radius:10/@pxtoem;
  }
  .lljl-yes{
    background:#f23030;
    color:#fff;
    border-top:1/@pxtoem solid #f23030;
    border-bottom-right-radius:10/@pxtoem;
  }
</style>

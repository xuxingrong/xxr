<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        设置
     </div>
     
     <div class="setBox">
        <router-link to="/hhk/set_person" class="s_first">
           <h4 class="listLeft"><img v-bind:src="this.userimg"></h4>
           <span>个人信息<i class="lIcon"></i></span>
        </router-link>
        <router-link to="/hysj" class="mar_spc">
           <h4>会员升级</h4>
           <span>开通立享权益<i class="lIcon"></i></span>
        </router-link>
        <router-link to="/addlist" >
           <h4>我的收货地址</h4>
           <span><i class="lIcon"></i></span>
        </router-link>
        <div class="sSpc" v-on:click="s_clear">
          <h4>清除缓存</h4>
           <span><i class="lIcon"></i></span>
        </div>
        <router-link to="/hhk/set_about">
           <h4>关于海惠网</h4>
           <span>V2.0<i class="lIcon"></i></span>
        </router-link>
     </div>
     <button class="sf_btm" v-on:click="clearMess">退出当前账户</button>
     <aside class="pop" v-if="seen" v-on:click="close">
         <div class="p_box" >{{tis}}</div>
     </aside>
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      seen: false,
      userimg:'../../../static/images/hyzx_touxiang.png',
      tis:''
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    s_clear:function(){
      this.seen=!this.seen;
      this.tis='清除成功';
      var _this=this;
      var timer=setTimeout(function(){
        _this.seen=false;
      },3000)
    },
    close:function(){
      this.seen=false;
    },
    clearMess:function(){
      localStorage.removeItem("identi");
      this.seen=!this.seen;
      this.tis='注销成功';
      var _this=this;
      var timer=setTimeout(function(){
        _this.seen=false;
        _this.$router.push('/hhk/login')
      },2000)
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
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
    'identify':identis.toString()
    };
    var arr = ['timestamp','app_key','app','v','identify'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=userInfo',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.recCode==-501){
         _this.$router.push("/hhk/login");
      }else{
        var head_img=da.data.result.userInfo.ava_url;
        if(head_img==''){
           _this.userimg='../../../static/images/hyzx_touxiang.png';
        }else{
           _this.userimg=head_img;
        }
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .setBox{
   font-size:30/@pxtoem;
  }
  .setBox > a,.sSpc {
   display:block;
   background:#fff;
   color:#333;
   line-height:90/@pxtoem;
   border-bottom:1px #f1f1f1 solid;
   position:relative;
  }
  .setBox .s_first{
    line-height:110/@pxtoem;
    padding:7/@pxtoem 0;
   }
  .setBox > a::after,.sSpc::after {
   display:block;
   content:"";
   clear:both;
  }
  .setBox > a > h4,.sSpc > h4 {
   float:left;
   margin-left:30/@pxtoem;
   display:inline-block;
   font-weight:normal;
  }
  .setBox > a > span,.sSpc > span {
   float:right;
   color:#999;
   display:inline-block;
   margin-right:30/@pxtoem;
   
  }

  .setBox .listLeft{
   width:110/@pxtoem;
   height:110/@pxtoem;
   border-radius:50%;
   overflow:hidden;
  }
  .setBox .listLeft img{
   width:100%;
   height:100%;
  }
  .setBox > a > span .lIcon,.sSpc > span .lIcon{
   display:inline-block;
   vertical-align:middle;
   width:18/@pxtoem;
   height:32/@pxtoem;
   background-image:url(../../../static/images/htk_icon_wddd_ckgd.png);
   background-position:center;
   background-repeat:no-repeat;
   background-size:18/@pxtoem 32/@pxtoem;
   margin-top:-2/@pxtoem;
   margin-left:20/@pxtoem;
  }
  .sf_btm{
    display:block;
    text-align:center;
    padding:22/@pxtoem 0;
    background:#d8272a;
    color:#fff;
    font-size:32/@pxtoem;
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
  }
  .mar_spc{
    margin-bottom:none;
    margin-bottom:22/@pxtoem;
  }
  aside.pop{
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
  }
  aside.pop .p_box{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    border-radius:10/@pxtoem;
    padding:0 10/@pxtoem;
    background:#272727;
    width:180/@pxtoem;
    height:80/@pxtoem;
    color:#fff;
    text-align:center;
    line-height:80/@pxtoem;
    margin:auto;
    background: rgba(0, 0, 0, 0.8);
  }
</style>


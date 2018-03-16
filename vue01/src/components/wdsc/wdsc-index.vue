<template>
  <section>
    <header class="wdsc-header">
      <router-link to="/hhk" class="return sl-ub sl-uac sl-upc" >
        <div class="return-black-ico"></div>
      </router-link>
      我的收藏
      <div v-if="hasSc" v-bind:class="{'edit':true,'red':deletState}" v-on:click="deletPro">
        编辑
      </div>
    </header>
    <div v-bind:class="{'wdsc-nav':true,'sl-ub':!deletState}"> 
      <router-link to="/wdsc/bb">
          <p>宝贝</p>
        </router-link>
      <router-link to="/wdsc/dp">
          <p>店铺</p>
      </router-link>
    </div>
    <router-view v-on:is_has="is_hasSC" v-bind:deletState="deletState" v-bind:tstamp="tstamp" ></router-view>
    <footer v-if="hasSc && deletState"  v-on:click="del_select">
      删除
    </footer>
    <section v-bind:class="{'del-lljl-section':true,'hide':del_box_hide}" v-on:click.self="hide_box" >
      <div class="lljl-del-box fd-center">
        <div>
          确定删除选中的收藏记录？
        </div>
        <div class="sl-ub sl-ubf1 lljl-down-box">
          <div class="lljl-close" v-on:click="hide_box">取消</div>
          <div class="lljl-yes" v-on:click="ajax_del_sc">确定</div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'wdsc-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bb_show:true,
      dp_show:false,
      deletState:false,
      hasSc:true,
      tstamp:0,
      del_box_hide:true
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
    
  },
  methods:{
    hide_box:function(){
      this.del_box_hide = true;
    },
    del_select:function(){
      this.del_box_hide = false;
    },
    deletPro:function(){
      this.deletState = !this.deletState;
    },
    is_hasSC:function(hasSc,deletState){
      this.hasSc = hasSc;
      this.deletState = deletState;
    },
    ajax_del_sc:function(){
      if($(".seletbtn.selected").length<1){
        return;
      }
      var identi = localStorage.getItem("identi");
      var _this = this;
      var idStr = this.getDelIdLists();
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      if(this.$route.path =="/wdsc/dp"){
        var obj = {'timestamp':timestamp,
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identi,
        'shop_id':idStr
        };
        var arr = ['timestamp','app_key','app','v','identify','shop_id'];
        var url = "/apis/member.json?method=favshopDel";
      }else{
        var obj = {'timestamp':timestamp,
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identi,
        'item_id':idStr
        };
        var arr = ['timestamp','app_key','app','v','identify','item_id'];
        var url = "/apis/member.json?method=favDel";
      }
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+url,
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type':
        'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
         
          _this.tstamp = timestamp;
          _this.del_box_hide = true;
          //console.log(response);
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getDelIdLists:function(){
      var arr=[];
      $(".seletbtn.selected").next().each(function(i,dom){
        arr.push($(dom).attr("item_id"));
      });
      var str = arr.join();
      return str;
    }
  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .return-black-ico{
    width:22/@pxtoem;
    height:38/@pxtoem;
    background:url(../../../static/images/nar_icon_back_black.png) no-repeat center;
    background-size:22/@pxtoem 38/@pxtoem;
  }
  .wdsc-nav{
    display:none;
    width:100%;
    height:88/@pxtoem;
    position:fixed;
    background:#fff;
    top:87/@pxtoem;
    z-index:9;
    border-bottom:1/@pxtoem solid #eee;
  }
  .wdsc-nav.sl-ub{
    display: -webkit-box;
    display: box;
  }
  .wdsc-nav>a{
    display:block;
    color:#333;
    width:50%;
  }
  .wdsc-nav p{
    width:280/@pxtoem;
    font-size:30/@pxtoem;
    line-height:82/@pxtoem;
    margin:auto;
    border-bottom:6/@pxtoem solid transparent;
    text-align:center;
  }
  .wdsc-nav .router-link-active p{
    color:#d8272a;
    border-bottom:6/@pxtoem solid #d8272a;
  }
</style>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#fff;
    border-bottom:1/@pxtoem solid #eee;
  }
  .edit{
    width:86/@pxtoem;
    height:100%;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
    font-size:28/@pxtoem;
  }
  .edit.red{
    color:#d8272a;
  }
  footer{
    position:fixed;
    bottom:0;
    z-index:9;
    width:100%;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#d8272a;
    color:#fff;
  }
</style>
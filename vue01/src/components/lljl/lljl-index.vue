<template>
  <section>
    <router-view v-on:childdel="isdeletAll"></router-view>
    <header class="wdsc-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBefore" >
        <div class="return-black-ico"></div>
      </div>
      浏览记录
      <div class="edit sl-ub sl-uac">
        <router-link to="/lljl/delall"  v-bind:class="{'red':deletAllState,'hide':!hasSc}">
        清空
        </router-link>
        <div v-bind:class="{'red':deletState,'hide':!hasSc}" v-on:click="deletPro">
        编辑
        </div>
      </div>
      
    </header>
    <div v-bind:class="{'wdsc-bb-list':true,'del':true}" id="wdscBbList" v-bind:style="{'min-height':all_height}">
    <template v-if="!hasSc">
      <div class="lljl-no-record">
        <div></div>
        <p>暂无浏览记录</p>
        <a v-bind:href="GLOBAL.www">去首页逛逛</a>
      </div>
    </template>
    <template v-else>
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="86/28.125" :s_top="86/28.125">
    <ul class="clearfix">
      	<li v-for="pro in ajax_arr">
          <div v-bind:class="{'seletbtn':true,'hide':!deletState}" v-on:click="xz_delet"></div>
          <a v-bind:href="pro.item_url" v-bind:item_id="pro.item_id" >
            <div class="wdsc-pro-img-box">
              <img v-bind:src="pro.image_default_id" alt="" class="fd-center"/>
            </div>
            <div class="wdsc-pro-xx">
              <div class="wdsc-pro-name">{{pro.goods_name}}</div>
              <div class="wdsc-pro-price">&yen;{{pro.goods_price}}</div>
            </div>
          </a>
        </li>
      </ul>
      </v-iscroll>
      </template>
    </div>
    <footer v-bind:class="{'hide':!deletState}" v-on:click="del_select">
      删除
    </footer>
    <section v-bind:class="{'del-lljl-section':true,'hide':del_box_hide}" v-on:click.self="hide_box" >
      <div class="lljl-del-box fd-center">
        <div>
          确定删除选中的浏览记录？
        </div>
        <div class="sl-ub sl-ubf1 lljl-down-box">
          <div class="lljl-close" v-on:click="hide_box">取消</div>
          <div class="lljl-yes" v-on:click="ajax_del_lists">确定</div>
        </div>
      </div>
  </section>
  </section>
</template>

<script>
import Iscroll from '../v-iscroll';
export default {
  name: 'lljl-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      deletState:false,
      hasSc:true,
      deletAllState:false,
      all_p:1,
      now_p:1,
      is_ajax:false,
      ajax_arr:[],
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
    this.onRefresh();
    
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
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
    isdeletAll:function(deletAllState,deletState,is_del){
      if(is_del){
        this.ajax_del_lists("delAllHustory");
      }
      this.deletAllState = deletAllState;
      this.deletState = deletState;
    },
    is_hasSC:function(hasSc){
      this.hasSc = hasSc;
    },
    returnBefore:function(){
      this.$router.go(-1);
    },
    xz_delet:function(e){
      var ze = $(e.target);
      if(ze.hasClass("selected")){
        ze.removeClass("selected");
      }else{
        ze.addClass("selected")
      } 
    },
    ajax_get_lists:function(p,done){
      if(this.is_ajax) return;
      this.is_ajax = true;
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identi,
      'page':p
      };
      var arr = ['timestamp','app_key','app','v','identify','page'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=hustoryList',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          if(_this.now_p==1){
            _this.ajax_arr = response.data.result.fav_info;
            if(response.data.result.totalcount == 0){
              _this.hasSc = false;
            }
            _this.all_p = Math.ceil(response.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            _this.ajax_arr = _this.ajax_arr.concat(response.data.result.fav_info);
          }
          if($(".seletbtn.selected").length>0){
            $(".seletbtn").removeClass("selected");
          }
          if(done){
            if(_this.now_p>=_this.all_p){
              done("yes");
            }else{
              done();
            }
          }else{
            if(_this.now_p==_this.all_p){
              _this.$nextTick(function(){
                $(".load-more span").html("数据已经全部加载完成");
              });
            }
          }
          _this.del_box_hide = true;
          _this.is_ajax = false;
     //console.log(response);
        }else{
          //console.log(response);
          _this.is_ajax = false;
          _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
        _this.is_ajax = false;
        console.log(error);
      });
    },
    onRefresh:function(done) {
      this.now_p = 1;
      this.ajax_get_lists(this.now_p,done);
    },
    onInfinite(done) {
      if(this.now_p>=this.all_p){
        return;
      }
      this.now_p++;
      this.ajax_get_lists(this.now_p,done);
    },
    ajax_del_lists:function(style){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      if(style=="delAllHustory"){
        var url = "/apis/member.json?method=delAllHustory";
        var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'identify':identi
        };
        var arr = ['timestamp','app_key','app','v','identify'];
      }else{
        if($(".seletbtn.selected").length<1){
          return;
        }
        var url = "/apis/member.json?method=delHustory";
        var idStr = this.getDelIdLists();
        var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'identify':identi,
          'item_id':idStr
        };
        var arr = ['timestamp','app_key','app','v','identify','item_id'];
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          if(style=="delAllHustory"){
            _this.ajax_get_lists(1);
            _this.deletAllState = false;
            _this.hasSc = false;
          }else{
            _this.ajax_get_lists(1);
          }
          //console.log(response);
        }else{
         // console.log(response);
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
  },
  components : {
    'v-iscroll': Iscroll
  }
}
</script>
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
    box-sizing:border-box;
    height:100%;
    padding:28/@pxtoem 0;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
    font-size:28/@pxtoem;
  }
  .edit>div{
    line-height:30/@pxtoem;
    padding:0 24/@pxtoem;
    color:#333;
  }
  .edit>a{
    display:block;
    line-height:30/@pxtoem;
    padding:0 24/@pxtoem;
    border-right:1/@pxtoem solid #999;
    color:#333;
  }
  .edit>.hide{
    display:none;
  }
  .edit>.red{
    color:#d8272a;
  }
  .wdsc-bb-list.del{
    padding-top:87/@pxtoem;
  }
  .wdsc-bb-list{
    box-sizing:border-box;
    background:#eee;
  }
  .seletbtn{
    position:absolute;
    z-index:7;
    top:24/@pxtoem;
    left:24/@pxtoem;
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../../static/images/icon_xz.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  .seletbtn.selected{
    background:url(../../../static/images/icon_gouxuan_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
  footer{
    position:fixed;
    bottom:0;
    z-index:9;
    width:100%;
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#d8272a;
    color:#fff;
  }
</style>
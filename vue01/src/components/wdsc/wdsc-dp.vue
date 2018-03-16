<template>
  <section>
  <div v-bind:class="{'wdsc-dp-list':true,'del':deletState}" v-bind:style="{height:all_height}">
    <template v-if="!hasSc"> 
    <div class="wdsc-no-record">
      <div></div>
      <p>暂无收藏</p>
    </div>
    </template>
    <template v-else>
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="f_top/28.125" :s_top="86/28.125">
    <ul>
      	<li v-for="dp_list in ajax_arr" class="sl-ub sl-uac">
          <div v-bind:class="{'seletbtn':true,'hide':!deletState}" v-on:click="xz_delet"></div>
          <a v-bind:href="dp_list.shop_url" v-bind:item_id="dp_list.shop_id" class="sl-ub sl-uac">
            <img v-bind:src="dp_list.shop_logo" alt="" class="wdsc-dp-img-box"/>
            <div class="wdsc-dp-name">{{dp_list.shop_name}}</div>
            <div v-bind:class="{'wdsc-dp-price':true,'sl-ub':true,'sl-uac':true,'hide':deletState}">点击查看<i></i></div>
          </a>
        </li>
      </ul>
      </v-iscroll>
      </template>
    </div>
    </section>
</template>

<script>
import Iscroll from '../v-iscroll';
export default {
  name: 'wdsc-dp',
  props:['deletState','tstamp'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasSc:true,
      is_loading:true,
      all_p:1,
      now_p:1,
      is_ajax:false,
      ajax_arr:[],
      f_top:174
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
    this.ajax_get_lists();
 
 
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  mounted:function(){
    this.tellP();
  },
  methods:{
    xz_delet:function(e){
      var ze = $(e.target);
      if(ze.hasClass("selected")){
        ze.removeClass("selected");
      }else{
        ze.addClass("selected")
      } 
    },
    tellP:function(){
      this.$emit('is_has',this.hasSc,false);
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
      'identify':identi
      };
      var arr = ['timestamp','app_key','app','v','identify'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=shopsCollect',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          
        if(_this.now_p==1){
            _this.ajax_arr = response.data.result.favshop_info;
            if(response.data.result.totalcount == 0){
              _this.hasSc = false;
              _this.deletState = false;
              _this.tellP();
            }
            _this.all_p = Math.ceil(response.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            _this.ajax_arr = _this.ajax_arr.concat(response.data.result.favshop_info);
          }
          if($(".seletbtn.selected").length>0){
            $(".seletbtn").removeClass("selected");
          }
          _this.is_loading = false;
          _this.$emit('childE',_this.is_loading);
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
          _this.is_ajax = false; 
     //console.log(response);
        }else{
          _this.is_ajax = false; 
          //console.log(response);
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
    }
  },
  watch:{
    tstamp:function(){
      this.ajax_get_lists();
    },
    deletState:function(){
      if(this.deletState){
        this.f_top = 86;
      }else{
        this.f_top = 174;
      }
    }
  },
  components : {
    'v-iscroll': Iscroll
  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .wdsc-dp-list li{
    height:146/@pxtoem;
    border-bottom:1/@pxtoem solid #eee;
    padding:0 24/@pxtoem;
    background:#fff;
  }
  .wdsc-dp-list li a{
    height:100%;
  }
  .wdsc-dp-img-box{
    box-sizing:border-box;
    width:100/@pxtoem;
    height:100/@pxtoem;
    border:1px solid #eee;
    margin-right:20/@pxtoem;
  }
  .wdsc-dp-name{
    width:430/@pxtoem;
    font-size:30/@pxtoem;
    line-height:32/@pxtoem;
    color:#333;
    margin-right:30/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .wdsc-dp-price{
    color:#999;
    width:122/@pxtoem;
    font-size:24/@pxtoem;
    line-height:26/@pxtoem;
  }
  .wdsc-dp-price.hide{
    display:none;
  }
  .wdsc-dp-price>i{
    display:block;
    width:12/@pxtoem;
    height:24/@pxtoem;
    background:url(../../../static/images/icon_wddd_ckgd.png) no-repeat center;
    background-size:12/@pxtoem 24/@pxtoem;
    margin-left:10/@pxtoem;
  }
  .wdsc-no-record>div{
    width:198/@pxtoem;
    height:198/@pxtoem;
    background:url(../../../static/images/icon_shoucang.png) no-repeat center;
    background-size:198/@pxtoem 198/@pxtoem;
    margin:315/@pxtoem auto 0;
  }
  .wdsc-no-record>p{
    font-size:30/@pxtoem;
    margin-top:40/@pxtoem;
    text-align:center;
  }
</style>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .wdsc-dp-list{
    box-sizing:border-box;
    padding-top:176/@pxtoem;
    background:#eee;
  }
  .wdsc-dp-list.del{
    padding-top:87/@pxtoem;
  }
  .seletbtn{
    width:40/@pxtoem;
    height:40/@pxtoem;
    background:url(../../../static/images/icon_xz.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
    margin-right:24/@pxtoem;
  }
  .seletbtn.selected{
    background:url(../../../static/images/icon_gouxuan_pre.png) no-repeat center;
    background-size:40/@pxtoem 40/@pxtoem;
  }
</style>
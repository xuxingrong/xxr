<template>
  <section>
  <div v-bind:class="{'wdsc-bb-list':true,'del':deletState}" v-bind:style="{'min-height':all_height}">
    <template v-if="!hasSc"> 
    <div class="wdsc-no-record">
      <div></div>
      <p>暂无收藏</p>
    </div>
    </template>
    <template v-else>
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="f_top/28.125" :s_top="86/28.125">
    <ul class="clearfix">
      	<li v-for="product in ajax_arr">
          <div v-bind:class="{'seletbtn':true,'hide':!deletState}" v-on:click="xz_delet"></div>
          <a v-bind:href="product.item_url" v-bind:item_id = product.item_id>
            <div class="wdsc-pro-img-box">
              <img v-bind:src="product.image_default_id" alt="" class="fd-center"/>
            </div>
            <div class="wdsc-pro-xx">
              <div class="wdsc-pro-name">{{product.goods_name}}</div>
              <div class="wdsc-pro-price">&yen;{{product.goods_price}}</div>
            </div>
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
  name: 'wdsc-bb',
  props:['deletState','tstamp'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hasSc:true,
      all_p:1,
      now_p:1,
      is_ajax:false,
      ajax_arr:[],
      f_top:174
    }
  }, 
  created:function(){
    
    this.onRefresh();
    //this.ajax_get_lists();
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
        url: _this.GLOBAL.www+'/apis/member.json?method=itemsCollect',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
        if(_this.now_p==1){
            _this.ajax_arr = response.data.result.fav_info;
            if(response.data.result.totalcount == 0){
              _this.hasSc = false;
              _this.tellP();
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
          _this.is_ajax = false; 
     //console.log(response);
        }else{
         // console.log(response);
          _this.is_ajax = false;
          _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
        console.log(error);
        _this.is_ajax = false;
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
      this.onRefresh();
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
  .wdsc-bb-list li{
    float:left;
    width:50%;
    position:relative;
    box-sizing:border-box;
    border-bottom:3/@pxtoem solid #eee;
  }
  .wdsc-bb-list li:nth-child(2n+1){
    border-right:3/@pxtoem solid #eee;
  }
  .wdsc-bb-list li:nth-child(2n){
    border-left:3/@pxtoem solid #eee;
  }
  .wdsc-pro-img-box{
    width:100%;
    height:387/@pxtoem;
    position:relative;
    background:#fff;
  }
  .wdsc-pro-img-box img{
    position:absolute;
    width:290/@pxtoem;
    height:auto;
  }
  .wdsc-pro-xx{
    box-sizing:border-box;
    padding:0 12/@pxtoem;
    background:#fff;
  }
  .wdsc-pro-name{
    font-size:24/@pxtoem;
    line-height:30/@pxtoem;
    height:60/@pxtoem;
    color:#333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .wdsc-pro-price{
    color:#d8272a;
    font-size:24/@pxtoem;
    line-height:60/@pxtoem;
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
  .wdsc-bb-list{
    box-sizing:border-box;
    padding-top:176/@pxtoem;
    background:#eee;
  }
  .wdsc-bb-list.del{
    padding-top:87/@pxtoem;
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
</style>
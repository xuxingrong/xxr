<template>
  <section>
    <template v-if="!no_list">
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="174/28.125" :s_top="86/28.125">
    <ul class="wdyhq-ul">
      <template v-if="dd_type==1">
          <li v-for="yhq in ajax_arr">
            <div class="wdyhq-box wdyhq-wsy sl-ub">
              <div class="ico hong">
                <div class="sl-ub sl-upc sl-uae">
                  <span class="money-ico">&yen;</span>
                  <div class="money">{{parseInt(yhq.price)}}</div>
                </div>
                <div>
                  {{yhq.coupon_name}}
                </div>
              </div>
              <div class="wdyhq-box-xx">
                <div>
                  <div class="wdyhq-sm-h">
                    {{yhq.coupon_desc}}
                  </div>
                  <div class="wdyhq-xzdt sl-ub">
                    <div>{{js_dt(yhq.use_avail_time)}}-{{js_dt(yhq.use_inval_time)}}</div>
                    <div class="sl-ub sl-upe">
                      <div class="ljsy">立即使用</div>
                    </div>
                  </div>
                </div>
                <div class="sl-ub">
                  <div>使用说明</div>
                  <div class="sl-ub sl-uac sl-upe">
                    <div v-on:click="show_desc" class="wdyhq-show-sm wdyhq-show-x"></div>
                  </div>
                </div>
                
                <div v-if="is_kgq(yhq.use_inval_time)" class="kgq"></div>
              </div>
            </div>
            <div class="user-sm-box">
              {{yhq.coupon_desc}}
            </div>
          </li>
      </template>
      <template v-if="dd_type==0">
          <li v-for="yhq in ajax_arr">
            <div class="wdyhq-box wdyhq-wsy sl-ub">
              <div class="ico hui">
                <div class="sl-ub sl-upc sl-uae">
                  <span class="money-ico">&yen;</span>
                  <div class="money">{{yhq.coupon_type}}</div>
                </div>
                <div>
                  {{yhq.coupon_name}}
                </div>
              </div>
              <div class="wdyhq-box-xx">
                <div>
                  <div class="wdyhq-sm-h">
                    {{yhq.coupon_desc}}
                  </div>
                  <div class="wdyhq-xzdt sl-ub">
                    <div>{{js_dt(yhq.use_avail_time)}}-{{js_dt(yhq.use_inval_time)}}</div>
                  </div>
                </div>
                <div class="sl-ub">
                  <div>使用说明</div>
                  <div class="sl-ub sl-uac sl-upe">
                    <div v-on:click="show_desc" class="wdyhq-show-sm wdyhq-show-x"></div>
                  </div>
                </div>
                <div class="ysy"></div>
              </div>
            </div>
            <div class="user-sm-box">
              {{yhq.coupon_desc}}
            </div>
          </li>
      </template>
      <template v-if="dd_type==-1">
          <li v-for="yhq in ajax_arr">
            <div class="wdyhq-box wdyhq-wsy sl-ub">
              <div class="ico hui">
                <div class="sl-ub sl-upc sl-uae">
                  <span class="money-ico">&yen;</span>
                  <div class="money">{{yhq.coupon_type}}</div>
                </div>
                <div>
                  {{yhq.coupon_name}}
                </div>
              </div>
              <div class="wdyhq-box-xx">
                <div>
                  <div class="wdyhq-sm-h">
                    {{yhq.coupon_desc}}
                  </div>
                  <div class="wdyhq-xzdt sl-ub">
                    <div>{{js_dt(yhq.use_avail_time)}}-{{js_dt(yhq.use_inval_time)}}</div>
                  </div>
                </div>
                <div class="sl-ub">
                  <div>使用说明</div>
                  <div class="sl-ub sl-uac sl-upe">
                    <div v-on:click="show_desc" class="wdyhq-show-sm wdyhq-show-x"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="user-sm-box">
              {{yhq.coupon_desc}}
            </div>
          </li>
      </template>
    </ul>
    <div class="footer-tt sl-ub">
      <div class="line"></div>
      <p v-if="dd_type==1">以上是未使用的优惠券</p>
      <p v-if="dd_type==0">以上是近期已使用的优惠券</p>
      <p v-if="dd_type==-1">以上是过期的优惠券</p>
      <div class="line"></div>
    </div>
    </v-iscroll>
    </template>
    <template v-else>
      <div class="no-data">
        <div class="no-data-ico"></div>
        <div class="no-data-txt">暂无数据</div>
      </div>
    </template>
  </section>
</template>

<script>
import Iscroll from '../v-iscroll';
export default {
  name: 'wdyhq-list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dd_type:'1',
      is_loading:true,
      all_p:1,
      now_p:1,
      is_ajax:false,
      ajax_arr:[],
      no_list:false,
    }
  },
  created:function(){
    this.onRefresh();
  },
  watch:{
    $route:function(){
      this.is_loading=true;
      this.$emit("childE",undefined,this.is_loading);
      this.ajax_arr=[];
      this.now_p=1;
      this.all_p=1;
      this.is_ajax=1,
      this.no_list=false;
      $(".load-more span").html("加载中……");
      this.onRefresh();
    }
  },
  methods:{
    js_dd_type:function(){
      var _this = this;
      switch(this.$route.path){
        case "/wdyhq/wsy":_this.dd_type="1";
        break;
        case "/wdyhq/syjl":_this.dd_type="0";
        break;
        default:_this.dd_type="-1";
      }
    },
    show_desc:function(e){
      var pare = $(e.target).parents(".wdyhq-box");
      var bro = pare.siblings(".user-sm-box");
      if(bro.is(":hidden")){
        $(e.target).removeClass("wdyhq-show-x");
        $(e.target).addClass("wdyhq-show-s");
        bro.slideDown();
      }else{
        $(e.target).addClass("wdyhq-show-x");
        $(e.target).removeClass("wdyhq-show-s");
        bro.slideUp();
      }
    },
    ajax_get_lists:function(p,done){
      this.js_dd_type();
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
      'is_valid':this.dd_type,
      'page':p
      };
      var arr = ['timestamp','app_key','app','v','identify','is_valid','page'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=mypcoupon',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          if(_this.now_p==1){
            _this.ajax_arr = response.data.result.couplist;
            if(response.data.result.totalcount == 0){
              _this.no_list = true;
            }
            
            _this.all_p = Math.ceil(response.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            _this.ajax_arr = _this.ajax_arr.concat(response.data.result.couplist);
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
         _this.is_loading = false;
         _this.$emit("childE",response.data.result.counts,_this.is_loading);
          _this.is_ajax = false;
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
    js_dt:function(dt){
      var stamps = dt*1000;
      var y,m,d,str="";
      var dobj = new Date(stamps);
      y = dobj.getFullYear();
      m = dobj.getMonth()+1;
      if(m<10) m='0'+m;
      d = dobj.getDate();
      if(d<10) d='0'+d;
      str = y+"."+m+"."+d;
      return str;
    },
    is_kgq:function(dt){
      var stamps = dt;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      if(dt - timestamp  <= 30*24*3600&&dt - timestamp>0){
        return true;
      }
      return false;
      
      
    }
  },
  components : {
    'v-iscroll': Iscroll
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .wdyhq-ul{
    box-sizing:border-box;
    width:100%;
    padding:0 20/@pxtoem;
  }
  .wdyhq-ul>li{
    margin-top:20/@pxtoem;
    width:100%;
    background:#fff;
  }
  .user-sm-box{
    display:none;
    font-size:24/@pxtoem;
    color:#333;
    height:60/@pxtoem;
    line-height:60/@pxtoem;
    padding:0 24/@pxtoem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .wdyhq-wsy .ico{
    width:200/@pxtoem;
    height:180/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:200/@pxtoem 180/@pxtoem;
  }
  .wdyhq-wsy .ico.hong{
    background-image:url(../../../static/images/yhj_hong.png);
  }
  .wdyhq-wsy .ico.hui{
    background-image:url(../../../static/images/yhj_hui.png);
  }
  .wdyhq-wsy .ico>div{
    color:#fff;
    font-size:24/@pxtoem;
    text-align:center;
  }
  .wdyhq-wsy .ico>div:first-child{
    margin:40/@pxtoem 0 26/@pxtoem;
    height:60/@pxtoem;
  }
  .wdyhq-wsy .ico>div:nth-child(2){
    padding:0 5/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .wdyhq-wsy .money{
    font-size:60/@pxtoem;
    line-height:60/@pxtoem;
  }
  .wdyhq-wsy .ico .money-ico{
    font-size:26/@pxtoem;
  }
  .wdyhq-box-xx{
    width:510/@pxtoem;
    box-sizing:border-box;
    border:1/@pxtoem solid #ddd;
    padding:0 24/@pxtoem;
    position:relative;
  }
  .wdyhq-box-xx>div:first-child{
    height:139/@pxtoem;
    padding-top:24/@pxtoem;
    box-sizing:border-box;
  }
  .wdyhq-sm-h{
    font-size:24/@pxtoem;
    color:#333;
    height:26/@pxtoem;
    line-height:26/@pxtoem;
    margin-bottom:24/@pxtoem;
    display:-webkit-box;
    display:box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .wdyhq-xzdt{
    height:40/@pxtoem;
    line-height:40/@pxtoem;
    padding-top:5/@pxtoem;
  }
  .wdyhq-xzdt>div:first-child{
    color:#999;
    font-size:18/@pxtoem;
    width:60%;
  }
  .wdyhq-xzdt>div:nth-child(2){
    width:40%;
  }
  .ljsy{
    box-sizing:border-box;
    width:120/@pxtoem;
    height:40/@pxtoem;
    line-height:38/@pxtoem;
    text-align:center;
    color:#d8272a;
    border:1/@pxtoem solid #d8272a;
    border-radius:10/@pxtoem;
    font-size:24/@pxtoem;
  }
  .wdyhq-box-xx>div:nth-child(2){
    border-top:1/@pxtoem solid #eee;
    height:38/@pxtoem;
    line-height:38/@pxtoem;
    color:#999;
    font-size:18/@pxtoem;
  }
  .wdyhq-box-xx>div:nth-child(2)>div{
    width:50%;
  }
  .wdyhq-show-sm{
    width:20/@pxtoem;
    height:12/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:20/@pxtoem 12/@pxtoem;
  }
  .wdyhq-show-x{
    background-image:url(../../../static/images/jiantou_x.png);
  }
  .wdyhq-show-s{
    background-image:url(../../../static/images/jiantou_s.png);
  }
  .wdyhq-box-xx .kgq{
    position:absolute;
    z-index:4;
    top:0;
    right:0;
    width:71/@pxtoem;
    height:71/@pxtoem;
    background:url(../../../static/images/kgq.png) no-repeat center;
    background-size:71/@pxtoem 71/@pxtoem;
  }
  .wdyhq-box-xx .ysy{
    position:absolute;
    z-index:4;
    top:0;
    right:0;
    width:120/@pxtoem;
    height:120/@pxtoem;
    background:url(../../../static/images/ysy.png) no-repeat center;
    background-size:120/@pxtoem 120/@pxtoem;
  }
  .footer-tt{
    font-size:24/@pxtoem;
    line-height:24/@pxtoem;
    color:#999;
    text-align:center;
    margin:40/@pxtoem 20/@pxtoem 0;
  }
  .footer-tt>p{
    width:350/@pxtoem;
  }
  .footer-tt .line{
    height:0;
    padding-bottom:12/@pxtoem;
    width:180/@pxtoem;
    border-bottom:1/@pxtoem solid #bbb;
  }
</style>
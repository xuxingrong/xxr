<template>
  <section>
  <div class="wddd-box" id="wdddbox" v-bind:style="{'min-height':all_height}">
    <template v-if="listNum">
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="174/28.125" :s_top="86/28.125">
    <ul class="wddd-lists">
    	<li v-for="order_list in ajax_arr">
        <a class="sl-ub" v-bind:href="GLOBAL.www+'wap/shopcenter.html?shop_id='+order_list.shop_id" >
          <div v-bind:tid="order_list.tid" class="dp-name">{{order_list.shop_name}}<span class="to-ico"></span></div>
          <div v-if="order_list.status == 'WAIT_BUYER_PAY'" class="dd-status">未付款</div>
          <div v-else-if="order_list.status == 'WAIT_SELLER_SEND_GOODS'" class="dd-status">待发货</div>
          <div v-else-if="order_list.status == 'WAIT_BUYER_CONFIRM_GOODS'" class="dd-status">待收货</div>
          <!--<div v-else-if="order_list.status == 'TRADE_FINISHED'" class="dd-status">已完成</div>-->
          <div v-else-if="order_list.status == 'TRADE_CLOSED'" class="dd-status">已关闭</div>
          <div v-else-if="order_list.status == 'TRADE_CLOSED_BY_SYSTEM'" class="dd-status">已关闭</div>
        </a>
        <router-link v-bind:to="'/dddetail/'+order_list.tid">
          <ul>
            <li v-for="product in order_list.order" class="sl-ub">
              <div class="pro-pic">
                <img v-bind:src="product.pic_path" alt="" />
              </div>
              <div class="pro-xx">
                <div class="pro-name">
                  {{product.title}}
                </div>
                <div class="pro-brief">
                  {{product.spec_nature_info}}
                </div>
              </div>
              <div class="pro-price">
                <div>&yen{{product.price}}</div>
                <div><del>&yen{{product.mkt_price}}</del></div>
                <div>&times;{{product.num}}</div>
              </div>
            </li>
          </ul>
        </router-link>
        <div>共<span>{{order_list.itemnum}}</span>件商品&nbsp;合计：<span>{{order_list.payment}}</span>（含运费&yen;{{order_list.post_fee}}）</div>
        <div v-if="order_list.status == 'WAIT_BUYER_PAY'" class="sl-ub sl-upe sl-uac">
          <a v-bind:href="GLOBAL.www+'wap/cancel.html?tid='+order_list.tid+'&from=hhk'" class="mjyfh-ycsh">取消订单</a>
          <a v-bind:href="GLOBAL.www+'wap/create.html?tid='+order_list.tid+'&from=hhk'"   class="mjyfh-ckwl">付款</a>
        </div>
        <!--
        <div v-if="order_list.status == 'WAIT_SELLER_SEND_GOODS'" class="sl-ub sl-upe sl-uac">
          <a href="javascript:void(0);" class="mjyfh-ycsh">申请退款</a>
        </div>
        -->
        <div v-if="order_list.status == 'WAIT_SELLER_SEND_GOODS'" class="sl-ub sl-upe sl-uac">
          <span v-if="order_list.cancel_status == 'WAIT_PROCESS'" style="color:red;">取消订单正在审核</span>
          <span v-else-if="order_list.cancel_status == 'REFUND_PROCESS'"  style="color:red;">取消订单退款处理中</span>
          <span v-else-if="order_list.cancel_status == 'SUCCESS'"  style="color:red;">取消订单成功</span>
          <span v-else-if="order_list.cancel_status == 'FAILS'"  style="color:red;">取消订单驳回</span>
          <a v-else-if="order_list.cancel_status == 'NO_APPLY_CANCEL'" v-bind:href="GLOBAL.www+'wap/cancel.html?tid='+order_list.tid+'&from=hhk'" class="mjyfh-ycsh">取消订单</a>
        </div>
        <div v-if="order_list.status == 'WAIT_BUYER_CONFIRM_GOODS'" class="sl-ub sl-upe sl-uac">
        <!--
          <router-link v-bind:to="'/dddetail/'+order_list.tid" class="mjyfh-ycsh">查看物流
          </router-link>-->
          <a v-bind:href="GLOBAL.www+'wap/confirm-buyer.html?tid='+order_list.tid+'&from=hhk'" class="mjyfh-qrsh">确认收货</a>
        </div>
        <!--<div v-if="order_list.status == 'TRADE_FINISHED'&& order_list.buyer_rate!=0" class="sl-ub sl-upe sl-uac">
          <router-link v-bind:to="'/dddetail/'+order_list.tid" class="mjyfh-ycsh">查看物流
          </router-link>
        </div>-->
        <div v-if="order_list.status == 'TRADE_FINISHED' && order_list.buyer_rate==0" class="sl-ub sl-upe sl-uac">
         <!-- <router-link v-bind:to="'/dddetail/'+order_list.tid" class="mjyfh-ycsh">查看物流
          </router-link>-->
          <a v-bind:href="GLOBAL.www+'wap/member-rate-add.html?tid='+order_list.tid+'&from=hhk'" class="jywc-pj">评价</a>
        </div>
      </li>
    </ul>
    </v-iscroll>
    </template>
    <template v-else>
      <div class="no-data wddd-no-data">
        <div class="no-data-ico"></div>
        <div class="no-data-txt">暂无数据</div>
      </div>
    </template>
  </div>
  </section>
</template>

<script>
import Iscroll from '../v-iscroll';
export default {
  name: 'wddd-lists',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dd_type:"0",
      all_p:1,
      now_p:1,
      is_ajax:false,
      ajax_arr:[],
      listNum:true,
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
  watch:{
    $route:function(){
      this.dd_type=0;
      this.ajax_arr=[];
      this.now_p=1;
      this.all_p=1;
      this.listNum=true;
      this.is_ajax=false;
      $(".load-more span").html("加载中……");
      this.onRefresh();
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
    
  },
  mounted:function(){
    this.$emit('is_has',this.hasSc);
  },
  methods:{
    dd_fk:function(e){
    /*
      var url = $(e.target).attr("burl");
      var _this = this;
      $.ajax({
   url: url,
   type: "GET",
   dataType: 'json',
   success: function (json) { 
    console.log(json);
   },
    complete: function(XMLHttpRequest, textStatus){
      console.log(textStatus);
   },
   error: function(xhr){
    //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
    //请求出错处理
    console.log(xhr);
   }
});
      
      this.$http.get({
        url: url,
      }).then(function (response) {
        console.log(response);
        console.log(typeof response);
         
      })
      .catch(function (error) {
        console.log(error);
      });
      */
    },
    xz_delet:function(e){
      var ze = $(e.target);
      if(ze.hasClass("selected")){
        ze.removeClass("selected");
      }else{
        ze.addClass("selected")
      } 
    },
    js_dd_type:function(){
      switch(this.$route.path){
        case "/wddd/dfk":this.dd_type="1";
        break;
        case "/wddd/dfh":this.dd_type="2";
        break;
        case "/wddd/dsh":this.dd_type="3";
        break;
        case "/wddd/dpj":this.dd_type="4";
        break;
        default:this.dd_type="0";
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
      'page':p
      };
      var arr = ['timestamp','app_key','app','v','identify','page'];
      if(this.dd_type!=0){
        var obj = $.extend(obj,{"s":_this.dd_type});
        arr.push("s");
      }
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=myorder',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        //console.log(response);
        if(response.data.recCode==200){
          if(_this.now_p==1){
            _this.ajax_arr = response.data.result.list;
            if(response.data.result.totalcount == 0 || !response.data.result.totalcount){
              _this.listNum = false;
            }else{
              _this.listNum = true;
            }
            _this.all_p = Math.ceil(response.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            _this.ajax_arr = _this.ajax_arr.concat(response.data.result.list);
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
          //console.log(response);
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
    },
    toDetail:function(e){
      var tid = $(e.target).attr("tid");
      this.$router.push("/dddetail/"+tid);
    }
  },
  components : {
    'v-iscroll': Iscroll
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .wddd-no-data{
    margin-top:160/@pxtoem;
  }
  .wddd-box{
    box-sizing:border-box;
    padding:175/@pxtoem 0 20/@pxtoem;
    background:#eee;
  }
  .wddd-lists>li{
    margin-top:20/@pxtoem;
    background:#fff;
    border-bottom:1/@pxtoem solid #ddd;
  }
  .wddd-lists>li>div,.wddd-lists>li>a{
    padding:0 24/@pxtoem;
    border-top:1/@pxtoem solid #ddd;
  }
  .wddd-lists>li>a{
    display:block;
  }
  .wddd-lists>li>a:first-child{
    display:-webkit-box;
    display:box;
    font-size:28/@pxtoem;
    height:80/@pxtoem;
    line-height:80/@pxtoem;
  }
  .dp-name{
    display:block;
    width:60%;
    color:#333;
  }
  .dd-status{
    width:40%;
    color:#d8272a;
    text-align:right;
  }
  .to-ico{
    display:inline-block;
    width:12/@pxtoem;
    height:20/@pxtoem;
    background:url(../../../static/images/jiantou.png) no-repeat center;
    background-size:12/@pxtoem 20/@pxtoem;
    margin-left:20/@pxtoem;
  }
  .wddd-lists>li>div:nth-child(3){
    font-size:24/@pxtoem;
    height:80/@pxtoem;
    line-height:80/@pxtoem;
    text-align:right;
  }
  .wddd-lists>li>div:nth-child(3)>span:nth-child(2){
    font-size:28/@pxtoem;
  }
  .wddd-lists>li>div:nth-child(4){
    height:98/@pxtoem;
  }
  .wddd-lists>li>div:nth-child(4)>a{
    display:block;
    box-sizing:border-box;
    width:160/@pxtoem;
    height:60/@pxtoem;
    line-height:60/@pxtoem;
    font-size:28/@pxtoem;
    border-radius:4/@pxtoem;
    text-align:center;
    margin-left:24/@pxtoem;
  }
  .mjyfh-ycsh,.mjyfh-ckwl,.scdd{
    color:#333;
    border:1px solid #999;
  }
  .mjyfh-qrsh{
    color:#d8272a;
    border:1px solid #d8272a;
  }
  .wddd-lists>li li{
    padding:24/@pxtoem 0;
  }
  .pro-pic{
    width:158/@pxtoem;
    height:158/@pxtoem;
    border:1/@pxtoem solid #eee;
    margin-right:24/@pxtoem;
  }
  .pro-pic img{
    width:100%;
    height:100%;
  }
  .pro-name{
    color:#333;
    font-size:28/@pxtoem;
    line-height:36/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-bottom:14/@pxtoem;
  }
  .pro-brief{
    color:#999;
    font-size:24/@pxtoem;
    line-height:30/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .pro-xx{
    width:335/@pxtoem;
  }
  .pro-price{
    width:183/@pxtoem;
    font-size:28/@pxtoem;
    text-align:right;
    color:#999;
  }
  .pro-price>div:first-child{
    color:#333;
  }
  .pro-price>div:nth-child(2){
    line-height:70/@pxtoem;
  }
  .jywc-pj{
    color:#fff;
    background:#ff7777;
    border:1/@pxtoem solid #d8272a;
  }
  .load-more,.load-ok{
    background:#fff;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    margin:10/@pxtoem 0;
    text-align:center;
    font-size:34/@pxtoem;
  }
</style>
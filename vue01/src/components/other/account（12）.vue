<template>
  <section class="lo-all" v-bind:style="{'height':all_height}">
  <router-view v-on:childdel="isdeletAll"></router-view>   
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        账户余额
        <div class="all-re sl-ub sl-uac sl-upc" v-on:click="chan_red" v-bind:class="{isb:isTrue}">
          筛选
        </div>
    </div>
    <div class="accTop">
       <div class="t_top ">
           <span>账户余额(元)</span>
           <h4 class="getm">{{yue}}</h4>
       </div>
       <div class="t_btm sl-ub">
         <div class="t_left sl-ubf1" v-on:click="chongz"><i></i>充值</div>
         <div class="t_right sl-ubf1" v-on:click="tix"><i></i>提现</div>
       </div>
       <div v-bind:class="{t_position:'true',t_show:is_show}" v-on:click="chan_red">
          <div class="t_box">
            <ul v-bind:class="{clearfix:'true',ul_show:is_show}">
             <li class="t_active" v-on:click="rec_ss" tid="">全部</li>
             <li v-on:click="rec_ss" tid="add">充值</li>
             <li v-on:click="rec_ss" tid="cash">提现</li>
             <li v-on:click="rec_ss" tid="profile">收益</li>
             <li v-on:click="rec_ss" tid="expense">消费</li>
             <li v-on:click="rec_ss" tid="freeze">冻结</li>
            </ul>
          </div>
       </div>
       <div class="b_in" >
          收支明细<span class="getday">{{dates}}</span><i id="useData"></i>
       </div>
    </div>

    <div class="accBtm">
    <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="510/28.125" :s_top="86/28.125">
       <ul v-if="!ishave">
          <li v-for="rej in record">
             <div class="b_le">
               <span>{{rej.type}}</span>
               <span>{{js_time(rej.logtime) }}</span>
             </div>
             <div class="b_ri">{{rej.fee}}</div>
          </li>
       </ul>
       </v-iscroll>
       <div class="no-data" v-if="ishave">
        <div class="no-data-ico"></div>
        <div class="no-data-txt">暂无数据</div>
      </div>
    </div>
 

  </section>
</template>

<script>
import Iscroll from '../v-iscroll';
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isTrue:true,
      is_show:false,
      record:[],
      ishave:false,
      yue:'',
      dates:'',
      is_loading:true,
      all_p:1,
      now_p:1,
      is_ajax:false,
      typeclick:'',
      sourse:0,
      dates:''
    }
  },
  methods:{
    ss:function(){
      this.$router.push('/hhk')
    },
    anPd: function(){
      this.$router.push('/hhk');
    },
    chan_red: function(){
      this.isTrue=!this.isTrue;
      this.is_show=!this.is_show;
    },
    chongz:function(){
      this.$router.push('/hhk/account-charge');
    },
    tix:function(){
      this.$router.push('/hhk/withdraw');
    },
    rec_ss:function(e){
      $(e.target).addClass('t_active').siblings().removeClass('t_active');
      this.is_show=!this.is_show;
      var cid=$(e.target).attr('tid');
      this.sourse=1;
      this.typeclick=cid.toString();
      this.onRefresh();
    },
    js_time:function(dt){
       var date = new Date(dt*1000);
       var str="";
       var Y = date.getFullYear() + '-';
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
       var D = date.getDate() + ' ';
       var h = date.getHours();
       var m = date.getMinutes();
       var s = date.getSeconds(); 
      if(h>=10){
         h=h + ':';
       }else{
        h="0"+h + ':';
       }
       if(m>=10){
         m=m + ':';
       }else{
        m="0"+m + ':';
       }
       if(s>=10){
         s=s;
       }else{
         s="0"+s;
       }
       str=Y+M+D+h+m+s;
       return str;
    },
     onRefresh:function(done) {
      this.now_p = 1;
      this.get_lists(this.now_p,done);
    },
    onInfinite(done) {
      if(this.now_p>=this.all_p){
        return;
      }
      this.now_p++;
      this.get_lists(this.now_p,done);
    },
     isdeletAll:function(deletAllState,deletState,is_del){
      if(is_del){
        this.ajax_del_lists("delAllHustory");
      }
      this.deletAllState = deletAllState;
      this.deletState = deletState;
  },
  get_lists:function(p,done){
   if(this.is_ajax) return;
      this.is_ajax = true;
      var identis = localStorage.getItem("identi");
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'page':p
      };
      var arr = ['timestamp','app_key','app','v','identify','page'];
      if(_this.sourse==1){
        var obj = $.extend(obj,{"type":_this.typeclick});
        arr.push("type");
      }else if(_this.sourse==2){
         var obj = $.extend(obj,{"date":_this.dates});
         arr.push("date");
      }
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=balancePaymentDetails',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
       if(da.data.recCode==200){
           _this.ishave=false;
          $('.load-more').show()
          if(_this.now_p==1){
            _this.record = da.data.result.list;
            if(da.data.result.totalcount == 0){
             _this.ishave=true;
             $('.load-more').hide();
            }
            _this.all_p = Math.ceil(da.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            _this.record = _this.record.concat(da.data.result.list);
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
        }else{
           _this.is_ajax = false;
           _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
          console.log(error);
      });
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
  mounted:function(){
    var _this=this;
    var start_time_picker = new mui.DtPicker({"type":"month","beginYear":1960,"endYear":2020});
      $("#useData").on("tap", function(){
        setTimeout(function(){
          start_time_picker.show(function(items){
            //$("#useData_id").val(items.text);
            _this.dates = items.text;
          });
        },200);
    });

  }, 
 created:function(){
     this.onRefresh();
      var identis = localStorage.getItem("identi");
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'method':'deposit',
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis
      };
      var arr = ['timestamp','app_key','method','app','v','identify'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/hhk.html',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
        _this.yue=da.data.result.deposit;
      })
      .catch(function (error) {
        console.log(error);
      });
    
  },
  components : {
      'v-iscroll': Iscroll
  },
  watch:{
    dates:function(a){
    this.dates=a;
    this.sourse=2;
    this.onRefresh();
   }
  }
}

//import '/static/css/mui.picker.css';
//import '/static/css/mui.css';
</script>
<style>
@import url(/static/css/mui.picker.css);
 @import url(/static/css/mui.css);
</style>
<style lang="less">
  @pxtoem:28.125rem;  
  .accTop{
    background:#fff;
    padding-top:30/@pxtoem;
    letter-spacing:1/@pxtoem;
    position:fixed;
    top:85/@pxtoem;
    width:100%;
    left:0;
    z-index: 100;
  }
  .accTop .t_top{
    width:100%;
  }
  .accTop .t_top span{
   color:#999;
   padding-left:30/@pxtoem;
  }
  .accTop .t_top h4{
   color: red;
   font-size:80/@pxtoem;
   text-align:center;
   margin:10/@pxtoem 0 80/@pxtoem 0;
   height:105/@pxtoem;
  }
  .accTop .t_btm{
   border-top:1/@pxtoem solid #d8272a;
   height:80/@pxtoem;
   line-height:80/@pxtoem;
   color: #v;
   font-size:32/@pxtoem;
   text-align:center;
  }
  .accTop .t_btm i{
   width:40/@pxtoem;
   height:40/@pxtoem;
   display:inline-block;
   vertical-align:middle;
   background-repeat:no-repeat;
   background-size:40/@pxtoem;
   margin-right:10/@pxtoem;
   margin-top:-5/@pxtoem;
  }
  .accTop .t_position{
   position:fixed;
   top:80/@pxtoem;
   left:0;
   background: rgba(0, 0, 0, 0.5);
   width:100%;
   height:100%;
   opacity:0;
   z-index: -1;
  }
  .accTop .t_position .t_box{
    overflow:hidden;
    box-sizing:border-box;
    background:#fff;
    transition:height 1s;
    -webkit-transition: height .3s;
    height:0;
    width:100%;
  }
  .accTop .t_position ul{
   padding:50/@pxtoem 30/@pxtoem;
  }
  .accTop .t_position.t_show .t_box{
   height:220/@pxtoem;
  }
  .accTop .t_position ul li{
   float:left;
   width:33.33%;
   text-align:center;
   border-radius:8/@pxtoem;
   padding:10/@pxtoem 0;
   margin-bottom:15/@pxtoem;
  }
  .accTop .t_position ul li.t_active{
   background:#d8272a;
   color:#fff;
  }
  .accTop .t_left{
   background: #d8272a;
   color:#fff;
  }
  .accTop .t_right{}
  .accTop .t_left i{
   background-image:url(../../../static/images/icon_cz.png);
  }
  .accTop .t_right i{
   background-image:url(../../../static/images/icon_tx.png);
  }
  .accBtm{
   font-size:30/@pxtoem;
   margin-top:430/@pxtoem;
  }
  .accTop .b_in{
    padding:24/@pxtoem 30/@pxtoem;
    background:#eee;
    font-size:29/@pxtoem;
  }
  .accTop .b_in i{
   width:40/@pxtoem;
   height:40/@pxtoem;
   display:block;
   float:right;
   background:url(../../../static/images/icon_rq.png) no-repeat center;
   background-size:40/@pxtoem;
  }
  .accBtm  ul{
   background:#fff;
    padding:30/@pxtoem;
  }
  .accBtm ul  li{
    margin-bottom:40/@pxtoem;
  }
  .accBtm ul li:after{
    display:block;
    content:"";
    clear:both;
  }
  .accBtm  ul  li .b_le{
    float:left;
  }
  .accBtm  ul  li .b_le span:first-child{
   display:block;
   text-shadow:0 0 0;
   height: 48/@pxtoem;
   
  }
  .accBtm  ul  li .b_le span:last-child{
   font-size:20/@pxtoem;
   color:#999;
   display:block;
   margin-top:5/@pxtoem;
  }
  .accBtm  ul  li .b_ri{
   float:right;
   font-size:38/@pxtoem;
   color: red;
   margin-top:10/@pxtoem;
  }
  .accBtm ul li.b_jn .b_ri{
   color:#22ac38;
  }
  .isb {
   color:#333;
  }
  .t_show{
   opacity:1!important;
   z-index: 100!important;
  }
  .getday{
    opacity:0;
  }
  .mui-picker {
    background-color: #fff;
  }
  .mui-dtpicker, .mui-poppicker {
    background-color: #fff;
  }
  .mui-dtpicker-header {
    border-bottom: 1px solid #ddd;
  }
 .mui-dtpicker-header button {
     background: #fff;
     font-size:30/@pxtoem;
 }
 .mui-btn-blue{
   color:red
 }
 .mui-pciker-list li {
   font-size:29/@pxtoem;
 }
 .no-data {
   margin-top:520/@pxtoem;
   position: relative;
 }
</style>



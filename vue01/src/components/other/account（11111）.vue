<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
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
           <h4>{{account}}</h4>
       </div>
       <div class="t_btm sl-ub">
         <div class="t_left sl-ubf1" v-on:click="chongz"><i></i>充值</div>
         <div class="t_right sl-ubf1" v-on:click="tix"><i></i>提现</div>
       </div>

       <div class="b_in">
          收支明细<span class="getday">{{dates}}</span><i id="useData"></i>
       </div>

    </div>
    <div v-bind:class="{t_position:'true',t_show:is_show}" v-on:click="chan_red" >
          <div class="t_box">
            <ul v-bind:class="{clearfix:'true',ul_show:is_show}">
             <li class="t_active spclick" v-on:click="rec_ss" tid="">全部</li>
             <li v-on:click="rec_ss" tid="add">充值</li>
             <li v-on:click="rec_ss" tid="cash">提现</li>
             <li v-on:click="rec_ss" tid="profile">收益</li>
             <li v-on:click="rec_ss" tid="expense">消费</li>
             <li v-on:click="rec_ss" tid="freeze">冻结</li>
            </ul>
         </div>
     </div>
    <div class="accBtm">
       <ul v-if="ishave">
          <li v-for="rej in record">
             <div class="b_le">
               <span>{{rej.type}}</span>
               <span>{{js_time(rej.logtime) }}</span>
             </div>
             <div class="b_ri" v-if="rej.fee>=0">{{rej.fee}}</div>
             <div class="b_ri b_jn" v-if="rej.fee<0">{{rej.fee}}</div>
          </li>
       </ul>
       <div v-if="ishave" class="loading">{{load}}</div>
       <div class="no-data" v-if="!ishave">
              <div class="no-data-ico"></div>
             <div class="no-data-txt">暂无数据</div>
       </div>
    </div>
    
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isTrue:true,
      is_show:false,
      dates:'',
      account:'',
      fromtype:1,
      record:[],
      ishave:true,
      all_p:0,
      now_p:1,
      load:'加载中...',
      istid:'',
      is_ajax:false
    }
  },
  methods:{
    ss:function(){
      this.$router.push('/hhk')
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
      $(document).scrollTop(0);
      console.log("top:"+$(document).scrollTop())
      this.dates='';
      $(e.target).addClass('t_active').siblings().removeClass('t_active');
      this.is_show=!this.is_show;
      var cid=$(e.target).attr('tid');
      this.istid=cid;
      //alert(cid);
      this.fromtype=1;
      this.now_p=1;
      this.getdatas();
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
    handleScroll:function(e){
       let scrollTop =$(e.target).scrollTop(); //滚动的高度
       let viewH=window.innerHeight;           //视图的高度
       let windowH=$(document).height();       //文档的高度
      if((viewH+scrollTop)==windowH){
         if(!this.is_ajax){
         this.now_p++;
         console.log(this.now_p);
         if(this.now_p<this.all_p){
           this.load="加载中...";
           console.log("type："+this.istid)
           console.log("resourse："+this.fromtype)
           console.log("dates："+this.dates)
           this.getdatas();
         }else{
           this.load="数据已加载完成";
           return;
         }
       }  
      }
    },
    getdatas:function(){
    if(this.is_ajax){
     console.log(123)
      return;
    }
      this.is_ajax=true;
      var identis = localStorage.getItem("identi");
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'page':_this.now_p
      };
      var arr = ['timestamp','app_key','app','v','identify','page'];
      if(_this.fromtype==1){
        var obj = $.extend(obj,{"type":_this.istid});
        arr.push("type");
      }else if(_this.fromtype==2){
         var obj = $.extend(obj,{"type":_this.istid,"date":_this.dates});
         arr.push("type","date");
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
       console.log(da);
       console.log(optionList);
       if(da.data.recCode==200){
           _this.ishave=true;
           if(_this.now_p==1){
             _this.record = da.data.result.list;
           }else if(_this.now_p>1){
             _this.record = _this.record.concat(da.data.result.list);
           }
           if(da.data.result.totalcount == 0){
             _this.ishave=false;
           }else{
             _this.all_p = Math.ceil(da.data.result.totalcount/10);
             if(_this.all_p==1){
               _this.load="数据已加载完成";
             }else{
               _this.load="加载中...";
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
  created:function(){
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
        _this.account=da.data.result.deposit;
      })
      .catch(function (error) {
        console.log(error);
      });

      this.getdatas();
      
  },
  mounted(){
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
     
     console.log(this.$route.path);
     if(this.$route.path=="/hhk/account"){
       document.addEventListener('scroll', this.handleScroll);
     }
     
  },
  watch:{
    dates:function(a){
    if(a==""){
      return;
    }
    this.dates=a;
    this.fromtype=2;
    $(document).scrollTop(0);
    this.now_p=1;
    //console.log(this.istid);
    this.getdatas();
    
   }
  }
}
</script>
<style>
@import url(/static/css/mui.picker.css);
@import url(/static/css/mui.css);
</style>
<style  lang="less">
  @pxtoem:28.125rem;
  .accTop{
    background:#fff;
    padding-top:30/@pxtoem;
    letter-spacing:1/@pxtoem;
    position:fixed;
    top:85/@pxtoem;
    width:100%;
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
  .accTop .b_in{
    padding:20/@pxtoem 30/@pxtoem;
    background:#eee;
  }
  .accTop .b_in i{
   width:40/@pxtoem;
   height:40/@pxtoem;
   display:block;
   float:right;
   background:url(../../../static/images/icon_rq.png) no-repeat center;
   background-size:40/@pxtoem;
  }
  .t_position{
   position:fixed;
   top:80/@pxtoem;
   left:0;
   background: rgba(0, 0, 0, 0.5);
   width:100%;
   height:100%;
   opacity:0;
   z-index: -1;
  }
  .t_position .t_box{
    overflow:hidden;
    box-sizing:border-box;
    background:#fff;
    transition:height .2s;
    -webkit-transition: height .2s;
    height:0;
    width:100%;
  }
  .t_position ul{
   padding:50/@pxtoem 30/@pxtoem;
  }
  .t_position.t_show .t_box{
   height:220/@pxtoem;
  }
  .t_position ul li{
   float:left;
   width:33.33%;
   text-align:center;
   border-radius:8/@pxtoem;
   padding:10/@pxtoem 0;
   margin-bottom:10/@pxtoem;
  }
  .t_position ul li.t_active{
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
   margin-top:420/@pxtoem;
  }
  
  .accBtm > ul{
   background:#fff;
    padding:30/@pxtoem;
   
  }
  .accBtm > ul > li{
    margin-bottom:40/@pxtoem;
  }
  .accBtm > ul > li:after{
    display:block;
    content:"";
    clear:both;
  }
  .accBtm > ul > li .b_le{
   float:left;
  }
  .accBtm > ul > li .b_le span:first-child{
   display:block;
   text-shadow:0 0 0;
  }
  .accBtm > ul > li .b_le span:last-child{
   font-size:20/@pxtoem;
   color:#999;
   display:block;
   margin-top:5/@pxtoem;
  }
  .accBtm > ul > li .b_ri{
   float:right;
   font-size:38/@pxtoem;
   color: red;
   margin-top:10/@pxtoem;
  }
  .accBtm > ul > li .b_jn{
   color:#22ac38;
  }
  .isb {
   color:#333;
  }
  .t_show{
   opacity:1!important;
   z-index: 100!important;
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
</style>
<style scoped lang="less">
@pxtoem:28.125rem;
.no-data{
  margin-top:500/@pxtoem;
}
.getday{
  opacity:1;
}
.loading{
  background:#fff;
  text-align:center;
  font-size:30/@pxtoem;
  margin-top:-40/@pxtoem;
  padding:10/@pxtoem;
}
</style>

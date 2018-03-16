<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        我的银行卡
       <!-- <div class="all-re sl-ub sl-uac sl-upc chan" v-on:click="chan_xg" v-bind:class="{isb:isTruex}">
          修改<i>|</i>
        </div>
        <div class="all-re sl-ub sl-uac sl-upc" v-on:click="chan_bj" v-bind:class="{isb:isTrueb}">
          编辑
        </div>-->
    </div>

    <div class="mycBox">
      <ul>
        <li v-for="item in carlist" class="clearfix" >
          <div class="mc_left" v-if="checkShow">
             <input type="checkbox"  class="mc_check" />
          </div>
          <div class="mc_right" v-bind:style="{'backgroundImage': 'url(\'' + item.bank_background + '\')'}" v-bind:yhkid="item.bank_id" >
             <div class="mc_img">
                <img v-bind:src="item.bank_logo" />
             </div>
             <div class="mc_name">
                <span class="bk_name">{{item.bank_name}}</span>
                <span><!--储蓄卡--></span>
             </div>
             <h4 class="num"><span>**** **** **** </span>{{item.bank_card_id.slice(item.bank_card_id.length-4,item.bank_card_id.length)}}</h4>
             <em class="chanimg" v-if="isxg" v-on:click="xgto" v-bind:yhkid="item.bank_id"></em>
          </div>
          <div class="hidden sl-ub">
             <div class="same card_xg sl-ubf1" v-on:click="xgto" v-bind:yhkid="item.bank_id">修改</div>
             <div class="same card_delete sl-ubf1"  v-on:click="li_delete">删除</div>
           </div>
        </li>
      </ul>
      <div class="add_card" v-on:click="rouLink">
         <img src="../../../static/images/icon_jia@2x.png" />
         <span>添加银行卡</span>
      </div>
    </div>
    
    <button class="sf_btm" v-if="checkShow" v-on:click="li_delete">删除</button>
    <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
    </dialog>
    <aside class="pop-box" v-if="cancel">
        <div class="p_change">
          <h4>确定删除此银行卡</h4>
          <div class="p_tt clearfix">
            <span v-on:click="can_btm">取消</span>
            <span class="p_red" v-on:click="sure_btm">确定</span>
          </div>
        </div>
    </aside>

  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      checkShow:false,
      isTruex:true,
      isTrueb:true,
      cancel:false,
      seen:false,
      semess:'',
      cardlogo:'icon_jtyh_s.png',
      bgname:'',
      carlist:[],
      isxg:false,
      yid:'',
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
    'identify':identis
    };
    var arr = ['timestamp','app_key','app','v','identify'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=getBankCardList',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
       for(var i in da.data.result){
          _this.carlist=da.data.result.cardlist
          _this.$nextTick(function(){
            $(".mycBox li").on("swipeleft",function(){
                 $(this).animate({'left':'-160px'}).siblings().animate({'left':'0'})
            });
            $(".mycBox li").on("swiperight",function(){
                $(this).animate({'left':'-0'})
            });
         });
          return false;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.push('/hhk')
    },
    rouLink: function(){
      this.$router.push('/hhk/mycard-add');
    },
    chan_bj: function(){
      if($('.mycBox li').length==0){
          this.seen=!this.seen;
          this.semess="请添加银行卡";
          var _this=this;
          var time=setTimeout(function(){
            _this.seen=false;
          },2000)
      }else{
          if( $('.mc_left').hasClass('cardhide')){
             $('.mc_left').removeClass('cardhide');
          }else{
             $('.mc_left').addClass('cardhide');
          }
         this.isTrueb=!this.isTrueb;
         this.checkShow=!this.checkShow;
         this.isTruex=true;
         this.isxg=false;
      }
    },
    chan_xg: function(){
      this.isTruex=!this.isTruex;
      this.isxg=!this.isxg;
      this.isTrueb=true;
      this.checkShow=false;
    },
    xgto:function(e){
       var xgbid=$(e.target).attr('yhkid');
       sessionStorage.setItem('xgbank_id',xgbid);
       this.$router.push('/hhk/mycard-xg/'+xgbid);
    },
    li_delete: function(e){
     this.cancel=!this.cancel
     this.yid=$(e.target).parent('.hidden').siblings('.mc_right').attr('yhkid');
     },
    can_btm: function(){
       this.cancel=!this.cancel
    },
    sure_btm: function(){
      var identis = localStorage.getItem("identi");
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'bank_id':_this.yid
      };
      var arr = ['timestamp','app_key','app','v','identify','bank_id'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=delBankCard',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
           $('.mc_right[yhkid='+_this.yid+']').parents('li').remove();
           _this.cancel=false;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    dia_hide: function(){
      this.seen=!this.seen;
    }
  },
  computed:{
   all_height:function(){
      return window.innerHeight + 'px'
    }
  }
}
</script>
<style lang="less">
  @pxtoem:28.125rem;
  .mycBox{
   padding:35/@pxtoem 0;
  }
  .mycBox > ul > li{
   margin-bottom:20/@pxtoem;
   position:relative;
   width:1060/@pxtoem;
  }
  .mycBox .mc_left{
    width:40/@pxtoem;
    display:inline-block;
    vertical-align: middle;
    padding:0 0 0 20/@pxtoem ;
  }
  .mycBox .mc_left input[type="checkbox"]{
    -webkit-appearance: none !important;
    appearance: none !important;
    background:url(../../../static/images/btn_check.png) no-repeat center;
    background-size:100% 100%;
    border-radius: 50%;
    width:40/@pxtoem;
    height:40/@pxtoem;
    display: inline-block;
    vertical-align: middle;
   }
  .mycBox .mc_left input[type="checkbox"]:checked{
    background:url(../../../static/images/btn_check_pre.png) no-repeat center;
    background-size:100% 100%;
  }
  .mycBox .mc_right{
    display:inline-block;
    vertical-align:middle;
    width: 710/@pxtoem;
    position: relative;
    background: -webkit-linear-gradient(330deg, #4f83be, #3c5da9);
    background: linear-gradient(120deg, #4f83be, #3c5da9);
    background-size:100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    color:#fff;
    padding:30/@pxtoem;
    border-radius:20/@pxtoem;
    box-sizing: border-box;
    margin-left:20/@pxtoem;
    }
  .mycBox .mc_right .mc_img{
    width:86/@pxtoem;
    height:86/@pxtoem;
    border-radius:50%;
    background:#fff;
    text-align:center;
    line-height:125/@pxtoem;
    display:inline-block;
    vertical-align:middle;
  }
  .mycBox .mc_right .mc_img img{
    width:70%;
  }
  .mycBox .mc_right .mc_name{
    display:inline-block;
    vertical-align:middle;
    margin-left:10/@pxtoem;
  }
  .mycBox .mc_right .mc_name span{
    display:block;
    margin-bottom:1/@pxtoem;
  }
  .mycBox .mc_right .mc_name span:first-child{
    font-size:33/@pxtoem;
  }
  .mycBox .mc_right h4{
    font-weight:normal;
    font-size:50/@pxtoem;
    text-align:right;
    padding-right:20/@pxtoem;
    margin-top:5/@pxtoem;
  }
  .mycBox .mc_right h4 span{
    position:relative;
    top:5/@pxtoem;
  }
  .isb{
   color:#333;
  }
  .add_card{
   padding:20/@pxtoem;
   text-align:center;
   color:#999;
   background:#fff;
   font-size:30/@pxtoem;
   margin-top:30/@pxtoem;
  }
  .add_card img{
   width:32/@pxtoem;
   display:inline-block;
   vertical-align:middle;
   margin-right:10/@pxtoem;
  }
  .add_card span{
   display:inline-block;
   vertical-align:middle;
  }
  .cardhide{
    display:none !important;
  }
  .chan{
    right:110/@pxtoem;
  }
  .chan i{
    display:block;
    color: #ddd;
    position:relative;
    left:15/@pxtoem;
    font-size:25/@pxtoem;
  }
  .chanimg{
    display:block;
    width:37/@pxtoem;
    height:37/@pxtoem;
    background:url(../../../static/images/icon_xiugai.png) no-repeat;
    background-size:37/@pxtoem;
    position:absolute;
    right:45/@pxtoem;
    top:35/@pxtoem;
  }
</style>
<style scoped lang="less">
 @pxtoem:28.125rem;
.pop-box {
  background: rgba(0, 0, 0, 0.5);
}
.pop-box .p_change h4 {
  font-size:32/@pxtoem !important;
}
.no-data {
  margin-top:0;
}
.mycBox{
overflow:hidden;
}

.mycBox > ul > li .mc_right{
   float:left;
  }
.hidden{
  width:300/@pxtoem;
  float:left;
  height:210/@pxtoem;
  line-height:220/@pxtoem;
  margin-left:20/@pxtoem;
  text-align:center;
  color:#fff;
}
.hidden .card_xg{
  background:#ccc;
}
.hidden .card_delete{
  background:#d8272a;
}
</style>

<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        账户提现
        <router-link to="/hhk/withdraw_rule" class="all-re sl-ub sl-uac sl-upc">
          提现规则
        </router-link>
    </div>


    <div class="boxLogin">
      <div class="czTop">
           <span>账户余额(元)</span>
           <h4 class="getm">{{yue}}</h4>
           <p>今日可提现金额<span>5000.00</span>元</p>
      </div>
<!--===已绑定银行卡-->
      <div class="cz_list" v-on:click="clist" v-if="!seew">
         <i class="czicon ct logo"></i>
         <div class="cz_text">
          <em class="bann"></em></br>
          <span>尾号<em class="wnu"></em><em class="bankId"></em></span>
         </div>
         <i class="czicon cb"></i>
      </div>
<!--===//已绑定银行卡-->
<!--===没有绑定银行卡-->
      <div class="cz_list" v-on:click="clist" v-if="seew">
         <i class="czicon ct">
           <img src="../../../static/images/icon_yhk.png" />
         </i>
         <div class="cz_text cz_add">
          添加银行卡
         </div>
         <i class="czicon cb"></i>
      </div>
<!--===//没有绑定银行卡-->
      
      <p class="title_soy">该卡本次最多可充值10,000.00元</p>
       <ul>
         <li>  
               <label>金额</label>
               <input type="number" class="l_money" placeholder="请输入提现金额" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>  
               <label>密码</label>
               <input type="password" class="l_passw" placeholder="请输入6-20位提现密码" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
       </ul>
       <p class="red_soy"></p>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">提交申请</button>
      
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isClick:false,
      seew:false,
      seen:false,
      semess:'',
      yue:'',
      is_ajax:false,
      timer:""
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
     $(".l_passw,.l_money").bind('input propertychange', function() {
         var lp=$(".l_passw").val();
         var lm=$(".l_money").val();
         if(lp!=="" && lm!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })
     
     var cimg=sessionStorage.getItem('logoimg');
     var yname=sessionStorage.getItem('yhname');
     var wnum= sessionStorage.getItem('wsnum');
     
     if(cimg=='' || cimg==null ){
       this.seew=true;
     }else{
       this.seew=false;
       $('.logo').html('<img src="'+cimg+'"/>');
       $('.bann').text(yname);
       $('.wnu').text(wnum);
     }

  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    timerr:function(){
      var _this=this;
      var time=setTimeout(function(){
                  _this.seen=false;
      },2000)
     
    },
    anPd: function(){
        if(this.is_ajax) return;
        this.is_ajax = true;
        var _this=this;
        var identis = localStorage.getItem("identi");
        var bankid = sessionStorage.getItem("bank_id");
        if(bankid==null){
          this.seen=!this.seen;
          this.semess="请添加银行卡";
          var _this=this;
          this.timer = setTimeout(function(){
            _this.seen=false;
            _this.is_ajax = false;
          },2000);
          return;
        }
        var acc_mon=$('.l_money').val();
        var passw=$('.l_passw').val();
        
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identis,
        'amount':acc_mon,
        'bank_id':bankid,
        'password':passw
        };
        var arr = ['timestamp','app_key','app','v','identify','amount','bank_id','password'];
        var sign = this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign};
        var option = $.extend(obj,obj2);
        var optionList=this.GLOBAL.getOption(option);
        this.is_ajax = false;
        return;
        this.$http({
            method: 'post',
            url: _this.GLOBAL.www+'/apis/member.json?method=cashApply',
            data: optionList,
            withCredentials:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
        //console.log(da);
        //console.log(optionList);
          if(da.data.recMeg){
              _this.seen=!_this.seen;
              _this.semess=da.data.recMeg;
              _this.timerr();
              if(da.data.recMeg=='申请成功'){
                   _this.seen=false; 
                   var yhmess=$('.cz_text').text()
                   sessionStorage.setItem('a_money',acc_mon);
                   sessionStorage.setItem('yhmessage',yhmess);
                   _this.$router.push("/hhk/withdraw_succ");
              }
          }
          
           _this.is_ajax = false;  
        })
        .catch(function (error) {
            console.log(error);
            _this.is_ajax = false ; 
        });
    },
    clist:function(){
      this.$router.push("/hhk/withdraw_clist")
    }
   },
  computed:{
    ww:function(){
      return  ;
    },
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
         _this.yue=da.data.result.deposit;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
}
</script>
<style scoped lang="less">
@pxtoem:28.125rem;
  .all-re{
    width:150/@pxtoem;
  }
</style>
<style  lang="less">
  @pxtoem:28.125rem;
  .czTop{
   padding:0 30/@pxtoem 50/@pxtoem 30/@pxtoem;
  }
  .czTop > span{
   color:#999;

  }
  .czTop > h4{
   font-weight:normal;
   text-align:center;
   font-size:80/@pxtoem;
   height:100/@pxtoem;
  }
  .czTop > p{
   color:#999;
   text-align:center;
  }
  .czTop > p span{
   color:#db272a;
  }
  .title_soy{
   margin-bottom:20/@pxtoem;
   display:block;
   padding-left:30/@pxtoem;
   font-size:30/@pxtoem;
   color:#999;
  }
 .cz_list{
   background:#fff;
   padding:20/@pxtoem 0 20/@pxtoem 30/@pxtoem;
   margin-bottom:20/@pxtoem;
 }
 .cz_list .czicon{
    width: 55/@pxtoem;
    height: 55/@pxtoem;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
 }
  .cz_list .czicon.ct img{
    width:100%;
  }
  .cz_list .czicon.cb{
    width: 20/@pxtoem;
    height: 40/@pxtoem;;
    background:url(../../../static/images/icon_wddd_ckgd.png) center no-repeat;
    background-size: 20/@pxtoem 40/@pxtoem;;
    margin-top:  20/@pxtoem;
    margin-right: 30/@pxtoem;
    float:right;
  }
 .cz_list .cz_text{
   display: inline-block;
   vertical-align: middle;
   margin-left:20/@pxtoem;
 }
 .cz_list .cz_text span{
  display:block;
  color:#999;
  margin-top:5/@pxtoem;
 }
 .cz_add{
  padding:18/@pxtoem 0;
 }
 </style>


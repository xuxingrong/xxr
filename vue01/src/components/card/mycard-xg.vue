<template>
  <section class="lo-all" v-bind:style="{'height':all_height}">
    <router-view v-on:childE="parentE" v-on:child2E="parent2E"></router-view>
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        修改银行卡
        
    </div>

    <div class="boxLogin">
      <ul>
         <li v-on:click="chooBank()">
               <label>银行</label>
               <!--<input type="text" class="l_bank" placeholder="选择发卡银行"disabled v-bind:value="inxtext.bank_name"/>-->
               <span class="l_bank">{{inxtext.bank_name}}</span>
               <div class="l_icons"  >
                <i class="lIcon_spc"></i>
              </div>
          </li>
          <li>
               <label>分行</label>
               <input type="text" class="l_fh" placeholder="请填写分行信息" v-on:keyup="s_deleted" v-bind:value="inxtext.bank_name_fenhang"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
          <li>
               <label>支行</label>
               <input type="text" class="l_zh" placeholder="请填写支行信息" v-on:keyup="s_deleted" v-bind:value="inxtext.bank_name_branch"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
          <li v-on:click="chooType()">
               <label>类型</label>
              <span class="bankType" >信用卡</span>
               <div class="l_icons">
               <i class="lIcon_spc"></i>
              </div>
          </li>
          <li>
               <label>姓名</label>
               <input type="text" class="l_name" placeholder="持卡人姓名" v-on:keyup="s_deleted" v-bind:value="inxtext.bank_card_owner"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
          <li>
               <label>卡号</label>
               <input type="number" class="l_number" id="bNum" placeholder="银行卡号" v-on:keyup="s_deleted" v-bind:value="inxtext.bank_card_id"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
       </ul>
       <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
         <div class="d_box"><span>{{semess}}</span></div>  
       </dialog>
       <button class="comBtm" v-on:click="anPd()"   >下一步</button>
    </div>
    <dialog class="d_sex" v-if="s_show">
        <ul>
          <li v-on:click="sBox_change">{{card_blue}}</li>
          <li v-on:click="sBox_change">{{card_deposit}}</li>
          <li v-on:click="sBox_show">取消</li>
        </ul> 
    </dialog>
  </section>

 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      s_show:false,
      card_blue:"信用卡",
      card_deposit:"储蓄卡",
      isClick:false,
      seen:false,
      semess:'',
      timer:'',
      inxtext:[]
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
      'identify':identis,
      'bank_id':this.$route.params.bank_id
      };
      var arr = ['timestamp','app_key','app','v','identify','bank_id'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=editBankCard',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
          //console.log(da);
          _this.inxtext=da.data.result;
      })
      .catch(function (error) {
          console.log(error);
      });
    
     
    
  },
  mounted:function(){
      $(".l_name,.l_number").bind('input propertychange', function() {
         var lp=$(".l_name").val();
         var ln=$(".l_number").val();
         var lf=$(".l_fh").val();
         var lz=$(".l_zh").val();
         var lt=$(".bankType").text();
         if(lp!=="" && ln!=="" && lf!=="" && lz!=="" && lt!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })

     
  },
  methods:{
  s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
  },
  ss:function(){
      this.$router.go(-1)
    },
  dia_hide: function(){
      this.seen=!this.seen;
    },
  parent2E:function(){
    $("input").blur();
  },
   anPd: function(){
    var bNum=$("#bNum").val();
    var _this=this;
    function time(){
      return _this.timer=setTimeout(function(){
             _this.seen=false;
           },3000)
     }
      var identis = localStorage.getItem("identi");
      var bkid=sessionStorage.getItem('xgbank_id');
      var username=$(".l_name").val();
      var band_card=$(".l_number").val();
      var fenhang=$(".l_fh").val();
      var branch=$(".l_zh").val();
      var chbank=$(".l_bank").text();
    if(this.GLOBAL.regular.reg_bank.test(band_card)){
      //console.log(this.GLOBAL.regular.reg_bank)
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'bank_id':bkid,
      'bank_card_owner':username,
      'bank_card_id':band_card,
      'bank_name':chbank,
      'bank_name_fenhang':fenhang,
      'bank_name_branch':branch,
      'set_default':0
      };
      var arr = ['timestamp','app_key','app','v','identify','bank_id','bank_card_owner','bank_card_id','bank_name','bank_name_fenhang','bank_name_branch','set_default'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=saveBankCard',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
           //console.log(da);
          _this.inxtext.bank_name_fenhang = $('.l_fh').val();
          _this.inxtext.bank_name_branch = $('.l_zh').val();
          _this.inxtext.bank_card_owner = $('.l_name').val();
          _this.inxtext.bank_card_id = $('.l_number').val();
          _this.inxtext.bank_name= $('.l_bank').text();
       if(da.data.recMeg){
           _this.seen=!_this.seen;
           _this.semess=da.data.recMeg;
           time();
           if(da.data.recMeg=='保存成功'){
                var dd=setTimeout(function(){
                    _this.$router.push('/hhk/mycard');
                },2000)
           }
        }
        
       
      })
      .catch(function (error) {
        console.log(error);
      });
     }else{
        _this.saveVal();
        _this.seen=!_this.seen;
        _this.semess='请输入正确的银行卡号';
        time();
     }   
    },
    parentE:function(bank_name){
      this.inxtext.bank_name = bank_name;
    },
    saveVal:function(){
      this.inxtext.bank_name_fenhang = $('.l_fh').val();
      this.inxtext.bank_name_branch = $('.l_zh').val();
      this.inxtext.bank_card_owner = $('.l_name').val();
      this.inxtext.bank_card_id = $('.l_number').val();
      this.inxtext.bank_name= $('.l_bank').text();
    },
    chooBank: function(){
      $('input').blur();
      this.saveVal();
      this.$router.push('/hhk/mycard-xg/'+this.$route.params.bank_id+'/bank');
    },
    chooType:function(){
      this.s_show=!this.s_show;
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    sBox_show: function(){
      this.s_show=!this.s_show;
    },
    sBox_change: function(e){
      this.s_show=!this.s_show;
      $(".bankType").text($(e.target).text());
    }
  },
  computed:{
    ww:function(){
      return  ;
    },
    all_height:function(){
      return window.innerHeight + 'px'
    }
    
  }
}
</script>
<style scoped lang="less">
@pxtoem:28.125rem;
.boxLogin ul li {
  border-bottom:1px solid #f1f1f1;
}
.boxLogin ul li .bankType,.boxLogin ul li .l_bank {
   margin-left:30/@pxtoem;
  
}
input{
   background:#fff;
   color:#333;
}
input[disabled]{
  color:#333;
  opacity:1;
}
</style>


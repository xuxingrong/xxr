<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        绑定账号
     </div>
     
     <div class="setBox">
        <div class="sSpc" v-on:click="isnot">
           <h4 class="tou_wx" >微信号</h4>
           <span><em class="em_wx">{{not_bd}}</em><i class="lIcon"></i></span>
        </div>

         <div class="sSpc" v-on:click="isnot">
           <h4 class="tou_qq" >QQ号</h4>
           <span><em class="em_qq">{{not_bd}}</em><i class="lIcon"></i></span>
        </div>

         <div class="sSpc" v-on:click="ifClick_pe">
           <h4 class="tou_pe">手机号</h4>
           <span><em class="em_pe">{{glp(aset.mobile)}}</em></span>
        </div>

         <div class="sSpc" v-on:click="ifClick_el">
           <h4 class="tou_el">邮箱地址</h4>
           <span><em class="em_el">{{isemail(aset.email)}}</em><i class="lIcon"></i></span>
        </div>
     </div>
     
     <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
         <div class="d_box"><span>{{semess}}</span></div>  
      </dialog>
     <aside class="pop-box" v-if="cancel">
        <div class="p_change" >
          <h4>要解除与<em class="fun_name">{{touch_name}}</em>的绑定吗？</h4>
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
      seen: false,
      cancel:false,
      touch_name:'qq',
      not_bd:'未绑定',
      aset:[],
      semess:''
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    ifClick_wx:function(e){
      var tWx=$(".em_wx").text();
      if(tWx==this.not_bd){
        this.$router.push('');  
      }else{
        this.touch_name=$(".tou_wx").text();
        this.cancel=!this.cancel;
      }
     },
    isnot:function(){
      this.seen=!this.seen;
      this.semess="暂未开通";
      var _this=this;
      //var timer=setTimeout(function(){
      //  _this.seen=false;
      //},2000)
    },
   ifClick_pe:function(){
      /*var tWx=$(".em_pe").text();
      if(tWx==this.not_bd){
        this.$router.push('/hhk/binding_phone');  
      }else{
         this.$router.push('/hhk/binding_phone_change');
      }*/
    } ,
    ifClick_el:function(){
      this.$router.push('binding_phone_email_step1'); 
    },
    can_btm:function(){
      this.cancel=!this.cancel;
    },
    sure_btm:function(){
      if(this.touch_name=='微信号'){
        $('.em_wx').text(this.not_bd);
        this.cancel=!this.cancel;
      }else if(this.touch_name=='QQ号'){
        $('.em_qq').text(this.not_bd);
        this.cancel=!this.cancel;
      }else if(this.touch_name=='手机号'){
        $('.em_pe').text(this.not_bd);
        this.cancel=!this.cancel;
      }else if(this.touch_name=='邮箱地址'){
        $('.em_el').text(this.not_bd);
        this.cancel=!this.cancel;
      }
    },
    isemail:function(item){
       if(item==""){
         item=""
         return item='未绑定';
       }else{
         return item;
       }
    },
    glp:function(item){
       if(item==undefined){
         return;
       }else{
         return item.slice(0,3)+'****'+item.slice(7,11);
       }
    },
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
    };
    var arr = ['timestamp','app_key','app','v','identify'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=myBusinessCard',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      if(da.data.recCode==200){
         _this.aset = da.data.result;
      }else{
        _this.$router.push("/hhk/login");
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .setBox{
   margin-top:30/@pxtoem;
  }
  
</style>
<style  lang="less">
  @pxtoem:28.125rem;
  .pop-box{
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 100%;
    
  }
  .pop-box .p_change{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    background:#fff;
    border-radius:10/@pxtoem;
    width:550/@pxtoem;
    height:250/@pxtoem;
    font-size:29/@pxtoem;
  }
  .pop-box .p_change h4{
    padding:50/@pxtoem;
    text-align:center;
    font-weight:normal;
  }
  .pop-box .p_change .p_tt{
    width:100%;
    position:absolute;
    bottom:0;
  }
  .pop-box .p_change span{
    display:block;
    width:50%;
    float:left;
    text-align:center;
    padding:25/@pxtoem 0;

  }
  .pop-box .p_change span.p_red{
    background:#d8272a;
    color:#fff;
  }
</style>

<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        账户提现
        <router-link to="/hhk/mycard-add" class="all-re sl-ub sl-uac sl-upc">
         <i class="add"></i>
        </router-link>
    </div>
 
  <div class="czBox">
     <div class="cz_list" v-for="dali in slist" v-on:click="cunto" v-if="!ishave">
         <i class="czicon ct" >
           <img v-bind:src="dali.bank_logo"/>
         </i>
         <div class="cz_text">
          <em class="yname">{{dali.bank_name}}</em></br>
          <span>尾号
            <em class="wnum">{{dali.bank_card_id.slice(dali.bank_card_id.length-4,dali.bank_card_id.length)}}</em> 
            <em class="bankId hide" >{{dali.bank_id}}</em>
          </span>
         </div>
        
         <div class="opc"></div>
      </div>
      <div class="no-data" v-if="ishave">
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
      slist:'',
      cardlogo:'',
      isseen:false,
      ishave:false
    }
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    cunto:function(e){
      var yname=$(e.target).parents('.cz_list').find('.yname').text();
      var wnum=$(e.target).parents('.cz_list').find('.wnum').text();
      var bankId=$(e.target).parents('.cz_list').find('.bankId').text();
      var imgss=$(e.target).parents('.cz_list').find('.czicon img').attr('src');
      //alert(imgss) 
      sessionStorage.setItem('logoimg',imgss);
      sessionStorage.setItem('yhname',yname);
      sessionStorage.setItem('wsnum',wnum);
      sessionStorage.setItem('bank_id',bankId);
      this.$router.go(-1)
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
    'identify':identis.toString()
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
         _this.slist=da.data.result.cardlist;
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>

<style scoped lang="less">
  @pxtoem:28.125rem;
  .add{
    display:block;
    width:28/@pxtoem;
    height:28/@pxtoem;
    background:url(../../../static/images/icon_tianjia.png) no-repeat center;
    background-size:28/@pxtoem;
  }
  .cz_list {
    margin-bottom: 0;
    position:relative;
  }
  .czBox{
    margin-top:30/@pxtoem;
  }
  .opc{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:100;
  }
</style>


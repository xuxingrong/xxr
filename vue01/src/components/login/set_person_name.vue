<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        昵称
        <div class="all-re sl-ub sl-uac sl-upc" v-on:click="saveto">
          保存
        </div>
     </div>
     
     <div class="boxLogin">
      <ul>
          <li>
               <input type="text" class="l_name" placeholder="请输入昵称" v-on:keyup="s_deleted"/>
               <div class="l_icons"><i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i></div>
          </li>
        </ul>
      </div>
      <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
          <div class="d_box"><span>{{semess}}</span></div>  
      </dialog>
  </section>
  
 
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      seen:false,
      semess:''
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
  clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('');
     $(".comBtm").attr('disabled','true');
  },
  s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
  },
  dia_hide: function(){
      this.seen=!this.seen;
  },
  saveto:function(){
    var identis = localStorage.getItem("identi");
    var userName=$(".l_name").val();
  if(userName!==''){
    var _this=this;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp/1000;
    var obj = {'timestamp':timestamp.toString(),
    'app_key':this.GLOBAL.app_key,
    'app':this.GLOBAL.app,
    'v':this.GLOBAL.v,
    'identify':identis,
    'username':userName
    };
    var arr = ['timestamp','app_key','app','v','identify','username'];
    var sign = this.GLOBAL.getSign(arr,obj);
    var obj2 = {'sign':sign};
    var option = $.extend(obj,obj2);
    var optionList=this.GLOBAL.getOption(option);
    this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=saveMyCardInfo',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
        if(da.data.recMeg=='保存成功'){
            _this.$router.go(-1);
        }
       
    })
    .catch(function (error) {
        console.log(error);
    });
   }else{
     this.seen=!this.seen;
     this.semess='昵称不能为空';
     var timer=setTimeout(function(){
            this.seen=false;
     },3000)
   }
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
        url: _this.GLOBAL.www+'/apis/member.json?method=userInfo',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      $('.l_name').val(da.data.result.userInfo.name)

    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style  scoped lang="less">
  @pxtoem:28.125rem;
  .all-re {
    color:#333;
  }
  .boxLogin {
    margin-top:0;
  }
  .boxLogin ul li input {
    margin-left:0;
  }
</style>


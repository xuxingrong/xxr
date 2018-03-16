<template>
  <section class="lo-all" v-bind:style="{'min-height':all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        推荐记录
    </div>

    <div v-if="ishave" class="bankBox jfBox">
      <v-iscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :f_top="86/28.125" :s_top="86/28.125">
      <ul>
         <li v-for="pro in ajax_obj">
            <i v-if="pro.role==0"><img src="../../../static/images/top_icon_vip.png" /></i>
            <i v-if="pro.role==4"><img src="../../../static/images/top_icon_hong.png" /></i>
            <i v-if="pro.role==5"><img src="../../../static/images/top_icon_huang.png" /></i>
            <i v-if="pro.role==6"><img src="../../../static/images/top_icon_lan.png" /></i>
            <i v-if="pro.role==7"><img src="../../../static/images/top_icon_bo.png" /></i>
            <span>{{pro.name}}</span>
            <em class="getti">{{js_time(pro.regtime)}}</em>
         </li>
      </ul>
      </v-iscroll>
    </div>
    <div class="no-data" v-else>
      <div class="no-data-ico"></div>
      <div class="no-data-txt">暂无记录</div>
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
      ajax_obj:[],
      aj_time:'',
      ishave:true,
      all_p:1,
      now_p:1,
      is_ajax:false,
    }
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk');
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
      this.get_recommend_lists(this.now_p,done);
    },
    onInfinite(done) {
      if(this.now_p>=this.all_p){
        return;
      }
      this.now_p++;
      this.get_recommend_lists(this.now_p,done);
    },
    get_recommend_lists:function(p,done){
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
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionList=this.GLOBAL.getOption(option);
      this.$http({
          method: 'post',
          url: _this.GLOBAL.www+'/apis/member.json?method=recommendRegister',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        //console.log(response);
        if(response.data.recCode==200){
          if(_this.now_p==1){
            if(!response.data.result.totalcount){
              _this.ishave=false;
              return;
            }
            _this.ajax_obj = response.data.result.fav_info;
            _this.all_p = Math.ceil(response.data.result.totalcount/10);
          }
          if(_this.now_p>1){
            if(typeof response.data.result.fav_info != "undefined"){
              _this.ajax_obj = _this.ajax_obj.concat(response.data.result.fav_info);
            }
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
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
        _this.is_ajax = false;
        
      })
      .catch(function (error) {
        _this.is_ajax = false;
        console.log(error);
      });
      
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
    this.onRefresh(); 
  },
  components : {
    'v-iscroll': Iscroll
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .jfBox ul{
    margin-left:0;
    background:#fff;
  }
  .jfBox ul li{
    position:relative;
    padding:30/@pxtoem;
  }
  .jfBox ul li > span{
    color: #d8272a;
  }
  .jfBox ul li > em{
    color:#999;
    font-size:24/@pxtoem;
    position:absolute;
    right:30/@pxtoem;
    top:40/@pxtoem;
  }
</style>
<style scoped lang="less">
@pxtoem:28.125rem;
.no-data {
    margin-top: 200/@pxtoem!important;
}
.bankBox {
     border:none;
}
</style>


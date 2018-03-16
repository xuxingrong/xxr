<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        我的积分
    </div>
    
   <div class="inteBox">
       <header>
          <div class="inh_left">
             总积分<span class="jfmu">0.00</span>
          </div>
          <div class="inh_right" v-on:click="ruleto">积分规则</div>
       </header>
       <ul  v-if="ishave">
          <li v-for="item in datajf">
             <h4>
               <em>{{js_time(item.modified_time) }}</em>
               <em class="come">{{item.behavior}}</em>
             </h4>
             <div class="inu_des">
                <span>{{item.remark}}</span><span>+{{item.point}}</span>
             </div>
          </li>
       </ul>
      <div class="lljl-no-record" v-if="!ishave">
        <div></div>
        <p>暂无积分记录</p>
        <a v-bind:href="GLOBAL.www">去首页逛逛</a>
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
      datajf:[],
      ishave:true
    }
  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    ruleto:function(){
       this.$router.push('/hhk/myintegral-rule');
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
  mounted:function(){
    var jf = localStorage.getItem("myintegral");
    if(jf=="" || jf==null || jf==0){
      jf=0;
    }
    $('.jfmu').text(jf);
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
        url: _this.GLOBAL.www+'/apis/member.json?method=myIntegral',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
      //console.log(da)
      if(da.data.recCode==200){
         _this.ishave=true;
         _this.datajf = da.data.result.integraLog;
         if(da.data.result.point_count==0){
           _this.ishave=false;
         }
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
<style lang="less">
  @pxtoem:28.125rem;
  .inteBox{}
  .inteBox header{
   width:100%;
   height:170/@pxtoem;
   line-height:170/@pxtoem;
   background:#d8272a;
   color:#fff;
   font-size:30/@pxtoem;
   position:retive;
  }
  .inteBox header .inh_left{
   display:inline-block;
   vertical-align:middle;
   margin-left:60/@pxtoem;
   letter-spacing:1/@pxtoem;
  }
  .inteBox header .inh_left span{
   font-size:55/@pxtoem;
  }
  .inteBox header .inh_right{
   border:2/@pxtoem solid #fff;
   border-radius:12/@pxtoem;
   width:190/@pxtoem;
   height:60/@pxtoem;
   line-height:60/@pxtoem;
   text-align:center;
   position:absolute;
   right:50/@pxtoem;
   top:140/@pxtoem;
  }
  .inteBox > ul{
   
  }
  .inteBox > ul > li{
   background:#fff;
   margin-bottom:10/@pxtoem;
  }
  .inteBox > ul > li > h4{
   font-weight:normal;
   color:#999;
   padding:25/@pxtoem 30/@pxtoem;
   border-bottom:1/@pxtoem solid #f1f1f1;
   font-size:23/@pxtoem;
  }
  .inteBox > ul > li > h4 em.come{
   float:right;
   display: block;
   width: 415/@pxtoem;
   text-align: right;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
  }
  .inteBox > ul > li .inu_des{
   padding:38/@pxtoem 30/@pxtoem;
   position:relative;
   font-size:30/@pxtoem;
  }
  .inteBox > ul > li .inu_des span:first-child{
    
  }
  .inteBox > ul > li .inu_des span:last-child{
    position:absolute;
    right:30/@pxtoem;
    top:50/@pxtoem;
    color:red;
    font-size:35/@pxtoem;
  }
</style>
<style scoped lang="less">
.lljl-no-record{
  @pxtoem:28.125rem;
  margin-top:-200/@pxtoem;
}
</style>


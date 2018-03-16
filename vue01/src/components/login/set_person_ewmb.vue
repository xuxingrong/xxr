<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-headery">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        海惠客
       <div class="all-re sl-ub sl-uac sl-upc" v-on:click="saveto">
          保存
        </div>

        <div class="pe_link">
          <img v-bind:src="aset.qr_code">
        </div>
     </div>
     
    <div class="boxLogin">
        <ul>
          <li>
               <label>
                 <img src="../../../static/images/icon_user@2x.png" class="icon_pic"/>
                 <em class="line">|</em>
               </label>
               <input type="text" class="l_name" placeholder="请输入你想展示的姓名" v-on:keyup="s_deleted" v-bind:value="aset.name"/>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>
                 <img src="../../../static/images/icon_phone@2x.png" class="icon_pic"/>
                 <em class="line">|</em>
               </label>
              
                <!--<span class="l_phone spc_span">{{aset.mobile}}</span>-->
                <input type="text" class="l_phone spc_span" placeholder="" v-on:keyup="s_deleted" v-bind:value="aset.mobile" disabled/>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>
                 <img src="../../../static/images/icon_wechat@2x.png" class="icon_pic"/>
                 <em class="line">|</em>
               </label>
               <input type="text" class="l_weix" placeholder="请输入你的微信号" v-on:keyup="s_deleted" v-bind:value="aset.wechat_name"/>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
           <li>
               <label>
                 <img src="../../../static/images/icon_email@2x.png" class="icon_pic"/>
               </label>
               <input type="text" class="l_email" placeholder="请输入你的邮箱" v-on:keyup="s_deleted" v-bind:value="aset.email"/>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
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
      aset:'',
      seen:false,
      semess:'',
      timer:'',
      aset:[]
     }
  },
  mounted:function(){
    $('input').focus(function(){
       $(this).parents('li').find('.l_delete').removeClass('hide');
    })
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    dia_hide: function(){
      this.seen=!this.seen;
    },
    saveto:function(){
      var nic=$('.l_name').val();
      var wein=$('.l_weix').val();
      var emails=$('.l_email').val();
      var _this=this;
      function time(){
         return _this.timer=setTimeout(function(){
           this.seen=false;
         },3000)
      }
        var identis = localStorage.getItem("identi");
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identis,
        'username':nic,
        'wechat':wein,
        'email':emails
        };
        var arr = ['timestamp','app_key','app','v','identify','username','wechat','email'];
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
        
        
        _this.aset.name=$('.l_name').val();
        _this.aset.wechat_name=$('.l_weix').val();
        _this.aset.email=$('.l_email').val();
         if(da.data.recMeg){
              _this.seen=!_this.seen;
              _this.semess=da.data.recMeg;
              var timer=setTimeout(function(){
                _this.seen=false;
              },3000)
           if(da.data.recMeg=='保存成功'){
                var timer=setTimeout(function(){
                 _this.seen=false;
                   //_this.aset.name="";
                    // _this.$router.go(-1)
                },2000)
             }
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
         console.log(da)
         _this.aset = da.data.result;
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .lo-headery{
    width:100%;
    height:450/@pxtoem;
    position:relative;
    color:#fff;
    line-height: 3.05777778rem;
    text-align: center;
    font-size: 35/@pxtoem;
  }
  .all-re {
    color:#fff;
  }
  .lo-all {
    background: url(../../../static/images/bg.png) no-repeat center;
    background-size:100%;
    padding-top:0;
    }
  .lo-all .return-icon {
    background:url(../../../static/images/nar_icon_back.png) no-repeat center;
    background-size:22/@pxtoem;
  }
  .pe_link{
    margin-top:20/@pxtoem;
    background: url(../../../static/images/erweima_bg.png) no-repeat center;
    background-size:100%;
    width:500/@pxtoem;
    height:500/@pxtoem;
    padding:25/@pxtoem;
    margin:10/@pxtoem auto;
    margin-top:40/@pxtoem;
  }
  .pe_link img{
   width:450/@pxtoem;
   height:450/@pxtoem;
   margin:16/@pxtoem auto;
  }
  .boxLogin{
   margin-top:330/@pxtoem;
  }
  .boxLogin ul{
      background: rgba(255, 255, 255, 0);
      width:600/@pxtoem;
      margin-left:120/@pxtoem;
  }
  .icon_pic{
    width:60/@pxtoem;
   height:60/@pxtoem;
   display:inline-block;
   vertical-align: middle;
   background:#fff;
   z-index: 2;
   position: relative;
  }
  .boxLogin ul li{
   border:none;
  }
  
  .add_or{
   padding:30/@pxtoem;
  }
  .add_or ul li{
    border:8/@pxtoem #eee solid;
    background:#e3e3e3;
    -webkit-box-flex: 1;
    box-flex: 1;
    margin-right:20/@pxtoem;
  }
  .add_or ul li:last-child{
     margin-right:0;
  }
  .add_or ul li img{
     width:50/@pxtoem;
     height:50/@pxtoem;
  }
  .add_hi{
    width:100%;
    text-align:center;
    padding:25/@pxtoem 0;
  }
  .add_hi > span{
    display:block;
    color:#fff;
    margin-top:2/@pxtoem;
  }
   .boxLogin ul li input,.boxLogin ul li .spc_span{
    margin-left:30/@pxtoem;
    background: url(../../../static/images/yuan.png) no-repeat left center;
    background-size:33/@pxtoem 33/@pxtoem;
    padding-left:45/@pxtoem;
    width:380/@pxtoem;
    font-size:29/@pxtoem;
    color:#333;
  }
  .boxLogin ul li label{
    position:relative;
  }
  .boxLogin ul li label .line{
    position:absolute;
    color:#ffc8c3;
    left: 28/@pxtoem;
    top: 45/@pxtoem;
    font-size: 0;
    border-left:1px solid #ffc8c3;
    width:1px;
    height:40/@pxtoem;
    z-index:1;
  }
</style>


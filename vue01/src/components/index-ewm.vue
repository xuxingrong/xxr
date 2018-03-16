<template>
  <section class="sk-zf" v-bind:style="{height:all_height}">
    <div class="zd-header">
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBack">
         <div class="return-ico"></div>
      </div>
        收款
    </div>
    
    <div class="e_head sl-ub">
      <div v-bind:class="{'e_con':true,'e_zfb':e_zfb}" v-on:click = "switchEwm">
        <p>支付宝收款二维码</p>
      </div>
      <div v-bind:class="{'e_con':true,'e_wx':e_wx}" v-on:click = "switchEwm">
        <p>微信收款二维码</p>
      </div>
    </div>
<!--==支付宝-->
    <div v-bind:class="{'e_box':true,'boxZfb':e_zfb,'boxWx':e_wx}">
        <div class="e_pic" v-if="doubleseen">
            <img v-show="e_zfb" v-bind:src="this.imgzfb">
            <img v-show="e_wx" v-bind:src="this.imgwx">
            <input type="file" name="upload_file" class="upload" v-on:change="get_img"/>
         </div>
<!--==未上传二维码-->
        <div class="e_pic" v-if="!doubleseen">
            <img v-show="e_fir" class="e_fi" src="../../static/images/icon_tianjiatupian.png"/>
            <input type="file" name="upload_file" class="upload" v-on:change="get_img"/>
        </div>
        <h4 v-show="e_zfb" v-if="doubleseen">请提示客户使用支付宝客户端扫码支付</h4>
        <h4 v-show="e_wx" v-if="doubleseen">请提示客户使用微信客户端扫码支付</h4>
        <h4 v-if="!doubleseen">请上传您的支付二维码</h4>
        <div class="e_icon"></div>
    </div>
</section>
</template>

<script>
export default {
  name: 'sk-zf',
  data () {
    return {
      msg: "assd",
      e_zfb: true,
      e_wx: false,
      imgzfb:'',
      imgwx:'',
      doubleseen:false,
      cue:''
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
  methods:{
    returnBack:function(){
      this.$router.go(-1)
    },
    switchEwm:function(){
      this.e_zfb = !this.e_zfb;
      this.e_wx = !this.e_wx;
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
          url: _this.GLOBAL.www+'/apis/member.json?method=getPayQrcode',
          data: optionList,
          withCredentials:true,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
           //console.log(da.data.result.fav_info.length);
         if(da.data.recCode==200){
           var img_w=da.data.result.qcode.wx_qcode;
           var img_z=da.data.result.qcode.ali_qcode;
           var upPrent=$('.e_box');
          if(upPrent.hasClass('boxZfb')){
             if(img_z=='' || img_z==null){
              _this.doubleseen=false;
             }else{
               _this.doubleseen=true;
               _this.imgzfb=img_z;
             }
          }else if(upPrent.hasClass('boxWx')){
             if(img_w=='' || img_w==null){
             _this.doubleseen=false;
             }else{
               _this.doubleseen=true;
               _this.imgwx=img_w;
             }
          }
        }else{
           _this.is_ajax = false;
           _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    e_fir:function(){

    },
    get_img:function(e){
        var _this=this;
        var h5Form = new FormData();
        var insrc=e.target.files;
        var upType='';
        var imgId='';
        var upPrent=$(e.target).parents('.e_box');
        if(upPrent.hasClass('boxZfb')){
           upType='alipay';
          imgId=sessionStorage.getItem('imgId_zfb');
        }else if(upPrent.hasClass('boxWx')){
           upType='wxcollection';
           imgId=sessionStorage.getItem('imgId_wx');
        }
        //alert(upType);
        
        //console.log(e.target.files[0]);
        var identis = localStorage.getItem("identi");
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':_this.GLOBAL.app_key,
        'app':_this.GLOBAL.app,
        'v':_this.GLOBAL.v,
        'identify':identis,
        'image_id':imgId,
        'type':upType
        };
        var arr = ['timestamp','app_key','app','v','identify','image_id','type'];
        var sign = _this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign,'upload_file':insrc[0]};
        var option = $.extend(obj,obj2);
        for(var i in option){
          h5Form.append(i, option[i]);
        }
        if(insrc.length==0) return;
        if(upPrent.hasClass('boxZfb')){
               _this.imgzfb="../../../static/images/loading.gif";
        }else if(upPrent.hasClass('boxWx')){
               _this.imgwx="../../../static/images/loading.gif" ;
        }
        _this.$http({
            method: 'post',
            url: _this.GLOBAL.www+'/apis/member.json?method=uploadImage',
            data: h5Form,
            withCredentials:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
            //console.log(da.data.result.url);
            if(upPrent.hasClass('boxZfb')){
               _this.doubleseen=true;
               _this.imgzfb=da.data.result.url;
            }else if(upPrent.hasClass('boxWx')){
               _this.doubleseen=true;
               _this.imgwx=da.data.result.url;
            }
        
        })
        .catch(function (error) {
            console.log(error);
        });
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
        url: _this.GLOBAL.www+'/apis/member.json?method=getPayQrcode',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (da) {
          //console.log(da.data.result.fav_info.length);
         var img_w=da.data.result.qcode.wx_qcode;
         var img_z=da.data.result.qcode.ali_qcode;
        var upPrent=$('.e_box');
        if(upPrent.hasClass('boxZfb')){
           if(img_z=='' || img_z==null){
            _this.doubleseen=false;
           }else{
             _this.doubleseen=true;
             _this.imgzfb=img_z;
           }
        }else if(upPrent.hasClass('boxWx')){
           if(img_w=='' || null){
           _this.doubleseen=false;
           }else{
             _this.doubleseen=true;
             _this.imgwx=img_w;
           }
        }
        var imgIdz=da.data.result.qcode.ali_image_id;
        var imgIdw=da.data.result.qcode.wx_image_id;
        sessionStorage.setItem("imgId_zfb",imgIdz)
        sessionStorage.setItem("imgId_wx",imgIdw)
    })
    .catch(function (error) {
        console.log(error);
    });
       
  },
  computed:{
    init_ewm:function(){
      

    },
    all_height:function(){
      
      return window.innerHeight + 'px'
    }
  },
  beforeMount:function(){
    if(this.$route.params.ewm == "wx"){
      this.e_zfb = !this.e_zfb;
      this.e_wx = !this.e_wx;
    }
  }
  
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  .sc-ewm{
    width:86/@pxtoem;
    height:86/@pxtoem;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
  }
  .sk-zf{
  box-sizing:border-box;
   background:#eee;
   padding-top:85/@pxtoem;
  }
  a{
   color:#333;
  }
  .e_head{
   background:#fff;
  }
  .e_head .e_con{
    width:50%;
    text-align:center;
    font-size:30/@pxtoem;
  }
  .e_head .e_con p{
    box-sizing:border-box;
    width:250/@pxtoem;
    height:88/@pxtoem;
    line-height:90/@pxtoem;
    border-bottom:6/@pxtoem solid #fff;
    margin:0 auto;
  }
  .e_head .e_con.e_zfb p{
    color:#009fe8;
    border-bottom:6/@pxtoem solid #009fe8;
  }
  .e_head .e_con.e_wx p{
    color:#56b74a;
    border-bottom:6/@pxtoem solid #56b74a;
  }
    
 .e_box{
   background:#009fe8;
   border-radius:10/@pxtoem;
   text-align:center;
   padding:80/@pxtoem;
   margin:100/@pxtoem 40/@pxtoem;
   position:relative;
 }
 .e_box.boxWx{
  background:#56b74a;
 }
 .e_box .e_pic{
   width:100%;
   background:#e3e3e3;
   height:500/@pxtoem;
   position:relative;
   overflow:hidden;
 }
 .e_box .e_pic img{
   width:100%;
   height:100%;
 }
 .e_box h4{
   font-weight:normal;
   font-size:30/@pxtoem;
   color:#fff;
   margin-top:25/@pxtoem;
 }
 .e_box .e_icon{
   width:44/@pxtoem;
   height:44/@pxtoem;
   background:url(../../static/images/icon_d.png) no-repeat ;
   background-size:100%;
   position:absolute;
   right:24/@pxtoem;
   bottom:24/@pxtoem;
 }
 .e_show{
   display:block;
 }
 .e_box .e_pic img.e_fi{
   width:250/@pxtoem;
   height:250/@pxtoem;
   margin-top:125/@pxtoem;
 }
 .e_box .e_pic .upload{
   position:absolute;
   top:0;
   left:0;
   width:100%;
   height:500/@pxtoem;
   opacity:0
 }
</style>


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './Index'
import router from './router'
import $http from 'axios'
import global_ from './components/global/global'
Vue.prototype.GLOBAL = global_;
Vue.prototype.$http = $http;
$http.defaults.timeout = 10000;
//$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.config.productionTip = false;
//Vue.http.options.emulateJSON = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Index/>',
  components: {Index},
  created:function(){
    if(this.GLOBAL.isWeiXin()){
      this.getShareUrl();
    }
  },
  data () {
    return {
      shareurl:""
    }
  },
  methods:{
    getShareUrl:function(){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      
      if(!identi){
        this.ajax_get_wx_sign();
        this.shareurl = _this.GLOBAL.www
        return;
      }  
      var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'identify':identi,
          'method':'qrCode'
        };
      var arr = ['timestamp','app_key','app','v','identify','method'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+"/apis/hhk.html",
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          //console.log(response);
          _this.shareurl = response.data.result.qr_url;
          _this.ajax_get_wx_sign();
        }else{
          console.log(response);
          _this.ajax_get_wx_sign();
          _this.shareurl = _this.GLOBAL.www;
          return;
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    ajax_get_wx_sign:function(){
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
          'app_key':this.GLOBAL.app_key,
          'app':this.GLOBAL.app,
          'v':this.GLOBAL.v,
          'url':window.location.href
        };
      var arr = ['timestamp','app_key','app','v','url'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+"/apis/member.json?method=getSignPackage",
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          _this.wx_config(response.data.result);
        }else{
          //console.log(response);
          //_this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    wx_config:function(obj){
      var _this = this;
      wx.config({
        debug: false,
        appId: obj.appId,
        timestamp: obj.timestamp,
        nonceStr: obj.nonceStr, 
        signature: obj.signature,
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','scanQRCode'] 
      });
      wx.ready(function(){
        wx.onMenuShareTimeline({
          title: '海惠客',
          link: _this.shareurl,
          imgUrl: 'http://m.hhwall.com/static/images/hhwang_logo.png', 
          success: function () { 
            //alert("分享成功");
          },
          cancel: function () { 
            
          }
        });
        wx.onMenuShareAppMessage({
          title: '海惠客',
          desc: '注册海惠客微信端，领取新人神秘大礼~~~',
          link: _this.shareurl,
          imgUrl: 'http://m.hhwall.com/static/images/hhwang_logo.png', 
          success: function () { 
            //alert("分享成功");
          },
          cancel: function () { 
            
          }
        });
        wx.onMenuShareQQ({
          title: '海惠客',
          desc: '注册海惠客微信端，领取新人神秘大礼~~~',
          link: _this.shareurl,
          imgUrl: 'http://m.hhwall.com/static/images/hhwang_logo.png', 
          success: function () { 
            //alert("分享成功");
          },
          cancel: function () { 
            
          }
        });
        wx.onMenuShareWeibo({
          title: '海惠客',
          desc: '注册海惠客微信端，领取新人神秘大礼~~~',
          link: _this.shareurl,
          imgUrl: 'http://m.hhwall.com/static/images/hhwang_logo.png',  
          success: function () { 
            //alert("分享成功");
          },
          cancel: function () { 
            
          }
        });
        wx.onMenuShareQZone({
          title: '海惠客',
          desc: '注册海惠客微信端，领取新人神秘大礼~~~',
          link: _this.shareurl,
          imgUrl: 'http://m.hhwall.com/static/images/hhwang_logo.png', 
          success: function () { 
            //alert("分享成功");
          },
          cancel: function () { 
            
          }
        });
      });
      wx.error(function(res){
        console.log(res);
      });
    }
  }
})
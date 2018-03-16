<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        个人信息
     </div>
     
     <div class="setBox">
        <div class="sSpc s_first">
           <h4 class="listLeft"> <img v-bind:src="this.userimg"></h4>
           <span>修改头像<i class="lIcon"></i></span>
           <input type="file" name="upload_file" class="in_file" v-on:change="get_img"/>
        </div>
        <router-link to="/hhk/set_person_name" >
           <h4>昵称</h4>
           <span>{{nic}}<i class="lIcon"></i></span>
        </router-link>
        <div class="sSpc" v-on:click="sBox_show">
           <h4>性别</h4>
           <span class="sex_change">{{sex}}<i class="lIcon"></i></span>
        </div>
        <div class="sSpc">
          <h4>账号</h4>
           <span>{{user}}</span>
        </div>
        <router-link to="">
           <h4>手机绑定</h4>
           <span>{{glp(aset.mobile)}}</span>
        </router-link>
        <router-link to="/hhk/set_person_ewmb" class="mar_spc">
           <h4>我的二维码名片</h4>
           <span>
             <img src="../../../static/images/icon_erweima.png" class="s_ewm"/>
             <i class="lIcon"></i>
           </span>
        </router-link>
        <router-link to="/addlist">
           <h4>我的收货地址</h4>
           <span><i class="lIcon"></i></span>
        </router-link>
     </div>

     <dialog class="d_sex" v-if="s_show">
        <ul>
          <li v-on:click="sBox_change">男</li>
          <li v-on:click="sBox_change">女</li>
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
      sexA: "女" ,
      sexB: "男" ,
      s_show: false,
      userimg:'../../../static/images/hyzx_touxiang.png',
      nic:'昵称',
      sex:'未知',
      user:'',
      phone:'',
      aset:''

    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    sBox_show: function(){
      this.s_show=!this.s_show;
    },
    glp:function(item){
       if(item==undefined){
         return;
       }else{
         return item.slice(0,3)+'****'+item.slice(7,11);
       }
    },
    sBox_change: function(e){
      this.s_show=!this.s_show;
      this.sex=$(e.target).text();
      var userSex='';
      if(this.sex=='男'){
        userSex=1;
      }else if(this.sex=='女'){
        userSex=0;
      }else{
        userSex=2;
      }
      var identis = localStorage.getItem("identi");
      var _this=this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      var obj = {'timestamp':timestamp.toString(),
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identis,
      'sex':userSex
      };
      var arr = ['timestamp','app_key','app','v','identify','sex'];
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
          console.log(da)
         
      })
      .catch(function (error) {
          console.log(error);
      });

      
    },
    get_img:function(e){
        var _this=this;
        var h5Form = new FormData();
        var insrc=e.target.files;
        //console.log(e.target.files[0]);
        var identis = localStorage.getItem("identi");
        var timestamp = Date.parse(new Date());
        timestamp = timestamp/1000;
        var obj = {'timestamp':timestamp.toString(),
        'app_key':_this.GLOBAL.app_key,
        'app':_this.GLOBAL.app,
        'v':_this.GLOBAL.v,
        'identify':identis,
        'type':'headportrait'
        };
        var arr = ['timestamp','app_key','app','v','identify','type'];
        var sign = _this.GLOBAL.getSign(arr,obj);
        var obj2 = {'sign':sign,'upload_file':insrc[0]};
        var option = $.extend(obj,obj2);
        for(var i in option){
          h5Form.append(i, option[i]);
        }
        if(insrc.length==0) return;
        _this.userimg="../../../static/images/loading.gif"
        _this.$http({
            method: 'post',
            url: _this.GLOBAL.www+'/apis/member.json?method=uploadImage',
            data: h5Form,
            withCredentials:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (da) {
        //console.log(da)
        if(da.data.recMeg=='上传成功'){
              _this.userimg=da.data.result.url;
        }

          
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  },
  mounted:function(){
  
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
    'identify':identis.toString()
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
         _this.aset = da.data.result.userInfo;
        var head_img=da.data.result.userInfo.ava_url;
      if(head_img==''){
         _this.userimg='../../../static/images/hyzx_touxiang.png';
      }else{
         _this.userimg=head_img;
      }
     

      _this.nic=da.data.result.userInfo.name;
      if(da.data.result.userInfo.sex==1){
        _this.sex='男';
      }else if(da.data.result.userInfo.sex==0){
         _this.sex='女';
      }else{
         _this.sex='未知';
      }
      _this.user=da.data.result.userInfo.wechat;
    })
    .catch(function (error) {
        console.log(error);
    });

    
  }

   
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .s_ewm{
   width:30/@pxtoem;
   height:30/@pxtoem;
   position:relative;
   top:5.5/@pxtoem;
  }
  dialog.d_sex{
   position: fixed;
   z-index: 1000;
   top: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.5);
   display: block;
  }
  dialog.d_sex ul{
   position:absolute;
   bottom:0;
   left:50%;
   margin-left:-320/@pxtoem;
  }
  dialog.d_sex ul li{
   background:#fff;
   border-radius:20/@pxtoem;
   width:640/@pxtoem;
   text-align:center;
   padding:35/@pxtoem 0;
   color: #009fff;
   font-size:32/@pxtoem;
   font-weight:400;
  }
  dialog.d_sex ul li:first-child{
   border-radius:20/@pxtoem  20/@pxtoem 0 0;
  }
  dialog.d_sex ul li:nth-child(2){
    border-radius: 0 0 20/@pxtoem  20/@pxtoem;
    margin-bottom:20/@pxtoem;
  }
  dialog.d_sex ul li:nth-child(3){
    margin-bottom:20/@pxtoem;
  }
  .in_file{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:100;
    opacity:0;
  }
</style>


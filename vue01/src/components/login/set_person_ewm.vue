<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-headery">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        海惠客
        

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
               <span class="l_name">{{aset.name}}</span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>
                 <img src="../../../static/images/icon_phone@2x.png" class="icon_pic"/>
                  <em class="line">|</em>
               </label>
              <span class="l_name">{{aset.mobile}}</span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>
                 <img src="../../../static/images/icon_wechat@2x.png" class="icon_pic"/>
                  <em class="line">|</em>
               </label>
              <span class="l_name"> {{aset.wechat_name}} </span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
           <!--<li>
               <label>
                 <img src="../../../static/images/icon_email@2x.png" class="icon_pic"/>
                 <em class="line">|</em>
               </label>
               <span class="l_name">{{aset.email}}</span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>-->
          <li>
               <label>
                 <img src="../../../static/images/icon_iob.png" class="icon_pic"/>
                 <em class="line">|</em>
               </label>
               <span class="l_name">{{aset.area}}</span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>
                 <img src="../../../static/images/icon_address.png" class="icon_pic"/>
               </label>
               <span class="l_name">{{aset.area}}</span>
               <div class="l_icons">
                  <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
        </ul>
    </div>
</section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      aset:''
     }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.push('/hhk');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('').focus();
     $(".comBtm").attr('disabled','true');
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
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
      //console.log(da);
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
      width:650/@pxtoem;
      margin-left:100/@pxtoem;
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
   .boxLogin ul li input {
   border-bottom:1px solid #f1f1f1;
   padding:25/@pxtoem 0;
   width:590/@pxtoem;
   font-size:29/@pxtoem;
   margin-left:12/@pxtoem;
   
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
  .l_name{
    margin-left:33/@pxtoem;
    background: url(../../../static/images/yuan.png) no-repeat left center;
    background-size:33/@pxtoem 33/@pxtoem;
    padding-left:40/@pxtoem;
    display:inline-block;
    vertical-align: middle;
    line-height:35/@pxtoem;
    width:448/@pxtoem;
  }
  .boxLogin ul li label{
    position:relative;
    display:inline-block;
    vertical-align: middle;
  }
  .boxLogin ul li label .line{
    position:absolute;
    color:#ffc8c3;
    left: 28/@pxtoem;
    top: 65/@pxtoem;
    font-size: 0;
    border-left:1px solid #ffc8c3;
    width:1px;
    height:40/@pxtoem;
    z-index:1;
  }
</style>


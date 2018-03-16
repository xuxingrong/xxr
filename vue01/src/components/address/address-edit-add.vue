<template>
  <section>
    <router-view v-on:childreturnAdd = parentgetAdd ></router-view>
    <header>
      <router-link to="/addlist" class="return sl-ub sl-uac sl-upc" >
        <div class="return-black-ico"></div>
      </router-link>
      <span v-if="is_e">编辑地址</span>
      <span v-else>添加新地址</span>
      <div class="save" v-on:click="ajax_save_add">
        保存
      </div>
    </header>
    <div class="add-xx-box" v-bind:style="{height:all_height}" v-bind:add_id="addrObj.addr_id">
      <div class="bb-line add-item sl-ub">
        <div>收货人</div>
        <div class="sl-ub sl-uac">
          <input type="text" class="shr" v-bind:value="addrObj.name" maxlength="16" size="16" />
        </div>
      </div>
      <div class="bb-line add-item sl-ub">
        <div>联系电话</div>
        <div class="sl-ub sl-uac">
          <input type="number" v-bind:value="addrObj.mobile" class="mobile"  />
        </div>
      </div>
      <div class="bb-line add-item sl-ub">
        <div>所在地区</div>
        <div>
          <div class="sl-ub sl-uac sl-upe" v-on:click="setArea">
            <div class="noselect-val area" v-bind:add_code="addrObj.region_id">{{addrObj.area}}</div>
            <div class="select-ico"></div>
          </div>
        </div>
        
      </div>
      
      <div class="add-item add-textarea">
        <textarea placeholder="请填写详细地址，不少于5个字">{{addrObj.addr}}</textarea>
        
      </div>
      <div v-if="is_e" v-on:click="del_select" class="bb-line add-item sl-ub">
        <div class="del-add">删除地址</div>
      </div>
      <div v-else class="bb-line add-item sl-ub">
        <div>设为默认</div>
        <div class="sl-ub sl-uac sl-upe">
          <div v-on:click="set_default" v-bind:class="{'mr-ico':true,'no-mr':no_mr} ">
            <div class="switch-btn"></div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="dia_smail" style="display:none;">
      <div class="d_box">
        <span>{{msg}}</span>
      </div>
    </div>
    <section v-on:click.self="hide_box" v-bind:class="{'del-lljl-section':true,'hide':del_box_hides}">
        <div class="lljl-del-box fd-center">
          <div>
            确定删除该地址？
          </div>
          <div class="sl-ub sl-ubf1 lljl-down-box">
            <div class="lljl-close" v-on:click="hide_box">取消</div>
            <div v-on:click="ajax_del_add" class="lljl-yes">确定</div>
          </div>
        </div>
      </section>
  </section>
</template>

<script charset="UTF-8">
export default {
  name: 'add-e-a',
  data () {
    return {
      del_box_hides:true,
      msg:"",
      is_e: false,
      no_mr:true,
      addrObj:{
        addr:"",
        addr_id:0,
        area:"请选择",
        card_number:"",
        def_addr:0,
        mobile:"",
        name:"",
        real_name:"",
        region_id:"",       
        tel:"",
        user_id:0,
        zip:"",
        
      }
    }
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  created:function(){
  
    var edit_id = this.$route.params.add_id;
    if(edit_id != 'new'){
      this.is_e = true;
      this.ajax_edit_get(edit_id);
    }
  },
  methods:{
    hide_box:function(){
      this.del_box_hides = true;
    },
    del_select:function(e){
      this.del_box_hides = false;
    },
    tc_ts:function(msg){
      this.msg = msg;
      $(".dia_smail").show();
      setTimeout(function(){
        $(".dia_smail").hide();
      },1500);
    },
    setArea:function(){
      this.addrObj.name = $(".shr").val();
      this.addrObj.mobile = $(".mobile").val();
      this.addrObj.addr = $(".add-textarea textarea").val();
      this.$router.push("/addedit/"+this.$route.params.add_id+"/add_sel");
    },
    set_default:function(){
      this.addrObj.name = $(".shr").val();
      this.addrObj.mobile = $(".mobile").val();
      this.no_mr = !this.no_mr;
    },
    validate_form:function(){
      if($(".shr").val()==""){
        this.tc_ts("收货人不可为空");
        return false;
      }
      if(!this.GLOBAL.regular.reg_phone.test($(".mobile").val())){
        this.tc_ts("请填写正确的手机号码");
        return false;
      }
      if($(".noselect-val.area").attr("add_code")==""){
        this.tc_ts("所在地区不可为空");
        return false;
      }
      if($(".add-textarea textarea").val().length < 5){
        this.tc_ts("详细地址不少于5个字");
        return false;
      }
      return true;
      
    },
    parentgetAdd:function(address,addCode){
      this.addrObj.area = address;
      this.addrObj.region_id = addCode;
    },
    ajax_edit_get:function(eid){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identi,
      'addr_id':eid
      };
      var arr = ['timestamp','app_key','app','v','identify','addr_id'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=addrUpdate',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          _this.addrObj = response.data.result.addrInfo;
          //console.log(response);
        }else{
         //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    ajax_del_add:function(){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identi,
      'addr_id':this.$route.params.add_id
      };
      var arr = ['timestamp','app_key','app','v','identify','addr_id'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=delAddr',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          //console.log(response);
          _this.del_box_hides = true;
          _this.$router.push("/addlist");
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getVal:function(){
      var obj = {};
      obj.names = $(".shr").val();
      obj.mobiles = $(".mobile").val();
      obj.area = $(".area").attr("add_code");
      obj.addr = $(".add-textarea textarea").val();
      return obj;
    },
    ajax_save_add:function(e){
      if(!this.validate_form()){
        this.addrObj.name = $(".shr").val();
        this.addrObj.mobile = $(".mobile").val();
        this.addrObj.addr = $(".add-textarea textarea").val();
        return;
      }
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var addObj = this.getVal();
      if(this.is_e){
        var obj = {'timestamp':timestamp,
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identi,
        'name':addObj.names,
        'mobile':addObj.mobiles,
        'area':addObj.area,
        'addr':addObj.addr,
        'def_addr':this.addrObj.def_addr,
        'addr_id':this.addrObj.addr_id
        };
        var arr = ['timestamp','app_key','app','v','identify','name','mobile','area','addr','def_addr','addr_id'];
      }else{
        if($(".mr-ico").hasClass("no-mr")){
          var def_addr = 0;
        }else{
          var def_addr = 1;
        }
        var obj = {'timestamp':timestamp,
        'app_key':this.GLOBAL.app_key,
        'app':this.GLOBAL.app,
        'v':this.GLOBAL.v,
        'identify':identi,
        'name':addObj.names,
        'mobile':addObj.mobiles,
        'area':addObj.area,
        'addr':addObj.addr,
        'def_addr':def_addr
        };
        var arr = ['timestamp','app_key','app','v','identify','name','mobile','area','addr','def_addr'];
      }
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=saveAddress',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          //console.log(response);
          //_this.$router.push("/addlist");
          _this.$router.go(-1);
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
     
    
    
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    position:fixed;
    top:0;
    z-index:9;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#fff;
    border-bottom:1/@pxtoem solid #eee;
  }
  .save{
    width:86/@pxtoem;
    height:100%;
    color:#333;
    position:absolute;
    top:0;
    right:0;
    z-index:10;
    font-size:30/@pxtoem;
  }
  .add-xx-box{
    box-sizing:border-box;
    padding-top:87/@pxtoem;
    background:#eee;
  }
  .add-xx-box>div{
    background:#fff;
    padding:0 30/@pxtoem;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    color:#333;
    font-size:28/@pxtoem;
  }
  .add-xx-box .bb-line{
    border-bottom:1/@pxtoem solid #eee;
  }
  .add-item>div:first-child{
    width:155/@pxtoem;
  }
  .add-item>div:nth-child(2){
    width:535/@pxtoem;
  }
  .add-item input{
    width:500/@pxtoem;
    height:40/@pxtoem;
    line-height:40/@pxtoem;
    font-size:28/@pxtoem;
    outline:none;
  }
  .add-item .select-ico{
    width:16/@pxtoem;
    height:26/@pxtoem;
    background:url(../../../static/images/htk_icon_wddd_ckgd.png) no-repeat center;
    background-size:16/@pxtoem 26/@pxtoem;
    margin-left:20/@pxtoem;
  }
  .noselect-val{
    color:#999;
  }
  .add-item textarea{
    width:100%;
    box-sizing:border-box;
    height:176/@pxtoem;
    padding:30/@pxtoem 0;
    padding:30/@pxtoem 0;
    font-size:28/@pxtoem;
    outline:none;
  }
  .add-xx-box .add-textarea{
    height:176/@pxtoem;
    margin-bottom:20/@pxtoem;
  }
  .mr-ico{
    width:102/@pxtoem;
    height:62/@pxtoem;
    background:url(../../../static/images/on.png) no-repeat center;
    background-size:102/@pxtoem 62/@pxtoem;
    position:relative;
  }
  .switch-btn{
    width:70/@pxtoem;
    height:76/@pxtoem;
    background:url(../../../static/images/bold-shadow.png) no-repeat center;
    background-size:70/@pxtoem 76/@pxtoem;
    position:absolute;
    top:0;
    right:-6/@pxtoem;
  }
  .mr-ico.no-mr{
    width:102/@pxtoem;
    height:62/@pxtoem;
    background:url(../../../static/images/off.png) no-repeat center;
    background-size:102/@pxtoem 62/@pxtoem;
    position:relative;
  }
  .mr-ico.no-mr .switch-btn{
    top:0;
    left:-6/@pxtoem;
  }
  .add-item .del-add{
    color:#d8272a;
  }
</style>
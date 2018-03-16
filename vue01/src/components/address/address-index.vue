<template>
  <section>
    <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
      <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
    </div>
    <!--<router-view v-bind:del_id="del_id" v-on:childE="parentE"></router-view>-->
    <header>
      <div class="return sl-ub sl-uac sl-upc" v-on:click="returnBefore" >
        <div class="return-black-ico"></div>
      </div>
      收货地址
    </header>
    <div class="address-lists" v-bind:style="{'min-height':all_height}">
      <template v-if="no_Ad">
      <div class="no-add-lists">
        <div class="icon"></div>
        <p>暂无收货地址</p>
      </div>
      </template>
      <template v-else>
      <ul>
      	<li v-for="addl in ajax_result.addrlist" v-bind:add_id="addl.addr_id">
          <div class="add-brief">
            <div class="sl-ub">
              <div class="shr">{{addl.name}}</div>
              <div class="phone">{{addl.mobile}}</div>
            </div>
            <div class="add-xx">
              <div>{{addl.area}}{{addl.addr}}</div>
            </div>
          </div>

          <div v-if="addl.def_addr==1" class="operate-add sl-ub mr">
            <div class="sl-ub sl-uac">
              <div class="ico"></div>
              <div class="txt">默认地址</div>
            </div>
            <div class="sl-ub sl-upe">
              <div v-on:click="editAdd" class="edit sl-ub sl-uac">
                <div></div>
                <p>编辑</p>
              </div>
              <div v-on:click="del_select" class="delet sl-ub sl-uac">
                <div></div>
                <p>删除</p>
              </div>
            </div>
          </div>
          <div v-else  class="operate-add sl-ub">
            <div class="sl-ub sl-uac">
              <div class="ico" v-on:click="ajax_set_default"></div>
              <div class="txt">设为默认</div>
            </div>
            <div class="sl-ub sl-upe">
              <div v-on:click="editAdd" class="edit sl-ub sl-uac">
                <div></div>
                <p>编辑</p>
              </div>
              <div v-on:click="del_select" class="delet sl-ub sl-uac">
                <div></div>
                <p>删除</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="dia_smail" style="display:none;">
        <div class="d_box">
          <span>{{msg}}</span>
        </div>
      </div>
     <section v-on:click.self="hide_box" v-bind:class="{'del-lljl-section':true,'hide':del_box_hide}">
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
      </template>
    </div>
    <router-link to="/addedit/new" class="footer">
      添加新地址
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'add-index',
  data () {
    return {
      msg: '',
      no_Ad:false,
      is_loading:true,
      ajax_result:{},
      del_id:0,
      del_box_hide:true
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
    this.ajax_get_lists();
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  methods:{
    hide_box:function(){
      this.del_box_hide = true;
    },
    del_select:function(e){
      this.del_id = $(e.target).parents("li").attr("add_id");
      this.del_box_hide = false;
    },
    ajax_del_add:function(e){
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
      'addr_id':_this.del_id
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
          _this.$emit('childE');
          _this.ajax_get_lists();
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    tc_ts:function(msg){
      this.msg = msg;
      $(".dia_smail").show();
      setTimeout(function(){
        $(".dia_smail").hide();
      },1500);
    },
    returnBefore:function(){
      this.$router.push('/hhk');
    },
    ajax_get_lists:function(){
      var identi = localStorage.getItem("identi");
      var _this = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp/1000;
      timestamp = timestamp.toString();
      var obj = {'timestamp':timestamp,
      'app_key':this.GLOBAL.app_key,
      'app':this.GLOBAL.app,
      'v':this.GLOBAL.v,
      'identify':identi
      };
      var arr = ['timestamp','app_key','app','v','identify'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'apis/member.json?method=address',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){ 
          _this.ajax_result = response.data.result;
          if(!_this.ajax_result.totalcount){
            _this.no_Ad = true;
          }
          _this.is_loading = false;
          _this.del_box_hide = true;
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
    ajax_set_default:function(e){
      var add_id = $(e.target).parents("li").attr("add_id");
     
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
      'addr_id':add_id
      };
      var arr = ['timestamp','app_key','app','v','identify','addr_id'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'apis/member.json?method=setAddrDef',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        if(response.data.recCode==200){
          _this.ajax_get_lists();
         // console.log(response);
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    editAdd:function(e){
      var edit_id = $(e.target).parents("li").attr("add_id");
      this.$router.push("/addedit/"+edit_id);
    },
    parentE:function(){
      this.ajax_get_lists();
    }
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
  .footer{
    position:fixed;
    bottom:0;
    z-index:9;
    width:100%;
    height:98/@pxtoem;
    line-height:98/@pxtoem;
    text-align:center;
    font-size:34/@pxtoem;
    background:#d8272a;
    color:#fff;
  }
  .address-lists{
    box-sizing:border-box;
    padding:87/@pxtoem 0 98/@pxtoem;
    background:#eee;
  }
  .no-add-lists{
    height:305/@pxtoem;
    position:absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
  }
  .no-add-lists .icon{
    width:200/@pxtoem;
    height:200/@pxtoem;
    background:url(../../../static/images/icon_sh.png) no-repeat center;
    background-size:200/@pxtoem 200/@pxtoem;
    margin:0 auto 40/@pxtoem;
  }
  .no-add-lists p{
    color:#333;
    font-size:26/@pxtoem;
    text-align:center;
    line-height:28/@pxtoem;
  }
  .address-lists li{
    background:#fff;
    margin-bottom:20/@pxtoem;
  }
  .address-lists li>div{
    padding:0 30/@pxtoem;
  }
  .address-lists li>div:first-child{
    font-size:26/@pxtoem;
    color:#333;
  }
  .phone{
    width:230/@pxtoem;
    height:30/@pxtoem;
    line-height:30/@pxtoem;
    text-align:right;
  }
  .shr{
    width:460/@pxtoem;
    height:30/@pxtoem;
    line-height:30/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .address-lists li>div:first-child .sl-ub{
    padding:26/@pxtoem 0;
  }
  .add-xx{
    padding-bottom:26/@pxtoem;
  }
  .add-xx>div{
    width:100%;
    height:30/@pxtoem;
    line-height:30/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .operate-add{
    box-sizing:border-box;
    height:90/@pxtoem;
    border-top:1/@pxtoem solid #eee;
    padding:0 40/@pxtoem 0 30/@pxtoem;
  }
  .operate-add>div{
    width:50%;
    font-size:24/@pxtoem;
    color:#333;
  }
  .operate-add .ico{
    width:30/@pxtoem;
    height:30/@pxtoem;
    background:url(../../../static/images/xz.png) no-repeat center;
    background-size:30/@pxtoem 30/@pxtoem;
    margin-right:10/@pxtoem;
  }
  .operate-add.mr .ico{
    background:url(../../../static/images/xz_p.png) no-repeat center;
    background-size:30/@pxtoem 30/@pxtoem;
  }
  .operate-add.mr .txt{
    color:#d8272a;
  }
  .operate-add .edit{
    margin-right:20/@pxtoem;
  }
  .edit>div{
    width:34/@pxtoem;
    height:34/@pxtoem;
    background:url(../../../static/images/icon_bj.png) no-repeat center;
    background-size:34/@pxtoem 34/@pxtoem;
    margin-right:10/@pxtoem
  }
  .delet>div{
    width:34/@pxtoem;
    height:34/@pxtoem;
    background:url(../../../static/images/icon_sc.png) no-repeat center;
    background-size:34/@pxtoem 34/@pxtoem;
    margin-right:10/@pxtoem
  }
  .operate-add a{
    color:#333;
  }
</style>
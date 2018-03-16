<template>
  <section v-on:click.self="returnBefore">
    <div class="lljl-del-box fd-center">
      <div>
        确定删除该地址？
      </div>
      <div class="sl-ub sl-ubf1 lljl-down-box">
        <div class="lljl-close" v-on:click="returnBefore">取消</div>
        <div v-on:click="ajax_del_add" class="lljl-yes">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
 
export default {
  name: 'add-del',
  props:['del_id'],
  data () {
    return {
      msg: '',
      
    }
  },
  methods:{
    returnBefore:function(){
      this.$router.go(-1);
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
          _this.$router.push("/addlist");
        }else{
          //console.log(response);
          _this.$router.push("/hhk/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  section{
    position:fixed;
    z-index:1000;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.5);
  }
  .lljl-del-box{
    width:620/@pxtoem;
    height:280/@pxtoem;
    position:absolute;
    z-index:1000;
    background:#fff;
    border-radius:10/@pxtoem;
  }
  .lljl-del-box>div:first-child{
    height:192/@pxtoem;
    line-height:192/@pxtoem;
    color:#333;
    font-size:32/@pxtoem;
    text-align:center;
  }
  .lljl-down-box>div{
    box-sizing:border-box;
    width:50%;
    font-size:28/@pxtoem;
    text-align:center;
    height:88/@pxtoem;
    line-height:88/@pxtoem;
  }
  .lljl-close{
    background:#fff;
    color:#333;
    border-top:1/@pxtoem solid #eee;
    border-bottom-left-radius:10/@pxtoem;
  }
  .lljl-yes{
    background:#f23030;
    color:#fff;
    border-top:1/@pxtoem solid #f23030;
    border-bottom-right-radius:10/@pxtoem;
  }
</style>

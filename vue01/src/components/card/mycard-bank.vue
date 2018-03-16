<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss">
        <div class="return-icon"></div>
      </div>
        发卡银行
    </div>

    <div class="bankBox">
      <ul>
        <!-- <li>
            <i><img src="../../../static/images/zs.png" /></i>
            <span>招商银行</span>
         </li>
         -->
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
    this.$emit('child2E');
    this.getBankList();
  },
  mounted:function(){
    //$('input').attr('readonly','readonly')
  },
  methods:{
    getBankList:function(){
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
      //console.log(optionList);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=getBankList',
        data: optionList,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (da) {
        //console.log(da);
        if(da.data.recCode==200){
          var len=da.data.result.cardlist.length;
          var str='';
        
        for(var i=0;i<len;i++){
           str+='<li><i><img src="'
              +da.data.result.cardlist[i].bank_logo
              +'"/></i><span>'
              +da.data.result.cardlist[i].bank_name
              +'</span><em class="bid hide">'
              +da.data.result.cardlist[i].bank_id
              +'</em></li>'
        }
        $('.bankBox ul').append(str);
     
        $('.bankBox ul li').click(function(){
           var al_name=$(this).find("span").text();
           //var al_id=$(this).find(".bid").text();
           _this.$emit('childE',al_name);
           _this.$router.go(-1)
        })
        }else{
          console.log(da);
          _this.$router.push("/hhk/login");
        }
         
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    ss:function(){
      this.$router.go(-1)
    },
    anPd: function(){
      this.$router.push('/hhk');
    },
    show:function(){
      return false;
    },
  },
  computed:{
    all_height:function(){
      return window.innerHeight + 'px'
    }
    
  }
}
</script>
<style  lang="less">
  @pxtoem:28.125rem;
  .bankBox{
   background:#fff;
   border-top:1/@pxtoem solid #f1f1f1;
  }
  .bankBox ul{
   margin-left:30/@pxtoem;
  }
  .bankBox ul li{
   padding:15/@pxtoem;
   border-bottom:1/@pxtoem solid #f1f1f1;
  }
  .bankBox ul li >i{
    width:53/@pxtoem;
    height:53/@pxtoem;
    border-radius:50%;
    background:#fff;
    overflow:hidden;
    text-align:center;
    display:inline-block;
    vertical-align:middle;
  }
  .bankBox ul li >i img{
    width:100%;
  }
  .bankBox ul li > span{
    display:inline-block;
    vertical-align:middle;
    font-size:32/@pxtoem;
    margin-left:22/@pxtoem;
  }
</style>
<style scoped lang="less">
@pxtoem:28.125rem;
 .lo-all {
  position:fixed;
  top:0/@pxtoem;
  left:0;
  z-index:1000;
  width:100%;
 }
</style>


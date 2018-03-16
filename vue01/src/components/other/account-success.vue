<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        账户充值
        
    </div>

    <div class="boxLogin">
      <div class="cz_list">
         <i class="czicon ct">
           <img src="../../../static/images/jt.png" />
         </i>
         <div class="cz_text">
          交通银行</br>
          <span>尾号8888</span>
         </div>
         <i class="czicon cb"></i>
      </div>
      <p class="title_soy">该卡本次最多可充值10,000.00元</p>
       <ul>
         <li>  
               <label>金额</label>
               <input type="number" class="l_number" placeholder="请输入充值金额" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
       </ul>
       <p class="red_soy"></p>
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">下一步</button>
    </div>
    <router-view ></router-view>
  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      isTrue:false,
      isClick:false,
      isTrue2: false
    }
  },
  mounted:function(){
     $(".l_number").bind('input propertychange', function() {
         var ln=$(".l_number").val();
         if(ln!==""){
           $(".comBtm").removeAttr('disabled');
         }else{
           $(".comBtm").attr('disabled','true');
         }
      })

  },
  methods:{
    ss:function(){
      this.$router.go(-1)
    },
    s_deleted:function(e){
     $(e.target).parents('li').find('.l_delete').removeClass('hide');
    },
    clear: function(e){
     $(e.target).parents('li').find('.l_delete').addClass('hide');
     $(e.target).parents('li').find('input').val('');
     $(".comBtm").attr('disabled','true');
    },
    anPd: function(){
      //this.$router.push("/hhk/account-forget_step1");
      this.$router.push("/hhk/account-charge/charge-step1");
      // console.log(document.referrer);
    },
   },
  computed:{
    ww:function(){
      return  ;
    },
     all_height:function(){
     return window.innerHeight + 'px'
    }
  }
}
</script>

<style scoped lang="less">
  @pxtoem:28.125rem;
  .title_soy{
   margin-bottom:20/@pxtoem;
   display:block;
   padding-left:30/@pxtoem;
   font-size:30/@pxtoem;
   color:#999;
  }
 .cz_list{
   background:#fff;
   padding:20/@pxtoem 0 20/@pxtoem 30/@pxtoem;
   margin-bottom:20/@pxtoem;
 }
 .cz_list .czicon{
    width: 55/@pxtoem;
    height: 55/@pxtoem;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
 }
  .cz_list .czicon.ct img{
    width:100%;
  }
  .cz_list .czicon.cb{
    width: 20/@pxtoem;
    height: 40/@pxtoem;;
    background:url(../../../static/images/icon_wddd_ckgd.png) center no-repeat;
    background-size: 20/@pxtoem 40/@pxtoem;;
    margin-top:  20/@pxtoem;
    margin-right: 30/@pxtoem;
    float:right;
  }
 .cz_list .cz_text{
   display: inline-block;
   vertical-align: middle;
   margin-left:20/@pxtoem;
 }
 .cz_list .cz_text span{
  display:block;
  color:#999;
  margin-top:5/@pxtoem;
 }
 .cz_list{}
 .cz_list{}
</style>


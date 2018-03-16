<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        我的银行卡
        <div class="all-re sl-ub sl-uac sl-upc" v-on:click="chan_red" v-bind:class="{isb:isTrue}">
          编辑
        </div>
    </div>

    <div class="mycBox">
      <ul>
        <li>
          <div class="mc_left" v-if="checkShow">
             <input type="checkbox" id="lo_choo" class="mc_check"/>
          </div>
          <div class="mc_right mc_jiaotong" >
             <div class="mc_img">
                <img src="../../../static/images/icon_jtyh_s.png" />
             </div>
             <div class="mc_name">
                <span>招商银行</span>
                <span>储蓄卡</span>
             </div>
             <h4 class="num"><span>**** **** **** </span>8888</h4>
          </div>
        </li>
        <li>
          <div class="mc_left" v-if="checkShow">
             <input type="checkbox" id="lo_choo" class="mc_check"/>
          </div>
          <div class="mc_right mc_zhaoshang">
             <div class="mc_img">
                <img src="../../../static/images/zs.png" />
             </div>
             <div class="mc_name">
                <span>交通银行</span>
                <span>信用卡</span>
             </div>
             <h4 class="num"><span>**** **** **** </span>8888</h4>
          </div>
        </li>
      </ul>
      <div class="add_card" v-on:click="rouLink">
         <img src="../../../static/images/icon_jia@2x.png" />
         <span>添加银行卡</span>
      </div>
    </div>
    
    <button class="sf_btm" v-if="checkShow" v-on:click="li_delete">删除</button>

    <aside class="pop" v-if="seen">
        <div class="p_box">添加成功</div>
     </aside>
    <aside class="pop-box" v-if="cancel">
        <div class="p_change" >
          <h4>确定删除此银行卡</h4>
          <div class="p_tt clearfix">
            <span v-on:click="can_btm">取消</span>
            <span class="p_red" v-on:click="sure_btm">确定</span>
          </div>
        </div>
    </aside>

  </section>
</template>

<script>
export default {
  name: 'lo-all',
  data () {
    return {
      msg: "assd",
      checkShow:false,
      isTrue:true,
      cancel:false,
      seen:false
    }
  },
  methods:{
    ss:function(){
      clearInterval(this.timer);
      this.$router.go(-1)
    },
    rouLink: function(){
      this.$router.push('/hhk/mycard-add');
    },
    chan_red: function(){
       this.checkShow=!this.checkShow;
       this.isTrue=!this.isTrue;
    },
    li_delete: function(){
       this.cancel=!this.cancel
    },
    can_btm: function(){
       this.cancel=!this.cancel
    },
    sure_btm: function(){
       this.cancel=!this.cancel
       this.checkShow=!this.checkShow;
       this.isTrue=!this.isTrue;
       $(".mc_left input[type='checkbox']:checked").parents("li").remove();
    }
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
<style  lang="less">
  @pxtoem:28.125rem;
  .mycBox{
   padding:35/@pxtoem 0;
  }
  .mycBox > ul > li{
   margin-bottom:20/@pxtoem;
   position:relative;
  }
  .mycBox .mc_left{
    width:40/@pxtoem;
    display:inline-block;
    vertical-align: middle;
    padding:0 0 0 20/@pxtoem ;
  }
  .mycBox .mc_left input[type="checkbox"]{
    -webkit-appearance: none !important;
    appearance: none !important;
    background:url(../../../static/images/btn_check.png) no-repeat center;
    background-size:100% 100%;
    border-radius: 50%;
    width:40/@pxtoem;
    height:40/@pxtoem;
    display: inline-block;
    vertical-align: middle;
   }
  .mycBox .mc_left input[type="checkbox"]:checked{
    background:url(../../../static/images/btn_check_pre.png) no-repeat center;
    background-size:100% 100%;
  }
  .mycBox .mc_right{
    display:inline-block;
    vertical-align:middle;
    width: 710/@pxtoem;
    position: relative;
    background: -webkit-linear-gradient(330deg, #4f83be, #3c5da9);
    background: linear-gradient(120deg, #4f83be, #3c5da9);
    background-size:100% 100%;
    background-position:center;
    background-repeat:no-repeat;
    color:#fff;
    padding:30/@pxtoem;
    border-radius:20/@pxtoem;
    box-sizing: border-box;
    margin-left:20/@pxtoem;
    margin-right:-130/@pxtoem;
  }
  .mycBox .mc_right.mc_jiaotong{
    background-image:url(../../../static/images/bank_bg/jiaotong_bg.png);
  }
  .mycBox .mc_right.mc_zhaoshang{
    background-image:url(../../../static/images/bank_bg/zhaoshang_bg.png);
  }
  .mycBox .mc_right.mc_gongshang{
    background-image:url(../../../static/images/bank_bg/gongshang_bg.png);
  }
  .mycBox .mc_right.mc_guangfa{
    background-image:url(../../../static/images/bank_bg/guangfa_bg.png);
  }
  .mycBox .mc_right.mc_huaxia{
    background-image:url(../../../static/images/bank_bg/huaxia_bg.png);
  }
  .mycBox .mc_right.mc_jianshe{
    background-image:url(../../../static/images/bank_bg/jianshe_bg.png);
  }
  .mycBox .mc_right.mc_minsheng{
    background-image:url(../../../static/images/bank_bg/minsheng_bg.png);
  }
  .mycBox .mc_right.mc_nongye{
    background-image:url(../../../static/images/bank_bg/nongye_bg.png);
  }
  .mycBox .mc_right.mc_pingan{
    background-image:url(../../../static/images/bank_bg/pingan_bg.png);
  }
  .mycBox .mc_right.mc_pufa{
    background-image:url(../../../static/images/bank_bg/pufa_bg.png);
  }
  .mycBox .mc_right.mc_xingye{
    background-image:url(../../../static/images/bank_bg/xingye_bg.png);
  }
  .mycBox .mc_right.mc_youzheng{
    background-image:url(../../../static/images/bank_bg/youzheng_bg.png);
  }
  .mycBox .mc_right.mc_zhongguo{
    background-image:url(../../../static/images/bank_bg/zhongguo_bg.png);
  }
  .mycBox .mc_right.mc_zhongxin{
    background-image:url(../../../static/images/bank_bg/zhongxin_bg.png);
  }


  .mycBox .mc_right .mc_img{
    width:86/@pxtoem;
    height:86/@pxtoem;
    border-radius:50%;
    background:#fff;
    text-align:center;
    line-height:120/@pxtoem;
    display:inline-block;
    vertical-align:middle;
  }
  .mycBox .mc_right .mc_img img{
    width:70%;
  }
  .mycBox .mc_right .mc_name{
    display:inline-block;
    vertical-align:middle;
    margin-left:10/@pxtoem;
  }
  .mycBox .mc_right .mc_name span{
    display:block;
    margin-bottom:1/@pxtoem;
  }
  .mycBox .mc_right .mc_name span:first-child{
    font-size:33/@pxtoem;
  }
  .mycBox .mc_right h4{
    font-weight:normal;
    font-size:50/@pxtoem;
    text-align:right;
    padding-right:20/@pxtoem;
    margin-top:5/@pxtoem;
  }
  .mycBox .mc_right h4 span{
    position:relative;
    top:5/@pxtoem;
  }
  .isb{
   color:#333;
  }
  .add_card{
   padding:20/@pxtoem;
   text-align:center;
   color:#999;
   background:#fff;
   font-size:30/@pxtoem;
   margin-top:30/@pxtoem;
  }
  .add_card img{
   width:32/@pxtoem;
   display:inline-block;
   vertical-align:middle;
   margin-right:10/@pxtoem;
  }
  .add_card span{
   display:inline-block;
   vertical-align:middle;
  }
</style>

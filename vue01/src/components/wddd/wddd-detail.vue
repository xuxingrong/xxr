<template>
  <section>
  <div v-bind:class="{'is_loading':true,'hide':!is_loading}">
    <div class="fd-center"><img src="/static/images/is_loading.gif" alt="" />数据加载中...</div>
  </div>
  <header class="wdsc-header">
    <div v-on:click="returnBefore" class="return sl-ub sl-uac sl-upc" >
      <div class="return-ico"></div>
    </div>
      订单详情
  </header>
  <div v-if="trade.status=='WAIT_BUYER_PAY'" class="dd-status-h">
    <div class="mjyfh-ico ico"></div>
    <div class="ico-txt">未付款</div>
  </div>
  <div v-if="trade.status=='WAIT_SELLER_SEND_GOODS'" class="dd-status-h">
    <div class="mjyfh-ico ico"></div>
    <div class="ico-txt">已付款，等待发货</div>
  </div>
  <div v-if="trade.status=='WAIT_BUYER_CONFIRM_GOODS'" class="dd-status-h">
    <div class="mjyfh-ico ico"></div>
    <div class="ico-txt">已发货，等待确认</div>
  </div>
  <div v-if="trade.status=='TRADE_FINISHED'" class="dd-status-h">
    <div class="jywc-ico ico"></div>
    <div class="ico-txt">交易完成</div>
  </div>
  <div v-if="trade.status=='TRADE_CLOSED'" class="dd-status-h">
    <div class="jygb-ico ico"></div>
    <div class="ico-txt">交易关闭</div>
  </div>
  <div v-if="trade.status=='TRADE_CLOSED_BY_SYSTEM'" class="dd-status-h">
    <div class="jygb-ico ico"></div>
    <div class="ico-txt">交易关闭</div>
  </div>
  <!--
  <div v-if="tracking" class="jd-wl-xx sl-ub sl-uac">
    <div class="mjyfh-s-ico"></div>
    <div class="wl-xx-box">
      <div>[深圳市]广东省深圳市宝安区西乡碧海湾分部派件员：海惠网18866668888</div>
      <div>正在为你派件网点客服电话：0755-88886666</div>
      <p>2017-05-03 12:00:00</p>
    </div>
    <div class="next-ico"></div>
  </div>
  -->
  
  <div class="add-box sl-ub sl-uac">
    <div class="add-ico"></div>
    <div class="add-xx-box">
      <div class="sl-ub sl-ubf1">
        <div>收货人：{{trade.receiver_name}}</div>
        <div>{{trade.receiver_mobile}}</div>
      </div>
      <div class="add-xq">
        收货地址：{{trade.receiver_state}}{{trade.receiver_city}}{{trade.receiver_address}}
      </div>
    </div>
  </div>
  
  <div class="fp-box">
    <div>发票信息<span v-if="trade.need_invoice=='0'">（无）</span><span v-else>（{{trade.invoice_type}}<span v-if="trade.invoice_name != ''">[{{trade.invoice_name}}]</span>）</span></div>
    <div class="fp-tt sl-ub">
      <div>发票内容</div>
      <div v-if="trade.invoice_type=='普通发票'">
        <span v-if="trade.invoice_main==''">无</span><span v-else>{{trade.invoice_main}}</span></div>
      <div v-else><span v-if="trade.invoice_vat_main==''">无</span><span v-else>{{invoice_vat_main}}</span></div>
    </div>
  </div>
  
  <div class="dd-proxx">
    <!--
    <div class="sl-ub">
      <a href="javascript:;" class="dp-name">海惠网某店铺<span class="to-ico"></span></a>
    </div>
    -->
        <div>
          <ul>
            <li v-for="order_pro in trade.orders">
              <a v-bind:href="GLOBAL.www+'wap/item.html?item_id='+order_pro.item_id" class="sl-ub">
                <div class="pro-pic">
                  <img v-if="order_pro.pic_path" v-bind:src="order_pro.pic_path" alt="" />
                  <img v-else src="/static/images/test_good.jpg" alt="" />
                </div>
                <div class="pro-xx">
                  <div class="pro-name">
                    {{order_pro.title}}
                  </div>
                  <div class="pro-brief">
                    {{order_pro.spec_nature_info}}
                  </div>
                </div>
                <div class="pro-price">
                  <div>&yen{{parseFloat(order_pro.price)}}</div>
                  <div><del>&yen{{order_pro.mkt_price}}</del></div>
                  <div>&times;{{order_pro.num}}</div>
                </div>
              </a>
              <!--
              <div v-if="trade.status=='WAIT_SELLER_SEND_GOODS'" class="dd-btn sl-ub sl-upe sl-uac">
                <a v-bind:href="GLOBAL.www+'wap/member-aftersales-apply.html?oid='+order_pro.oid+'&tid='+trade.tid" class="mjyfh-ycsh">退款</a> 
              </div>
              -->
              <div v-if="trade.status=='TRADE_FINISHED'" class="dd-btn sl-ub sl-upe sl-uac">
                <a  v-if="order_pro.aftersales_status==''" v-bind:href="GLOBAL.www+'wap/member-aftersales-exchange.html?tid='+trade.tid+'&oid='+order_pro.oid+'&status=TRADE_FINISHED'+'&from=hhk'" class="mjyfh-ycsh">申请售后</a>
                <span  v-if="order_pro.aftersales_status=='WAIT_SELLER_AGREE'"  style="color:red;">售后处理中</span>
                <span  v-if="order_pro.aftersales_status=='SUCCESS'"  style="color:red;">退款完成</span>
                <!--<span  v-if="order_pro.aftersales_status=='SELLER_REFUSE_BUYER'"  style="color:red;">卖家拒绝退款/售后驳回</span>-->
                <span  v-if="order_pro.aftersales_status=='CLOSED'"  style="color:red;">退款关闭</span>
                <span  v-if="order_pro.aftersales_status=='REFUNDING'"  style="color:red;">退款中</span>
                <span  v-if="order_pro.aftersales_status=='SELLER_SEND_GOODS'"  style="color:red;">换货完成</span>
                <span  v-if="order_pro.aftersales_status=='WAIT_SELLER_CONFIRM_GOODS'"  style="color:red;">待卖家确认收货</span>
               <!--<a  v-if="order_pro.aftersales_status=='WAIT_BUYER_RETURN_GOODS'" v-bind:href="GLOBAL.www+'wap/member-aftersales-exchange.html?tid='+trade.tid+'&oid='+order_pro.oid+'&status=TRADE_FINISHED'" class="mjyfh-ycsh">已同意,请退货</a>-->
                <a  v-if="order_pro.aftersales_status=='WAIT_BUYER_RETURN_GOODS'" v-bind:href="GLOBAL.www+'wap/member-aftersales-godetail.html?id='+order_pro.oid+'&from=hhk'" class="mjyfh-ycsh">已同意,请退货</a>
                
                <a  v-if="order_pro.aftersales_status=='SELLER_REFUSE_BUYER'" v-bind:href="GLOBAL.www+'wap/member-aftersales-godetail.html?id='+order_pro.oid+'&from=hhk'" class="mjyfh-ycsh">售后驳回</a>
                <a  v-if="order_pro.aftersales_status=='SELLER_REFUSE_BUYER'" v-bind:href="GLOBAL.www+'wap/complaints-view.html?oid='+order_pro.oid+'&from=hhk'" class="mjyfh-ycsh">投诉商家</a>
              </div>                                                                                    
            </li>
          </ul>
        </div>
        <!--
        <div v-if="trade.status=='TRADE_FINISHED'" class="dd-btn sl-ub sl-upe sl-uac">
          <div class="mjyfh-ycsh">申请售后</div> 
          <div class="mjyfh-ycsh">追加评论</div> 
        </div>
        <div v-if="trade.status=='TRADE_CLOSED_BY_SYSTEM'" class="dd-btn sl-ub sl-upe sl-uac">
          <div class="mjyfh-ycsh">退款成功</div> 
        </div>
        <div class="jywc-pj">评价</div>
        <div  class="dd-btn sl-ub sl-upe sl-uac">
          <div class="mjyfh-ycsh">删除订单</div>
          <div class="jywc-pj">评价</div>
        </div>
        <div  class="dd-btn sl-ub sl-upe sl-uac">
          <div class="mjyfh-ycsh">删除订单</div>
        </div>
        -->
        <div class="pay-box">
          <div class="sl-ub">
            <div>商品总价</div>
            <div>&yen{{trade.total_fee}}</div>
          </div>
          <div class="sl-ub">
            <div>运费（快递）</div>
            <div>&yen{{trade.post_fee}}</div>
          </div>
          <div class="sl-ub">
            <div>订单总价</div>
            <div>&yen{{trade.payment}}</div>
          </div>
        </div>
  </div>
  
  <div class="lx-box sl-ub">
    <div class="sl-ub sl-uac sl-upc" v-on:click="link_zxkf">
      <div class="zxkf-ico ico"></div>
      <div>咨询客服</div>
    </div>
    <div class="sl-ub sl-uac sl-upc">
      <div class="lxmj-ico ico"></div>
      <div>联系卖家</div>
    </div>
  </div>
  
  <div class="dd-dt-box sl-ub">
    <div class="dt-div">
      <p>订单编号：<span class="order-number" v-bind:data-clipboard-text="trade.tid">{{trade.tid}}</span></p>
      <p>支付宝交易号：未知</p>
      <p>创建时间：{{time1}}</p>
      <p>付款时间：{{time2}}</p>
      <p>发货时间：{{time3}}</p>
    </div>
    <div class="dt-div-copy" v-on:click="copy_dd" >复制</div>
  </div>
  <div v-if="trade.status=='WAIT_BUYER_PAY' || trade.status=='WAIT_SELLER_SEND_GOODS' || trade.status=='WAIT_BUYER_CONFIRM_GOODS' || (trade.status=='TRADE_FINISHED' && trade.buyer_rate==0)" class="dd-footer-g"></div>
  
  <div v-if="trade.status == 'WAIT_BUYER_PAY'" class="last-div dd-btn sl-ub sl-upe sl-uac">
    <a v-if="trade.cancel_status == 'NO_APPLY_CANCEL'" v-bind:href="GLOBAL.www+'wap/cancel.html?tid='+trade.tid+'&from=hhk'" class="mjyfh-ycsh">取消订单</a>
    <a v-bind:href="GLOBAL.www+'wap/create.html?tid='+trade.tid+'&from=hhk'"   class="mjyfh-ckwl">付款</a>
  </div> 
  <div v-if="trade.status == 'WAIT_SELLER_SEND_GOODS'" class="last-div dd-btn sl-ub sl-upe sl-uac">
    <span v-if="trade.cancel_status == 'WAIT_PROCESS'" style="color:red;">取消订单正在审核</span>
    <span v-else-if="trade.cancel_status == 'REFUND_PROCESS'"  style="color:red;">取消订单退款处理中</span>
    <span v-else-if="trade.cancel_status == 'SUCCESS'"  style="color:red;">取消订单成功</span>
    <span v-else-if="trade.cancel_status == 'FAILS'"  style="color:red;">取消订单驳回</span>
    <a v-else-if="trade.cancel_status == 'NO_APPLY_CANCEL'" v-bind:href="GLOBAL.www+'wap/cancel.html?tid='+trade.tid+'&from=hhk'" class="mjyfh-ycsh">取消订单</a>
  </div>
  <div v-if="trade.status == 'WAIT_BUYER_CONFIRM_GOODS'" class="last-div dd-btn sl-ub sl-upe sl-uac">
    <a v-bind:href="GLOBAL.www+'wap/confirm-buyer.html?tid='+trade.tid+'&from=hhk'" class="mjyfh-qrsh">确认收货</a>
  </div>
  <div v-if="trade.status == 'TRADE_FINISHED' && trade.buyer_rate==0" class="last-div dd-btn sl-ub sl-upe sl-uac">
    <a v-bind:href="GLOBAL.www+'wap/member-rate-add.html?tid='+trade.tid+'&from=hhk'" class="jywc-pj">评价</a>
  </div>
  <div class="dia_smail" v-if="hhlm_hide">
    <div class="d_box" v-on:click="hide_black"><span>{{hhlm}}</span></div>  
  </div>
  <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'wdsc-detail',
  data () {
    return {
      msg:'Welcome to Your Vue.js App',
      is_loading:true,
      defaultImageId:[],
      tracking:false,
      trade:{},
      time1:"",
      time2:"",
      time3:"",
      hhlm_hide:false,
      hhlm:"",
      invoice_vat_main:""
      
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
    this.ajax_get_detail();
  },
  computed:{
    all_height:function(){
      return window.innerHeight+'px';
    }
  },
  methods:{
    link_mj:function(){
      this.$router.push("/dddetail/"+this.$route.params.dd_id+"/zxkf");
    },
    link_zxkf:function(){
      if(this.GLOBAL.isWeiXin()){
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2&source=1";
      }else{
        window.location.href = "https://www.sobot.com/chat/h5/index.html?sysNum=6d730783d3314e229c583d8f85eaffc2";
      }
    },
    returnBefore:function(){
      this.$router.go(-1);
    },
    no_kf:function(txt){
      if(!this.hhlm_hide){
        this.hhlm= txt;
        this.hhlm_hide = true;
        var _this = this;
        this.ts_timer = setTimeout(function(){
          _this.hide_black();
        },1000);
      }
      return false;
    },
    hide_black:function(){
      if(this.hhlm_hide){
        var _this = this;
        clearTimeout(_this.ts_timer);
        this.hhlm_hide = false;
      }
    },
    copy_dd:function(){
      var _this = this;
      var clipboard = new Clipboard(".dt-div-copy", {
        text: function() {
            return _this.trade.tid;
        }
      });
      clipboard.on('success', function(e) {
        _this.no_kf("复制成功");
      });
      clipboard.on('error', function(e) {
        _this.no_kf("复制失败");
      });
      
       
    },
    ajax_get_detail:function(){
      var tid = this.$route.params.dd_id;
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
      'tid':tid
      };
      //alert(tid);
      var arr = ['timestamp','app_key','app','v','identify','tid'];
      var sign = this.GLOBAL.getSign(arr,obj);
      var obj2 = {'sign':sign};
      var option = $.extend(obj,obj2);
      var optionStr = this.GLOBAL.getOption(option);
      //alert(optionStr);
      this.$http({
        method: 'post',
        url: _this.GLOBAL.www+'/apis/member.json?method=tradeDetail',
        data: optionStr,
        withCredentials:true,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        //alert(JSON.stringify(response.data));
        //console.log(response);
        if(response.data.recCode==200){
          //console.log(response);
          _this.defaultImageId = response.data.result.defaultImageId;
          _this.tracking = response.data.result.tracking;
          _this.trade = response.data.result.trade;
          let ivm = _this.trade.invoice_vat_main;
          if(ivm != ""){
            _this.invoice_vat_main = ivm.split("<br/>")[0];
          }
          _this.time1 = _this.gsh_time(_this.trade.created_time);
          _this.time2 = _this.gsh_time(_this.trade.pay_time);
          _this.time3 = _this.gsh_time(_this.trade.consign_time);
          _this.is_loading = false;
        }else{
          //alert("22");
          //console.log(response);
          _this.$router.push("/hhk/login");
          
        }
      })
      .catch(function (error) {
      //alert("223");
        console.log(error);
      });
    },
    gsh_time:function(dt){
      if(!dt){
        return "";
      }
      var stamps = dt*1000;
      var y,m,d,h,i,s,str="";
      var dobj = new Date(stamps);
      y = dobj.getFullYear();
      m = dobj.getMonth()+1;
      if(m<10) m='0'+m;
      d = dobj.getDate();
      if(d<10) d='0'+d;
      h = dobj.getHours();
      if(h<10) h='0'+h;
      i = dobj.getMinutes();
      if(i<10) i='0'+i;
      s = dobj.getSeconds();
      if(s<10) s='0'+s;
      return y+"-"+m+"-"+d+" "+h+":"+i+":"+s;
    }
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    position:fixed;
    width:100%;
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    text-align:center;
    font-size:36/@pxtoem;
    background:#d8272a;
    color:#fff;
  }
  section{
    background:#eee;
  }
  .dd-status-h{
    height:220/@pxtoem;
    background:#d8272a;
    padding-top:126/@pxtoem;
  }
  .dd-status-h .ico{
    width:140/@pxtoem;
    height:140/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
    margin:0 auto 24/@pxtoem;
  }
  .mjyfh-ico{
    background-image:url(../../../static/images/yifahuo.png);
  }
  .jywc-ico{
    background-image:url(../../../static/images/chenggong.png);
  }
  .jygb-ico{
    background-image:url(../../../static/images/guanbi.png);
  }
  .ico-txt{
    font-size:36/@pxtoem;
    line-height:40/@pxtoem;
    color:#fff;
    text-align:center;
  }
  .jd-wl-xx,.add-box,.fp-box,.dd-proxx{
    background:#fff;
    padding:0 24/@pxtoem;
    border-bottom:1px solid #eee;
  }
  .fp-box{
    padding-top:20/@pxtoem;
    padding-bottom:20/@pxtoem;
  }
  .mjyfh-s-ico{
    width:50/@pxtoem;
    height:50/@pxtoem;
    background:url(../../../static/images/wuliu.png) no-repeat center;
    background-size:contain;
    margin-right:25/@pxtoem;
  }
  .next-ico{
    width:12/@pxtoem;
    height:20/@pxtoem;
    background:url(../../../static/images/jiantou.png) no-repeat center;
    background-size:contain;
    margin-left:35/@pxtoem;
  }
  .wl-xx-box{
    width:580/@pxtoem;
    margin:18/@pxtoem 0 15/@pxtoem;
  }
  .wl-xx-box>div{
    font-size:28/@pxtoem;
    color:#009415;
    line-height:40/@pxtoem;
  }
  .wl-xx-box>p{
    font-size:24/@pxtoem;
    color:#999;
    line-height:30/@pxtoem;
    margin-top:10/@pxtoem;
  }
  .add-ico{
    width:50/@pxtoem;
    height:50/@pxtoem;
    background:url(../../../static/images/dizhi.png) no-repeat center;
    background-size:contain;
    margin-right:28/@pxtoem;
  }
  .add-xx-box{
    width:624/@pxtoem;
    margin:20/@pxtoem 0 18/@pxtoem;
    font-size:28/@pxtoem;
    line-height:38/@pxtoem;
  }
  .add-xq{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top:10/@pxtoem;
  }
  .add-xx-box>div:first-child>div{
    width:50%;
  }
  .add-xx-box>div:first-child>div:last-child{
    text-align:right;
  }
  .fp-box>div{
    font-size:28/@pxtoem;
    line-height:38/@pxtoem;
  }
  .fp-tt{
    margin-top:10/@pxtoem;
  }
  .fp-tt>div:first-child{
    margin-right:20/@pxtoem;
  }
  .dd-proxx{
    margin-top:20/@pxtoem;
    padding:0;
  }
  /*
  .dd-proxx>div:first-child>a{
    color:#333;
    display:block;
  }
  .dd-proxx>div:first-child{
    font-size:28/@pxtoem;
    height:80/@pxtoem;
    line-height:80/@pxtoem;
  }
  */
  .dd-proxx>div{
    border-bottom:1px solid #eee;
    padding:0 24/@pxtoem;
  }
  .dd-proxx .to-ico{
    display:inline-block;
    width:12/@pxtoem;
    height:20/@pxtoem;
    background:url(../../../static/images/jiantou.png) no-repeat center;
    background-size:12/@pxtoem 20/@pxtoem;
    margin-left:20/@pxtoem;
  }
  .dd-proxx li{
    padding:24/@pxtoem 0;
  }
  .pro-pic{
    width:158/@pxtoem;
    height:158/@pxtoem;
    border:1/@pxtoem solid #eee;
    margin-right:24/@pxtoem;
  }
  .pro-pic img{
    width: 100%;
    height: 100%;
  }
  .pro-name{
    color:#333;
    font-size:28/@pxtoem;
    line-height:36/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    margin-bottom:14/@pxtoem;
  }
  .pro-brief{
    color:#999;
    font-size:24/@pxtoem;
    line-height:30/@pxtoem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .pro-xx{
    width:335/@pxtoem;
  }
  .pro-price{
    width:183/@pxtoem;
    font-size:28/@pxtoem;
    text-align:right;
    color:#999;
  }
  .pro-price>div:first-child{
    color:#333;
  }
  .pro-price>div:nth-child(2){
    line-height:70/@pxtoem;
  }
  .jywc-pj{
    color:#fff;
    background:#ff7777;
    border:1px solid #d8272a;
  }
  .mjyfh-ycsh,.mjyfh-ckwl,.scdd{
    color:#333;
    border:1px solid #999;
  }
  .mjyfh-qrsh{
    color:#d8272a;
    border:1px solid #d8272a;
  }
  .dd-proxx li .dd-btn{
    height:60/@pxtoem;
  }
  .dd-btn{
    height:98/@pxtoem;
  }
  .dd-btn>div,.dd-btn>a{
    display:block;
    box-sizing:border-box;
    min-width:160/@pxtoem;
    height:60/@pxtoem;
    line-height:60/@pxtoem;
    font-size:28/@pxtoem;
    border-radius:4/@pxtoem;
    text-align:center;
    margin-left:24/@pxtoem;
    padding:0 24/@pxtoem;
  }
 
  .dd-proxx .pay-box{
    padding-top:20/@pxtoem;
    padding-bottom:10/@pxtoem;
  }
  .pay-box>div{
    font-size:24/@pxtoem;
    line-height:34/@pxtoem;
    color:#999;
    padding-bottom:10/@pxtoem;
  }
  .pay-box>div:last-child{
    font-size:28/@pxtoem;
    line-height:38/@pxtoem;
  }
  .pay-box>div>div{
    width:50%;
  }
  .pay-box>div>div:last-child{
    text-align:right;
  }
  .lx-box{
    margin-top:20/@pxtoem;
    height:80/@pxtoem;
    line-height:80/@pxtoem;
    font-size:28/@pxtoem;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    background:#fff;
  }
  .lx-box>div{
    box-sizing:border-box;
    width:50%;
  }
  .lx-box>div:first-child{
    border-right:1px solid #eee;
  }
  .lx-box .ico{
    width:28/@pxtoem;
    height:28/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
    margin-right:20/@pxtoem;
  }
  .lx-box .zxkf-ico{
    background-image:url(../../../static/images/kf.png);
  }
  .lx-box .lxmj-ico{
    background-image:url(../../../static/images/mj.png);
  }
  .last-div{
    box-sizing:border-box;
    position:fixed;
    width:100%;
    z-index:15;
    bottom:0;
    padding:0 24/@pxtoem;
    background:#fff;
    
  }
  .dd-dt-box{
    background:#fff;
    margin-top:20/@pxtoem;
    padding:20/@pxtoem 24/@pxtoem;
    font-size:24/@pxtoem;
    line-height:38/@pxtoem;
    color:#999;
    border-bottom:20/@pxtoem solid #eee;
  }
  .dd-footer-g{
    height:98/@pxtoem;
  }
  .dt-div{
    width:622/@pxtoem;
  }
  .dt-div-copy{
    box-sizing:border-box;
    margin-left:20/@pxtoem;
    width:60/@pxtoem;
    height:24/@pxtoem;
    line-height:24/@pxtoem;
    font-size:20/@pxtoem;
    color:#999;
    border:1px solid #999;
    border-radius:5/@pxtoem;
    text-align:center;
  }
</style>
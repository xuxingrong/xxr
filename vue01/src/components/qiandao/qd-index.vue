<template>
  <section>
    <header class="wdsc-header">
      <router-link to="/hhk" class="return sl-ub sl-uac sl-upc" >
        <div class="return-black-ico"></div>
      </router-link>
      每日签到
    </header>
    <div class="qiandao-header">
      <div class="jryq"></div>
      <div class="jf-ico"></div>
      <div class="date-box">
        <ul class="date-header">
          <li class="arrow prev" v-on:click="pickPre(currentYear,currentMonth)"></li>
          <li class="year-month">
          <span class="choose-year">{{ currentYear }}年</span>
          <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <li class="arrow next" v-on:click="pickNext(currentYear,currentMonth)"></li>
        </ul>
        <div class="today-get-jf">
          今天赚了<span>1</span>个积分，当月累计赚了<span>8</span>个积分！
        </div>
        <ul class="weekdays sl-ub">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li> 
        </ul>
        <ul class="day-box clearfix">
          <li v-for="day in days">
            <!--今天-->
            <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
            <span v-else>
            <!--今天-->
            <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
            <span v-else>{{ day.getDate() }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="gz-box">
      <div>
        <div class="sl-ub sl-uac">
          <div class="pencil-ico"></div>
          <div class="qdsm">签到说明</div>
          <div class="line"></div>
        </div>
        <div class="gz-lists">
          <p>1.签到任务每天0点后更新；</p>
          <p>2.每会员每天可签到一次；</p>
          <p>3.签到所得的积分可根据会员等级进行不同额度的抵现。</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'qd-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
    }
  },
  created: function() {
    this.initData(null);
  },
  methods:{
    initData: function(cur) {
      var date;
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay(); // 1...6,0
      var today_str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
      this.days.length = 0;
      var first_day = this.formatDate(this.currentYear , this.currentMonth, 1);
      var d2 = new Date(first_day);
      var d2_day = d2.getDay();
      var d;
      if(d2_day!=0){
        
        for (var i = d2_day; i >= 1; i--) {
          d = new Date(first_day);
          d.setDate(d.getDate() - i);
          this.days.push(d);
        }
      } 
      for (var i = this.currentDay-1; i >= 0; i--) {
        d = new Date(today_str);
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }
      for (var i = 1; i <= 42 - this.currentDay-d2_day; i++) {
        d = new Date(today_str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(42);
      //console.log(d);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
    },
    pickPre: function(year, month) {
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
    },
    formatDate: function(year,month,day){
      return year+"-"+month+"-"+day;
    }
  },
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
  .qiandao-header{
    margin-top:87/@pxtoem;
    width:100%;
    height:300/@pxtoem;
    background:url(../../../static/images/pic_bg.png) no-repeat center;
    background-size:100% 300/@pxtoem;
    position:relative;
  }
  .jryq{
    position:absolute;
    width:70/@pxtoem;
    height:157/@pxtoem;
    background:url(../../../static/images/tab.png) no-repeat center;
    background-size:70/@pxtoem 157/@pxtoem;
    left:110/@pxtoem;
  }
  .jf-ico{
    position:absolute;
    width:256/@pxtoem;
    height:218/@pxtoem;
    background:url(../../../static/images/pic_jifen.png) no-repeat center;
    background-size:256/@pxtoem 218/@pxtoem;
    top:52/@pxtoem;
    left:0;
    right:0;
    margin:auto;
    z-index:5;
  }
  .date-box{
    width:690/@pxtoem;
    background:#fff;
    border-radius:10/@pxtoem;
    position:absolute;
    z-index:3;
    left:0;
    right:0;
    top:245/@pxtoem;
    margin:auto;
  }
  .date-header{
    height:88/@pxtoem;
    line-height:88/@pxtoem;
    background:#000;
    border-radius:10/@pxtoem 10/@pxtoem 0 0;
    color:#fff;
    font-size:36/@pxtoem;
    text-align:center;
    position:relative;
  }
  .date-header .arrow{
    width:15/@pxtoem;
    height:25/@pxtoem;
    background-repeat:no-repeat;
    background-position:center;
    background-size:15/@pxtoem 25/@pxtoem;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
  }
  .date-header .prev{
    background-image:url(../../../static/images/prev.png);
    left:76/@pxtoem;
  }
  .date-header .next{
    background-image:url(../../../static/images/next.png);
    right:76/@pxtoem;
  }
  .today-get-jf{
    height:86/@pxtoem;
    line-height:86/@pxtoem;
    font-size:26/@pxtoem;
    text-align:center;
  }
  .today-get-jf>span{
    color:#fb6362;
  }
  .weekdays{
    width:602/@pxtoem;
    margin:0 auto 35/@pxtoem;
  }
  .weekdays li{
    width:70/@pxtoem;
    margin:0 8/@pxtoem;
    font-size:28/@pxtoem;
    line-height:30/@pxtoem;
    text-align:center;
  }
  .day-box{
    width:588/@pxtoem;
    margin:0 auto;
    padding-bottom:34/@pxtoem;
  }
  .day-box>li{
    width:70/@pxtoem;
    height:70/@pxtoem;
    margin:0 7/@pxtoem 12/@pxtoem;
    float:left;
    line-height:70/@pxtoem;
    text-align:center;
    border-radius:100%;
  }
  .day-box .bqd{
    background:#fb6362;
    color:#fff;
  }
  .gz-box{
    padding:700/@pxtoem 0 50/@pxtoem;
    
    background:#eee;
  }
  .other-month{
    color:#c5c5c5;
  }
  .gz-box>div{
    width:690/@pxtoem;
    margin:30/@pxtoem auto 0;
  }
  .pencil-ico{
    width:32/@pxtoem;
    height:33/@pxtoem;
    background:url(../../../static/images/icon_qdsm.png) no-repeat center;
    background-size:32/@pxtoem 33/@pxtoem;
  }
  .qdsm{
    font-size:30/@pxtoem;
    margin:0 10/@pxtoem 0 6/@pxtoem;
  }
  .line{
    width:522/@pxtoem;
    height:0;
    border-bottom:2/@pxtoem solid #d5d5d5;
  }
  .gz-lists{
    padding:24/@pxtoem 0 0 40/@pxtoem
  }
  .gz-lists>p{
    font-size:26/@pxtoem;
    line-height:38/@pxtoem;
  }
</style>
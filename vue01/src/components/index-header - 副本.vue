<template>
  <header>
    <router-link class="share-ico" to="/share" ></router-link>
    <section class="sl-ub sl-ubf1">
      <div>
        <router-link to="/sk" class="sk"></router-link>
        收款
      </div>
      <div>
        <router-link to="/zd" class="zd"></router-link>
        账单
      </div>
      <div>
        <router-link to="/fk" class="fk"></router-link>
        付款
      </div>
    </section>
  </header>
  
</template>

<script>
export default {
  name: 'index-header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created:function(){
    //var _this = this;
    this.$http.post("apis/member_login.html",
    {'username':13212792733,'password':123456}
     
    ).then(function(rs){
     console.log(rs);
    });
  }
}
</script>
<style scoped lang="less">
  @pxtoem:28.125rem;
  header{
    width:100%;
    height:390/@pxtoem;
    position:relative;
    background: -webkit-linear-gradient(120deg, #00baff, #003894);
    background: -o-linear-gradient(120deg,#00baff, #003894);
    background: -moz-linear-gradient(120deg,#00baff, #003894);
    background: linear-gradient(120deg,#00baff, #003894);
  }
  header>section{
    position:absolute;
    width:100%;
    bottom:30/@pxtoem;
  }
  header>section>div{
    width:33.33%;
    text-align:center;
    font-size:30/@pxtoem;
    color:#fff;
  }
  header>section>div>a{
    display:block;
    width:88/@pxtoem;
    height:89/@pxtoem;
    margin:auto auto 30/@pxtoem;
  }
  .sk{
    background:url(../../static/images/icon_sk.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  } 
  .zd{
    background:url(../../static/images/icon_zd.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  }
  .fk{
    background:url(../../static/images/icon_fk.png) no-repeat center;
    background-size:88/@pxtoem 89/@pxtoem;
  }
  .share-ico{
    display:block;
    width:40/@pxtoem;
    height:38/@pxtoem;
    position:absolute;
    top:64/@pxtoem;
    right:24/@pxtoem;
    background:url(../../static/images/nar_icon_share.png) no-repeat center;
    background-size:40/@pxtoem 38/@pxtoem;
  }
</style>

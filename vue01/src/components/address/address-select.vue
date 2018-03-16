<template>
  <section v-on:click.self="returnBefore">
    <div class="add-box">
      <div class="add-header sl-ub">
        <div class="sl-ub sl-uac">
          <span v-on:click="returnBefore">
            取消
          </span>
        </div>
        <div class="sl-ub sl-upe sl-uac">
          <span v-on:click="setAddress">
            完成
          </span>
        </div>
      </div>
      <div class="add-body sl-ub">
        
        <div class="swiper-container province-box">
          <div class="up"></div>
          <div class="down"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide" v-for="province in provinceArr" v-bind:self_id="province.id">{{province.value}}</div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
          </div>
        </div>
        <div class="swiper-container city-box">
          <div class="up"></div>
          <div class="down"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide" v-for="city in cityArr" v-bind:self_id="city.id">{{city.value}}</div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
          </div>
        </div>
        <div class="swiper-container zone-box">
          <div class="up"></div>
          <div class="down"></div>
          <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide" v-for="zone in zoneArr" v-bind:self_id="zone.id">{{zone.value}}</div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>
          </div>
        </div>
      </div>
      
      
    </div>
    
  </section>
</template>

<script>
export default {
  name: 'add-select',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      provinceArr:[],
      cityArr:[],
      zoneArr:[],
      mySwiper1:{},
      mySwiper2:{},
      mySwiper3:{}
    }
  },
  computed:{
    
  },
  beforeMount:function(){
    
  },
  mounted:function(){
   
    function isEmptyObject(obj){
      for(var n in obj){return false} 
      return true; 
    }
    var _this = this;
    this.$http({
      method: 'get',
      url: '/static/js/region.json'
    }).then(function(rs){
      //console.log(rs);
      _this.provinceArr = rs.data;
      _this.cityArr = rs.data[0].children;
      if(_this.cityArr[0].children){
        _this.zoneArr = _this.cityArr[0].children;
      }
      _this.$nextTick(function(){
        _this.mySwiper1 = new Swiper('.province-box', {
          direction : 'vertical',
          slidesPerView : 7, 
        });
        _this.mySwiper2 = new Swiper('.city-box', {
          direction : 'vertical',
          slidesPerView : 7,
        });
        if(_this.zoneArr.length>0){
          _this.mySwiper3 = new Swiper('.zone-box', {
            direction : 'vertical',
            slidesPerView : 7,
          });
        }
      
        $(".province-box")[0].addEventListener("touchend",function(){
          var a = _this.mySwiper1;
            if(a.activeIndex == a.previousIndex) return;
            _this.cityArr = rs.data[a.activeIndex].children;
            _this.$nextTick(function(){
              _this.mySwiper2.slideTo(0);
              _this.mySwiper2.updateSlidesSize();
              _this.mySwiper2.updateClasses();
            });
            //console.log(_this.cityArr[0]);
          if(_this.cityArr[0].children){
            _this.zoneArr = _this.cityArr[0].children;
 
            if(isEmptyObject(_this.mySwiper3)){
              _this.$nextTick(function(){
                _this.mySwiper3 = new Swiper('.zone-box', {
                  direction : 'vertical',
                  slidesPerView : 7,
                });
              });
            }else{
              _this.$nextTick(function(){
                _this.mySwiper3.slideTo(0);
                _this.mySwiper3.updateSlidesSize();
                _this.mySwiper3.updateClasses();
              });
            }
          }else{
            _this.zoneArr = [];
          }
        })
        $(".city-box")[0].addEventListener("touchend",function(){
          var b = _this.mySwiper2;
          if(b.activeIndex == b.previousIndex) return;
          if(_this.cityArr[b.activeIndex].children){
            _this.zoneArr = _this.cityArr[b.activeIndex].children;
            if(isEmptyObject(_this.mySwiper3)){
             _this.$nextTick(function(){
                _this.mySwiper3 = new Swiper('.zone-box', {
                  direction : 'vertical',
                  slidesPerView : 7,
                });
              });
            }else{
              _this.$nextTick(function(){
                _this.mySwiper3.slideTo(0);
                _this.mySwiper3.updateSlidesSize();
                _this.mySwiper3.updateClasses();
              });
            }
            
          }else{
            _this.zoneArr = [];
          }
          
        });
      
      
      
      
      
      
      });
      
    
      
     
    });
  },
  methods:{
    setAddress:function(){
      
      if(this.zoneArr.length>0){
        var str = this.provinceArr[this.mySwiper1.activeIndex].value+this.cityArr[this.mySwiper2.activeIndex].value+this.zoneArr[this.mySwiper3.activeIndex].value;
        var str2 = this.provinceArr[this.mySwiper1.activeIndex].id+","+this.cityArr[this.mySwiper2.activeIndex].id+","+this.zoneArr[this.mySwiper3.activeIndex].id;
      }else{
        var str = this.provinceArr[this.mySwiper1.activeIndex].value+this.cityArr[this.mySwiper2.activeIndex].value;
        var str2 = this.provinceArr[this.mySwiper1.activeIndex].id+","+this.cityArr[this.mySwiper2.activeIndex].id;
      }
      this.$emit("childreturnAdd",str,str2);
      this.$router.go(-1);
      
    },
    returnBefore:function(){
      this.$router.go(-1);
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
  .add-box{
    box-sizing:border-box;
    width:100%;
    position:absolute;
    bottom:0;
  }
  .add-header{
    background:#f4f4f4;
  }
  .add-header>div{
    width:50%;
    font-size:32/@pxtoem;
    height:80/@pxtoem;
    color:#007aff;
  }
  .add-header a{
    color:#007aff;
  }
  .add-body{
    background:#ededed;
    
  }
  .add-body>div{
    width:33.33%;
    height:504/@pxtoem;
    position:relative;
  }
  .add-body .swiper-wrapper{
    height:100%;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  
  .add-body .swiper-slide{
    height:72/@pxtoem;
    line-height:72/@pxtoem;
    text-align:center;
  }
  .add-body .up{
    position:absolute;
    width:100%;
    height:214/@pxtoem;
    top:0;
    z-index:2;
    background:rgba(255,255,255,.8);
    border-bottom:1/@pxtoem solid #bebebe;
  }
  .add-body .down{
    position:absolute;
    width:100%;
    height:214/@pxtoem;
    bottom:0;
    z-index:2;
    background:rgba(255,255,255,.8);
    border-top:1/@pxtoem solid #bebebe;
  }
  .add-body .swiper-container{
    margin:0;
    position:relative;
  }
</style>
<template>
  <section class="lo-all" v-bind:style="{height:all_height}">
    <div class="lo-header">
      <div class="lo_center sl-ub sl-uac sl-upc" v-on:click="ss
">
        <div class="return-icon"></div>
      </div>
        填写银行卡信息
        
    </div>

    <div class="boxLogin">
      <ul>
          <li id="useData">
               <label>有效期</label>
               <input type="text" class="" id="useData_id" placeholder="请选择月份/年份" v-on:keyup="s_deleted" readonly/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
          <li>
               <label>手机号</label>
               <input type="number" class="l_number" placeholder="请输入银行预留手机号" v-on:keyup="s_deleted"/>
               <div class="l_icons">
                 <i v-bind:class="{'l_icon':true,'l_delete':true,hide:'true'}" v-on:click="clear" ></i>
               </div>
          </li>
       </ul>
       
       <button class="comBtm" v-bind="{'disabled':!isClick}" v-on:click="anPd()">下一步</button>
     </div>
  </section>
</template>

<script>
//import '../../../static/css/mui.picker.css';
//import '../../../static/css/mui.css';




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
     
     var start_time_picker = new mui.DtPicker({"type":"month","beginYear":1960,"endYear":2020});
      $("#useData").on("tap", function(){
        setTimeout(function(){
          start_time_picker.show(function(items){
            $("#useData_id").val(items.text);
            //$("#useData").html(items.text);
          });
        },200);
      });
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
      this.$router.push('/hhk/mycard-phone_step1');
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
  .title-y,.title-m{
    display:none;
  }
</style>


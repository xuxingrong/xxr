<template>
 <dialog class="dia_smail" v-if="seen" v-on:click="dia_hide">
       <div class="d_box"><span>{{semess}}</span></div>  
  </dialog>
</template>

<script>
export default {
  name: 'hhk-footer',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hhlm_hide: true
    }
  },
  methods:{
   
  }
}
</script>
<style lang="less">
 
</style>

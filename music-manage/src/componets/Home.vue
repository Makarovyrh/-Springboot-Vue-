<template>
<div>
<the-header></the-header>
  <the-aside></the-aside>
  <div class="content-box" :class="{'content-collapse':collapse}">
    <router-view></router-view>
  </div>

</div>

</template>

<script>
  import TheHeader from './TheHeader'
  import TheAside from './TheAside'
  import bus from "../assets/js/bus"
  export default {
    name: 'Home',
    components: {TheAside, TheHeader},
    data(){
      return{
      }
    }
  }
</script>

<style scoped>

</style>

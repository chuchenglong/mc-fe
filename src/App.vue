<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html {
    height: 100%;
    width: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    height:100%;
    width: 100%;
    /*background-color: #FAFAFA;*/
    background-size: 100% 100%;
    position: absolute;
  }
  .app {
    height: 100%;
  }
</style>

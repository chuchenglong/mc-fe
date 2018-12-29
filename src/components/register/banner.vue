<template>
  <div>
    <el-col :span="2"><img class="left-img" src="@/assets/welcome.png"/></el-col>
    <el-col :span="2"><h3 class="left-title">欢迎注册</h3></el-col>
    <el-col :span="18"><h4 class="right-text">已有账号？</h4></el-col>
    <el-col :span="2"><el-button type="text" class="right-button" @click="toLogin"><h4>请登录</h4></el-button></el-col>
  </div>
</template>

<script>
  export default {
    props: {
      toLogin: Function
    }
  }
</script>

<style scoped>
  .left-img {
    width: 40px;
    height: 40px;
    margin-top: 9px;
    float: right;
  }
  .left-title {
    margin-top: 20px;
    margin-left: 20px;
  }
  .right-text {
    float: right;
    margin-top: 25px;
    font-weight: normal;
  }
  .right-button {
    color: #e22;
    font-weight: bold;
    font-size: 16px;
    padding: 0;
    margin-top: 6px;
    margin-left: 5px;
  }
  .el-button {

  }
</style>

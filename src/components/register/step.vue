<template>
  <div>
    <el-steps :space="300" :active="this.stepNum" align-center finish-status="success">
      <el-step title="验证手机号"></el-step>
      <el-step title="填写账号信息"></el-step>
      <el-step title="注册成功"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    props: {
      stepNum: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .el-steps {
    margin-top: 4%;
    margin-left: 15%;
  }
</style>

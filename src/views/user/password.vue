<template>
  <div>
    <el-main>
      <el-form label-width="80px" v-show="isShow">
        <el-form-item label="旧密码：">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input type="password" v-model="password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="!isShow">
        <el-form-item>
          <h2 style="color: green">恭喜您，密码修改成功！</h2>
          <el-form-item>
            <el-button type="text" class="b4" @click="toUserDetail">去看看自己的个人信息吧，GO！<i class="el-icon-arrow-right"></i> </el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    data() {
      return {
        password: '',
        password2: '',
        isShow: true
      }
    },
    methods: {
      onSubmit() {
        let Base64 = require('js-base64').Base64;
        var params = {}
        params.password = Base64.encode(this.password)
        params.password2 = Base64.encode(this.password2)
        api.updatePassword(params).then((response) => {
          if (response.code == 'success') {
            this.isShow = false
          } else {
            this.$message.error(response.message)
          }
        })
      },
      toUserDetail() {
        this.$router.push({path: "/home/user/detail"})
      }
    },
    activated() {
      this.isShow = true
      this.password = ''
      this.password2 = ''
    }
  }
</script>

<style scoped>
  .el-main {
    margin-top: 3%;
    margin-right: 1%;
    padding: 0 32% 0 32%;
    text-align: center;
  }
  .el-form-item {
    margin: 20px;
  }
  .el-button {
    width: 130px;
  }
  .b4 {
    color: red;
    font-size: larger;
    font-weight: bold;
    text-align: center;
    margin-right: 33%;
  }
</style>

<template>
  <div class="login-root">
    <el-container>
      <el-main>
        <div class="login-frame">
          <el-form label-width="80px">
            <el-form-item label="用户名：">
              <el-input v-model="username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="password" type="password" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100px" @click="onLogin">登录</el-button>
              <el-button type="text" style="margin-left: 25px" @click="toRegister">注册</el-button>
              <el-button type="text" @click="toRegister">忘记密码？</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      toRegister() {
        this.$router.push({path: "register"})
      },
      onLogin() {
        let Base64 = require('js-base64').Base64;
        var params = {}
        params.username = this.username
        params.password = Base64.encode(this.password)
        api.loginIn(params).then((response) => {
          if (response.code == 'success') {
            this.$cookie.set('token', response.data.token, 1000 * 60 * 60)
            this.$router.push({path: "/home", query: {userId: response.data.userId}})
          } else {
            this.$message.error(response.message)
          }
        }).catch((error) => {
          this.$message.error('login in - 系统异常，请稍后重试！')
        })
      }

    }
  }
</script>

<style scoped>
  .login-root {
    /*background: url("/static/images/carousel/005.jpg") no-repeat;*/
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    height: 100%;
  }
  .login-frame {
    border:1px solid #79CDCD;
    border-radius: 40px;
    background-color: #FAFAFA;
    width: 400px;
    height: 230px;
    margin-top: 7%;
    margin-left: 60%;
  }
  .el-form {
    margin: 34px 0 0 12px;
  }
  .el-form-item {
    width: 350px;
  }

</style>

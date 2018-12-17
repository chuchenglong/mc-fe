<template>
  <div>
    <el-container>
      <el-header>
        <Banner :toLogin="toLogin"/>
      </el-header>
      <Step :stepNum="stepNum"/>
      <el-main>
        <el-form label-width="80px" v-show="form0">
          <el-form-item label="手机号：">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码：">
            <el-input style="width: 206px; " v-model="verificationCode"></el-input>
            <el-button :disable="true" size="medium" class="b3" @click="getCheckCode">获取验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" class="b2" @click="onNext">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-form label-width="80px" v-show="form1">
          <el-form-item label="用户名：">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" class="b1" @click="onRegister">注册</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="form2">
          <el-form-item>
            <h2 style="color: green">恭喜您，注册成功！</h2>
            <el-form-item>
              <el-button type="text" class="b4" @click="toLogin">马上登录，GO！<i class="el-icon-arrow-right"></i> </el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Step from '@/components/register/step'
  import Banner from '@/components/register/banner'
  import api from '@/service/api'

  export default {
    components: {
      Step, Banner
    },
    data() {
      return {
        verificationCode: '',
        phone: '',
        username: '',
        password: '',
        stepNum: 0,
        form0: true,
        form1: false,
        form2: false
      }
    },
    methods: {
      toLogin() {
        this.$router.push({path: "/"})
      },
      getCheckCode() {
        var params = {}
        params.phone = this.phone
        api.getVerificationCode(params).then((response) => {
          if (response.code == 'success') {
            this.$message.success("验证码已发送，请查收！")
          } else {
            this.$message.error(response.message)
          }
        }).catch((error) => {
          this.$message.error('get vc - 系统异常，请稍后重试！')
        })
      },
      onNext() {
        var params = {}
        params.phone = this.phone
        params.verificationCode = this.verificationCode
        api.checkVerificationCode(params).then((response) => {
          if (response.code == 'success') {
            this.stepNum = 1
            this.form1 = true
            this.form0 = false
          } else {
            this.$message.error(response.message)
          }
        }).catch((error) => {
          this.$message.error('check vc - 系统异常，请稍后重试！')
        })
      },
      onRegister() {
        let base64 = require('js-base64').Base64;
        var params = {}
        params.username = this.username
        params.password = base64.encode(this.password)
        params.phone = this.phone
        api.register(params).then((response) => {
          if (response.code == 'success') {
            this.stepNum = 3
            this.form2 = true
            this.form1 = false
          } else {
            this.$message.error(response.message)
          }
        }).catch((error) => {
          this.$message.error('register - 系统异常，请稍后重试！')
        })
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #EEE9E9;
    padding: 0;
    border-bottom: solid 1px #F08080;
  }
  .el-main {
    margin-top: 3%;
    margin-right: 1%;
    padding: 0 32% 0 32%;
    text-align: center;
  }
  .el-form-item {
    margin: 20px;
  }
  .b1 {
    padding: 10px 150px;
  }
  .b2 {
    padding: 10px 143px;
  }
  .b3 {
    height: 40px;
    display: inline;
  }
  .b4 {
    color: red;
    font-size: larger;
    font-weight: bold;
    text-align: center;
  }
</style>

<template>
  <div>
    <el-menu class="el-menu"  mode="horizontal" background-color="#EEE9E9" active-text-color="#696969" :router=true @select="handleSelect">
      <el-menu-item index="/home"><img src="@/assets/home.png" class="img-nav"/><span class="home">Home</span></el-menu-item>

      <el-submenu index="/home/myplace">
        <template slot="title"><span>我的工作台</span></template>
        <el-menu-item index="/home/myplace/account"><span>三方账号管理</span></el-menu-item>
        <el-menu-item index="/home/myplace/material"><span>资料信息管理</span></el-menu-item>
        <el-submenu index="2-4">
          <template slot="title"><span>Dashboard</span></template>
          <el-menu-item index="2-4-1"><span>日打卡</span></el-menu-item>
          <el-menu-item index="2-4-2"><span>月打卡</span></el-menu-item>
          <el-menu-item index="2-4-3"><span>年打卡</span></el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="/home/user">
        <template slot="title"><span>个人中心</span></template>
        <el-menu-item index="/home/user/detail"><span>个人信息查询</span></el-menu-item>
        <el-menu-item index="/home/user/update"><span>个人信息修改</span></el-menu-item>
      </el-submenu>
      <el-submenu index="/home/system">
        <template slot="title"><span>配置中心</span></template>
        <el-menu-item index="/home/system/user"><span>用户管理</span></el-menu-item>
        <el-menu-item index="/home/system/role"><span>角色管理</span></el-menu-item>
        <el-menu-item index="/home/system/config"><span>配置管理</span></el-menu-item>
        <el-menu-item index="/home/system/server"><span>服务管理</span></el-menu-item>
        <el-menu-item index="/home/system/whitelist"><span>白名单管理</span></el-menu-item>
        <el-menu-item index="/home/system/log"><span>操作日志查询</span></el-menu-item>
      </el-submenu>
      <el-submenu index="/home/demo">
        <template slot="title"><span>DEMO</span></template>
        <el-menu-item index="/home/demo/word"><span>word文件</span></el-menu-item>
        <el-menu-item index="/home/demo/vuex"><span>vuex</span></el-menu-item>
        <el-menu-item index="/home/demo/compiler"><span>富文本编辑器</span></el-menu-item>
        <el-menu-item index="/home/demo/upload"><span>阿里云OSS</span></el-menu-item>
      </el-submenu>

      <el-menu-item class="nav-right exit" index="/exit"><span class="tail">退出</span></el-menu-item>
      <el-submenu class="nav-right setup" index="/home/secret">
        <template slot="title">
          <img :src="$store.state.user.photo" v-if="$store.state.user.photo" class="img-photo"/>
          <img src="@/assets/user-photo.png" v-else class="img-photo"/>
          <span class="tail">{{alias}}</span>
        </template>
        <el-menu-item index="/home/user/password"><span>密码修改</span></el-menu-item>
        <el-menu-item index="/home/user/phone"><span>手机号修改</span></el-menu-item>
        <el-menu-item index="/home/user/cert"><span>身份认证</span></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    mounted() {
      api.getHomeData({}).then((response) => {
        if (response.code == 'success') {
          this.alias = response.data.alias
          this.$store.dispatch("SetPhoto", response.data.photo)
        } else {
          this.$message.error(response.message)
        }
      })
    },
    data() {
      return {
        alias: '',
        photo: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        if (key == '/exit') {
          api.loginOut({token: this.$cookie.get('token')})
        }
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    border-bottom: solid 1px #F08080;
  }
  span {
    color: black;
  }
  .home {
    font-weight: normal;
    font-size: 16px;
  }
  .img-nav {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    margin-bottom: 5px;
    border-radius: 6px;
  }
  .img-photo {
    width: 24px;
    height: 24px;
    border-radius: 6px;
  }
  .nav-right {
    float: right;
  }
  .exit {
    width: 70px;
  }
  .setup {
    width: 150px;
  }
  .tail {
    font-size: smaller;
  }
</style>

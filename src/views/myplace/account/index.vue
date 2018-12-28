<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" >
        <el-menu style="height: 100%" :router=true default-active="/home/myplace/account/outside/list" >
          <el-menu-item index="/home/myplace/account/outside/list">
            <i class="el-icon-tickets"></i>
            <span slot="title">三方账号列表</span>
          </el-menu-item>
          <el-menu-item index="/home/myplace/account/outside/add">
            <i class="el-icon-plus"></i>
            <span slot="title">添加三方账号</span>
          </el-menu-item>
          <el-submenu index="/home/myplace/account/company">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>公司管理</span>
            </template>
            <el-menu-item index="/home/myplace/account/company/list">公司列表</el-menu-item>
            <el-menu-item index="/home/myplace/account/company/add">添加公司</el-menu-item>
          </el-submenu>
          <el-submenu index="/home/myplace/account/product">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item index="/home/myplace/account/product/list">产品列表</el-menu-item>
            <el-menu-item index="/home/myplace/account/product/add">添加产品</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        openIndex: ["/home/myplace/account/company","/home/myplace/account/product"]
      }
    }
  }
</script>

<style scoped>


</style>

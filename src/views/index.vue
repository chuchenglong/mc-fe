<template>
  <div>
    <el-container>
      <el-header>
        <Menu />
      </el-header>
    </el-container>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import Menu from '@/components/home/menu'

  export default {
    components: {
      Menu
    }
  }
</script>

<style scoped>
  .el-header {
    padding: 0;
  }
</style>

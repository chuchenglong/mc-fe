<template>
  <div>
    <el-container>
      <el-form>
        <el-form-item>
          <label class="el-label l">公司名称：</label>
          <label class="el-label r">
            <el-input v-model="companyName"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">公司描述：</label>
          <label class="el-label r">
            <el-input v-model="companyDes"></el-input>
          </label>
        </el-form-item>
        <div style="text-align: center">
          <el-button size="medium" style="width: 130px" type="primary" @click="addCompany">提交</el-button>
        </div>
      </el-form>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    data() {
      return {
        companyName: '',
        companyDes: '',
      }
    },
    methods: {
      addCompany() {
        var params = {}
        params.companyName = this.companyName
        params.companyDes = this.companyDes
        api.addCompany(params).then((response) => {
          if (response.code == 'success') {
            this.$message({type: 'success', message: '添加成功!'});
          } else {
            this.$message.error(response.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-container {
    /*padding: 1% 5% 0 5% !important;*/
    width: 100%;
  }
  .el-table {
    width: 100%;
  }
  .el-input {
    width: 230px;
    padding: 0;
  }
  .el-label {
    display: inline-block;
    line-height: 50px;
  }
  .l {
    font-weight: 600;
    width: 80px;
    margin-left: 5px;
  }
  .r {
    width: 235px;
  }
</style>

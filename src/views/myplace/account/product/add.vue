<template>
  <div>
    <el-container>
      <el-form>
        <el-form-item>
          <label class="el-label l">所属公司：</label>
          <label class="el-label r">
            <el-select v-model="companyId" placeholder="请选择公司">
              <el-option v-for="c in companys" :key="c.id" :value="c.id" :label="c.companyName"></el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">产品名称：</label>
          <label class="el-label r">
            <el-input v-model="productName"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">产品描述：</label>
          <label class="el-label r">
            <el-input v-model="productDes"></el-input>
          </label>
        </el-form-item>
        <div style="text-align: center">
          <el-button size="medium" style="width: 130px" type="primary" @click="addProduct">提交</el-button>
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
        companyId: '',
        productName: '',
        productDes: '',
        companys: []
      }
    },
    activated() {
      api.getCompanyList().then((response) => {
        if (response.code == 'success') {
          this.companys = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    },
    methods: {
      addProduct() {
        var params = {}
        params.companyId = this.companyId
        params.productName = this.productName
        params.productDes = this.productDes
        api.addProduct(params).then((response) => {
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

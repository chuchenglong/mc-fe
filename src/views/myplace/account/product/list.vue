<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.productName.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column min-width	="120px" label="公司名称" prop="companyName"></el-table-column>
        <el-table-column min-width	="120px" label="产品名称" prop="productName"></el-table-column>
        <el-table-column min-width	="320px" label="产品描述" prop="productDes"></el-table-column>
        <el-table-column width	="270px" align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="small " placeholder="输入产品名称搜索" prefix-icon="el-icon-search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

  </div>
</template>

<script>
  import api from '@/service/api'
  import {formatDate} from '@/util/date'

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        productName: '',
        productDes: '',
      }
    },
    activated() {
      api.getProductList().then((response) => {
        if (response.code == 'success') {
          this.tableData = response.data
        } else
          this.$message.error(response.message)
      })
    },
    methods: {
      handleUpdate(index, row) {
        this.$prompt('产品描述', '产品描述修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.productDes
        }).then(({ value }) => {
          var params = {};
          params.id = row.id
          params.productDes = value
          api.updateProduct(params).then((response) => {
            if (response.code == 'success') {
              row.productDes = value
              this.tableData.splice(index, 1, row)
              this.$message({type: 'success', message: '修改成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          // this.$message({type: 'info', message: '取消输入'});
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该产品信息, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          api.deleteProduct(params).then((response) => {
            if (response.code == 'success') {
              this.tableData.splice(index, 1)
              this.$message({type: 'success', message: '删除成功!'});
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        })
      }
    }

  }
</script>

<style scoped>
  .el-container {
    width: 100%;
  }
  .el-table {
    width: 100%;
  }
  .el-input {
    width: 230px;
    padding: 0;
  }
</style>

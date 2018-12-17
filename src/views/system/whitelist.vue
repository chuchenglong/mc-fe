<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.whiteValue.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width	="180px" label="白名单类型" prop="whiteType" :formatter="ftWhiteType"></el-table-column>
        <el-table-column min-width	="350px" label="白名单内容" prop="whiteValue"></el-table-column>
        <el-table-column width	="400px" align="right">
          <template slot="header" slot-scope="scope">
            <div><el-button icon="el-icon-plus" size="small" @click="handleAdd" class="b-add">添加白名单</el-button></div>
            <el-input v-model="search" size="small " placeholder="输入白名单内容搜索" prefix-icon="el-icon-search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-container>
      <el-dialog title="新增白名单" :close-on-click-modal="false" :visible.sync="addVisible">
        <el-form>
          <el-form-item label="白名单类型">
            <el-radio-group v-model="whiteType">
              <el-radio v-for="w in whiteTypes" :key="w.key" :label="w.key">{{w.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="白名单内容">
            <el-input v-model="whiteValue"></el-input>
          </el-form-item>
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="addWhiteList">确 定</el-button>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    mounted() {
      api.getWhiteList().then((response) => {
        if (response.code == 'success')
          this.tableData = response.data
        else
          this.$message.error(response.message)
      })
      api.getWhiteType().then((response) => {
        if (response.code == 'success') {
          this.whiteTypes = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    },
    data() {
      return {
        tableData: [],
        search: '',
        addVisible: false,
        whiteValue: '',
        whiteType: '',
        whiteTypes: []
      }
    },
    methods: {
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将删除该白名单, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          api.deleteWhiteList(params).then((response) => {
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
      },
      handleAdd() {
        this.addVisible = true
      },
      addWhiteList() {
        var params = {};
        params.whiteType = this.whiteType
        params.whiteValue = this.whiteValue
        api.addWhiteList(params).then((response) => {
          if (response.code == 'success') {
            params.id = response.data
            this.tableData.push(params)
            this.cancelAdd()
            this.$message({type: 'success', message: '添加成功!'});
          } else {
            this.$message.error(response.message)
          }
        })
      },
      cancelAdd() {
        this.addVisible = false
        this.whiteType = ''
        this.whiteValue = ''
      },
      ftWhiteType(row, column, cellValue, index) {
        if (cellValue == 'wt_100')
          return '服务白名单'
        else
          return '用户白名单'
      }

    }

  }
</script>

<style scoped>
  .el-container {
    padding: 1% 10% 0 10% !important;
    width: 100%;
  }
  .el-input {
    width: 230px;
    padding: 0;
  }
  .b-add {
    width: 110px !important;
    border-radius: 6px;
  }


</style>

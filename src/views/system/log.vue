<template>
  <div>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.whiteValue.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width	="100px" label="用户ID" prop="userId" :formatter="ftUserId"></el-table-column>
        <el-table-column width	="240px" label="操作服务地址" prop="optUrl"></el-table-column>
        <el-table-column width	="200px" label="操作时间" prop="optTime" :formatter="ftOptTime"></el-table-column>
        <el-table-column width	="100px" label="状态" prop="optStatus" :formatter="ftOptStatus"></el-table-column>
        <el-table-column width	="100px" label="操作人IP" prop="optIp"></el-table-column>
        <el-table-column min-width	="250px" label="操作内容" prop="optContent"></el-table-column>
      </el-table>
      <el-pagination style="text-align:right;float:left;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>

    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {formatDate} from '@/util/date'

  export default {
    mounted() {
      api.getOptList().then((response) => {
        if (response.code == 'success')
          this.tableData = response.data
        else
          this.$message.error(response.message)
      })
    },
    data() {
      return {
        tableData: [],
        search: '',
      }
    },
    methods: {
      ftOptStatus(row, column, cellValue, index) {
        if (cellValue == 'os_100') {
          return '成功'
        } else if (cellValue == 'os_101') {
          return '业务异常'
        } else if (cellValue == 'os_102') {
          return '系统异常'
        } else {
          return ''
        }
      },
      ftOptTime(row, column, cellValue, index) {
        if (cellValue == null || cellValue == '') {
          return ''
        }
        return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
      },
      ftUserId(row, column, cellValue, index) {
        if (cellValue == 0) {
          return ''
        }
        return cellValue
      },
      handleSizeChange: function (size) {
        this.pagesize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      }

    }

  }
</script>

<style scoped>
  .el-container {
    padding: 1% 10% 0 10% !important;
    width: 100%;
  }
  .el-table {
    width: 100%;
  }


</style>

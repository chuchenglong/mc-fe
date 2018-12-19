<template>
  <div>
    <el-container>
      <el-form class="condition">
        <el-form-item>
          <label class="el-label l">用户ID：</label>
          <label class="el-label r"><el-input class="w" v-model="userId"/></label>
          <label class="el-label l">操作服务：</label>
          <label class="el-label r"><el-input class="w" v-model="optUrl"/></label>
          <label class="el-label l">状态：</label>
          <label class="el-label r">
            <el-select v-model="optStatus" placeholder="请选择状态">
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="os in optStatuses" :key="os.key" :value="os.key" :label="os.value"></el-option>
            </el-select>
          </label>
          <el-button type="primary" @click="getOptList" icon="el-icon-search" class="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.whiteValue.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column width	="100px" label="用户ID" prop="userId" :formatter="ftUserId"></el-table-column>
        <el-table-column width	="240px" label="操作服务" prop="optUrl"></el-table-column>
        <el-table-column width	="200px" label="操作时间" prop="optTime" :formatter="ftOptTime"></el-table-column>
        <el-table-column width	="100px" label="状态" prop="optStatus" :formatter="ftOptStatus"></el-table-column>
        <el-table-column width	="100px" label="操作人IP" prop="optIp"></el-table-column>
        <el-table-column min-width	="250px" label="操作内容" prop="optContent"></el-table-column>
      </el-table>
    </el-container>
    <el-container>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="pageArr"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {formatDate} from '@/util/date'

  export default {
    mounted() {
      this.pageSize = 10
      this.getOptList()

      api.getOptStatus().then((response) => {
        if (response.code == 'success') {
          this.optStatuses = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    },
    data() {
      return {
        tableData: [],
        search: '',
        pageArr: [5,10],
        pageSize: 0,
        pageNo: 1,
        total: 0,
        optStatus: '',
        optStatuses: [],
        userId: '',
        optUrl: ''
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
        this.pageSize = size
        this.getOptList()
      },
      handleCurrentChange: function (currentPage) {
        this.pageNo = currentPage
        this.getOptList()
      },
      getOptList() {
        var params = {}
        params.pageSize = this.pageSize;
        params.pageNo = this.pageNo;
        params.userId = this.userId;
        params.optUrl = this.optUrl;
        params.optStatus = this.optStatus;
        api.getOptList(params).then((response) => {
          if (response.code == 'success') {
            this.tableData = response.data.rows
            this.total = response.data.total
          } else
            this.$message.error(response.message)
        })
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
    width: 70px;
    margin-left: 10px;
  }
  .r {
    width: 200px;
  }
  .w {
    width: 200px;
  }
  .condition {
    border-bottom: 1px solid #d9d9d9;
    width: inherit;
  }
  .query {
    margin-left: 25px;
  }


</style>

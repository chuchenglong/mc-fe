<template>
  <div>
    <el-container>
      <el-form class="condition">
        <el-form-item>
          <label class="el-label l">用户名：</label>
          <label class="el-label r"><el-input class="w" v-model="username"/></label>
          <label class="el-label l">状态：</label>
          <label class="el-label r">
            <el-select v-model="userStatus" placeholder="请选择状态">
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="us in userStatuses" :key="us.key" :value="us.key" :label="us.value"></el-option>
            </el-select>
          </label>
          <label class="el-label l">手机号：</label>
          <label class="el-label r"><el-input class="w" v-model="phone"/></label>
          <el-button type="primary" @click="getUserPageList" icon="el-icon-search" class="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column min-width	="150px" label="用户名" prop="username" :formatter="ftUserId"></el-table-column>
        <el-table-column min-width	="150px" label="手机号" prop="phone"></el-table-column>
        <el-table-column min-width	="150px" label="状态" prop="userStatus" :formatter="ftOptStatus"></el-table-column>
        <el-table-column min-width	="150px" label="注册时间" prop="createTime" :formatter="ftOptTime"></el-table-column>
        <el-table-column width	="400px" align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="small " placeholder="输入手机号在当前页面搜索" prefix-icon="el-icon-search"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDetail(scope.$index, scope.row)" icon="el-icon-document">详情</el-button>
          </template>
        </el-table-column>
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
      this.getUserPageList()

      api.getUserStatus().then((response) => {
        if (response.code == 'success') {
          this.userStatuses = response.data
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
        userStatuses: [],
        userStatus: '',
        username: '',
        phone: ''
      }
    },
    methods: {
      ftOptStatus(row, column, cellValue, index) {
        if (cellValue == 'us_100') {
          return '正常'
        } else if (cellValue == 'us_101') {
          return '锁定'
        } else if (cellValue == 'us_102') {
          return '冻结'
        } else if (cellValue == 'us_103') {
          return '休眠'
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
        this.getUserPageList()
      },
      handleCurrentChange: function (currentPage) {
        this.pageNo = currentPage
        this.getUserPageList()
      },
      getUserPageList() {
        var params = {}
        params.pageSize = this.pageSize;
        params.pageNo = this.pageNo;
        params.username = this.username
        params.userStatus = this.userStatus
        params.phone = this.phone
        api.getUserPageList(params).then((response) => {
          if (response.code == 'success') {
            this.tableData = response.data.rows
            this.total = response.data.total
          } else
            this.$message.error(response.message)
        })
      },
      handleDetail(index, row) {
        this.$message.info("还没做了，急什么")
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

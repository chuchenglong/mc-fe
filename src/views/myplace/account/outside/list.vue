<template>
  <div>
    <el-container>
      <el-form class="condition">
        <el-form-item>
          <label class="el-label l">公司：</label>
          <label class="el-label r">
            <el-select v-model="queryCompany" placeholder="请选择公司" @change="onSelectedCompany">
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="c in companys" :key="c.id" :value="c.id" :label="c.companyName"></el-option>
            </el-select>
          </label>
          <label class="el-label l">产品：</label>
          <label class="el-label r">
            <el-select v-model="queryProduct" placeholder="请选择公司" >
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="p in products" :key="p.id" :value="p.id" :label="p.productName"></el-option>
            </el-select>
          </label>
          <label class="el-label l">账号：</label>
          <label class="el-label r"><el-input class="w" v-model="queryAccountNo"/></label>
          <label class="el-label l">类型：</label>
          <label class="el-label r">
            <el-select v-model="queryAccountType" placeholder="请选择状态">
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="at in accountTypes" :key="at.key" :value="at.key" :label="at.value"></el-option>
            </el-select>
          </label>
          <el-button type="primary" size="medium" @click="getAccountOutsidePageList" icon="el-icon-search" class="query">查询</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column min-width	="100px" label="公司" prop="companyName"></el-table-column>
        <el-table-column min-width	="120px" label="产品" prop="productName"></el-table-column>
        <el-table-column min-width	="120px" label="账号" prop="accountNo"></el-table-column>
        <el-table-column min-width	="80px" label="类型" prop="accountType" :formatter="ftAT"></el-table-column>
        <el-table-column min-width	="80px" label="标签" prop="accountMark" :formatter="ftAM"></el-table-column>
        <el-table-column width	="80px" label="是否关联" prop="relAccountId" :formatter="ftRAI"></el-table-column>
        <el-table-column width	="160px" label="注册时间" prop="createTime" :formatter="ftOT"></el-table-column>
        <el-table-column width	="270px" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)" icon="el-icon-document">详情</el-button>
            <el-button size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
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

    <el-container>
      <el-dialog title="三方账户信息详情" :close-on-click-modal="false" :visible.sync="detailVisible" width="750px">
        <el-form>
          <el-form-item>
            <label class="el-label l2">三方账号：</label>
            <label class="el-label r2">{{accountDetail.accountNo}}</label>
            <label class="el-label l2">账号类型：</label>
            <label class="el-label r2">{{detailAt}}</label>
            <label class="el-label l2">标签：</label>
            <label class="el-label r2">{{detailAm}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">登录密码：</label>
            <label class="el-label r2">{{accountDetail.loginPassword}}</label>
            <label class="el-label l2">查询密码：</label>
            <label class="el-label r2">{{accountDetail.queryPassword}}</label>
            <label class="el-label l2">支付密码：</label>
            <label class="el-label r2">{{accountDetail.transferPassword}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">所属公司：</label>
            <label class="el-label r2">{{accountDetail.company}}</label>
            <label class="el-label l2">所属产品：</label>
            <label class="el-label r2">{{accountDetail.product}}</label>
            <label class="el-label l2">用途：</label>
            <label class="el-label r2">{{accountDetail.accountUsed}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">证件类型：</label>
            <label class="el-label r2">{{detailCt}}</label>
            <label class="el-label l2">个人姓名：</label>
            <label class="el-label r2">{{accountDetail.name}}</label>
            <label class="el-label l2">证件号码：</label>
            <label class="el-label r2">{{accountDetail.certNo}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">手机号：</label>
            <label class="el-label r2">{{accountDetail.phone}}</label>
            <label class="el-label l2">邮箱：</label>
            <label class="el-label r2">{{accountDetail.email}}</label>
            <label class="el-label l2">描述：</label>
            <label class="el-label r2">{{accountDetail.accountDes}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">安全问题1：</label>
            <label class="el-label r2">{{accountDetail.question1}}</label>
            <label class="el-label l2">安全问题2：</label>
            <label class="el-label r2">{{accountDetail.question2}}</label>
            <label class="el-label l2">安全问题3：</label>
            <label class="el-label r2">{{accountDetail.question3}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l2">问题答案1：</label>
            <label class="el-label r2">{{accountDetail.answer1}}</label>
            <label class="el-label l2">问题答案2：</label>
            <label class="el-label r2">{{accountDetail.answer2}}</label>
            <label class="el-label l2">问题答案3：</label>
            <label class="el-label r2">{{accountDetail.answer3}}</label>
          </el-form-item>
          <div style="text-align: center">
            <el-button size="medium" style="width: 130px" type="primary" @click="cancel">关闭</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {ftAccountType, ftAccountMark, ftRelAccountId, ftDate, ftCertType} from '@/util/format'

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        pageArr: [5,10],
        pageSize: 0,
        pageNo: 1,
        total: 0,
        detailVisible: false,
        accountTypes: [],
        accountMarks: [],
        companys: [],
        products: [],
        accountDetail: {},
        queryCompany: '',
        queryProduct: '',
        queryAccountNo: '',
        queryAccountType: ''
      }
    },
    activated() {
      this.pageSize = 10
      this.getAccountOutsidePageList()

      api.getAccountType().then((response) => {
        if (response.code == 'success') {
          this.accountTypes = response.data
        } else {
          this.$message.error(response.message)
        }
      })

      api.getAccountMark().then((response) => {
        if (response.code == 'success') {
          this.accountMarks = response.data
        } else {
          this.$message.error(response.message)
        }
      })

      api.getCompanyList().then((response) => {
        if (response.code == 'success') {
          this.companys = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    },
    computed: {
      detailAt() {
        return ftAccountType(this.accountDetail.accountType)
      },
      detailCt() {
        return ftCertType(this.accountDetail.certType)
      },
      detailAm() {
        return ftAccountMark(this.accountDetail.accountMark)
      }
    },
    methods: {
      handleSizeChange: function (size) {
        this.pageSize = size
        this.getUserPageList()
      },
      handleCurrentChange: function (currentPage) {
        this.pageNo = currentPage
        this.getUserPageList()
      },
      getAccountOutsidePageList() {
        var params = {}
        params.pageSize = this.pageSize;
        params.pageNo = this.pageNo;
        params.product = this.queryProduct;
        params.company = this.queryCompany;
        params.accountType = this.queryAccountType;
        params.accountNo = this.queryAccountNo;
        api.getAccountOutsidePageList(params).then((response) => {
          if (response.code == 'success') {
            this.tableData = response.data.rows
            this.total = response.data.total
          } else
            this.$message.error(response.message)
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该三方账户信息, 是否继续?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          var params = {};
          params.id = row.id
          api.deleteAccountOutside(params).then((response) => {
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
      handleDetail(index, row) {
        this.detailVisible = true
        this.accountDetail = row
      },
      handleUpdate() {
        this.$message.info("字段这么多，哥还在想要不要跳转页面，不急！")
      },
      cancel() {
        this.detailVisible = false
      },
      onSelectedCompany(value) {
        if (value != '') {
          var params = {}
          params.companyId = value
          api.getProductListByCompany(params).then((response) => {
            if (response.code == 'success') {
              this.products = response.data
            } else
              this.$message.error(response.message)
          })
        }
      },
      ftOT(row, column, cellValue, index) {
        return ftDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
      },
      ftAT(row, column, cellValue, index) {
        return ftAccountType(cellValue)
      },
      ftAM(row, column, cellValue, index) {
        return ftAccountMark(cellValue)
      },
      ftRAI(row, column, cellValue, index) {
        return ftRelAccountId(cellValue)
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
  .el-label {
    display: inline-block;
    line-height: 50px;
  }
  .l {
    font-weight: 600;
    width: 50px;
    margin-left: 5px;
  }
  .r {
    width: 155px;
  }
  .l2 {
    font-weight: 600;
    width: 80px;
    margin-left: 5px;
  }
  .r2 {
    width: 100px;
  }
  .w {
    width: 150px;
  }
  .condition {
    border-bottom: 1px solid #d9d9d9;
    width: inherit;
  }
  .query {
    margin-left: 25px;
  }
</style>

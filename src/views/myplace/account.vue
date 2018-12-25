<template>
  <div>
    <el-container>
      <el-form class="condition">
        <el-form-item>
          <label class="el-label l">所属公司：</label>
          <label class="el-label r"><el-input class="w" v-model="company"/></label>
          <label class="el-label l">所属产品：</label>
          <label class="el-label r"><el-input class="w" v-model="product"/></label>
          <label class="el-label l">账号：</label>
          <label class="el-label r"><el-input class="w" v-model="accountNo"/></label>
          <label class="el-label l">账号类型：</label>
          <label class="el-label r">
            <el-select v-model="accountType" placeholder="请选择状态">
              <el-option key="" value="" label="全部"></el-option>
              <el-option v-for="at in accountTypes" :key="at.key" :value="at.key" :label="at.value"></el-option>
            </el-select>
          </label>
          <el-button type="primary" @click="getAccountOutsidePageList" icon="el-icon-search" class="query">查询</el-button>
          <el-button type="primary" @click="handleAdd" icon="el-icon-plus" class="add">添加三方账号</el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <el-container>
      <el-table :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))" >
        <el-table-column min-width	="120px" label="所属公司" prop="company"></el-table-column>
        <el-table-column min-width	="120px" label="所属产品" prop="product"></el-table-column>
        <el-table-column min-width	="120px" label="账号" prop="accountNo"></el-table-column>
        <el-table-column min-width	="80px" label="账号类型" prop="accountType" :formatter="ftAccountType"></el-table-column>
        <el-table-column min-width	="100px" label="标签" prop="accountMark" :formatter="ftAccountMark"></el-table-column>
        <el-table-column min-width	="80px" label="是否被关联使用" prop="relAccountId" :formatter="ftRelAccountId"></el-table-column>
        <el-table-column width	="200px" label="注册时间" prop="createTime" :formatter="ftOptTime"></el-table-column>
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
      <el-dialog title="新增三方账户信息" :close-on-click-modal="false" :visible.sync="addVisible">
        <el-form>
          <el-form-item label="三方账号">
            <el-input v-model="accountNo"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="loginPassword"></el-input>
          </el-form-item>
          <el-form-item label="查询密码">
            <el-input v-model="queryPassword"></el-input>
          </el-form-item>
          <el-form-item label="支付密码">
            <el-input v-model="transferPassword"></el-input>
          </el-form-item>
          <el-form-item label="账号类型">
            <el-radio-group v-model="accountType">
              <el-radio v-for="at in accountTypes" :key="at.key" :label="at.key">{{at.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="accountMark">
              <el-radio v-for="am in accountMarks" :key="am.key" :label="am.key">{{am.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属产品">
            <el-input v-model="product"></el-input>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-input v-model="company"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-model="certType"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="certNo"></el-input>
          </el-form-item>
          <el-form-item label="个人姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="安全问题1">
            <el-input v-model="question1"></el-input>
          </el-form-item>
          <el-form-item label="问题答案1">
            <el-input v-model="answer1"></el-input>
          </el-form-item>
          <el-form-item label="安全问题2">
            <el-input v-model="question2"></el-input>
          </el-form-item>
          <el-form-item label="问题答案2">
            <el-input v-model="answer2"></el-input>
          </el-form-item>
          <el-form-item label="安全问题3">
            <el-input v-model="question3"></el-input>
          </el-form-item>
          <el-form-item label="问题答案3">
            <el-input v-model="answer3"></el-input>
          </el-form-item>
          <el-form-item label="用途">
            <el-input v-model="accountUsed"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="accountDes"></el-input>
          </el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addAccountOutside">确 定</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="修改三方账户信息" :close-on-click-modal="false" :visible.sync="updateVisible">
        <el-form>
          <el-form-item label="三方账号">
            <el-input v-model="accountNo"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="loginPassword"></el-input>
          </el-form-item>
          <el-form-item label="查询密码">
            <el-input v-model="queryPassword"></el-input>
          </el-form-item>
          <el-form-item label="支付密码">
            <el-input v-model="transferPassword"></el-input>
          </el-form-item>
          <el-form-item label="账号类型">
            <el-radio-group v-model="accountType">
              <el-radio v-for="at in accountTypes" :key="at.key" :label="at.key">{{at.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-radio-group v-model="accountMark">
              <el-radio v-for="am in accountMarks" :key="am.key" :label="am.key">{{am.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属产品">
            <el-input v-model="product"></el-input>
          </el-form-item>
          <el-form-item label="所属公司">
            <el-input v-model="company"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-model="certType"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="certNo"></el-input>
          </el-form-item>
          <el-form-item label="个人姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="安全问题1">
            <el-input v-model="question1"></el-input>
          </el-form-item>
          <el-form-item label="问题答案1">
            <el-input v-model="answer1"></el-input>
          </el-form-item>
          <el-form-item label="安全问题2">
            <el-input v-model="question2"></el-input>
          </el-form-item>
          <el-form-item label="问题答案2">
            <el-input v-model="answer2"></el-input>
          </el-form-item>
          <el-form-item label="安全问题3">
            <el-input v-model="question3"></el-input>
          </el-form-item>
          <el-form-item label="问题答案3">
            <el-input v-model="answer3"></el-input>
          </el-form-item>
          <el-form-item label="用途">
            <el-input v-model="accountUsed"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="accountDes"></el-input>
          </el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addAccountOutside">确 定</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="三方账户信息详情" :close-on-click-modal="false" :visible.sync="detailVisible">
        <el-form>
          <el-form-item>
            <label class="el-label l">三方账号：</label>
            <label class="el-label r"> {{accountNo}}</label>
            <label class="el-label l">账号类型：</label>
            <label class="el-label r"> {{accountType}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">登录密码：</label>
            <label class="el-label r"> {{loginPassword}}</label>
            <label class="el-label l">查询密码：</label>
            <label class="el-label r"> {{queryPassword}}</label>
            <label class="el-label l">支付密码：</label>
            <label class="el-label r"> {{transferPassword}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">所属公司：</label>
            <label class="el-label r"> {{company}}</label>
            <label class="el-label l">所属产品：</label>
            <label class="el-label r"> {{product}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">证件类型：</label>
            <label class="el-label r"> {{certType}}</label>
            <label class="el-label l">个人姓名：</label>
            <label class="el-label r"> {{name}}</label>
            <label class="el-label l">证件号码：</label>
            <label class="el-label r"> {{certNo}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">手机号：</label>
            <label class="el-label r"> {{phone}}</label>
            <label class="el-label l">邮箱：</label>
            <label class="el-label r"> {{email}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">安全问题1：</label>
            <label class="el-label r"> {{question1}}</label>
            <label class="el-label l">问题答案1：</label>
            <label class="el-label r"> {{answer1}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">安全问题2：</label>
            <label class="el-label r"> {{question2}}</label>
            <label class="el-label l">问题答案2：</label>
            <label class="el-label r"> {{answer2}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">安全问题3：</label>
            <label class="el-label r"> {{question3}}</label>
            <label class="el-label l">问题答案3：</label>
            <label class="el-label r"> {{answer3}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">标签：</label>
            <label class="el-label r"> {{accountMark}}</label>
            <label class="el-label l">用途：</label>
            <label class="el-label r"> {{accountUsed}}</label>
          </el-form-item>
          <el-form-item>
            <label class="el-label l">描述：</label>
            <label class="el-label r"> {{accountDes}}</label>
          </el-form-item>
          <el-button type="primary" @click="cancel">关闭</el-button>
        </el-form>
      </el-dialog>

    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {formatDate} from '@/util/date'

  export default {
    mounted() {
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

    },
    data() {
      return {
        tableData: [],
        search: '',
        pageArr: [5,10],
        pageSize: 0,
        pageNo: 1,
        total: 0,
        addVisible: false,
        updateVisible: false,
        detailVisible: false,
        accountNo: '',
        loginPassword: '',
        queryPassword: '',
        transferPassword: '',
        accountType: '',
        accountMark: '',
        product: '',
        company: '',
        certType: '',
        certNo: '',
        name: '',
        phone: '',
        email: '',
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        question3: '',
        answer3: '',
        accountUsed: '',
        accountDes: '',
        accountTypes: [],
        accountMarks: [],
      }
    },
    methods: {
      ftOptTime(row, column, cellValue, index) {
        if (cellValue == null || cellValue == '') {
          return ''
        }
        return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm:ss')
      },
      ftAccountType(row, column, cellValue, index) {
        return this.ftHandleAccountType(cellValue)
      },
      ftHandleAccountType(accountType) {
        if (accountType == 'at_100') {
          return '游戏'
        } else if (accountType == 'at_101') {
          return '工作'
        }
        return accountType
      },
      ftAccountMark(row, column, cellValue, index) {
        return this.ftHandleAccountMark(cellValue)
      },
      ftHandleAccountMark(accountMark) {
        if (accountMark == 'am_100') {
          return '--'
        }
        return accountMark
      },
      ftRelAccountId(row, column, cellValue, index) {
        return this.ftHandleRelAccountId(cellValue)
      },
      ftHandleRelAccountId(relAccountId) {
        if (relAccountId == null || relAccountId == '') {
          return '否'
        }
        return '是'
      },
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
        params.product = this.product;
        params.company = this.company;
        params.accountType = this.accountType;
        params.accountNo = this.accountNo;
        api.getAccountOutsidePageList(params).then((response) => {
          if (response.code == 'success') {
            this.tableData = response.data.rows
            this.total = response.data.total
          } else
            this.$message.error(response.message)
        })
      },
      handleDetail(index, row) {
        this.addVisible = false
        this.updateVisible = false
        this.detailVisible = true
        this.accountNo = row.accountNo
        this.loginPassword = row.loginPassword
        this.queryPassword = row.queryPassword
        this.transferPassword = row.transferPassword
        this.accountType = this.ftHandleAccountType(row.accountType)
        this.accountMark = this.ftHandleAccountMark(row.accountMark)
        this.product = row.product
        this.company = row.company
        this.certType = row.certType
        this.certNo = row.certNo
        this.name = row.name
        this.phone = row.phone
        this.email = row.email
        this.question1 = row.question1
        this.answer1 = row.answer1
        this.question2 = row.question2
        this.answer2 = row.answer2
        this.question3 = row.question3
        this.answer3 = row.answer3
        this.accountUsed = row.accountUsed
        this.accountDes = row.accountDes
      },
      handleAdd() {
        this.addVisible = true
        this.updateVisible = false
      },
      handleUpdate(index, row) {
        this.addVisible = false
        this.updateVisible = true
        this.configId = row.id
        this.index = index
        api.getConfigDetail({id: row.id}).then((response) => {
          if (response.code == 'success') {
            this.configCodeUpdate = response.data.configCode
            this.configNameUpdate = response.data.configName
            this.configValueUpdate = response.data.configValue
            this.configTypeUpdate = response.data.configType
            this.bizTypeUpdate = response.data.bizType
            this.configMarkUpdate = response.data.configMark
            this.configDesUpdate = response.data.configDes
            this.configStatus = response.data.configStatus
          } else {
            this.$message.error(response.message)
          }
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
      cancel() {
        this.addVisible = false
        this.updateVisible = false
        this.detailVisible = false
      },
      addAccountOutside() {
        var params = {};
        params.accountNo = this.accountNo
        params.loginPassword = this.loginPassword
        params.queryPassword = this.queryPassword
        params.transferPassword = this.transferPassword
        params.accountType = this.accountType
        params.accountMark = this.accountMark
        params.product = this.product
        params.company = this.company
        params.certType = this.certType
        params.certNo = this.certNo
        params.name = this.name
        params.phone = this.phone
        params.email = this.email
        params.question1 = this.question1
        params.answer1 = this.answer1
        params.question2 = this.question2
        params.answer2 = this.answer2
        params.question3 = this.question3
        params.answer3 = this.answer3
        params.accountUsed = this.accountUsed
        params.accountDes = this.accountDes
        params.createTime = new Date()
        api.addAccountOutside(params).then((response) => {
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
    width: 80px;
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
  .add {
    margin-left: 70px;
  }


</style>

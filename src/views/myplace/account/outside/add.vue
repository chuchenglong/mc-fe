<template>
  <div>
    <el-container>
      <el-form>
        <el-form-item>
          <label class="el-label l">三方账号：</label>
          <label class="el-label r"><el-input v-model="accountNo"></el-input></label>
          <label class="el-label l">账号类型：</label>
          <label class="el-label r">
            <el-select v-model="accountType" placeholder="请选择账号类型" >
              <el-option v-for="at in accountTypes" :key="at.key" :value="at.key" :label="at.value"></el-option>
            </el-select>
          </label>
          <label class="el-label l">标签：</label>
          <label class="el-label r">
            <el-select v-model="accountMark" placeholder="请选择标签" >
              <el-option v-for="am in accountMarks" :key="am.key" :value="am.key" :label="am.value"></el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">登录密码：</label>
          <label class="el-label r"><el-input v-model="loginPassword"></el-input></label>
          <label class="el-label l">查询密码：</label>
          <label class="el-label r"><el-input v-model="queryPassword"></el-input></label>
          <label class="el-label l">支付密码：</label>
          <label class="el-label r"><el-input v-model="transferPassword"></el-input></label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">所属公司：</label>
          <label class="el-label r">
            <el-select v-model="company" placeholder="请选择公司" @change="onSelectedCompany">
              <el-option v-for="c in companys" :key="c.id" :value="c.id" :label="c.companyName"></el-option>
            </el-select>
          </label>
          <label class="el-label l">所属产品：</label>
          <label class="el-label r">
            <el-select v-model="product" placeholder="请选择公司" >
              <el-option v-for="p in products" :key="p.id" :value="p.id" :label="p.productName"></el-option>
            </el-select>
          </label>
          <label class="el-label l">用途：</label>
          <label class="el-label r">
            <el-input v-model="accountUsed"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">证件类型：</label>
          <label class="el-label r">
            <el-select v-model="certType" placeholder="请选择证件类型" >
              <el-option v-for="ct in certTypes" :key="ct.key" :value="ct.key" :label="ct.value"></el-option>
            </el-select>
          </label>
          <label class="el-label l">个人姓名：</label>
          <label class="el-label r"><el-input v-model="name"></el-input></label>
          <label class="el-label l">证件号码：</label>
          <label class="el-label r"><el-input v-model="certNo"></el-input></label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">手机号：</label>
          <label class="el-label r">
            <el-input v-model="phone"></el-input>
          </label>
          <label class="el-label l">邮箱：</label>
          <label class="el-label r">
            <el-input v-model="email"></el-input>
          </label>
          <label class="el-label l">描述：</label>
          <label class="el-label r">
            <el-input v-model="accountDes"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">安全问题1：</label>
          <label class="el-label r">
            <el-input v-model="question1"></el-input>
          </label>
          <label class="el-label l">安全问题2：</label>
          <label class="el-label r">
            <el-input v-model="question2"></el-input>
          </label>
          <label class="el-label l">安全问题3：</label>
          <label class="el-label r">
            <el-input v-model="question3"></el-input>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="el-label l">问题答案1：</label>
          <label class="el-label r">
            <el-input v-model="answer1"></el-input>
          </label>
          <label class="el-label l">问题答案2：</label>
          <label class="el-label r">
            <el-input v-model="answer2"></el-input>
          </label>
          <label class="el-label l">问题答案3：</label>
          <label class="el-label r">
            <el-input v-model="answer3"></el-input>
          </label>
        </el-form-item>
        <div style="text-align: center">
          <el-button size="medium" style="width: 130px" type="primary" @click="addAccountOutside">提交</el-button>
        </div>
      </el-form>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'

  export default {
    activated() {
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

      api.getCertType().then((response) => {
        if (response.code == 'success') {
          this.certTypes = response.data
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
    data() {
      return {
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
        certTypes: [],
        companys: [],
        products: [],
      }
    },
    methods: {
      onSelectedCompany(value) {
        var params = {}
        params.companyId = value
        api.getProductListByCompany(params).then((response) => {
          if (response.code == 'success') {
            this.products = response.data
          } else
            this.$message.error(response.message)
        })
      },
      addAccountOutside() {
        var params = {}
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

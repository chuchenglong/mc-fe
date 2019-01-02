<template>
  <div>
    <el-container>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <label class="el-label t">基本信息</label>
          </template>
          <div style="position: absolute;margin-top: 8px;">
            <Upload :photo="userDetail.photo"/>
          </div>
          <el-form class="el-form-p">
            <el-form-item>
              <label class="el-label l">用户名：</label>
              <label class="el-label r">{{userDetail.username}}</label>
              <label class="el-label l">状态：</label>
              <label class="el-label r">{{userDetail.userStatusDis}}</label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">注册时间：</label>
              <label class="el-label r">{{fmCreateTime}}</label>
              <label class="el-label l">手机号：</label>
              <label class="el-label r">{{userDetail.phone}}</label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">昵称：</label>
              <label class="el-label r"><el-input class="w" v-model="alias"/></label>
              <label class="el-label l">邮箱：</label>
              <label class="el-label r"><el-input class="w-big" v-model="email"/></label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">个人简介：</label>
              <label class="el-label r" style="width: 400px"><el-input class="w-bigger" v-model="brief"/></label>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <label class="el-label t">详情信息</label>
          </template>
          <el-form>
            <el-form-item>
              <label class="el-label l">性别：</label>
              <label class="el-label r">
                <el-radio-group v-model="gender">
                  <el-radio v-for="g in genders" :key="g.key" :label="g.key">{{g.value}}</el-radio>
                </el-radio-group>
              </label>
              <label class="el-label l">名族：</label>
              <label class="el-label r">
                <el-select v-model="race" placeholder="请选择名族" >
                  <el-option v-for="r in races" :key="r.key" :value="r.key" :label="r.value"></el-option>
                </el-select>
              </label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">出生日期：</label>
              <label class="el-label r"><el-date-picker type="date" placeholder="选择日期" class="w" v-model="birthDate" /></label>
              <label class="el-label l">国籍：</label>
              <label class="el-label r">
                <el-select v-model="nationality" placeholder="请选择国籍">
                  <el-option v-for="n in nationalities" :key="n.key" :value="n.key" :label="n.value"></el-option>
                </el-select>
              </label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">婚姻状况：</label>
              <label class="el-label r">
                <el-radio-group v-model="marital">
                  <el-radio v-for="m in maritals" :key="m.key" :label="m.key">{{m.value}}</el-radio>
                </el-radio-group>
              </label>
              <label class="el-label l">常驻地址：</label>
              <label class="el-label r" style="width: 400px"><el-input v-model="domicile" /></label>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <label class="el-label t">身份信息</label>
          </template>
          <el-form>
            <el-form-item>
              <label class="el-label l">证件类型：</label>
              <label class="el-label r">{{userDetail.certTypeDis}}</label>
              <label class="el-label l">姓名：</label>
              <label class="el-label r">{{userDetail.name}}</label>
              <label class="el-label l">证件号码：</label>
              <label class="el-label r">{{userDetail.certNo}}</label>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <label class="el-label t">权限信息</label>
          </template>
          <el-form>
            <el-form-item>
              <label class="el-label l">角色：</label>
              <label class="el-label r">{{userDetail.roleName}}</label>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-container>
    <el-container>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-container>
  </div>
</template>

<script>
  import api from '@/service/api'
  import {ftDate} from '@/util/format'
  import Upload from '@/components/user/upload'

  export default {
    components: {Upload},
    data() {
      return {
        activeNames: ['1','2','3','4'],
        userDetail: {},
        alias: '',
        email: '',
        gender: '',
        race: '',
        birthDate: '',
        nationality: '',
        marital: '',
        domicile: '',
        brief: '',
        races: [],
        nationalities: [],
        genders: [],
        maritals: []
      };
    },
    activated() {
      api.getUserDetail({}).then((response) => {
        if (response.code == 'success') {
          this.userDetail = response.data
          this.alias = response.data.alias
          this.email = response.data.email
          this.gender = response.data.gender
          this.race = response.data.race
          this.birthDate = response.data.birthDate
          this.nationality = response.data.nationality
          this.marital = response.data.marital
          this.domicile = response.data.domicile
          this.brief = response.data.brief
          this.$store.dispatch("SetPhoto", response.data.photo)
        } else {
          this.$message.error(response.message)
        }
      })

      api.getRace({}).then((response) => {
        if (response.code == 'success') {
          this.races = response.data
        } else {
          this.$message.error(response.message)
        }
      })

      api.getNationality({}).then((response) => {
        if (response.code == 'success') {
          this.nationalities = response.data
        } else {
          this.$message.error(response.message)
        }
      })

      api.getGender({}).then((response) => {
        if (response.code == 'success') {
          this.genders = response.data
        } else {
          this.$message.error(response.message)
        }
      })

      api.getMarital({}).then((response) => {
        if (response.code == 'success') {
          this.maritals = response.data
        } else {
          this.$message.error(response.message)
        }
      })

    },
    computed: {
      fmCreateTime() {
        return ftDate(new Date(this.userDetail.createTime), 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      onSubmit() {
        var params = {}
        params.alias = this.alias
        params.email = this.email
        params.gender = this.gender
        params.race = this.race
        params.birthDate = this.birthDate
        params.nationality = this.nationality
        params.marital = this.marital
        params.domicile = this.domicile
        params.brief = this.brief
        params.photo = this.$store.state.user.photo
        api.userUpdate(params).then((response) => {
          if (response.code == 'success') {
            this.$message.success("个人信息修改成功")
          } else {
            this.$message.error(response.message)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .img-user {
    width: 178px;
    height: 178px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 1.5%;
  }
  .el-collapse {
    padding: 1% 15% 0 15%;
    width: 100%;
    border-bottom: none;
  }
  .el-form-p {
    /*float: right;*/
    margin-left: 230px;
    width: 600px;
  }
  .el-form-item {
    margin: 0;
  }
  .el-label {
    display: inline-block;
    line-height: 50px;
  }
  .l {
    font-weight: 600;
    width: 70px;
  }
  .r {
    width: 200px;
  }
  .t {
    font-size: 15px;
    font-weight: 600;
  }
  .w {
    width: 140px;
  }
  .w-big {
    width: 200px;
  }
  .w-bigger {
    width: 480px;
  }
  .el-button {
    margin: 20px 550px 20px 550px;
    width: 130px;
  }
</style>

<template>
  <div>
    <el-container>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <label class="el-label t">基本信息</label>
          </template>
          <div style="position: absolute;margin-top: 8px;">
            <img :src="userDetail.photo" v-if="userDetail.photo" class="img-user"/>
            <img src="@/assets/user-photo.png" v-else class="img-user"/>
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
              <label class="el-label r">{{userDetail.alias}}</label>
              <label class="el-label l">邮箱：</label>
              <label class="el-label r">{{userDetail.email}}</label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">个人简介：</label>
              <label class="el-label r" style="width: 400px">{{userDetail.brief}}</label>
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
              <label class="el-label r">{{userDetail.genderDis}}</label>
              <label class="el-label l">名族：</label>
              <label class="el-label r">{{userDetail.raceDis}}</label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">出生日期：</label>
              <label class="el-label r">{{fmBirthDate}}</label>
              <label class="el-label l">国籍：</label>
              <label class="el-label r">{{userDetail.nationalityDis}}</label>
            </el-form-item>
            <el-form-item>
              <label class="el-label l">婚姻状况：</label>
              <label class="el-label r">{{userDetail.maritalDis}}</label>
              <label class="el-label l">常驻地址：</label>
              <label class="el-label r" style="width: 400px">{{userDetail.domicile}}</label>
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

  </div>
</template>

<script>
  import api from '@/service/api'
  import {ftDate} from '@/util/format'

  export default {
    data() {
      return {
        activeNames: ['1','2','3','4'],
        userDetail: {}
      };
    },
    activated() {
      api.getUserDetail({}).then((response) => {
        if (response.code == 'success')
          this.userDetail = response.data
        else
          this.$message.error(response.message)
      })
    },
    computed: {
      fmCreateTime() {
        return ftDate(new Date(this.userDetail.createTime), 'yyyy-MM-dd hh:mm:ss')
      },
      fmBirthDate() {
        return ftDate(new Date(this.userDetail.birthDate), 'yyyy-MM-dd')
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
</style>

<template>
  <div>
    <el-container>
      <el-upload
        class="avatar-uploader"
        :action="url"
        :show-file-list="false"
        accept=".doc,.docx"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError">
        <el-button size="small" type="primary">WORD文件上传</el-button>
      </el-upload>
    </el-container>
    <el-container>
      <div>{{content}}</div>
    </el-container>

  </div>
</template>

<script>
  export default {
    props: {
      photo: String
    },
    data() {
      return {
        url: "http://localhost:8080/ucaicms/kd/uploadAndParseWordText.do",
        content: ''
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        if (file.size == 0) {
          this.$message.error('不能上传空文件！')
          return false
        }
        return true
      },
      handleAvatarSuccess(res, file) {
        // console.log(res)
        if (res.status == 0) {
          this.content = res.re
          this.$message.success("上传成功！")
        } else {
          this.$message.error(res.msg)
        }
      },
      handleAvatarError(err, file, fileList) {
        this.$message.error("系统异常，请稍后再试！")
      }
    }
  }
</script>

<style scoped>
  .el-container {
    padding: 1% 10% 0 10% !important;
    width: 100%;
  }
</style>

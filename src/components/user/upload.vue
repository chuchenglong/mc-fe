<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action=actionUrl
      :headers="handleHeaders"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="$store.state.user.photo" :src="$store.state.user.photo" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        actionUrl: '/api/file/uploadSingleUserImage',
      }
    },
    computed: {
      handleHeaders() {
        return {
          token: this.$cookie.get("token")
        }
      },
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt3M;
      },
      handleAvatarSuccess(res, file) {
        if (res.code == 'success') {
          // this.imageUrl = URL.createObjectURL(file.raw)
          this.$store.dispatch("SetPhoto", res.data)
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    margin-top: 1%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

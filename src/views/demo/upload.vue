<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action=actionUrl
      :headers="handleHeaders"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-show="isInputShow" :src="photo" class="avatar">
      <img v-show="isShow" :src="imageUrl" class="avatar">
      <i v-show="isDefaultShow" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      photo: String
    },
    data() {
      return {
        actionUrl: '/api/file/uploadSingleUserImage',
        imageUrl: '',
        isShow: false
      }
    },
    computed: {
      handleHeaders() {
        return {
          token: this.$cookie.get("token")
        }
      },
      isDefaultShow() {
        if (this.photo || this.isShow)
          return false
        return true
      },
      isInputShow() {
        if (this.photo== null || this.photo == '' || this.isShow)
          return false
        return true
      }
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
          this.imageUrl = URL.createObjectURL(file.raw)
          this.isShow = true
          this.$emit("getPhotoUrlEvent", res.data)
          console.log("step 3.1="+res.data)
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

<template>
  <div>
    <div class="carousel-div">
      <template>
        <el-carousel style="height: 400px; width:800px" indicator-position="outside">
          <el-carousel-item style="height: inherit; width: inherit" v-for="item in imgs" :key="item">
            <h3><img class="carousel-image" :src="item"/></h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgs: ['static/images/carousel/001.jpg',
          'static/images/carousel/002.jpg',
          'static/images/carousel/003.jpg',
          'static/images/carousel/004.jpg',
          'static/images/carousel/005.jpg'],
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .carousel-image {
    width: 800px;
    height: 300px;
    text-align: center;
    vertical-align: middle;
    margin-top: -5px;
  }

  .carousel-div {
    margin-left: 25%;
    margin-top: 3%;

  }
</style>

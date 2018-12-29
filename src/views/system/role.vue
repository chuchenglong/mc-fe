<template>
  <div>
    <el-container>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value2"
        :data="data2">
      </el-transfer>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      const generateData2 = () => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    },
    activated() {

    }
  };
</script>

<style scoped>
  .el-container {
    padding: 1% 10% 0 10% !important;
    width: 100%;
  }
</style>

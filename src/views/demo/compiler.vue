<template>
<div>
  <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div>
    <button style="margin-left: 50px; margin-bottom: 20px" @click="getUEContent()">获取内容</button>
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue" style="margin-left: 50px"></UE>
    </div>
    <p v-html="content"></p>
  </div>
</div>
</template>

<script>
  import UE from '../../components/ue/ue.vue';
  export default {
    components: {UE},
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: 800,
          initialFrameHeight: 250
        },
        content: ''
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
        this.content = content;
      }
    }
  };
</script>

<style scoped>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .editor-container {
    width: 100%;
    text-align: center;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      res: {},
    };
  },
  mounted() {
    // 本地加载mock json文件
    // eslint-disable-next-line no-return-assign
    // this.axios.get('/mock/user/login.json').then(result => this.res = result);
    // 通过easy-mock 平台实现mock数据
    // eslint-disable-next-line no-return-assign
    this.axios.get('/mock').then(res => this.res = res);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

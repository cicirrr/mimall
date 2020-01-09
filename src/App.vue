<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      res: {},
    };
  },
  methods: {
    getUser() {
      // 添加默认值 res = 空对象
      // eslint-disable-next-line no-return-assign
      this.axios.get('/user').then((res = {}) => {
        const { username } = res;
        this.$store.dispatch('saveUsername', username);
        // this.saveUsername(res.username);
      });
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => this.$store.dispatch('saveCartCount', res));
    },
    // ...mapActions(['saveUsername', 'saveCartCount']),
  },
  mounted() {
    this.getUser();
    this.getCartCount();
  },
};
</script>

<style lang="scss">
  @import './assets/scss/config';
  @import './assets/scss/mixin';
  @import './assets/scss/base';
  @import './assets/scss/button';
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  methods: {
    getUser() {
      // eslint-disable-next-line no-return-assign
      this.axios.get('/user').then((res) => {
        // this.$store.dispatch('saveUsername', res.username);
        this.saveUsername(res.username);
      });
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then(res => this.$store.dispatch('saveCartCount', res));
    },
    ...mapActions(['saveUsername', 'saveCartCount']),
  },
  mounted() {
    this.getUser();
    this.getCartCount();
  },
};
</script>

<style lang="scss">
  @import './assets/scss/config';
  @import "./assets/scss/mixin";
  @import "./assets/scss/button";
</style>

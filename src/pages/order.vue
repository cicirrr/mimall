<template>
    <div class="order-page">
      <order-header :title="1"></order-header>
      <router-view></router-view>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue';
import NavFooter from '../components/NavFooter.vue';

export default {
  name: 'order',
  components: {
    NavFooter,
    OrderHeader,
  },
};
</script>

<style scoped>

</style>

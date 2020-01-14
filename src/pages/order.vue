<template>
    <div class="order-page">
      <order-header :title="title">
        <template v-slot:tip>
          <p>{{note}}</p>
        </template>
      </order-header>
      <router-view></router-view>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue';
import NavFooter from '../components/NavFooter.vue';

export default {
  name: 'order',
  data() {
    return {
      title: '',
      note: '',
    };
  },
  components: {
    NavFooter,
    OrderHeader,
  },
  mounted() {
    this.orderHeader();
  },
  methods: {
    orderHeader() {
      const { path } = this.$route;
      if (path === '/order/confirm') {
        this.title = '确认订单';
        this.note = '请仔细确认订单';
      } else if (path === '/order/list') {
        this.title = '订单列表';
        this.note = '请谨防钓鱼链接或诈骗电话，了解更多>';
      } else if (path === '/order/pay') {
        this.title = '支付订单';
        this.note = '请谨防钓鱼链接或诈骗电话，了解更多>';
      }
    },
  },
};
</script>

<style scoped>

</style>

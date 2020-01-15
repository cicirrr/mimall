<template>
    <div class="ali-pay">
      <div class="container">
        <loading v-if="showLoading"></loading>
        <div class="form" v-html="content"></div>
      </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue';

export default {
  name: 'alipay',
  data() {
    return {
      showLoading: true,
      orderId: this.$route.query.orderId,
      content: '',
    };
  },
  components: {
    Loading,
  },
  mounted() {
    this.paySubmit();
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue全家桶mimao',
        amount: 0.01,
        payType: 1,
      }).then((res) => {
        this.content = res.content;
        setTimeout(() => {
          document.forms[0].submit();
        }, 800);
      });
    },
  },
};
</script>

<style lang="scss">

</style>

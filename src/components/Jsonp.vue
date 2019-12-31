<template>
    <div>
      JSONP
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import jsonp from 'jsonp';

export default {
  name: 'Jsonp',
  data() {
    return {
      obj: {},
    };
  },
  mounted() {
    const url = 'https://order.imooc.com/pay/cart?jsonpcallback=jQuery19106595521890337777_1577789592700&jsonp=true&_=1577789592702';
    jsonp(url, (err, result) => {
      this.obj = result;
    });
  },
};
</script>

<style scoped>

</style>

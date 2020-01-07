<template>
    <div clss="order-header">
      <div class="container">
        <a href="/#/index"><img src="/imgs/login-logo.png" alt="" class="header-logo"></a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'OrderHeader',
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/base';
  .order-header{
    height: 113px;
    line-height: 113px;
    .header-logo{
      height: 100%;
      width: auto;
    }
  }
</style>

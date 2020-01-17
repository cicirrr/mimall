<template>
    <div class="no-data">
      <img src="/imgs/icon-no-data.png" alt="">
      <p>当前无订单</p>
    </div>
</template>

<script>
export default {
  name: 'NoData',
};
</script>

<style lang="scss">
  .no-data{
    text-align: center;
    img{
      width: 260px;
      margin-bottom: 20px;
    }
  }
</style>

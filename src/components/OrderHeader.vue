<template>
    <div class="order-header">
      <div class="container">
        <div class="header-left">
          <div class="header-logo">
            <a href="/#/index" class="logo"></a>
          </div>
          <div class="order-title">{{title}}</div>
          <slot name="tip"></slot>
        </div>
        <div class="header-right">
          <span class="user">{{username}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrderHeader',
  props: {
    title: String,
    note: String,
  },
  computed: {
    // username() {
    //   return this.$store.state.username;
    // },
    // 使用ES6解构语法
    ...mapState(['username']),
  },
};
</script>

<style lang="scss">
  @import '../assets/scss/config';
  @import '../assets/scss/mixin';
  .order-header{
    height: 112px;
    line-height: 112px;
    border-bottom: 2px solid $colorA;
    .container{
      display: flex;
      justify-content: space-between;
      .header-left{
        display: flex;
        align-items: center;
        .order-title{
          font-size: $fontC;
          color: $colorB;
          margin: 0 17px 0 54px;
        }
        p{
          color: $colorD;
          font-size: $fontJ;
          margin-bottom: -7px;
        }
      }
      .header-right{
        .user{
          font-size: $fontI;
          color: $colorC;
          cursor: pointer;
        }
      }
    }
  }
</style>

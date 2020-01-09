<template>
  <div class="nav-bar" :class="{fixed: isFixed}">
    <div class="container">
      <div class="nav-left">
        <h3>{{title}}</h3>
        <a href="#">小米8</a>
        <a href="#">小米8 SE</a>
      </div>
      <div class="nav-right">
        <a href="#">概述</a>
        <a href="#">参数</a>
        <a href="#">用户评价</a>
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductParam',
  props: {
    title: String,
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    // 添加事件监听，监听函数抽取成方法，方便在组件销毁时，同时取消监听
    window.addEventListener('scroll', this.initHeight);
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false);
  },
  methods: {
    initHeight() {
      // 获取滚动距离处理兼容问题
      // eslint-disable-next-line max-len
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
      this.isFixed = scrollTop > 152;
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/config';
  @import '../assets/scss/mixin';
  @import '../assets/scss/base';
  .nav-bar{
    height: 68px;
    line-height: 68px;
    border-top: 1px solid rgba(229,229,229,1);
    background-color: #fff;
    z-index: 10;
    &.fixed{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: 0 3px 5px rgba(0,0,0,.3);
    }
    .container{
      display: flex;
      justify-content: space-between;
      .nav-left{
        h3{
          display: inline-block;
          color: $colorB;
          margin-right: 8px;
        }
        a{
          color: $colorC;
          padding: 0 10px;
          border-left: 1px solid rgba(153,153,153,1);
          &:hover{
            color: $colorA;
          }
        }
      }
      .nav-right{
        font-size: $fontJ;
        font-weight: bold;
        color: $colorB;
        a{
          padding: 0 10px;
          &:nth-child(2){
            border-left: 1px solid $colorD;
            border-right: 1px solid $colorD;
          }
          &:hover{
            color: $colorA;
          }
        }
      }
    }
  }
</style>

<template>
    <transition name="slide">
      <div class="modal" v-show="showModal">
        <div class="mask"></div>
        <div class="modal-dialog">
          <div class="modal-header">
            <span>{{title}}</span>
            <a href="javascript:;" class="modal-close" @click="$emit('cancel')"></a>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <a href="javascript:;" class="btn btn-xs"
               v-if="btnType == 1"
               @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;"
               class="btn btn-xs btn-rest"
               v-if="btnType == 2">{{cancelText}}</a>
            <div class="btn-group" v-if="btnType == 3">
              <a href="javascript:;" class="btn btn-xs" @click="$emit('submit')">{{sureText}}</a>
              <a href="javascript:;"
                 class="btn btn-xs btn-rest" @click="$emit('cancel')">{{cancelText}}</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // 弹框类型
    modalType: {
      type: String,
      default: 'form', // 大 large 中 middle 小 small 表单 form
    },
    title: String,
    // 按钮数量
    btnType: String, // 1-确定 2-取消 3-确定和取消
    sureText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showModal: Boolean, // 把是否显示放到组件里，配合动画实现流畅效果
  },
};
</script>

<style lang="scss">
  @import '../assets/scss/config';
  @import "../assets/scss/mixin";
  @import "../assets/scss/modal";
  @import "../assets/scss/button";
</style>

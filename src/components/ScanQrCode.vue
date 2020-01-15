<template>
    <div class="qr-code">
      <div class="mask"></div>
      <div class="qr-box">
        <img v-lazy="'/imgs/pay/icon-scan.png'" alt="">
        <div class="box">
          <h3>微信支付<span class="icon-close" @click="$emit('close')"></span></h3>
          <img v-lazy="img" alt="">
          <p>请使用<span class="theme-color">微信</span>扫一扫</p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ScanQrCode',
  props: ['img'],
};
</script>

<style lang="scss">
  @import '../assets/scss/config';
  @import "../assets/scss/mixin";
.qr-code{
  @include position(fixed);
  z-index: 10;
  .mask{
    @include position();
    background-color: $colorI;
    opacity: 0.5;
  }
  .qr-box{
    z-index: 20;
    @include position(absolute,50px,50%,670px,485px);
    transform: translateX(-50%);
    @include flex(center);
    &>img{
      height: 400px;
      display: block;
    }
    .box{
      width: 345px;
      height: 349px;
      background-color: $colorG;
      text-align: center;
      h3{
        font-size: $fontG;
        color: $colorB;
        line-height: 60px;
        font-weight: normal;
        background-color: $colorJ;
        padding-left: 16px;
        text-align: left;
        position: relative;
        .icon-close{
          @include positionBgImg(23px,23px,13px,13px,'/imgs/icon-close.png',contain);
        }
      ;
      }
      img{
        width: 180px;
        height: 180px;
        margin: 25px 0;
      }
      p{
        font-size: $fontJ;
        color: $colorB;
      }
    }
  }
}
</style>

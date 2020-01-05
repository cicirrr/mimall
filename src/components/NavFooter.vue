<template>
    <div class="footer">
        <div class="footer-logo">
          <img src="/imgs/logo-footer.png" alt="logo">
          <p>小米商城</p>
        </div>
        <div class="footer-link">
          <a href="#">我的主页</a>  |
          <a href="#">大前端课程</a>  |
          <a href="#">全家桶</a>  |
          <a href="#">API</a>
        </div>
        <div class="copyright">
          Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
        </div>
    </div>
</template>

<script>

export default {
  name: 'NavFooter',
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/config';
  .footer{
    height: 234px;
    border-top: 4px solid $colorA;
    background-color: $colorB;
    text-align: center;
    color: $colorD;
    font-size: $fontI;
    .footer-logo{
      margin-top: 46px;
      text-align: center;
      img{
        width: 53px;
      }
      p{
        margin-top: 13px;
      }
    }
    .footer-link{
      margin-top: 30px;
      a{
        color: $colorD;
      }
    }
    .copyright{
      margin-top: 10px;
      line-height: 30px;
      .domain{
        color: $colorA;
      }
    }
  }
</style>

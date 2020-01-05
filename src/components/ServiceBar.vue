<template>
    <div class="service">
      <div class="container">
        <ul>
          <li>
            <span class="icon-setting"></span>
            预约维修服务
          </li>
          <li>
            <span class="icon-7day"></span>
            7天无理由退货
          </li>
          <li>
            <span class="icon-15day"></span>
            15天免费换货
          </li>
          <li>
            <span class="icon-post"></span>
            满150元包邮
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ServiceBar',
};
</script>

<style scoped lang="scss">
  @import "../assets/scss/config";
  @import "../assets/scss/base";
  @import "../assets/scss/mixin";
  .service{
    padding: 30px 0;
    font-size: $fontI;
    text-align: center;
    color: $colorC;
    ul{
      display: flex;
      li{
        line-height: 1em;
        flex: 1;
        border-right: 1px solid #cccccc;
        span{
          vertical-align: middle;
          margin-right: 4px;
        }
        .icon-setting{
          @include bgImg(20px,20px,'/imgs/icon-setting.png')
        }
        .icon-7day{
          @include bgImg(20px,20px,'/imgs/icon-7day.png')
        }
        .icon-15day{
          @include bgImg(20px,20px,'/imgs/icon-15day.png')
        }
        .icon-post{
          @include bgImg(20px,20px,'/imgs/icon-post.png')
        }
        &:last-child{
          border-right: none;
        }
      }
    }
  }
</style>

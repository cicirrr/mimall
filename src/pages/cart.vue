<template>
    <div class="cart-page">
      <order-header :title="'我的购物车'">
        <template v-slot:tip>
          <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
        </template>
      </order-header>
      <div class="cart-content">
        <div class="container">
          <div class="cart-box">
            <ul class="cart-head">
              <li class="col-1"><span class="checkbox"></span>全选</li>
              <li class="col-2">商品名称</li>
              <li class="col-1">单价</li>
              <li class="col-1">数量</li>
              <li class="col-1">小计</li>
              <li class="col-1">操作</li>
            </ul>
            <ul class="cart-item-list">
              <li class="cart-item">
                <div class="item-check">
                  <span class="checkbox"></span>
                </div>
                <div class="item-name">
                  <img src="/imgs/item-box-1.png" alt="">
                  <span>小米8 6GB 全息幻彩紫 64GB</span>
                </div>
                <div class="item-price">1999元</div>
                <div class="item-qty">
                  <div class="num-box">
                    <span class="sub">-</span>
                    <span class="text">9</span>
                    <span class="add">+</span>
                  </div>
                </div>
                <div class="item-sum">1999</div>
                <div class="item-del"></div>
              </li>
            </ul>
          </div>
          <div class="cart-wrap">
            <div class="wrap-left">
              <span class="shopping">继续购物</span>
              <span>件商品，已选择</span>
            </div>
            <div class="wrap-right">
              <span class="amount">合计 2000</span>
              <span class="btn">去结算</span>
            </div>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue';
import NavFooter from '../components/NavFooter.vue';
import ServiceBar from '../components/ServiceBar.vue';

export default {
  name: 'cart',
  components: {
    ServiceBar,
    OrderHeader,
    NavFooter,
  },
};
</script>

<style lang="scss">
  @import "../assets/scss/config";
  @import "../assets/scss/mixin";

  .cart-page{
    .cart-content{
      background-color: $colorJ;
      .container{
        padding-top: 30px;
        .cart-box{
          padding: 0 43px;
          background-color: $colorG;
          .cart-head{
            display: flex;
            height: 79px;
            line-height: 79px;
            font-size: $fontJ;
            color: $colorC;
            li{
              text-align: center;
              &.col-1{
                flex: 1;
              }
              &.col-2{
                flex: 3;
              }
            }
          }
          .cart-item-list{
            .cart-item{
              display: flex;
              align-items: center;
              /*line-height: 125px;*/
              height: 125px;
              font-size: $fontH;
              color: $colorB;
              border-top: 1px solid $colorH;
              .item-check,.item-price, .item-qty, .item-sum, .item-del{
                flex: 1;
                text-align: center;
              }
              .item-check{
                margin-left: -10px;
              }
              .item-qty{
                /*display: flex;*/
                height: 38px;
                line-height: 38px;
                border: 1px solid $colorH;
                .num-box{
                  span{
                    display: inline-block;
                    &.text{
                      width: 60%;
                    }
                    &.add,&.sub{
                      width: 20%;
                      cursor: pointer;
                    }
                  }
                }
              }
              .item-sum{
                color: $colorA;
              }
              .item-name{
                flex: 3;
                text-align: center;
                display: flex;
                align-items: center;
                span{
                  margin-left: 30px;
                }
              }
              .item-del{
                width: 14px;
                height: 12px;
                background: url("/imgs/icon-close.png") no-repeat center;
                background-size: contain;
                transition: all 0.6s;
                &:hover{
                  transform: scale(1.3);
                }
              }
            }
          }
        }
      }
    }
  }
</style>

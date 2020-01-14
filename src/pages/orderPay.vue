<template>
    <div class="pay-page order-bg">
      <div class="container">
        <div class="order-detail">
          <div class="box">
            <div class="show-box">
              <div class="icon"></div>
              <div class="detail-info">
                <h2>订单提交成功！去付款咯～</h2>
                <p>请在 <span class="count-down">0时30分</span>内完成支付, 超时后将取消订单</p>
                <p>收货信息
                  {{addressInfo}}
                </p>
              </div>
              <div class="detail-pull">
                <div class="total">应付总额： <b class="theme-color">{{payment}}元</b></div>
                <div class="pull-down">订单详情
                  <span
                    class="icon-arrow"
                    :class="{'arrow-up': pullDown}"
                    @click="pullDown=!pullDown"
                  ></span>
                </div>
              </div>
            </div>
            <div class="pull-page" v-show="pullDown">
              <div class="row">
                <span>订单号：</span>
                <span class="theme-color">{{orderNo}}</span>
              </div>
              <div class="row">
                <span>收货信息：</span>
                <span>{{addressInfo}}</span>
              </div>
              <div class="row">
                <span>商品名称：</span>
                <div class="list">
                  <div v-for="(item,index) in order" :key="index">
                    <img :src="item.productImage" alt="">{{item.productName}}
                  </div>
                </div>
              </div>
              <div class="row">
                <span>发票信息：</span>
                <span>电子发票 个人</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pay-path">
          <div class="path-box">
            <h2 class="common-bottom">选择以下支付方式付款</h2>
            <h3>支付平台</h3>
            <a class="pay-btn ali checked"></a>
            <a class="pay-btn wechat"></a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'orderPay',
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      order: [],
      addressInfo: '',
      payment: 0,
      pullDown: false,
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        this.order = res.orderItemVoList;
        const address = res.shippingVo;
        this.addressInfo = `${address.receiverName}
                  ${address.receiverMobile}
                  ${address.receiverProvince}
                  ${address.receiverCity}
                  ${address.receiverDistrict}
                  ${address.receiverAddress}`;
        this.payment = res.payment;
      });
    },
  },
};
</script>

<style lang="scss">
  @import "../assets/scss/config";
  .pay-page{
    .container{
      .order-detail{
        background-color: $colorG;
        margin-bottom: 30px;
        .box{
          padding: 52px;
          .show-box{
            display: flex;
            .icon{
              width: 90px;
              height: 90px;
              border-radius: 50%;
              background: #7FC789 url("/imgs/icon-gou.png") no-repeat center;
              background-size: 60px;
              margin-right: 40px;
            }
            .detail-info{
              h2{
                font-size: $fontE;
                color: $colorB;
                margin-bottom: 20px;
              }
              p{
                font-size: $fontJ;
                color: $colorC;
                line-height: 1.6em;
                .count-down{
                  color: $colorA;
                }
              }
            }
            .detail-pull{
              font-size: $fontJ;
              color: $colorC;
              text-align: right;
              flex: 1;
              .total{
                margin-bottom: 30px;
                b{
                  font-size: $fontG;
                  font-weight: normal;
                }
              }
              .pull-down{
                .icon-arrow{
                  display: inline-block;
                  width: 14px;
                  height: 10px;
                  background: url("/imgs/icon-down.png") no-repeat center;
                  background-size: cover;
                  transition: all .3s;
                  cursor: pointer;
                  &.arrow-up{
                    transform: rotate(180deg);
                  }
                }
              }
            }
          }
          .pull-page{
            border-top: 1px solid $colorF;
            /*display: none;*/
            margin-top: 54px;
            .row{
              font-size: $fontJ;
              color: $colorB;
              padding-left: 135px;
              display: flex;
              &:first-child{
                margin-top: 47px;
              }
              .list{
                img{
                  width: 24px;
                  vertical-align: middle;
                }
              }
              span{
                &:first-child{
                  width: 96px;
                }
              }
            }
          }
        }
      }
      .pay-path{
        background-color: $colorG;
        .path-box{
          padding: 26px 53px;
          color: $colorB;
          h2{
            font-size: $fontG;
            padding-bottom: 24px;
          }
          h3{
            font-size: $fontH;

            padding: 26px 0 19px;
          }
          .pay-btn{
            display: inline-block;
            width: 188px;
            height: 64px;
            border: 1px solid $colorF;
            background: url("/imgs/pay/icon-ali.png") no-repeat center;
            background-size: 103px 38px;
            &.checked{
              border-color: $colorA;
            }
            &.ali{
              margin-right: 20px;
            }
            &.wechat{
              background-image: url('/imgs/pay/icon-wechat.png');
              background-size: 111px 33px;
            }
          }
        }
      }
    }
  }
</style>

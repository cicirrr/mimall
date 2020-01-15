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
            <a class="pay-btn ali" :class="{'checked':payType ===1}" @click="paySubmit(1)"></a>
            <a class="pay-btn wechat" :class="{'checked':payType ===2}" @click="paySubmit(2)"></a>
          </div>
        </div>
      </div>
      <scan-qr-code v-if="showQrCode" :img="qrImg" @close="closeQr"></scan-qr-code>
      <modal
        :show-modal="showModal"
        title="支付确认"
        btn-type="3"
        sure-text="查看订单列表"
        cancel-text="未支付"
        @submit="gotoOrderList"
        @cancel="showModal = false"
      >
        <template v-slot:body>
          <p>请确认是否完成支付</p>
        </template>
      </modal>
    </div>
</template>

<script>
import QRCode from 'qrcode';
import ScanQrCode from '../components/ScanQrCode.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'orderPay',
  data() {
    return {
      orderNo: this.$route.query.orderNo, // 订单号
      order: [], // 订单详情
      addressInfo: '', // 收件人地址信息
      payment: 0, // 订单总额
      pullDown: false, // 是否显示商品详情列表
      payType: '', // 支付宝 1 微信 2
      showQrCode: false, // 微信扫码弹框
      qrImg: '', // 微信二维码地址
      T: '', // 定时器Id
      showModal: false, // 支付完成确认框
    };
  },
  components: {
    ScanQrCode,
    Modal,
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    // 拉取订单信息
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
    // 提交支付方式
    paySubmit(payType) {
      this.payType = payType;
      if (payType === 1) {
        // 支付宝支付时跳转到新页面
        window.open(`/#/order/alipay?orderId=${this.orderNo}`, '_blank');
      } else {
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: 'Vue全家桶商城',
          amount: 0.01,
          payType: 2,
        }).then((res) => {
          QRCode.toDataURL(res.content)
            .then((url) => {
              this.qrImg = url;
              this.showQrCode = true;
              this.loop();
            })
            .catch(() => {
              this.$message.error('未能获取微信支付码，请稍后重试');
            });
        });
      }
    },
    // 轮询支付状态
    loop() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if (res.status === 20) {
            // this.T = ''; 清除定时器错误
            clearInterval(this.T);
            this.showQrCode = false;
            this.$router.push('/order/list');
          }
        });
      }, 500);
    },
    // 关闭二维码页面
    closeQr() {
      this.showQrCode = false;
      this.showModal = true;
      clearInterval(this.T); // 关闭二维码页面同时清除定时器
    },
    // 跳转订单详情页面
    gotoOrderList() {
      this.showModal = false;
      this.$router.push('/order/list');
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

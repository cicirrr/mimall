<template>
    <div class="order-list-page order-bg">
      <div class="container">
        <div class="list-box">
          <div class="list-item" v-for="(item,index) in orderList" :key="index">
            <div class="item-title">
              <div class="item-user">
                  <span>{{item.createTime}}</span><em>|</em>
                  <span>{{item.receiverName}}</span><em>|</em>
                  <span>订单号：{{item.orderNo}}</span><em>|</em>
                  <span>{{item.paymentTypeDesc}}</span>
              </div>
              <div class="item-amount">
                应付金额：<b>{{item.payment | point}}</b>元
              </div>
            </div>
            <div class="item-content">
              <div class="order-box">
                <div class="item-info" v-for="(cell,j) in item.orderItemVoList" :key="j">
                  <img :src="cell.productImage" alt="">
                  <div class="desc">
                    <p>{{cell.productName}}</p>
                    <p>{{cell.currentUnitPrice}}元 X {{cell.quantity}}</p>
                  </div>
                </div>
              </div>
              <div class="item-link">
                <a href="javascript:;" class="theme-color">立即付款   ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'orderList',
  data() {
    return {
      orderList: [], // 已提交的订单列表
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios.get('orders').then((res) => {
        this.orderList = res.list;
      });
    },
  },
  filters: {
    point: val => val.toFixed(2),
  },
};
</script>

<style lang="scss">
  @import "../assets/scss/config";
  @import "../assets/scss/mixin";
  .order-list-page{
    padding-bottom: 70px;
    .container{
      .list-box{
        .list-item{
          padding-bottom: 31px;
          .item-title{
            height: 74px;
            line-height: 74px;
            background-color: #FFFAF7;
            padding: 0 44px;
            font-size: $fontI;
            color: $colorC;
            @include flex();
            .item-user{
              em{
                margin: 0 9px;
              }
            }
            .item-amount{
              b{
                font-size: $fontD;
                color: $colorB;
                font-weight: normal;
              }
            }
          }
          .item-content{
            font-size: $fontG;
            color: $colorB;
            background-color: $colorG;
            padding: 24px 42px 32px;
            @include flex();
            .order-box{
              .item-info{
                display: flex;
                align-items: center;
                img{
                  width: 69px;
                  margin-right: 45px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
    <div class="order-list-page order-bg">
      <div class="container">
        <div class="list-box">
          <loading v-if="loading"></loading>
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
                  <img v-lazy="cell.productImage" alt="">
                  <div class="desc">
                    <p>{{cell.productName}}</p>
                    <p>{{cell.currentUnitPrice}}元 X {{cell.quantity}}</p>
                  </div>
                </div>
              </div>
              <div class="item-link">
                <a href="javascript:;"
                   class="theme-color"
                   @click="goPay(item.orderNo)">{{item.statusDesc}}   ></a>
              </div>
            </div>
          </div>
          <no-data v-if="!loading && orderList.length===0"></no-data>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            v-if="!loading"
            :pageSize="pageSize"
            @current-change="handleChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Pagination } from 'element-ui';
import Loading from '../components/Loading.vue';
import NoData from '../components/NoData.vue';

export default {
  name: 'orderList',
  data() {
    return {
      orderList: [], // 已提交的订单列表
      orderNo: '', // 订单号
      loading: true, // 过渡加载
      pageSize: 5, // 每页加载数量
      total: 0, // 总数
      pageNum: 1, // 页码
    };
  },
  components: {
    NoData,
    Loading,
    [Pagination.name]: Pagination,
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios.get('orders', { // 注意get传参方式
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.loading = false;
        this.orderList = res.list;
        this.total = res.total;
      }).catch(() => {
        this.loading = false;
      }); // 防止报错，增加catch
    },
    // 进入支付界面
    goPay(orderNo) {
      // 法一 此处不适用
      // this.$router.push('order/pay');
      //  法二
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo,
        },
      });
      //  法三
      // this.$router.push({
      //   name: 'orderPay',
      //   query: { orderNo },
      // });
    },
    // 分页器处理跳转页面
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
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
        .el-pagination{
          text-align: right;
        }
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

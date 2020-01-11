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
              <li class="col-1">
                <span class="checkbox"
                      :class="{checked: checkedAll}"
                      @click="toggleAll"
                >
                </span>全选
              </li>
              <li class="col-2">商品名称</li>
              <li class="col-1">单价</li>
              <li class="col-1">数量</li>
              <li class="col-1">小计</li>
              <li class="col-1">操作</li>
            </ul>
            <ul class="cart-item-list">
              <li class="cart-item" v-for="(item,index) in list" :key="index">
                <div class="item-check">
                  <span class="checkbox"
                        :class="{checked: item.productSelected}"
                        @click="updateList(item)"
                  ></span>
                </div>
                <div class="item-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName}}</span>
                </div>
                <div class="item-price">{{item.productPrice}}元</div>
                <div class="item-qty">
                  <div class="num-box">
                    <span class="sub" @click="updateList(item, '-')">-</span>
                    <span class="text">{{item.quantity}}</span>
                    <span class="add" @click="updateList(item, '+')">+</span>
                  </div>
                </div>
                <div class="item-sum">{{item.productTotalPrice}}</div>
                <div class="item-del" @click="delModal(item.productId)"></div>
              </li>
            </ul>
          </div>
          <div class="cart-wrap clearfix">
            <div class="wrap-left fl">
              <span class="shopping">继续购物</span><span class="separator">|</span>
              <span>共<b>{{totalQty}}</b>件商品，已选择<b>{{selectedNum}}</b>件</span>
            </div>
            <div class="wrap-right fr">
              <span class="amount">合计: <b>{{totalPrice}}元</b></span>
              <a class="btn" @click="order">去结算</a>
            </div>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
      <modal
        :title="'确认'"
        :btn-type="'3'"
        :show-modal="showModal"
        @submit="deleteItem"
        @cancel="showModal = false"
      >
        <template v-slot:body>是否确认删除？</template>
      </modal>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Message } from 'element-ui';
import OrderHeader from '../components/OrderHeader.vue';
import NavFooter from '../components/NavFooter.vue';
import ServiceBar from '../components/ServiceBar.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'cart',
  data() {
    return {
      list: [],
      totalPrice: 0,
      totalQty: 0,
      checkedAll: false,
      selectedNum: 0,
      showModal: false,
      id: '',
    };
  },
  computed: {
    // selectedNum() {
    //   return this.list.filter(key => key.productSelected).length;
    // },
    // checkedAll: {
    //   get() {
    //     return this.list.filter(key => key.productSelected).length === this.list.length;
    //   },
    //   set(val) {
    //     // eslint-disable-next-line no-return-assign,no-param-reassign
    //     this.list.forEach(key => key.productSelected = val);
    //   },
    // },
  },
  components: {
    ServiceBar,
    OrderHeader,
    NavFooter,
    Modal,
  },
  mounted() {
    this.getCartData();
  },
  methods: {
    getCartData() {
      this.axios.get('/carts').then((res) => {
        this.renderData(res);
      });
    },
    // 单选按钮状态切换
    // selectItem(item) {
    //   const val = !item.productSelected;
    //   this.axios.put(`carts/${item.productId}`, {
    //     selected: val,
    //   }).then((res) => {
    //     this.renderData(res);
    //   });
    // },
    // 将加减和单选切换集中一个方法中
    updateList(item, type) {
      let { quantity } = item;
      let selected = item.productSelected;
      if (type === '-') {
        if (quantity === 1) {
          // Message.warning('商品不能再减少咯');
          this.$message.warning('商品不能再减少咯');
          return;
        }
        // eslint-disable-next-line no-plusplus
        --quantity;
      } else if (type === '+') {
        if (item.productStock > 1) {
          // eslint-disable-next-line no-plusplus
          ++quantity;
        } else {
          this.$message.warning('没库存啦');
          return;
        }
      } else {
        selected = !selected;
      }
      this.axios.put(`carts/${item.productId}`, {
        selected,
        quantity,
      }).then((res) => {
        this.renderData(res);
      });
    },
    // 全选切换
    toggleAll() {
      const url = this.checkedAll ? '/carts/unSelectAll' : '/carts/selectAll';
      this.axios.put(url).then((res) => {
        this.renderData(res);
      });
    },
    delModal(id) {
      this.showModal = true;
      this.id = id;
    },
    // 删除商品
    deleteItem() {
      const { id } = this;
      this.axios.delete(`/carts/${id}`).then((res) => {
        this.renderData(res);
      });
      this.id = '';
      this.showModal = false;
      // Message.success('商品删除成功');
      this.$message.success('商品删除成功');
      // 删除弹框确认是否删除
    },
    // 跳转购物车
    order() {
      // every函数遍历，返回boolean
      const isChecked = this.list.every(item => !item.productSelected);
      if (isChecked) {
        this.$message.warning('购物车是空的哦~');
        return;
      }
      this.$router.push('/order/confirm');
    },

    // 减一
    // sub(item) {
    //   // eslint-disable-next-line no-param-reassign,no-cond-assign
    //   const quantity = (item.quality = 1) ? 1 : item.quality - 1;
    //   this.axios.put(`/carts/${item.productId}`, {
    //     quantity,
    //   }).then((res) => {
    //     this.renderData(res);
    //   });
    // },
    // add(item) {
    //   const qty = item.quality + 1;
    //   this.axios.put(`/carts/${item.productId}`, { quantity: qty }).then((res) => {
    //     this.renderData(res);
    //   });
    // },
    // 公共方法
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.totalPrice = res.cartTotalPrice;
      this.totalQty = res.cartTotalQuantity;
      this.checkedAll = res.selectedAll;
      this.selectedNum = this.list.filter(key => key.productSelected).length;
    },
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
              .item-name{
                img{
                  width: 80px;
                  height: 80px;
                }
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
        .cart-wrap{
          height: 86px;
          line-height: 86px;
          font-size: $fontJ;
          .wrap-left{
            color: $colorC;
            span{
              &.separator{
                margin: 0 18px;
              }
              b{
                color: $colorA;
                padding: 0 3px;
              }
            }
          }
          .wrap-right{
            .amount{
              color: $colorA;
              margin-right: 26px;
              b{
                font-size: $fontG;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }
  }
</style>

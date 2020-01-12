<template>
    <div class="confirm-page order-bg">
      <div class="container">
        <div class="confirm-box">
          <div class="address common-bottom">
            <h3 class="title">收货地址</h3>
            <div class="add-list">
              <div class="add-add" @click="showModal = true">
                <span class="icon"></span>
                <span>添加新地址</span>
              </div>
            </div>
            <div class="confirm-list">
              <h3>商品</h3>
              <ul class="lists">
                <li class="list-item" v-for="(item,index) in productList" :key="index">
                  <div class="item-name col-8">
                    <img :src="item.productMainImage" alt="">
                    <span>{{item.productName}}</span>
                    <span>{{item.productSubtitle}}</span>
                  </div>
                  <div class="item-qty col-2">
                    <span>{{item.productPrice}}元</span>X <span>{{item.quantity}}</span>
                  </div>
                  <div class="amount col-2 theme-color">{{item.productTotalPrice}}元</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="service delivery">
            <h3>配送方式</h3>
            <span>包邮</span>
          </div>
          <div class="service inv">
            <h3>发票</h3>
            <span>电子发票</span>
            <span>个人</span>
            <span>商品明细</span>
          </div>
          <div class="detail common-bottom">
            <div class="item">
              <span class="item-t">商品件数：</span>
              <span class="theme-color">7件</span>
            </div>
            <div class="item">
              <span class="item-t">商品总价：</span>
              <span class="theme-color">999元</span>
            </div>
            <div class="item">
              <span class="item-t">优惠活动：</span>
              <span class="theme-color">0元</span>
            </div>
            <div class="item">
              <span class="item-t">运费：</span>
              <span class="theme-color">0元</span>
            </div>
            <div class="item">
              <span class="item-t">应付总额：</span>
              <span class="theme-color total">999元</span>
            </div>
          </div>
          <div class="confirm-btn">
            <a class="btn back" @click="back">返回购物车</a>
            <a class="btn">去结算</a>
          </div>
        </div>
      </div>
      <modal
        :title="'新增地址'"
        :show-modal="showModal"
        :btnType="'1'"
        @cancel="showModal = false"
        @submit="addAddress"
      >
        <template v-slot:body>
          <div class="row">
            <input type="text" placeholder="姓名" v-model="receiverName">
            <input type="phone" placeholder="手机号" v-model="receiverMobile">
          </div>
          <div class="row">
            <select name="" v-model="receiverProvince">
            <option value=""></option>
          </select>
            <select name="" v-model="receiverCity">
              <option value=""></option>
            </select>
            <select name="" v-model="receiverDistrict">
              <option value=""></option>
            </select>
          </div>
          <div class="row">
            <textarea name="" cols="30" rows="8" v-model="receiverAddress"></textarea>
          </div>
          <div class="row">
            <input type="text" placeholder="邮编" v-model="receiverZip">
          </div>
        </template>
      </modal>
    </div>
</template>

<script>
import Modal from '../components/Modal.vue';

export default {
  name: 'orderConfirm',
  components: {
    Modal,
  },
  data() {
    return {
      productList: [],
      totalPrice: 0,
      qty: 0,
      showModal: false,
      receiverName: '',
      receiverMobile: 0,
      receiverProvince: '',
      receiverCity: '',
      receiverDistrict: '',
      receiverAddress: '',
      receiverZip: '',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取购物车数据渲染列表
    getList() {
      this.axios.get('carts').then((res) => {
        this.productList = res.cartProductVoList.filter(key => key.productSelected);
        this.totalPrice = res.cartTotalPrice;
        this.qty = this.productList.length;
      });
    },
    back() {
      this.$router.push('/cart');
    },
    addAddress() {
      const {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip,
      } = this;
      this.axios.post('shippings', {
        receiverName,
        receiverMobile,
        receiverProvince,
        receiverCity,
        receiverDistrict,
        receiverAddress,
        receiverZip,
      }).then();
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss">
  @import "../assets/scss/config";
 .confirm-page{
   padding-bottom: 204px;
   .container{
     .confirm-box{
       padding: 38px 67px 53px 63px;
       background-color: #fff;
       font-size: $fontI;
       h3{
         font-size: $fontG;
         color: $colorB;
         font-weight: 500;
         padding-top: 31px;
       }
       .address{
         .title{
           color: $colorB;
           font-weight: normal;
           margin-bottom: 21px;
           line-height: 1em;
         }
         .add-add{
           width: 270px;
           height: 180px;
           border: 1px solid $colorH;
           color: $colorH;
           text-align: center;
           line-height: 180px;
           position: relative;
           cursor: pointer;
           .icon{
             position: absolute;
             display: inline-block;
             color: #fff;
             width: 30px;
             height: 30px;
             background: $colorH url("/imgs/icon-add.png") no-repeat center;
             background-size: 80%;
             border-radius: 50%;
             top: 48px;
             left: 50%;
             transform: translateX(-50%);
           }
         }
         .confirm-list{
           h3{
             border-bottom: 1px solid $colorH;
             padding-bottom: 6px;
           }
           .lists{
             line-height: 48px;
             .list-item{
               display: flex;
               line-height: 60px;
               .item-name{
                 img{
                   width: 40px;
                   vertical-align: middle;
                 }
                 span{
                   margin-right: 3px;
                 }
               }
               .amount{
                 text-align: right;
               }
             }
           }
         }
       }
       .service{
         h3{
           display: inline-block;
           width: 150px;
         }
         span{
           color: $colorA;
           margin-right: 24px;
           cursor: pointer;
         }
       }
       .detail{
         text-align: right;
         padding-bottom: 33px;
         .item{
           line-height: 1.6em;
           display: flex;
           &:last-child{
             padding-top: 6px;
           };
           span{
             display: inline-block;
             &:last-child{
               flex: 1;
             }
             &.total{
               font-size: $fontE;
             }
           }
           .item-t{
             width: 90%;
           }
         }
       }
       .confirm-btn{
         padding-top: 37px;
         text-align: right;
         .btn{
           vertical-align: middle;
         }
         .back{
           color: $colorD;
           background-color: $colorG;
           border: 1px solid $colorF;
           margin-right: 24px;
         }
       }
     }
   }
 }
  .row{
    margin-bottom: 15px;
    input{
      line-height: 40px;
      height: 40px;
      border: 1px solid #eee;
      text-indent: 16px;
      width: 45%;
      margin-right: 14px;
    }
    textarea{
      width: 100%;
      border: 1px solid #eee;
    }
  }
</style>

<template>
    <div class="confirm-page order-bg">
      <div class="container">
        <div class="confirm-box">
          <div class="address common-bottom">
            <h3 class="title">收货地址</h3>
            <div class="add-list clearfix">
              <div class="addr-info"
                   v-for="(item,index) in list"
                   :key="index"
                   :class="{'checked' : checked === index}"
              @click="checked = index">
                <div class="info-box">
                  <div class="name">{{item.receiverName}}</div>
                  <div class="phone">{{item.receiverMobile}}</div>
                  <div class="street">
                    {{item.receiverProvince+ ' '+item.receiverCity+' '+item.receiverDistrict}}
                  </div>
                  <div class="action clearfix">
                    <a href="javascript:;" class="fl" @click="delAddress(item)">删除</a>
                    <a href="javascript:;" class="fr" @click="editAddress(item)">编辑</a>
                  </div>
                </div>
              </div>
              <div class="add-add" @click="addAddress">
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
              <span class="theme-color">{{qty}}件</span>
            </div>
            <div class="item">
              <span class="item-t">商品总价：</span>
              <span class="theme-color">{{totalPrice}}元</span>
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
              <span class="theme-color total">{{totalPrice}}元</span>
            </div>
          </div>
          <div class="confirm-btn">
            <a href="/#/cart" class="btn back">返回购物车</a>
            <a href="javascript:;" class="btn" @click="submitOrder">去结算</a>
          </div>
        </div>
      </div>
      <modal
        :title="'新增地址'"
        :show-modal="showEditModal"
        :btnType="'1'"
        @cancel="showEditModal = false"
        @submit="submitAddress"
      >
        <template v-slot:body>
          <div class="row">
            <input type="text" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="phone" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="row">
            <select name="" v-model="checkedItem.receiverProvince">
            <option value="北京">北京</option>
            <option value="江苏">江苏</option>
            <option value="浙江">浙江</option>
          </select>
            <select name="" v-model="checkedItem.receiverCity">
              <option value="昌平">昌平</option>
              <option value="南京">南京</option>
              <option value="杭州">杭州</option>
            </select>
            <select name="" v-model="checkedItem.receiverDistrict">
              <option value="上城区">上城区</option>
              <option value="下城区">下城区</option>
              <option value="西湖区">西湖区</option>
              <option value="富阳区">富阳区</option>
              <option value="余杭区">余杭区</option>
            </select>
          </div>
          <div class="row">
            <textarea name="" cols="30" rows="8" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="row">
            <input type="text" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </template>
      </modal>
      <modal :title="'删除确认'"
             :show-modal="showDelModal"
             :btn-type="'1'"
             @cancel="showDelModal = false"
             @submit="submitAddress"
      >
        <template v-slot:body>
          <p>您确认要删除此地址吗?</p>
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
      list: [], // 地址列表
      productList: [], // 货物列表
      totalPrice: 0, // 总金额
      qty: 0, // 总数量
      showEditModal: false, // 编辑框是否显示
      showDelModal: false, // 删除弹框是否显示
      checkedItem: {}, // 被选中地址
      userAction: '', // 0 新增 1 编辑 2 删除
      checked: '', // 地址框是否被选中
    };
  },
  mounted() {
    this.getCartList();
    this.getList();
  },
  methods: {
    // 获取购物车数据渲染列表
    getCartList() {
      this.axios.get('carts').then((res) => {
        this.productList = res.cartProductVoList.filter(key => key.productSelected);
        this.totalPrice = res.cartTotalPrice;
        let qty = 0;
        // eslint-disable-next-line no-return-assign
        this.productList.map(item => qty += item.quantity);
        this.qty = qty;
      });
    },
    // 获取地址信息
    getList() {
      this.axios.get('/shippings').then((res) => {
        this.list = res.list;
      });
    },
    // 删除地址
    delAddress(item) {
      this.checkedItem = item;
      this.showDelModal = true;
      this.userAction = '2';
    },
    // 新增地址
    addAddress() {
      this.showEditModal = true;
      this.userAction = '0';
    },
    // 编辑地址
    editAddress(item) {
      this.checkedItem = item;
      this.userAction = '1';
      this.showEditModal = true;
    },
    // 综合处理
    submitAddress() {
      const { userAction, checkedItem } = this;
      let method; let url; let params = {};
      if (userAction === '2') {
        method = 'delete';
        url = `/shippings/${checkedItem.id}`;
      } else if (userAction === '0') {
        method = 'post';
        url = '/shippings';
      }
      if (userAction === '0' || userAction === '1') {
        const {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        } = this.checkedItem;
        let errMsg = '';
        if (!receiverName) {
          errMsg = '请输入姓名';
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确的手机号';
        } else if (!receiverProvince || !receiverCity || !receiverDistrict) {
          errMsg = '请输入省市区';
        } else if (!receiverAddress) {
          errMsg = '请输入具体街道地址';
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入邮编';
        }
        if (errMsg) {
          this.$message.warning(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }
      this.axios[method](url, params).then(() => {
        this.getList();
        this.showDelModal = false;
        this.showEditModal = false;
        this.checkedItem = {};
        this.userAction = '';
        this.$message.success('操作成功！');
      });
    },
    // 提交订单结算
    submitOrder() {
      const { checked, list } = this;
      if (!list[checked]) {
        this.$message.warning('请选择收件地址');
        return;
      }
      const shippingId = list[checked].userId;
      this.axios.post('/orders', {
        shippingId,
      }).then((res) => {
        const { orderNo } = res;
        this.$router.push({
          path: '/order/pay',
          query: orderNo,
        });
      });
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
         .addr-info, .add-add{
           margin-bottom: 5px;
         }
         .addr-info{
           float: left;
           width: 270px;
           height: 180px;
           border: 1px solid $colorH;
           margin-right: 10px;
           &.checked{
             border-color: $colorA;
           }
           .info-box{
             padding: 20px;
             font-size: $fontI;
             .name{
               padding-bottom: 16px;
             }
             .phone,.street{
               color: #757575;
             }
           }
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
           float: left;
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
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #eee;
      padding: 20px;
    }
    select{
      line-height: 40px;
      height: 40px;
      border: 1px solid #eee;
      width: 80px;
      margin-right: 10px;
    }
  }
</style>

<template>
  <div class="detail-page">
    <product-param :title="detailData.name"></product-param>
    <div class="content">
      <div class="container">
        <div class="detail-view">
          <div class="box" id="box">
            <swiper :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(item, index) in viewData" :key="index">
                <img :src="item.img" alt="">
              </swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
        <div class="detail-info">
          <div class="product-info">
            <h3>{{detailData.name}}</h3>
            <p class="product-label">
              相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
              外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
            </p>
            <div class="seller">小米自营</div>
            <div class="product-price">
              {{detailData.price}}元 <b class="rawPrice">1699元</b>
            </div>
          </div>
          <div class="location">
            <div class="add">
              北京 北京市 朝阳区 安定门街道 <span>修改</span>
            </div>
            <span>有現貨</span>
          </div>
          <div class="choice">
            <div class="title">选择版本</div>
            <div class="btn-box">
              <span class="btn" :class="{checked: version === 1}" @click="version = 1">
              6GB+64GB 全网通 <b>1099元</b>
            </span>
              <span class="btn" :class="{checked: version === 2}" @click="version = 2">
                4GB+64GB 移动4G <b>1049元</b>
              </span>
            </div>
          </div>
          <div class="choice">
            <div class="title">选择颜色</div>
            <span class="btn">
              <i></i>深空灰
            </span>
          </div>
          <div class="sum-box">
            <p class="sum-detail">
              <span class="sum-info">
                {{detailData.name}} {{version === 1 ? '6GB+64GB' : '4GB+64GB'}} 全网通 深灰色
              </span>
              <span class="price">1099元 <b class="rawPrice">1699元</b></span>
            </p>
            <p class="sum">總計： {{detailData.price}} 元</p>
          </div>
          <div class="submit">
            <span class="btn btn-m" @click="addCart(detailData.id)">加入購物車</span>
            <span class="btn like">喜歡</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <h3>價格説明</h3>
        <img src="/imgs/detail/item-price.jpeg" alt="">
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/dist/css/swiper.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductParam from '../components/ProductParam.vue';
import ServiceBar from '../components/ServiceBar.vue';

export default {
  name: 'detail',
  data() {
    return {
      viewData: [
        { id: 1, img: '/imgs/detail/phone-1.jpg' },
        { id: 2, img: '/imgs/detail/phone-2.jpg' },
        { id: 3, img: '/imgs/detail/phone-3.jpg' },
        { id: 4, img: '/imgs/detail/phone-4.jpg' },
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          // bulletClass: 'my-bullet',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // autoplay: { delay: 2000 },
      },
      detailData: {},
      version: 1, // 选择版本
      err: {},
    };
  },
  components: {
    ServiceBar,
    ProductParam,
    swiper,
    swiperSlide,
  },
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      const { id } = this.$route.params;
      // eslint-disable-next-line no-return-assign
      this.axios.get(`/products/${id}`).then(res => this.detailData = res);
    },
    addCart(id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true,
        // eslint-disable-next-line no-return-assign
      }).then((res = { cartProductVoList: 0 }) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
      });
      this.$router.push('/cart');
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/config';
  @import '../assets/scss/mixin';
  @import '../assets/scss/base';
  @import '../assets/scss/button';
  .detail-page{
    .content{
      border-top: 1px solid #eee;
      .container{
        display: flex;
        justify-content: space-between;
        .detail-view{
          width: 566px;
          .box{
            img{
              width: 100%;
            }
          }
        }
        .detail-info{
          width: 584px;
          padding: 30px 0 50px;
          .product-info{
            padding-bottom: 25px;
            border-bottom: 1px solid $colorH;
            h3{
              font-size: $fontC;
              color: $colorB;
            }
            .product-label{
              color: $colorB;
              font-size: $fontJ;
              line-height: 1.5em;
              margin-top: 15px;
            }
            .seller{
              color: $colorA;
              font-size: $fontI;
              margin: 26px 0 14px;
            }
            .product-price{
              color: $colorA;
              font-size: $fontG;
              .rawPrice{
                color: $colorD;
                font-size: $fontJ;
                text-decoration: line-through;
              }
            }
          }
          .location{
            border: 1px solid $colorH;
            background-color: #FAFAFA;
            margin-top: 25px;
            font-size: $fontJ;
            padding: 30px 0 32px 64px;
            .add{
              margin-bottom: 15px;
              position: relative;
              span{
                margin-left: 5px;
              }
              &:before{
                content: '';
                display: inline-block;
                width: 20px;
                height: 22px;
                position: absolute;
                top: 0;
                left: -25px;
                background: url("/imgs/detail/icon-loc.png") no-repeat center;
                background-size: contain;
              }
            }
            span{
              color: $colorA;
            }
          }
          .choice{
            padding-top: 30px;
            .title{
              color: $colorB;
              font-size: $fontH;
              margin-bottom: 20px;
            }
            .btn-box{
              display: flex;
              justify-content: space-between;
              .btn:last-child{
                color: $colorB;
              }
            }
            .btn{
              width: 286px;
              height: 50px;
              font-size: $fontI;
              color: $colorA;
              font-weight: bold;
              border: 1px solid #ccc;
              background-color: $colorG;
              &.checked{
                border: 1px solid $colorA;
              }
              b{
                color: $colorC;
              }
              i{
                display: inline-block;
                width: 14px;
                height: 16px;
                background-color: $colorB;
                vertical-align: middle;
                margin-right: 9px;
              }
            }
          }
          .sum-box{
            padding: 24px 33px 29px 30px;
            margin-top: 50px;
            background-color: rgba(250,250,250,1);
            .sum-detail{
              display: flex;
              justify-content: space-between;
              .rawPrice{
                text-decoration: underline;
              }
              &+p{
                color: $colorA;
                font-size: $fontE;
                margin-top: 18px;
              }
            }
          }
          .submit{
            margin-top: 30px;
            .like{
              width: 142px;
              height: 54px;
              line-height: 54px;
              color: $colorG;
              background-color: #bbb;
              margin-left: 21px;
            }
          }
        }
      }
    }
    .footer{
      background-color: #F3F3F3;
      height: 340px;
      .container{
        padding: 26px 0 32px;
        h3{
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
<style lang="scss">
  #box .swiper-pagination-bullet{
    width: 50px;
    height: 2px;
  }
</style>

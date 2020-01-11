<template>
<div class="index-page">
  <div class="container">
    <div class="swiper-box">
      <div class="nav-menu">
        <ul class="menu-wrap">
          <li class="menu-item">
            <a href="javascript:;" class="item">手机 电话卡</a>
            <div class="children">
              <div class="children-wrap">
                <ul v-for="(sub, i) in menuList" :key="i">
                  <li v-for="(sub, j) in sub" :key="j">
                    <a :href="sub? '/#/product/' + sub.id : '' " target="_blank">
                      <img v-lazy="sub? sub.img : '/imgs/item-box-1.png'">
                      {{sub? sub.name : '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">电视 盒子</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
          <li class="menu-item">
            <a href="javascript:;" class="item">笔记本 平板</a>
          </li>
        </ul>
      </div>
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in sliderList" :key="index">
          <a :href="'/#/product/' + item.id"><img :src="item.img"></a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="ads-box">
      <a :href="'/#/product/' + ads.id " v-for="(ads, index) in adsList" :key="index">
        <img v-lazy="ads.img">
      </a>
    </div>
    <div class="banner">
      <a href="/#/product/30"><img src="/imgs/banner-1.png" alt=""></a>
    </div>
  </div>
  <div class="product-box">
    <div class="container">
      <div class="product-title">
        <h3>手机</h3>
      </div>
      <div class="product-wrap">
        <div class="product-left">
          <a href="/#/product/30" target="_blank">
            <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
          </a>
        </div>
        <div class="product-right">
          <div class="pro-list" v-for="(pro, i) in productList" :key="i">
            <div class="pro-item" v-for="(item, j) in pro" :key="j">
              <span :class="j % 2 ===0 ? 'pro-new' : 'kill-pro'">新品</span>
              <img v-lazy="item.mainImage" alt="">
              <h3 class="pro-name">{{item.name}}</h3>
              <p class="pro-info">{{item.subtitle}}</p>
              <p class="pro-price" @click="addCart(item.id)">{{item.price}}元</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <service-bar></service-bar>
  <modal :title="'提交'"
         :btn-type="'1'"
         :sure-text="'查看购物车'"
         :show-modal="showModal"
         @cancel="showModal = false"
         @submit="gotoCart"
  >
    <template v-slot:body>
      <p>商品已添加至购物车</p>
    </template>
  </modal>
</div>
</template>

<script>
import ServiceBar from '../components/ServiceBar.vue';
import Modal from '../components/Modal.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/dist/css/swiper.css';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import { Message } from 'element-ui';

export default {
  name: 'index',
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal,
  },
  data() {
    return {
      showModal: false,
      sliderList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg',
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg',
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg',
        },
      ],
      menuList: [
        [{ id: '30', img: '/imgs/item-box-1.png', name: '小米CC9' },
          { id: '31', img: '/imgs/item-box-2.png', name: '小米青春版' },
          { id: '32', img: '/imgs/item-box-3.jpg', name: 'Redmi K20 Pro' },
          { id: '33', img: '/imgs/item-box-4.jpg', name: '移动4G专区' }],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
      ],
      adsList: [
        { id: 33, img: '/imgs/ads/ads-1.png' },
        { id: 33, img: '/imgs/ads/ads-2.jpg' },
        { id: 33, img: '/imgs/ads/ads-3.png' },
        { id: 33, img: '/imgs/ads/ads-4.jpg' },
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        autoplay: {
          delay: 3000,
        },
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      productList: [],
    };
  },
  methods: {
    init() {
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14,
        },
      }).then((res) => {
        // eslint-disable-next-line no-param-reassign
        res.list = res.list.slice(6, 14);
        this.productList = [res.list.slice(0, 4), res.list.slice(4, 8)];
      });
    },
    addCart(id) {
      this.showModal = true;
      this.axios.post('/carts', {
        productId: id,
        selected: true,
      }).then((res = { cartProductVoList: 0 }) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
        Message.success('商品添加成功');
      });
    },
    gotoCart() {
      this.$router.push('/cart');
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
  @import '../assets/scss/base';
  @import '../assets/scss/config';
  @import "../assets/scss/mixin";
  .index-page{
    .swiper-box{
      position: relative;
      .nav-menu{
        width: 264px;
        height: 100%;
        position: absolute;
        z-index: 20;
        background-color: rgba(0,0,0,.3);
        .menu-wrap{
          padding: 26px 0;
          position: relative;
          .menu-item{
            line-height: 50px;
            padding: 0 30px;
            .item{
              font-size: $fontI;
              color: $colorG;
              display: inline-block;
              width: 100%;
              position: relative;
              &:after{
                content: '';
                position: absolute;
                top: 35%;
                right: 0;
                @include bgImg(10px,15px,'/imgs/icon-arrow.png')
              }
            }
            &:hover {
              background-color: $colorA;
              .children{
                display: block;
              }
            }
            .children{
              width: 962px;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 100%;
              background-color: $colorG;
              box-shadow: 2px 3px 3px 4px rgba(0,0,0,.3);
              display: none;
              .children-wrap{
                padding: 14px 0 14px 23px;
                display: flex;
                flex-direction: column;
                ul{
                  margin-bottom: 25px;
                  li{
                    display: inline-block;
                    width: 24.9%;
                    text-align: left;
                    font-weight: bold;
                    a{
                      color: $colorB;
                      font-size: $fontJ;
                      &:hover{
                        color: $colorA;
                      }
                    }
                    img{
                      width: 42px;
                      vertical-align: middle;
                      margin-right: 12px;
                    }
                  }
                  &:last-child{
                    margin-bottom: 0;
                  }
                }
              }
            }
          }
        }
      }
      .swiper-slide{
        img{
          width: 100%;
        }
      }
      .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
        left: 274px;
      }
    }
    .ads-box{
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      margin-bottom: 31px;
      img{
        width: 296px;
        height: 167px;
      }
    }
    .banner{
      margin-bottom: 50px;
      img{
        height: 130px;
        width: 100%;
        display: block;
      }
    }
    .product-box{
      background-color: $colorJ;
      padding-bottom: 50px;
      .container{
        .product-title{
          font-size: $fontF;
          color: $colorB;
          line-height: 70px;
        }
        .product-wrap{
          display: flex;
          .product-left{
            margin-right: 16px;
            img{
              width: 214px;
              height: 619px;
            }
          }
          .product-right{
            height: 619px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .pro-list{
              display: flex;
              justify-content: space-between;
              .pro-item{
                width: 24%;
                display: inline-block;
                text-align: center;
                background-color: #Fff;
                height: 300px;
                transition: all .3s ease-in;
                font-size: $fontJ;
                line-height: 1em;
                span{
                  display: inline-block;
                  width: 67px;
                  height: 24px;
                  color: #fff;
                  line-height: 24px;
                  margin-bottom: 15px;
                  &.pro-new{
                    background-color: #7ECF68;
                  }
                  &.kill-pro{
                    background-color: #E82626;
                  }
                }
                img{
                  width: 80%;
                  height: 162px;
                }
                .pro-name{
                  color: $colorB;
                }
                .pro-info{
                  font-size: $fontK;
                  color: $colorD;
                  margin-top: 8px;
                  margin-bottom: 13px;
                }
                .pro-price{
                  color: #F20A0A;
                  font-weight: bold;
                  &:after{
                    cursor: pointer;
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 5px;
                    @include bgImg(20px, 20px,'/imgs/icon-cart-hover.png')
                  }
                }
                &:hover{
                  margin-top: -3px;
                  box-shadow: 0 15px 30px rgba(0,0,0,.1);
                }
              }
            }
          }
        }
      }
    }
  }
</style>

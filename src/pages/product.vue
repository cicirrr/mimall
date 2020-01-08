<template>
    <div class="product-page">
      <product-param>
        <template v-slot:body>
          <span class="btn btn-xxs">立即购买</span>
        </template>
      </product-param>
      <div class="content">
        <div class="item-bg">
          <h1>小米<b>8</b></h1>
          <h2>8周年旗舰版</h2>
          <p>
            <a href="#">全球首款双频 GP</a>
            <span>|</span>
            <a href="#">骁龙845</a>
            <span>|</span>
            <a href="#">AI 变焦双摄</a>
            <span>|</span>
            <a href="#">红外人脸识别</a>
          </p>
          <div class="price">￥2999<span>￥3100</span></div>
        </div>
        <div class="item-bg1"></div>
        <div class="item-bg2"></div>
        <div class="item-swiper">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item, index) in galleryData" :key="index">
              <img v-lazy="item.img" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <p>小米8 AI变焦双摄拍摄</p>
        </div>
        <div class="item-video">
          <div class="box">
            <h3>60帧超慢动作摄影</h3>
            <h3>慢慢回味每一瞬间的精彩</h3>
            <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br>
            更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
            <div class="video-bg" @click="showVideo = 'sliderDown'"></div>
            <div class="video-box">
<!--              遮罩层-->
              <div class="video-layer" v-if="showVideo === 'showDown'"></div>
              <div class="video" :class="showVideo">
                <span class="icon-close" @click="showVideo = 'sliderUp'"></span>
                <video src="/imgs/product/video.mp4" controls loop></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ProductParam from '../components/ProductParam.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'swiper/dist/css/swiper.css';

export default {
  name: 'product',
  components: {
    swiper,
    swiperSlide,
    ProductParam,
  },
  data() {
    return {
      showVideo: '',
      galleryData: [
        { id: 2, img: '/imgs/product/gallery-2.png' },
        { id: 3, img: '/imgs/product/gallery-3.png' },
        { id: 4, img: '/imgs/product/gallery-4.png' },
        { id: 5, img: '/imgs/product/gallery-5.jpg' },
        { id: 6, img: '/imgs/product/gallery-6.jpg' },
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: true,
        slidesPerView: 3,
        // 注意参数
        spaceBetween: 30,
        freeMode: true,
        // spaceBetween: '20px',
      },
    };
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/config';
  @import '../assets/scss/mixin';
  @import '../assets/scss/base';
  @import '../assets/scss/button';
  .product-page{
    .content{
      .item-bg{
        height: 718px;
        background: url("/imgs/product/product-bg-1.png") no-repeat 50%;
        text-align: center;
        color: $colorB;
        h1{
          padding-top: 55px;
          font-size: $fontA;
          line-height: 1.1em;
          b{
            font-size: 1.3em;
            vertical-align: top;
          }
        }
        h2{
          font-weight: normal;
          letter-spacing: 0.8em;
        }
        p{
          font-size: $fontI;
          margin-bottom: 40px;
          a{
            color: $colorB;
          }
          span{
            margin: 0 15px;
          }
        }
        .price{
          font-size: 38px;
          span{
            font-size: $fontD;
            text-decoration: line-through;
            margin-left: 10px;
          }
        }
      }
      .item-bg1{
        height: 480px;
        background: url("/imgs/product/product-bg-2.png") no-repeat 50%;
        background-size: 1226px 397px;
      }
      .item-bg2{
        height: 638px;
        background: url("/imgs/product/product-bg-3.png") no-repeat 50%;
        background-size: cover;
      }
      .item-swiper{
        margin: 36px auto 52px;
        img{
          width: 100%;
        }
        p{
          text-align: center;
          color: $colorB;
          font-size: $fontH;
        }
      }
      .item-video{
        height: 1044px;
        background: $colorI;
        color: $colorG;
        .box{
          padding: 82px 0 120px;
          text-align: center;
          h3{
            font-size: 60px;
            line-height: 80px;
          }
          p{
            font-size: 24px;
            line-height: 36px;
            margin: 35px auto;
          }
          .video-bg{
            height: 540px;
            background: url("/imgs/product/gallery-1.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
          .video-box{
            .video-layer{
              @include position(fixed);
              background-color: $colorB;
              opacity: 0.5;
              z-index: 15;
            }
            .video{
              width: 1000px;
              height: 536px;
              position: fixed;
              top: -50%;
              left: 50%;
              transform: translate(-50%,-50%);
              z-index: 15;
              opacity: 1;
              transition: all .6s;
              /*&.slider{*/
              /*  top: 50%;*/
              /*  opacity: 1;*/
              /*}*/
              &.silderUp{
                animation: silderUp 1s linear;
              }
              &.sliderDown{
                animation: sliderDown 1s linear;
                top: 50%;
              }
              .icon-close{
                @include bgImg(20px,20px,'/imgs/icon-close.png');
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                z-index: 20;
              }
              video{
                height: 100%;
                width: 100%;
                object-fit: cover;
                outline: none;
              }
            }
          }
        }
      }
    }
  }
  /*定义动画*/
  @keyframes sliderUp {
    from {
      top: 50%;
      opacity: 1;
    }
    to {
      top: -50%;
      opacity: 0;
    }
  }
  @keyframes sliderDown {
    from {
      top: -50%;
      opacity: 0;
    }
    to {
      top: 50%;
      opacity: 1;
    }
  }
</style>

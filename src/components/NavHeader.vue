<template>
    <div class="header">
      <div class="nav-top">
        <div class="container">
          <div class="nav-top-bar">
            <a href="javascript:;">松果出行</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="nav-top-info">
            <a href="javascript:;" class="top-user" @click="login" v-if="!username">登录</a>
            <a href="javascript:;" class="top-user" v-if="username">Hi~{{username}}</a>
            <a href="javascript:;" class="top-cart" @click="gotoCart">
              <span class="icon-cart"></span>购物车({{cartCount}})
            </a>
          </div>
        </div>
      </div>
      <div class="nav-header">
        <div class="container">
          <div class="header-logo">
            <a href="/#/index" class="logo"></a>
          </div>
          <div class="header-menu">
            <div class="item-menu">
              <span>小米手机</span>
              <div class="children">
                <ul class="clearfix">
                  <li v-for="(item, index) in phoneList" :key="index">
                    <a :href="'/#/product' + item.id">
                      <div class="pro-img"><img :src="item.mainImage" :alt="item.subtitle"></div>
                      <div class="title">{{item.name}}</div>
                      <p>{{item.price | currency}}</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>Redmi 红米</span>
            </div>
            <div class="item-menu">
              <span>电视</span>
              <div class="children">
                <ul class="clearfix">
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-1.jpg"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-2.jpg"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-3.png"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-4.jpg"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-5.jpg"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="pro-img"><img src="/imgs/nav-img/nav-3-6.png"></div>
                      <div class="title">Redmi 红米电视 70英寸</div>
                      <p>3599元</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item-menu">
              <span>笔记本</span>
            </div>
          </div>
          <div class="header-search">
            <div class="wrapper">
              <input type="text" class="search-text">
              <a class="search-btn"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavHeader',
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    // username() {
    //   return this.$store.state.username;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // }, 使用解构赋值
    ...mapState(['username', 'cartCount']),
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    getPhoneList() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
        },
      }).then((res) => {
        if (res.list.length > 6) {
          this.phoneList = res.list.slice(0, 6);
          return;
        }
        this.phoneList = res.list;
      });
    },
    gotoCart() {
      this.$router.push('/cart');
    },
  },
  filters: {
    currency: val => `￥${val.toFixed(2)}元`,
    // currency(val) {
    //   return `￥${val.toFixed(2)}元`;
    // },
  },
  mounted() {
    this.getPhoneList();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config";
@import "../assets/scss/mixin";
a{
  color: #b0b0b0;
  line-height: 39px;
}
.header{
  .nav-top{
    height: 39px;
    background-color: $colorB;
    .container{
      @include flex();
      .nav-top-bar{
        a{
          margin-right: 17px;
        }
      }
      .nav-top-info{
        .top-user{
          margin-right: 19px;
        }
        .top-cart{
          display: inline-block;
          text-align: center;
          width: 110px;
          background-color: $colorA;
          color: $colorG;
          .icon-cart{
            @include bgImg(16px,12px,"/imgs/icon-cart-checked.png");
            margin-right: 4px;
          }
        }
      }
    }
  }
  .nav-header{
    height: 112px;
    .container{
      @include flex();
      position: relative;
      .header-menu{
        margin-left: 210px;
        width: 634px;
        .item-menu{
          display: inline-block;
          color: $colorB;
          span{
            line-height: 112px;
            font-size: 16px;
            margin-right: 20px;
            font-weight: 700;
            cursor: pointer;
          }
          &:hover{
            color: $colorA;
            .children{
              height: 220px;
              opacity: 1;
            }
          }
          .children{
            position: absolute;
            height: 0;
            width: 1226px;
            top: 112px;
            left: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow:0 7px 6px 0 rgba(0, 0, 0, 0.11);
            transition: height 0.2s;
            z-index: 30;
            background-color: #fff;
            ul{
            }
            li {
              float: left;
              width: 16.66%;
              text-align: center;
              padding-bottom: 32px;
              position: relative;
              font-size: $fontK;
              &:after{
                position: absolute;
                content: "";
                width: 1px;
                height: 100px;
                border-right: 1px solid $colorF;
                top: 28px;
                right: 0;
              }
              a{
                display: inline-block;
                .pro-img{
                  height: 140px;
                  img{
                    margin-top: 26px;
                    height: 111px;
                    width: auto;
                  }
                }
                .title{
                  margin-top: 18px;
                  margin-bottom: 8px;
                  color: $colorB;
                  font-weight: bold;
                  line-height: 1em;
                }
                p{
                  color: $colorA;
                  line-height: 1em;
                }
              }
              &:last-child:after{
                display: none;
              }
            }
          }
        }
      }
      .header-search{
        width: 320px;
        border: 1px solid #E0E0E0;
        .wrapper{
          display: flex;
          align-items: center;
        }
        .search-text{
          height: 50px;
          width: 264px;
          box-sizing: border-box;
          border: none;
          border-right: 1px solid #E0E0E0;
          text-indent: 20px;
        }
        .search-btn{
          @include bgImg(18px,18px,"/imgs/icon-search.png");
          margin-left: 19px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<template>
    <div class="login">
      <div clss="login-header">
        <div class="container">
          <a href="/#/index"><img src="/imgs/login-logo.png" alt="" class="login-logo"></a>
        </div>
      </div>
      <div class="banner">
        <div class="container">
          <div class="login-form">
            <h3 class="login-tab">
              <span class="account active">账号登录</span>
              <i></i>
              <span class="scan">扫码登录</span>
            </h3>
            <form class="login-input">
              <input placeholder="邮箱/手机号码/小米ID" type="text" class="user" v-model="username">
              <input  placeholder="密码" type="password" v-model="password">
            </form>
            <div class="login-btn">
              <div class="btn btn-xl" @click="login">登录</div>
            </div>
            <div class="tips">
              <div class="sms" @click="register">
                手机短信登录/注册
              </div>
              <div class="res">
                <a href="javascript:;">立即注册</a>
                <span>|</span>
                <a href="javascript:;">忘记密码？</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="link">
          <a href="javascript:;">简体</a>|
          <a href="javascript:;">繁体</a>|
          <a href="javascript:;">English</a>|
          <a href="javascript:;">常见问题</a>|
          <a href="javascript:;">隐私政策</a>
        </div>
        <div class="intro">小米公司版权所有-京ICP备10046444-
          <span class="icon"><img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png" alt=""></span>
          京公网安备11010802020134号-京ICP证110507号</div>
      </div>
    </div>
</template>

<script>
// import { mapActions } from 'vuex';  不要忘记加花括号
// eslint-disable-next-line import/no-extraneous-dependencies
import { Message } from 'element-ui';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      res: {},
    };
  },
  methods: {
    login() {
      const { username, password } = this;
      this.axios.post('/user/login', {
        username,
        password,
        // eslint-disable-next-line no-return-assign
      }).then((res) => {
        this.$cookie.set('userId', res.id, { expires: 'Session' });
        this.$store.dispatch('saveUsername', username);
        // this.saveUsername(username);
        this.$router.push({
          name: 'index',
          params: {
            from: 'login',
          },
        });
      });
    },
    // ...mapActions(['saveUsername']),
    register() {
      const { username, password } = this;
      this.axios.post('user/register', {
        username,
        password,
        email: 'xxx@qq.com',
      }).then();
      Message.success('注册成功');
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/config';
  @import '../assets/scss/mixin';
  @import '../assets/scss/base';
  @import '../assets/scss/button';
  .login-header{
    height: 113px;
    line-height: 113px;
    .login-logo{
      height: 26px;
      width: 105px;
    }
  }
  .banner{
    height: 576px;
    background: url("/imgs/login-bg.jpg") no-repeat 50%;
    .container{
      position: relative;
      .login-form{
        padding-top: 40px;
        text-align: center;
        background-color: $colorG;
        @include positionR(absolute, 10px, 0,410px,510px);
        .login-tab{
          i{
            display: inline-block;
            text-decoration: none;
            width: 2px;
            height: 24px;
            background-color: rgba(215,215,215,1);
            margin: 0 34px;
            vertical-align: middle;
          }
          span{
            font-size: $fontE;
            line-height: 1em;
            vertical-align: middle;
            font-weight: normal;
            /*&.sep{*/
            /*  border-right: 1px solid rgba(215,215,215,1);*/
            /*}*/
            &.active{
              color: $colorA;
            }
          }
        }
        .login-input{
          padding: 49px 30px 30px;
          input{
            display: block;
            width: 348px;
            height: 50px;
            box-sizing: border-box;
            padding-left: 18px;
            font-size: $fontJ;
            color: $colorD;
            border: 1px solid rgba(229,229,229,1);
            &.user{
              margin-bottom: 20px;
            }
          }
        }
        .tips{
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          padding: 0 31px;
          font-size: $fontJ;
          .sms{
            color: $colorA;
            cursor: pointer;
          }
          .res{
            color: $colorD;
            a{
              font-size: $fontJ;
              color: $colorD;
              &:hover{
                color: $colorA;
              }
            }
            span{
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    padding: 251px 0 87px;
    text-align: center;
    font-size: $fontJ;
    color: $colorB;
    .link{
      margin-bottom: 18px;
      a{
        color: $colorB;
        margin: 0 13px;
        &:hover{
          color: #000;
        }
      }
    }
    .intro{
      .icon{
        vertical-align: middle;
      }
    }
  }
</style>

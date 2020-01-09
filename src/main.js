import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueAxios from 'vue-axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueLazyload from 'vue-lazyload';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueCookie from 'vue-cookie';
import App from './App.vue';
import router from './router';
import store from './store';
// import env from '../env';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
import './assets/scss/reset.scss';
// eslint-disable-next-line import/no-extraneous-dependencies

// mock 开关
const mock = false;
if (mock) {
  // eslint-disable-next-line global-require
  require('./mock/api');
}

// 设置 axios基础值。根据前端跨域方式进行调整
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据不同环境变量，取不同的地址
// axios.defaults.baseURL = env.baseURL;
// 设置接口拦截错误
// eslint-disable-next-line consistent-return
axios.interceptors.response.use((response) => {
  const res = response.data;
  // eslint-disable-next-line no-restricted-globals
  const path = location.hash;
  // console.log(path);
  if (res.status === 0) {
    return res.data;
  }
  if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '/#/login';
    }
  } else {
    alert(res.msg);
    Promise.reject();
  }
});


Vue.use(VueAxios, axios);
Vue.use(VueLazyload, {
  loading: 'imgs/loading-svg/loading-bubbles.svg',
});
Vue.use(VueCookie);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
// import env from '../env';
// eslint-disable-next-line import/extensions
import './plugins/element.js';

// 设置 axios基础值。根据前端跨域方式进行调整
// axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据不同环境变量，取不同的地址
// axios.defaults.baseURL = env.baseURL;
// 设置接口拦截错误
// eslint-disable-next-line consistent-return
axios.interceptors.response.use((response) => {
  const res = response.data;
  if (res.status === 0) {
    return res.data;
  } if (res.status === 10) {
    window.location.href = '/#/login';
  } else {
    alert(res.msg);
  }
});


Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

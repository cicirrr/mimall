import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/home.vue';
import Index from '../pages/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
      },
      {
        path: '/product/:id',
        name: 'product',
        // component: Product,
        // component: resolve => require(['../pages/product.vue'], resolve)
        component: () => import('../pages/product.vue'),
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../pages/detail.vue'),
      },
    ],
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/cart.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login.vue'),
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/order.vue'),
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: () => import('../pages/orderList.vue'),
      },
      {
        path: 'confirm',
        name: 'orderConfirm',
        component: () => import('../pages/orderConfirm.vue'),
      },
      {
        path: 'pay',
        name: 'orderPay',
        component: () => import('../pages/orderPay.vue'),
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('../pages/alipay.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;

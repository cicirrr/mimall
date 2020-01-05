import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/home.vue';
import Index from '../pages/index.vue';
import Product from '../pages/product.vue';
import Detail from '../pages/detail.vue';
import Cart from '../pages/cart.vue';
import Order from '../pages/order.vue';
import OrderList from '../pages/orderList.vue';
import OrderConfirm from '../pages/orderConfirm.vue';
import OrderPay from '../pages/orderPay.vue';
import AliPay from '../pages/alipay.vue';
import Login from '../pages/login.vue';

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
        component: Product,
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
      },
    ],
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      {
        path: 'list',
        name: 'orderList',
        component: OrderList,
      },
      {
        path: 'confirm',
        name: 'orderConfirm',
        component: OrderConfirm,
      },
      {
        path: 'pay',
        name: 'orderPay',
        component: OrderPay,
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: AliPay,
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

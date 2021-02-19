import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'orderConfirmation',
    component: () => import('../views/orderConfirmation/orderConfirmation')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router

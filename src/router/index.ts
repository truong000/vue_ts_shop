import { createRouter, createWebHistory } from 'vue-router'
import checkAuth from './auth'
import Home from '@/views/Home/index.vue'
import Cart from '@/views/Cart/index.vue'
import ProductDetail from '@/views/ProductDetails/index.vue'
import BasicLayout from '@/layouts/BasicLayout/index.vue'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/Cart', name: 'cart', component: Cart },
      {
        path: 'product/:id',
        name: 'product',
        component: ProductDetail
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/Authentication/Login/index.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/Register',
    name: 'register',
    component: ()=> import('@/views/Authentication/Register/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  // Always scroll to top
  scrollBehavior() {
    return { top: 0 }
  }
})

/**
 * Handle check authencation
 */
checkAuth(router)

export default router

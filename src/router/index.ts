import { createRouter, createWebHistory } from 'vue-router'
import checkAuth from './auth'
import Home from '@/views/Home/index.vue'
import Cart from '@/views/Cart/index.vue'
import ProductDetail from '@/views/ProductDetails/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetail
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

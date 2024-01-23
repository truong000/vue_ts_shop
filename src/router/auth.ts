import { getCookie } from 'typescript-cookie'
import type { Router } from 'vue-router'

function checkLoginStatus() {
  const statusLogin = getCookie('loginSuccess')
  return statusLogin === 'true'
}
const checkAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = checkLoginStatus()
    console.log('isLoggedIn', isLoggedIn)
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
      console.log('1')
      next({ name: 'login' })
    } else if (to.matched.some((record) => record.meta.guestOnly) && isLoggedIn) {
      console.log('2')
      next({ name: 'home' })
    } else {
      console.log('3')
      next()
    }
  })
}

export default checkAuth

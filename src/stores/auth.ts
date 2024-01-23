import axios from 'axios'
import { defineStore } from 'pinia'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
interface User {
  name: string
  email: string
  password: string
}

interface Accounts {
  accountItem: User[]
}

export type RootState = {
  accounts?: Accounts
  errorMessages: boolean
  registerSuccess: boolean
  loginSuccess: boolean
  loginFail: boolean
}

export const useUserStore = defineStore({
  id: 'users',
  state: () =>
    ({
      accounts: {},
      errorMessages: false,
      registerSuccess: false,
      loginSuccess: false,
      loginFail: false
    } as RootState),
  getters: {
    getErrorMessages: (state) => state.errorMessages,
    getRegisterSuccess: (state) => state.registerSuccess
  },

  actions: {
    async getUsers() {
      try {
        await axios
          .get('http://localhost:3000/users')
          .then((response) => (this.accounts = response.data))
      } catch (error) {
        return
      }
    },
    async loginUser(email: string, password: string) {
      try {
        await this.getUsers()
        const user = this.accounts?.accountItem.find(
          (item) => item.email === email && item.password === password
        )
        if (user) {
          setCookie('loginSuccess', (this.loginSuccess = true), { expires: 7 })
          setCookie('userEmail', email, { expires: 7 })
          return (this.loginSuccess = true)
        }
        if (!user) {
          return (this.loginFail = true)
        }
      } catch (error) {
        console.error('Login failed with error:', error)
        this.loginSuccess = false
        return this.loginSuccess
      }
    },
    async registerUser(name: string, email: string, password: string) {
      try {
        const res = await axios.get('http://localhost:3000/users')
        this.accounts = res.data
        const userCheck = this.accounts?.accountItem.find((item) => item.email === email)
        if (userCheck) {
          this.errorMessages = true
          return this.$state.errorMessages
        } else {
          this.accounts?.accountItem.push({ name, email, password })
          await axios
            .put('http://localhost:3000/users', this.accounts)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
          this.registerSuccess = true
          console.log('registerSuccess6789', this.registerSuccess)
          return this.$state.registerSuccess
        }
      } catch (error) {
        return error
      }
    },
    checkLoginStatus() {
      const statusLogin = getCookie('loginSuccess')
      if (statusLogin === 'true') {
        this.loginSuccess = true
      } else {
        this.loginSuccess = false
      }
    },
    logOut() {
      removeCookie('loginSuccess')
      removeCookie('userEmail')
      this.loginSuccess = false
      console.log('loginSuccess456', this.loginSuccess)
    }
  }
})

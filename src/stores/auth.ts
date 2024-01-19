import axios from 'axios'
import { defineStore } from 'pinia'

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
        await this.getUsers();  
        console.log('accounts', this.accounts); 
        const user = this.accounts?.accountItem.find((item) => item.email === email && item.password === password);  
        console.log('user', user); 
        if (user){
          return this.loginSuccess = true
        }
        if (!user){
          console.log('vao')
          return this.loginFail = true
        }
      } catch (error) {  
        console.error('Login failed with error:', error);  
        this.loginSuccess = false;  
        return this.loginSuccess; 
      }  
    },   
    async registerUser(name: string, email: string, password: string) {
      console.log('vao')
      try {
        const res = await axios.get('http://localhost:3000/users')
        this.accounts = res.data
        const userCheck = this.accounts?.accountItem.find((item) => item.email === email)
        console.log('checkEmail', userCheck)
        if (userCheck) {
          this.errorMessages = true
          console.log('errorMessages', this.$state.errorMessages)
          return this.$state.errorMessages
        } else {
          this.accounts?.accountItem.push({ name, email, password })
          console.log('registerUser', this.accounts)
          await axios
            .put('http://localhost:3000/users', this.accounts)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
          this.registerSuccess = true
          console.log('registerSuccess11', this.registerSuccess)
          return this.$state.registerSuccess
        }
      } catch (error) {
        return error
      }
    }
  }
})

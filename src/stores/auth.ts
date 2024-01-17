import axios from 'axios'
import { defineStore } from 'pinia'

interface User {
  name: string
  email: string
  password: string
}

export type RootState = {
  users: User[]
  errorMessages: string
}

export const useUserStore = defineStore({
  id: 'users',
  state: () =>
    ({
      users: [],
      errorMessages: ''
    } as RootState),

  actions: {
    async registerUser(name: string, email: string, password: string) {
      try {
        const userCheck = this.users.find((item) => item.email === email)

        if (userCheck) {
          this.errorMessages = 'This email has been registered. Please choose another email'
          return this.errorMessages
        } else {
          this.users.push({ name, email, password })
          await axios
            .put('http://localhost:3000/users', this.users)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
        }
      } catch (error) {
        return
      }
    }
  }
})

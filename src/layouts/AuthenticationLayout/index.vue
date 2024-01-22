<script setup lang="ts">
import { ref, watch } from 'vue'
import LoginForm from '@/components/FormAuth/Login.vue'
import RegisterForm from '@/components/FormAuth/Register.vue'
import { useUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { registerSuccess, loginFail } = storeToRefs(useUserStore())
const selectLogin = ref(true)
const selectRegister = ref(false)

watch(registerSuccess, (newValue) => {
  if (newValue) {
    selectLogin.value = true
    selectRegister.value = false
    toast.success('Registration successful! Please log in.')
  }
})

// watch(loginSuccess, (newValue) => {
//   if (newValue) {
//     toast.success('Login successful!');
//   }
// });

watch(loginFail, (newValue) => {
  if (newValue) {
    toast.error('Login fail!')
  }
})

function clickRegister() {
  selectLogin.value = false
  selectRegister.value = true
}
</script>

<template>
  <body>
    <div class="main">
      <h1>GeeksforGeeks</h1>
      <h3>Enter your login credentials</h3>
      <LoginForm v-if="selectLogin"></LoginForm>
      <RegisterForm v-if="selectRegister"></RegisterForm>
      <p>
        Not registered?
        <a @click="clickRegister()"> Create an account </a>
      </p>
    </div>
  </body>
</template>

<style>
@import './styles.scss';
</style>

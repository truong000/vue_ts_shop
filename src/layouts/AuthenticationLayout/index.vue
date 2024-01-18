<script setup lang="ts">
import LoginForm from '@/components/FormAuth/Login.vue'
import RegisterForm from '@/components/FormAuth/Register.vue'
import { useUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { registerSuccess } = storeToRefs(useUserStore())
const selectLogin = ref(true)
const selectRegister = ref(false)

function clickRegister() {
  selectLogin.value = false
  selectRegister.value = true
}

console.log('registerSuccess', registerSuccess.value)
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

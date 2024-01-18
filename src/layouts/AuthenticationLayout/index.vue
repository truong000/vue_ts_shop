<script setup lang="ts">
import LoginForm from '@/components/FormAuth/Login.vue'
import RegisterForm from '@/components/FormAuth/Register.vue'
import { ref } from 'vue'

const isResigter = ref(true)
</script>

<template>
  <body>
    <div class="main">
      <h1>GeeksforGeeks</h1>
      <h3>Enter your login credentials</h3>
      <LoginForm v-if="isResigter"></LoginForm>
      <RegisterForm v-if="!isResigter"></RegisterForm>
      <p>
        Not registered?
        <a> Create an account </a>
      </p>
    </div>
  </body>
</template>

<style>
@import './styles.scss';
</style>

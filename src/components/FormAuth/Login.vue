<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorEmail = ref<string>('')
const errorPassWord = ref<string>('')
const isSubmitting = ref(false)

//check validatation mail
function validateEmail() {
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!emailFormat.test(email.value)) {
    errorEmail.value = 'Please enter a valid email address.'
    return false
  }
  errorEmail.value = ''
  return true
}
//check validatation password
function validatePassword() {
  if (password.value.length <= 0) {
    errorPassWord.value = 'Password must be at least 6 characters long.'
    return false
  }
  errorPassWord.value = ''
  return true
}
function handleSubmit() {
  isSubmitting.value = true
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    isSubmitting.value = false
    return
  }

  console.log('SUBMIT', { email: email.value, password: password.value })
  isSubmitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="email"> Email </label>
    <input
      type="text"
      placeholder="Enter your Email"
      v-model="email"
      :class="{ 'is-invalid': errorEmail }"
    />
    <p v-if="errorEmail" class="error-message">{{ errorEmail }}</p>

    <label for="password"> Password: </label>
    <input
      type="password"
      placeholder="Enter your Password"
      v-model="password"
      :class="{ 'is-invalid': errorPassWord }"
    />
    <p v-if="errorPassWord" class="error-message">{{ errorPassWord }}</p>

    <div class="wrap">
      <button type="submit" :disabled="isSubmitting">Submit</button>
    </div>
  </form>
</template>

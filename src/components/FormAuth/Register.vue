<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorName = ref<string>('')
const errorEmail = ref<string>('')
const errorPassWord = ref<string>('')
const errorConfirmPassWord = ref<string>('')
const isSubmitting = ref(false)

function validateName() {
  if (fullName.value.length === 0) {
    errorName.value = 'This filed is required'
    return false
  }
  errorName.value = ''
  return true
}

//check validatation mail
function validateEmail() {
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!emailFormat.test(email.value)) {
    errorEmail.value = 'Please enter a valid email address.'
    console.log(errorEmail.value)
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

function validateConfirmPass() {
  if (confirmPassword.value.length === 0) {
    errorConfirmPassWord.value = 'This filed is required'
    return false
  }
  if (confirmPassword.value !== password.value) {
    errorConfirmPassWord.value = 'Confirm password must be the same'
    return false
  }
  errorName.value = ''
  return true
}

function handleSubmit() {
  isSubmitting.value = true
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPassVaild = validateConfirmPass()
  console.log('SUBMIT123', { isNameValid, isEmailValid, isPasswordValid, isConfirmPassVaild })
  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPassVaild) {
    console.log('SUBMIT', { email: email.value, password: password.value })
    isSubmitting.value = false
    return
  }

  console.log('SUBMIT456', { email: email.value, password: password.value })
  isSubmitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="text"> Full Name: </label>
    <input
      type="text"
      placeholder="Enter your Full Name"
      v-model="fullName"
      :class="{ 'is-invalid': errorName }"
    />
    <p v-if="errorPassWord" class="error-message">{{ errorName }}</p>
    <label for="email"> Email: </label>
    <input
      type="text"
      placeholder="Enter your Email"
      v-model="email"
      :class="{ 'is-invalid': errorEmail }"
    />
    <p v-if="email" class="error-message">{{ errorEmail }}</p>
    <label for="password"> Password: </label>
    <input
      type="password"
      placeholder="Enter your Password"
      v-model="password"
      :class="{ 'is-invalid': errorPassWord }"
    />
    <p v-if="errorPassWord" class="error-message">{{ errorPassWord }}</p>
    <label for="password"> Confirm Password: </label>
    <input
      type="password"
      placeholder="Enter your Confirm Password"
      v-model="confirmPassword"
      :class="{ 'is-invalid': errorConfirmPassWord }"
    />
    <p v-if="errorConfirmPassWord" class="error-message">{{ errorConfirmPassWord }}</p>
    <br />
    <div class="wrap">
      <button type="submit" :disabled="isSubmitting">Submit</button>
    </div>
  </form>
</template>

<style>
.txtText {
  margin-bottom: unset;
}
</style>

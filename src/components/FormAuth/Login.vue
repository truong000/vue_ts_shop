<script setup lang="ts">
import { useUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const email = ref('')
const password = ref('')
const errorEmail = ref<string>('')
const errorPassWord = ref<string>('')
const isSubmitting = ref(false)
const { loginUser } = useUserStore()
const { loginFail } = storeToRefs(useUserStore())

//check validatation mail
function validateEmail() {
  if (email.value.length === 0) {
    errorEmail.value = 'This filed is required.'
    return false
  }
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
  if (password.value.length === 0) {
    errorPassWord.value = 'This filed is required.'
    return false
  }
  if (password.value.length < 6) {
    errorPassWord.value = 'Password must be at least 6 characters long.'
    return false
  }
  errorPassWord.value = ''
  return true
}

watch(email, (newEmail) => {
  if (newEmail.length > 0) {
    errorEmail.value = ''
  }
})

watch(password, (newPass) => {
  if (newPass.length > 0) {
    errorPassWord.value = ''
  }
})

function handleSubmit() {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  if (isEmailValid && isPasswordValid) {
    loginUser(email.value, password.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="email"> Email: </label>
    <input
      type="text"
      placeholder="Enter your Email"
      v-model="email"
      :class="{ 'is-invalid': errorEmail }"
      :style="{ border: errorEmail || loginFail ? '1px solid red' : '' }"
    />
    <p v-if="errorEmail" class="error-message">{{ errorEmail }}</p>
    <label for="password"> Password: </label>
    <input
      type="password"
      placeholder="Enter your Password"
      v-model="password"
      :class="{ 'is-invalid': errorPassWord }"
      :style="{ border: errorPassWord || loginFail ? '1px solid red' : '' }"
    />
    <p v-if="errorPassWord" class="error-message">{{ errorPassWord }}</p>
    <p v-if="loginFail" class="error-message">
      Please check email and password of you. It is wrong
    </p>
    <div class="wrap">
      <button type="submit" :disabled="isSubmitting">Submit</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const fullName = ref<string>('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorName = ref<string>('')
const errorEmail = ref<string>('')
const errorPassWord = ref<string>('')
const errorConfirmPassWord = ref<string>('')
const { registerUser } = useUserStore()
const { errorMessages, registerSuccess } = storeToRefs(useUserStore())

function validateName() {
  if (fullName.value.length === 0) {
    errorName.value = 'This filed is required.'
    return false
  }
  errorName.value = ''
  return true
}

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

function validateConfirmPass() {
  if (confirmPassword.value.length === 0) {
    errorConfirmPassWord.value = 'This filed is required'
    return false
  }
  if (confirmPassword.value !== password.value) {
    errorConfirmPassWord.value = 'Confirm password must be the same'
    return false
  }
  errorConfirmPassWord.value = ''
  return true
}

watch(fullName, (newFullName) => {
  if (newFullName.length > 0) {
    errorName.value = ''
  }
})

watch(email, (newEmail) => {
  if (newEmail.length > 0) {
    errorEmail.value = ''
    errorMessages.value = false
  }
})

watch(password, (newPass) => {
  if (newPass.length > 0) {
    errorPassWord.value = ''
  }
})

watch(confirmPassword, (newConfirm) => {
  if (newConfirm.length > 0) {
    errorConfirmPassWord.value = ''
  }
})

function handleSubmit() {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPassVaild = validateConfirmPass()
  if (isNameValid && isEmailValid && isPasswordValid && isConfirmPassVaild) {
    registerUser(fullName.value, email.value, password.value)
  }
}

watch(registerSuccess, (newValue) => {
  if (newValue) {
    toast.success('Register Success!')
    router.push({name: 'login'})
  }
})

</script>

<template>
  <body>
    <div class="main">
      <h1>Shooping VUE_TS</h1>
      <h3>Register Account Infomation</h3>
      <div class="alert alert-danger" role="alert" v-if="errorMessages">
        This email has been registered
      </div>
      <form @submit.prevent="handleSubmit">
        <label for="text"> Full Name: </label>
        <input type="text" placeholder="Enter your Full Name" v-model="fullName" :class="{ 'is-invalid': errorName }"
          :style="{ border: errorName ? '1px solid red' : '' }" />
        <p v-if="errorName" class="error-message">{{ errorName }}</p>
        <label for="email"> Email: </label>
        <input type="text" placeholder="Enter your Email" v-model="email" :class="{ 'is-invalid': errorEmail }"
          :style="{ border: errorMessages ? '1px solid red' : '' }" />
        <p v-if="errorEmail" class="error-message">{{ errorEmail }}</p>
        <label for="password"> Password: </label>
        <input type="password" placeholder="Enter your Password" v-model="password"
          :class="{ 'is-invalid': errorPassWord }" :style="{ border: errorPassWord ? '1px solid red' : '' }" />
        <p v-if="errorPassWord" class="error-message">{{ errorPassWord }}</p>
        <label for="password"> Confirm Password: </label>
        <input type="password" placeholder="Enter your Confirm Password" v-model="confirmPassword"
          :class="{ 'is-invalid': errorConfirmPassWord }"
          :style="{ border: errorConfirmPassWord ? '1px solid red' : '' }" />
        <p v-if="errorConfirmPassWord" class="error-message">{{ errorConfirmPassWord }}</p>
        <br />
        <div class="wrap">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </body>
</template>


<style>
@import './styles.scss';
</style>

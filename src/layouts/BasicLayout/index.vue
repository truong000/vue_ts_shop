<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { getCookie } from 'typescript-cookie'
import { watch } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { cart } = storeToRefs(useCartStore())
const { loginSuccess } = storeToRefs(useUserStore())
const { logOut } = useUserStore()
const userEmail = getCookie('userEmail')

watch(loginSuccess, (newValue) => {
  console.log('loginSuccess890', loginSuccess)
  if (!newValue) {
    toast.success('Logout successful!')
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
  }
})
</script>

<template>
  <nav class="navbar" style="background-color: antiquewhite">
    <div class="container-fluid">
      <div class="navbar-header">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="60" height="60" />
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <RouterLink to="/">Home</RouterLink>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <RouterLink to="/Cart"
              ><span class="glyphicon glyphicon-shopping-cart"></span>Cart
              {{ cart?.totalProduct }}</RouterLink
            >
          </li>
          <li>
            <a @click="logOut()" style="cursor: pointer"
              ><span class="glyphicon glyphicon-user"></span> Your Account: {{ userEmail }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="basic-layout">
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';

/* Add a black background color to the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the "active" element to highlight the current page */
.topnav a.active {
  background-color: #2196f3;
  color: white;
}

/* Style the search box inside the navigation bar */
.topnav input[type='text'] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .topnav a,
  .topnav input[type='text'] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type='text'] {
    border: 1px solid #ccc;
  }
}
.icon-account {
  display: inline;
}

.navbar {
  font-size: medium;
  display: block;
  margin: 0 0 10px 0;
}
.navbar-nav {
  margin-top: 20px;
}
</style>

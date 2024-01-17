<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const { cart } = storeToRefs(useCartStore())
</script>

<template>
  <div class="basic-layout">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <div>ShoppingCart</div>

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/cart">Cart {{ cart?.totalProduct }}</RouterLink>
        </nav>
      </div>
    </header>
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
</style>

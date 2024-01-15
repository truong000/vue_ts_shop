<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'
interface Product {
  id: number
  title: string
  price: number
  quantity: number
}
const { addProductToCart } = useCartStore()
const isLoading = ref(true)
const products = ref<Product[]>([])
const callApiListProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products`)
    return response.data as Product[]
  } catch (error) {
    console.log('error', error)
    return []
  }
}

onMounted(async () => {
  const data = await callApiListProduct()
  if (Array.isArray(data)) {
    products.value = data
  }
  isLoading.value = false
})
</script>

<template>
  <Loading :is-loading="isLoading"></Loading>
  <div v-if="products">
    <div>
      <ul style="display: inline-flex">
        <div v-for="item of products" :key="item.id">
          <div class="card">
            <img src="../assets//images/jeans3.jpg" alt="Denim Jeans" style="width: 100%" />
            <h2>
              <RouterLink :to="`/product/${item.id}`">{{ item.title }}</RouterLink>
            </h2>
            <p class="price">{{ item.price }}</p>
            <p>Some text about the jeans..</p>
            <p>
              <button @click="addProductToCart(item.id, item.price)">Add to Cart</button>
            </p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.price {
  color: grey;
  font-size: 22px;
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

.card button:hover {
  opacity: 0.7;
}

nav {
  padding: 20px 0 40px 0;
  background: #f8f8f8;
  font-size: 16px;

  .navbar-left {
    float: left;
  }

  .navbar-right {
    float: right;
  }

  ul {
    li {
      display: inline;
      padding-left: 20px;

      a {
        color: #777777;
        text-decoration: none;

        &:hover {
          color: black;
        }
      }
    }
  }
}

.container {
  margin: auto;
  width: 80%;
}

.badge {
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}
</style>

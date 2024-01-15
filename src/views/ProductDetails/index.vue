<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '@/components/Loading/index.vue'
// import { useCartStore } from '@/stores/cart'

interface Product {
  id: number
  title: string
  price: number
  quantity: number
}

const route = useRoute()
const productId = Number(route.params.id)
const isLoading = ref(true)
const products = ref<Product[]>([])
const product = ref<Product>()
// const { addProductToCart } = useCartStore()

const callApiProductDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products`)
    return response.data as Product
  } catch (error) {
    console.log('error', error)
    return []
  }
}

onMounted(async () => {
  const data = await callApiProductDetail()
  if (Array.isArray(data)) {
    products.value = data
    const findProdcut = products.value.find((item) => item.id === productId)
    product.value = findProdcut
  }
  isLoading.value = false
})
</script>
<template>
  <Loading :is-loading="isLoading"></Loading>
  <div>
    <div class="card">
      <img src="@/assets/images/jeans3.jpg" alt="Denim Jeans" style="width: 100%" />
      <h1>{{ product?.title }}</h1>
      <p class="price">${{ product?.price }}</p>
      <p>Some text about the jeans..</p>
      <p><button>Add to Cart</button></p>
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
</style>

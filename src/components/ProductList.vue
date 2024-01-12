<script setup lang="ts">
import useCommon from '@/core/hooks/useCommon'
import { onMounted, ref } from 'vue'
import Loading from '@/components/Loading/index.vue'
import api from '@/services/axios.service'

const { storeGetters, storeDispatch } = useCommon('useProductStore')
const { getProducts } = storeGetters()
const isLoading = ref(true)
const products = ref([])
const callApiListProduct = async () => {
  try {
    return await api.get(`http://localhost:3000/products`)
  } catch (error) {
    console.log('error', error)
  }
}

onMounted(() => {
  callApiListProduct().then((response) => {
    console.log('hihi', response)
    isLoading.value = false
    products.value = response?.data
  })
})

console.log('products', products)
</script>

<template>
  <Loading :is-loading="isLoading"></Loading>
  <div v-if="products">123</div>

  <!-- <input v-model="search" placeholder="Search products..." /> -->

  <!-- <main>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <div v-if="products">
      <div>
        <ul style="display: inline-flex">
          <div v-for="item of products" :key="item.id">
            <div class="card">
              <img src="../../../public/images/jeans3.jpg" alt="Denim Jeans" style="width: 100%" />
              <h2>
                <RouterLink :to="`/Product/${item.id}`">{{ item.title }}</RouterLink>
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
  </main> -->
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

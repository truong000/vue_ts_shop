<script setup lang="ts">
import DeleteModal from '@/components/ModalComfirm/DeleteModal.vue'
import { useCartStore, useProductStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { fetchListProducts } = useProductStore()
const { fetchCartList, removeItemCart, addProductToCart, updateItemInCart } = useCartStore()
const messError = ref('')
const isShow = ref(false)
const productToRemove = ref(0)
const { cart } = storeToRefs(useCartStore())
const { products } = storeToRefs(useProductStore())

fetchListProducts()
fetchCartList()

function getInfoProduct(id: number) {
  const item = products.value.find((item) => item.id === id)
  return item
}

function calculateTotalPrice(productId: number, quantity: number) {
  const product = getInfoProduct(productId)
  if (product) {
    return product.price * quantity
  }
  return 0
}

function showModal(productId: number) {
  console.log('id', productId)
  productToRemove.value = productId
  isShow.value = true
}

const removeProduct = () => {
  if (productToRemove.value) {
    console.log('product', productToRemove.value)
    removeItemCart(productToRemove.value)
    isShow.value = false
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>TotalPrice</th>
      </tr>
    </thead>
    <tbody v-if="cart">
      <tr v-for="item in cart.cartItems" :key="item.productId">
        <td>{{ getInfoProduct(item.productId)?.title }}</td>
        <td>
          {{ item.quantity }}
        </td>
        <td>${{ calculateTotalPrice(item.productId, item.quantity) }}</td>
        <td>
          <button
            @click="showModal(item.productId)"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            class="btn btn-danger"
          >
            Remove
          </button>
          <button
            @click="addProductToCart(item.productId, getInfoProduct(item.productId)?.price ?? 0)"
            class="btn btn-info"
          >
            +
          </button>
          <button
            v-if="item.quantity > 1"
            @click="updateItemInCart(item.productId, getInfoProduct(item.productId)?.price ?? 0)"
            class="btn btn-info"
          >
            -
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <h4 v-if="cart?.totalProduct">
    Total bill
    <p>
      <span class="price" style="color: black"
        ><b>${{ cart?.totalPrice }}</b></span
      >
    </p>
    <div>{{ messError }}</div>
    <button class="btn btn-primary">CheckOut</button>
  </h4>

  <DeleteModal
    :isShow="isShow"
    :productId="productToRemove"
    :title="getInfoProduct(productToRemove)?.title"
    @confirm="removeProduct()"
  ></DeleteModal>
</template>

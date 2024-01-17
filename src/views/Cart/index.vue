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
  <div class="col-25">
    <div class="container">
      <h4>
        Cart
        <span class="price" style="color: black"
          ><i class="fa fa-shopping-cart"></i> <b>{{ cart?.cartItems.length }}</b></span
        >
      </h4>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>TotalPrice</th>
            <th></th>
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
              >
                Remove
              </button>
              <button
                @click="
                  addProductToCart(item.productId, getInfoProduct(item.productId)?.price ?? 0)
                "
              >
                +
              </button>
              <button
                v-if="item.quantity > 1"
                @click="
                  updateItemInCart(item.productId, getInfoProduct(item.productId)?.price ?? 0)
                "
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>
        Total bill
        <p>
          <span class="price" style="color: black"
            ><b>${{ cart?.totalPrice }}</b></span
          >
        </p>
        <div>{{ messError }}</div>
      </h4>
    </div>
    <DeleteModal
      :isShow="isShow"
      :productId="productToRemove"
      :title="getInfoProduct(productToRemove)?.title"
      @confirm="removeProduct()"
    ></DeleteModal>
  </div>
</template>

<style>
body {
  font-family: Arial;
  font-size: 17px;
  padding: 8px;
}

* {
  box-sizing: border-box;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type='text'] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #04aa6d;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196f3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

span.quantity {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>

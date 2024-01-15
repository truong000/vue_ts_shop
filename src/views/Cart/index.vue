<script setup lang="ts">
import api from '@/services/axios.service'
import { onMounted, ref } from 'vue'

interface CartItem {
  productId: number
  quantity: number
}

interface Cart {
  cartItems: CartItem[]
  totalPrice: number
  totalProduct: number
}
const carts = ref<Cart>({
  cartItems: [
    // {
    //   productId: 0,
    //   quantity: 0
    // }
  ],
  totalPrice: 0,
  totalProduct: 0
})

const messError = ref('')
const callApiCarts = async () => {
  try {
    return await api.get('http://localhost:3000/cart')
  } catch (error) {
    console.log('error', error)
    return []
  }
}

onMounted(async () => {
  await callApiCarts().then((res) => {
    console.log('res', res)

    if (res.status === 200) {
      carts.value = res?.data?.cartItems
    } else {
      messError.value = res.message
    }
  })

  // if (data) {
  //   carts.value = data
  // } else {
  //   carts.value = {
  //     cartItems: [],
  //     totalPrice: 0,
  //     totalProduct: 0
  //   }
  // }
})
</script>

<template>
  <div class="col-25">
    <div class="container">
      <h4>
        Cart
        <div v-if="carts">
          <span class="price" style="color: black"
            ><i class="fa fa-shopping-cart"></i><b>1212</b></span
          >
        </div>
        <div>{{ messError }}</div>
      </h4>
      <div>
        <CartItem></CartItem>
      </div>
    </div>
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
